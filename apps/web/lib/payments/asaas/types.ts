/**
 * ASAAS TYPES
 * Tipos específicos da API ASAAS
 */

export type AsaasPaymentStatus =
  | 'PENDING'
  | 'RECEIVED'
  | 'CONFIRMED'
  | 'OVERDUE'
  | 'REFUNDED'
  | 'RECEIVED_IN_CASH'
  | 'REFUND_REQUESTED'
  | 'CHARGEBACK_REQUESTED'
  | 'CHARGEBACK_DISPUTE'
  | 'AWAITING_CHARGEBACK_REVERSAL'
  | 'DUNNING_REQUESTED'
  | 'DUNNING_RECEIVED'
  | 'AWAITING_RISK_ANALYSIS'

export type AsaasBillingType = 'BOLETO' | 'CREDIT_CARD' | 'PIX' | 'DEBIT_CARD'

/**
 * Cliente ASAAS
 */
export interface AsaasCustomer {
  id?: string
  name: string
  email: string
  cpfCnpj: string
  phone: string
  mobilePhone?: string
  postalCode?: string
  address?: string
  addressNumber?: string
  complement?: string
  province?: string
  city?: string
  state?: string
  externalReference?: string
  notificationDisabled?: boolean
  additionalEmails?: string
}

/**
 * Cobrança ASAAS
 */
export interface AsaasPayment {
  id?: string
  customer: string // ID do cliente
  billingType: AsaasBillingType
  value: number
  dueDate: string // YYYY-MM-DD
  description?: string
  externalReference?: string
  installmentCount?: number
  totalValue?: number
  installmentValue?: number
  discount?: {
    value: number
    dueDateLimitDays: number
    type?: 'FIXED' | 'PERCENTAGE'
  }
  interest?: {
    value: number
  }
  fine?: {
    value: number
  }
  postalService?: boolean
  split?: AsaasSplit[]
}

/**
 * Split de pagamento (comissões)
 */
export interface AsaasSplit {
  walletId: string
  fixedValue?: number
  percentualValue?: number
  totalFixedValue?: number
}

/**
 * Cartão de crédito
 */
export interface AsaasCreditCard {
  holderName: string
  number: string
  expiryMonth: string
  expiryYear: string
  ccv: string
}

/**
 * Informações de cartão para tokenização
 */
export interface AsaasCreditCardHolderInfo {
  name: string
  email: string
  cpfCnpj: string
  postalCode: string
  addressNumber: string
  addressComplement?: string
  phone: string
  mobilePhone?: string
}

/**
 * Resposta da API ASAAS
 */
export interface AsaasResponse<T = any> {
  object?: string
  hasMore?: boolean
  totalCount?: number
  limit?: number
  offset?: number
  data?: T[]
  // Dados diretos
  id?: string
  dateCreated?: string
  customer?: string
  status?: AsaasPaymentStatus
  value?: number
  netValue?: number
  billingType?: AsaasBillingType
  confirmedDate?: string
  paymentDate?: string
  clientPaymentDate?: string
  installmentNumber?: number
  description?: string
  externalReference?: string
  invoiceUrl?: string
  bankSlipUrl?: string
  invoiceNumber?: string
  // PIX
  pixTransaction?: string
  pixQrCodeId?: string
  // Errors
  errors?: Array<{
    code: string
    description: string
  }>
}

/**
 * Webhook ASAAS
 */
export interface AsaasWebhookEvent {
  event: string
  payment: {
    id: string
    customer: string
    status: AsaasPaymentStatus
    value: number
    netValue: number
    originalValue?: number
    interestValue?: number
    description: string
    billingType: AsaasBillingType
    confirmedDate?: string
    paymentDate?: string
    clientPaymentDate?: string
    installmentNumber?: number
    externalReference?: string
    originalDueDate: string
    dueDate: string
    dateCreated: string
  }
}

/**
 * Configuração do cliente ASAAS
 */
export interface AsaasConfig {
  apiKey: string
  walletId?: string
  environment?: 'production' | 'sandbox'
  timeout?: number
}
