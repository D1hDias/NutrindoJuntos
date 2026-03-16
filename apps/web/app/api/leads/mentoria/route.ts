import { NextRequest, NextResponse } from 'next/server'
import * as brevo from '@getbrevo/brevo'
import { leadMentoriaSchema, isSpamBot } from '@/lib/validations'
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
    const rateLimit = await checkRateLimit(clientIP, rateLimiters.mentoriaLeads)

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
    const validationResult = leadMentoriaSchema.safeParse(body)

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
        route: '/api/leads/mentoria',
      })
      return NextResponse.json({
        success: true,
        message: 'Solicitação de mentoria enviada!',
      })
    }

    // Add contact to Brevo leads list
    const listId = parseInt(process.env.BREVO_LIST_LEADS_MENTORIA || '5')

    const createContact = new brevo.CreateContact()
    createContact.email = data.email
    createContact.listIds = [listId]
    createContact.updateEnabled = true

    createContact.attributes = {
      FIRSTNAME: data.name.split(' ')[0],
      LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
    }

    if (data.phone) {
      // Format phone number for Brevo (needs country code with +)
      let formattedPhone = data.phone.replace(/\D/g, '') // Remove non-digits
      if (!formattedPhone.startsWith('55')) {
        formattedPhone = '55' + formattedPhone // Add Brazil country code
      }
      createContact.attributes.SMS = '+' + formattedPhone
    }

    try {
      await apiInstance.createContact(createContact)
    } catch (error: any) {
      // Contact already exists - just add to the new list
      const errorCode = error.response?.data?.code || error.response?.body?.code

      if (errorCode === 'duplicate_parameter') {
        try {
          // Get existing contact to preserve their lists
          const existingContact = await apiInstance.getContactInfo(data.email)
          const existingLists = existingContact.body?.listIds || []

          // Add new list if not already in it
          const allLists = [...new Set([...existingLists, listId])]

          const updateContact = new brevo.UpdateContact()
          updateContact.listIds = allLists
          updateContact.attributes = {
            FIRSTNAME: data.name.split(' ')[0],
            LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
          }

          // Add phone only if provided and not the duplicate issue
          const duplicateFields = error.response?.data?.metadata?.duplicate_identifiers || []
          if (data.phone && !duplicateFields.includes('SMS')) {
            let formattedPhone = data.phone.replace(/\D/g, '')
            if (!formattedPhone.startsWith('55')) {
              formattedPhone = '55' + formattedPhone
            }
            updateContact.attributes.SMS = '+' + formattedPhone
          }

          await apiInstance.updateContact(data.email, updateContact)
        } catch (updateError: any) {
          logIntegrationError('Brevo', 'updateContact', updateError, {
            email: data.email,
            route: '/api/leads/mentoria',
          })
          // Don't throw - user is still in the list, just log the error
        }
      } else {
        throw error
      }
    }

    // Send confirmation email to user
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
    confirmationEmail.subject = 'Interesse em Mentoria - NUTRINDO JUNTOS'
    confirmationEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Obrigado pelo seu interesse em mentoria!</h2>
        <p>Olá ${data.name}!</p>
        <p>Recebemos sua solicitação de mentoria personalizada.</p>
        <p>Nossa equipe irá analisar seu perfil e objetivos para criar um plano personalizado que inclui:</p>
        <ul>
          <li>🎯 Definição de objetivos e metas claras</li>
          <li>📋 Plano de desenvolvimento personalizado</li>
          <li>💬 Sessões individuais com mentor especializado</li>
          <li>📚 Materiais e recursos exclusivos</li>
          <li>🔄 Acompanhamento contínuo do progresso</li>
        </ul>
        ${data.objetivos ? `<p><strong>Seus objetivos:</strong><br><em>"${data.objetivos}"</em></p>` : ''}
        <p>Entraremos em contato em até 48 horas para agendar uma conversa inicial.</p>
        <p><strong>Equipe NUTRINDO JUNTOS</strong></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">
          Este email foi enviado porque você manifestou interesse em mentoria.
        </p>
      </div>
    `

    try {
      await transactionalEmailsApi.sendTransacEmail(confirmationEmail)
    } catch (error) {
      logIntegrationError('Brevo', 'sendConfirmationEmail', error as Error, {
        email: data.email,
        route: '/api/leads/mentoria',
      })
      // Don't fail the whole operation if email fails
    }

    // Send notification to admin
    const adminEmail = new brevo.SendSmtpEmail()
    adminEmail.sender = {
      name: data.name,
      email: data.email,
    }
    adminEmail.to = [
      {
        email: process.env.CONTACT_EMAIL || 'atendimento@nutrindojuntos.com.br',
        name: 'NUTRINDO JUNTOS',
      },
    ]
    adminEmail.subject = `[Novo Lead - Mentoria] ${data.name}`
    adminEmail.htmlContent = `
      <h2>Novo interesse em mentoria</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Telefone:</strong> ${data.phone}</p>` : ''}
      ${data.experiencia ? `<p><strong>Nível de experiência:</strong> ${data.experiencia}</p>` : ''}
      ${data.objetivos ? `<p><strong>Objetivos:</strong><br>${data.objetivos.replace(/\n/g, '<br>')}</p>` : ''}
    `
    adminEmail.replyTo = {
      email: data.email,
      name: data.name,
    }

    try {
      await transactionalEmailsApi.sendTransacEmail(adminEmail)
    } catch (error) {
      logIntegrationError('Brevo', 'sendAdminEmail', error as Error, {
        email: data.email,
        route: '/api/leads/mentoria',
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitação de mentoria enviada! Verifique seu email.',
    })
  } catch (error: any) {
    logApiError('/api/leads/mentoria', error as Error, {
      ip: clientIP,
    })
    return NextResponse.json(
      {
        error: 'Erro ao processar solicitação. Tente novamente.',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}
