/**
 * ASAAS API CLIENT
 * Integração com checkout hospedado pelo ASAAS (PCI compliant)
 */

const ASAAS_BASE_URL =
  process.env.ASAAS_ENVIRONMENT === 'sandbox'
    ? 'https://sandbox.asaas.com/api/v3'
    : 'https://www.asaas.com/api/v3'

const ASAAS_CHECKOUT_HOST =
  process.env.ASAAS_ENVIRONMENT === 'sandbox'
    ? 'https://sandbox.asaas.com'
    : 'https://www.asaas.com'

export interface AsaasCheckoutItem {
  name: string
  description: string
  quantity: number
  value: number
  imageBase64?: string
}

export interface AsaasCheckoutRequest {
  billingTypes: ('PIX' | 'CREDIT_CARD' | 'BOLETO')[]
  chargeTypes: ('DETACHED' | 'INSTALLMENT')[]
  minutesToExpire?: number
  maxInstallmentCount?: number
  callback: {
    successUrl: string
    cancelUrl: string
    expiredUrl: string
  }
  items: AsaasCheckoutItem[]
}

export interface AsaasCheckoutResponse {
  id: string
  status: string
  checkoutUrl: string
}

async function asaasRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = process.env.ASAAS_API_KEY
  if (!apiKey) throw new Error('ASAAS_API_KEY não configurado')

  const res = await fetch(`${ASAAS_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      access_token: apiKey,
      ...options.headers,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    const message = data?.errors?.[0]?.description ?? `Erro ASAAS: ${res.status}`
    throw new Error(message)
  }

  return data as T
}

export async function createCheckout(
  payload: AsaasCheckoutRequest
): Promise<AsaasCheckoutResponse> {
  const data = await asaasRequest<{ id: string; status: string }>('/checkout', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return {
    id: data.id,
    status: data.status,
    checkoutUrl: `${ASAAS_CHECKOUT_HOST}/c/${data.id}`,
  }
}
