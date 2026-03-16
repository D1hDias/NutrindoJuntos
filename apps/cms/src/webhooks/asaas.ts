import { Request, Response } from 'express'
import { Payload } from 'payload'

// Tipos do webhook do Asaas
interface AsaasWebhookPayload {
  event: string
  dateCreated: string
  payment: {
    id: string
    customer: string
    subscription?: string
    installment?: string
    paymentLink?: string
    value: number
    netValue: number
    originalValue?: number
    interestValue?: number
    description?: string
    billingType: string
    status: string
    pixTransaction?: {
      encodedImage: string
      payload: string
      qrCode: {
        id: string
        encodedImage: string
        payload: string
        expirationDate: string
      }
    }
    confirmedDate?: string
    paymentDate?: string
    clientPaymentDate?: string
    installmentNumber?: number
    creditDate?: string
    estimatedCreditDate?: string
    invoiceUrl?: string
    bankSlipUrl?: string
    transactionReceiptUrl?: string
    invoiceNumber?: string
    externalReference?: string
  }
}

export function createAsaasWebhook(payload: Payload) {
  return async (req: Request, res: Response) => {
    try {
      console.log('🔔 Webhook Asaas recebido:', {
        event: req.body?.event,
        paymentId: req.body?.payment?.id,
        status: req.body?.payment?.status,
        timestamp: new Date().toISOString()
      })

      const webhookData: AsaasWebhookPayload = req.body

      // Eventos que indicam pagamento confirmado
      const paidEvents = [
        'PAYMENT_CONFIRMED', 
        'PAYMENT_RECEIVED',
        'PAYMENT_APPROVED'
      ]

      if (!paidEvents.includes(webhookData.event)) {
        console.log(`⏭️  Evento ignorado: ${webhookData.event}`)
        return res.status(200).json({ message: 'Evento não processado', event: webhookData.event })
      }

      const paymentId = webhookData.payment?.id
      if (!paymentId) {
        console.error('❌ Payment ID não encontrado no webhook')
        return res.status(400).json({ error: 'Payment ID não encontrado' })
      }

      // Buscar pedido no banco de dados
      console.log(`🔍 Buscando pedido com asaasId: ${paymentId}`)
      
      const orderQuery = await payload.find({
        collection: 'orders',
        where: {
          asaasId: {
            equals: paymentId
          }
        },
        limit: 1
      })

      if (!orderQuery.docs || orderQuery.docs.length === 0) {
        console.error(`❌ Pedido não encontrado para payment ID: ${paymentId}`)
        return res.status(404).json({ error: 'Pedido não encontrado' })
      }

      const order = orderQuery.docs[0]
      console.log(`✅ Pedido encontrado: ${order.id} (${order.email})`)

      // Verificar se o pedido já foi processado
      if (order.status === 'paid') {
        console.log(`ℹ️  Pedido já processado: ${order.id}`)
        return res.status(200).json({ message: 'Pedido já processado' })
      }

      // Atualizar status do pedido para 'paid'
      console.log(`💳 Atualizando status do pedido: ${order.id}`)
      
      const updatedOrder = await payload.update({
        collection: 'orders',
        id: order.id,
        data: {
          status: 'paid',
          paidAt: new Date().toISOString(),
          notes: `Pago via webhook Asaas em ${new Date().toLocaleString('pt-BR')}`
        }
      })

      console.log(`✅ Pedido atualizado: ${updatedOrder.id}`)

      // Verificar se usuário já existe
      let user
      const existingUserQuery = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: order.email
          }
        },
        limit: 1
      })

      if (existingUserQuery.docs && existingUserQuery.docs.length > 0) {
        user = existingUserQuery.docs[0]
        console.log(`👤 Usuário existente encontrado: ${user.id}`)
      } else {
        // Criar novo usuário
        console.log(`👤 Criando novo usuário: ${order.email}`)
        
        user = await payload.create({
          collection: 'users',
          data: {
            email: order.email,
            password: order.accessKey, // A chave de acesso será a senha inicial
            role: 'student'
          }
        })

        console.log(`✅ Usuário criado: ${user.id}`)
      }

      // Verificar se já existe uma chave de acesso para este usuário e curso
      const existingAccessQuery = await payload.find({
        collection: 'course-keys',
        where: {
          and: [
            {
              user: {
                equals: user.id
              }
            },
            {
              course: {
                equals: order.course
              }
            }
          ]
        },
        limit: 1
      })

      if (existingAccessQuery.docs && existingAccessQuery.docs.length > 0) {
        console.log(`🔑 Chave de acesso já existe para usuário ${user.id} e curso ${order.course}`)
        
        // Atualizar para garantir que está ativa
        await payload.update({
          collection: 'course-keys',
          id: existingAccessQuery.docs[0].id,
          data: {
            isActive: true,
            order: order.id
          }
        })
      } else {
        // Criar nova chave de acesso ao curso
        console.log(`🔑 Criando chave de acesso: usuário ${user.id}, curso ${order.course}`)
        
        const courseAccess = await payload.create({
          collection: 'course-keys',
          data: {
            user: user.id,
            course: order.course,
            order: order.id,
            isActive: true,
            // expiresAt será definido automaticamente pelo hook (1 ano)
          }
        })

        console.log(`✅ Chave de acesso criada: ${courseAccess.id}`)
      }

      // Log final de sucesso
      console.log(`🎉 Webhook processado com sucesso:`, {
        orderId: order.id,
        userId: user.id,
        courseId: order.course,
        paymentId,
        event: webhookData.event,
        processedAt: new Date().toISOString()
      })

      // Responder ao Asaas
      res.status(200).json({ 
        success: true,
        message: 'Webhook processado com sucesso',
        orderId: order.id,
        userId: user.id
      })

    } catch (error) {
      console.error('❌ Erro no webhook Asaas:', error)
      
      // Log detalhado do erro
      console.error('Detalhes do erro:', {
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined,
        body: req.body,
        timestamp: new Date().toISOString()
      })

      res.status(500).json({ 
        error: 'Erro interno no processamento do webhook',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }
}

export default createAsaasWebhook