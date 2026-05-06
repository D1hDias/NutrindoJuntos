/**
 * ASAAS WEBHOOK HANDLERS
 */

import type { AsaasWebhookEvent } from './types'

const CONFIRMED_EVENTS = new Set([
  'PAYMENT_CONFIRMED',
  'PAYMENT_RECEIVED',
  'PAYMENT_RECEIVED_IN_CASH',
])

const CANCELLED_EVENTS = new Set([
  'PAYMENT_REFUNDED',
  'PAYMENT_CHARGEBACK',
])

export type WebhookResult =
  | { action: 'confirmed'; orderId: string; externalId: string }
  | { action: 'cancelled'; orderId: string }
  | { action: 'ignored' }

export function processAsaasWebhook(event: AsaasWebhookEvent): WebhookResult {
  const { payment } = event

  if (CONFIRMED_EVENTS.has(event.event)) {
    return {
      action: 'confirmed',
      orderId: payment.externalReference ?? '',
      externalId: payment.id,
    }
  }

  if (CANCELLED_EVENTS.has(event.event)) {
    return {
      action: 'cancelled',
      orderId: payment.externalReference ?? '',
    }
  }

  return { action: 'ignored' }
}

export function validateWebhookSecret(
  headerSecret: string | null
): boolean {
  const secret = process.env.ASAAS_WEBHOOK_SECRET
  if (!secret) return true // sem secret configurado, aceita tudo (dev)
  return headerSecret === secret
}
