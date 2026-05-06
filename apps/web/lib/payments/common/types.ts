/**
 * PAYMENT TYPES - Tipos compartilhados entre gateways
 */

export type PaymentGateway = 'asaas' | 'hotmart'

export type PaymentMethod = 'credit_card' | 'pix' | 'boleto' | 'debit_card'

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'confirmed'
  | 'paid'
  | 'cancelled'
  | 'refunded'
  | 'failed'

export type ProductType = 'course' | 'mentoring' | 'immersion' | 'ebook' | 'subscription'

/**
 * Cliente/Comprador
 */
export interface Customer {
  id?: string
  name: string
  email: string
  cpfCnpj: string
  phone: string
  postalCode?: string
  address?: string
  addressNumber?: string
  complement?: string
  province?: string
  city?: string
  state?: string
}

/**
 * Produto sendo comprado
 */
export interface Product {
  id: string
  name: string
  description: string
  type: ProductType
  price: number
  image?: string
}

/**
 * Dados do pagamento
 */
export interface PaymentData {
  gateway: PaymentGateway
  product: Product
  customer: Customer
  paymentMethod: PaymentMethod
  installments?: number
  amount: number
  description?: string
}

/**
 * Resultado de criação de pagamento
 */
export interface PaymentResult {
  success: boolean
  orderId: string
  paymentId?: string
  externalId?: string
  status: PaymentStatus
  gateway: PaymentGateway
  paymentUrl?: string // URL para finalizar pagamento (PIX, Boleto)
  qrCode?: string // QR Code PIX
  barCode?: string // Código de barras do boleto
  error?: {
    code: string
    message: string
    details?: any
  }
}

/**
 * Webhook Event (genérico)
 */
export interface WebhookEvent {
  id: string
  type: string
  gateway: PaymentGateway
  timestamp: Date
  data: any
}

/**
 * Order (Pedido)
 */
export interface Order {
  id: string
  customerId: string
  productId: string
  productType: ProductType
  gateway: PaymentGateway
  amount: number
  status: PaymentStatus
  paymentMethod?: PaymentMethod
  installments?: number
  externalId?: string
  paidAt?: Date
  createdAt: Date
  updatedAt: Date
}
