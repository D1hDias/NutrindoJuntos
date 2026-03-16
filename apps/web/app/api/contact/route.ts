import { NextRequest, NextResponse } from 'next/server'
import * as brevo from '@getbrevo/brevo'
import { contactSchema, isSpamBot } from '@/lib/validations'
import { checkRateLimit, getClientIP, rateLimiters } from '@/lib/rate-limit-redis'
import { logger, logSpamAttempt, logIntegrationError, logApiError } from '@/lib/logger'

// Initialize Brevo client
const apiInstance = new brevo.ContactsApi()
apiInstance.setApiKey(brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '')

const transactionalEmailsApi = new brevo.TransactionalEmailsApi()
transactionalEmailsApi.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ''
)

export async function POST(request: NextRequest) {
  // Get client IP (outside try block for logging)
  const clientIP = getClientIP(request)

  try {
    // Rate limiting: 3 requests per minute (Redis-based)
    const rateLimit = await checkRateLimit(clientIP, rateLimiters.contact)

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: 'Muitas tentativas. Por favor, aguarde alguns minutos.',
          retryAfter: Math.ceil((rateLimit.reset - Date.now()) / 1000)
        },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Zod validation
    const validationResult = contactSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: validationResult.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Honeypot check
    if (isSpamBot(data._honeypot)) {
      logSpamAttempt('honeypot', {
        ip: clientIP,
        email: data.email,
        route: '/api/contact',
      })
      return NextResponse.json({
        success: true,
        message: 'Mensagem enviada com sucesso!',
      })
    }

    // 1. Add contact to Brevo list
    const listId = parseInt(process.env.BREVO_LIST_CONTATO || '6')

    const createContact = new brevo.CreateContact()
    createContact.email = data.email
    createContact.attributes = {
      FIRSTNAME: data.name.split(' ')[0],
      LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
    }
    createContact.listIds = [listId]
    createContact.updateEnabled = true

    try {
      await apiInstance.createContact(createContact)
    } catch (error: any) {
      // Contact might already exist, that's OK
      if (error.response?.status !== 400) {
        logIntegrationError('Brevo', 'createContact', error, {
          email: data.email,
          route: '/api/contact',
        })
      }
    }

    // 2. Send notification email to admin
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.sender = {
      name: data.name,
      email: data.email,
    }
    sendSmtpEmail.to = [
      {
        email: process.env.CONTACT_EMAIL || 'atendimento@nutrindojuntos.com.br',
        name: 'NUTRINDO JUNTOS',
      },
    ]
    sendSmtpEmail.subject = `[Contato] ${data.subject}`
    sendSmtpEmail.htmlContent = `
      <h2>Nova mensagem de contato</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Assunto:</strong> ${data.subject}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `
    sendSmtpEmail.replyTo = {
      email: data.email,
      name: data.name,
    }

    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail)

    // 3. Send confirmation email to user
    const confirmationEmail = new brevo.SendSmtpEmail()
    confirmationEmail.sender = {
      name: 'NUTRINDO JUNTOS',
      email: process.env.CONTACT_EMAIL || 'atendimento@nutrindojuntos.com.br',
    }
    confirmationEmail.to = [
      {
        email: data.email,
        name: data.name,
      },
    ]
    confirmationEmail.subject = 'Recebemos sua mensagem - NUTRINDO JUNTOS'
    confirmationEmail.htmlContent = `
      <h2>Olá, ${data.name}!</h2>
      <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
      <p><strong>Sua mensagem:</strong></p>
      <p><em>"${data.message}"</em></p>
      <br>
      <p>Obrigado pelo contato!</p>
      <p><strong>Equipe NUTRINDO JUNTOS</strong></p>
    `

    await transactionalEmailsApi.sendTransacEmail(confirmationEmail)

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso! Verifique seu email.',
    })
  } catch (error) {
    logApiError('/api/contact', error as Error, {
      ip: clientIP,
    })
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem. Tente novamente.' },
      { status: 500 }
    )
  }
}
