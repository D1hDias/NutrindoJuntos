import { NextRequest, NextResponse } from 'next/server'
import * as brevo from '@getbrevo/brevo'
import { newsletterSchema, isSpamBot } from '@/lib/validations'
import { checkRateLimit, getClientIP, rateLimiters } from '@/lib/rate-limit-redis'
import { logSpamAttempt, logIntegrationError, logApiError } from '@/lib/logger'

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
    // Rate limiting: 5 requests per minute (Redis-based)
    const rateLimit = await checkRateLimit(clientIP, rateLimiters.newsletter)

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
    const validationResult = newsletterSchema.safeParse(body)

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
      // Log spam attempt but return success to not tip off bots
      logSpamAttempt('honeypot', {
        ip: clientIP,
        email: data.email,
        route: '/api/newsletter',
      })
      return NextResponse.json({
        success: true,
        message: 'Inscrição realizada com sucesso!',
      })
    }

    // Add contact to Brevo newsletter list
    const listId = parseInt(process.env.BREVO_LIST_NEWSLETTER || '3')

    const createContact = new brevo.CreateContact()
    createContact.email = data.email
    createContact.listIds = [listId]
    createContact.updateEnabled = true

    if (data.name) {
      createContact.attributes = {
        FIRSTNAME: data.name.split(' ')[0],
        LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
      }
    }

    try {
      await apiInstance.createContact(createContact)
    } catch (error: any) {
      // Contact might already exist
      if (error.response?.body?.code === 'duplicate_parameter') {
        return NextResponse.json({
          success: true,
          message: 'Você já está inscrito na nossa newsletter!',
        })
      }
      throw error
    }

    // Send welcome email
    const welcomeEmail = new brevo.SendSmtpEmail()
    welcomeEmail.sender = {
      name: 'NUTRINDO JUNTOS',
      email: process.env.CONTACT_EMAIL || 'atendimento@nutrindojuntos.com.br',
    }
    welcomeEmail.to = [
      {
        email: data.email,
        name: data.name || '',
      },
    ]
    welcomeEmail.subject = 'Bem-vindo(a) à Newsletter NUTRINDO JUNTOS!'
    welcomeEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Bem-vindo(a) à nossa comunidade!</h2>
        <p>Olá${data.name ? ` ${data.name}` : ''}!</p>
        <p>Obrigado por se inscrever na newsletter do <strong>NUTRINDO JUNTOS</strong>.</p>
        <p>Agora você receberá:</p>
        <ul>
          <li>📚 Conteúdos exclusivos sobre nutrição</li>
          <li>💡 Dicas práticas para sua carreira</li>
          <li>🎯 Novidades sobre cursos e mentorias</li>
          <li>📰 Artigos do nosso blog</li>
        </ul>
        <p>Estamos felizes em tê-lo(a) conosco!</p>
        <br>
        <p><strong>Equipe NUTRINDO JUNTOS</strong></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">
          Você está recebendo este email porque se inscreveu na nossa newsletter.
          <br>
          Caso queira cancelar a inscrição, clique aqui.
        </p>
      </div>
    `

    try {
      await transactionalEmailsApi.sendTransacEmail(welcomeEmail)
    } catch (error) {
      // Log error but don't fail the whole operation
      logIntegrationError('Brevo', 'sendWelcomeEmail', error as Error, {
        email: data.email,
        route: '/api/newsletter',
      })
      // Don't fail the whole operation if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso! Verifique seu email.',
    })
  } catch (error) {
    // Log API error
    logApiError('/api/newsletter', error as Error, {
      ip: clientIP,
    })
    return NextResponse.json(
      { error: 'Erro ao processar inscrição. Tente novamente.' },
      { status: 500 }
    )
  }
}
