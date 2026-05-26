import { NextResponse } from 'next/server'
import { processAsaasWebhook, validateWebhookSecret } from '@/lib/payments/asaas/webhooks'
import type { AsaasWebhookEvent } from '@/lib/payments/asaas/types'

export async function POST(request: Request) {
  try {
    const secret = request.headers.get('asaas-access-token')
    if (!validateWebhookSecret(secret)) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const event: AsaasWebhookEvent = await request.json()
    const result = processAsaasWebhook(event)

    if (result.action === 'confirmed' && result.orderId) {
      // TODO: atualizar status do pedido no Supabase quando implementado
      // await updateOrderStatus(result.orderId, 'paid', result.externalId)
      console.info(`[webhook] pagamento confirmado — orderId: ${result.orderId}`)
    }

    if (result.action === 'cancelled' && result.orderId) {
      // TODO: atualizar status do pedido no Supabase quando implementado
      // await updateOrderStatus(result.orderId, 'cancelled')
      console.info(`[webhook] pagamento cancelado — orderId: ${result.orderId}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[webhook/asaas] erro:', error)
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 })
  }
}
