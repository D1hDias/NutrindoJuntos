/**
 * ASAAS UTILS
 */

import type { Product } from '@/lib/payments/common/types'
import type { AsaasCheckoutItem } from './client'

export function productToCheckoutItem(product: Product): AsaasCheckoutItem {
  return {
    name: product.name,
    description: product.description,
    quantity: 1,
    value: product.price,
  }
}

export function getMaxInstallments(): number {
  const env = process.env.ASAAS_MAX_INSTALLMENTS
  const parsed = env ? parseInt(env, 10) : 12
  return isNaN(parsed) ? 12 : parsed
}

export function buildCallbackUrls(orderId: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return {
    successUrl: `${base}/pagamento/sucesso?orderId=${orderId}`,
    cancelUrl: `${base}/pagamento/cancelado?orderId=${orderId}`,
    expiredUrl: `${base}/pagamento/expirado?orderId=${orderId}`,
  }
}
