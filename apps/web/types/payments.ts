/**
 * TIPOS TYPESCRIPT - SISTEMA DE PAGAMENTOS
 * Fase 2 - Preparado para implementação futura
 * NÃO ATIVAR AINDA - Apenas estrutura preparada
 */

// ==============================================
// STRIPE TYPES
// ==============================================

export interface StripeCheckoutSession {
  id: string
  object: 'checkout.session'
  amount_total: number | null
  amount_subtotal: number | null
  currency: string
  customer_email: string | null
  metadata: {
    curso_id: string
    user_email: string
    [key: string]: string
  }
  payment_intent: string | null
  payment_status: 'paid' | 'unpaid' | 'no_payment_required'
  url: string | null
}

export interface StripePaymentIntent {
  id: string
  object: 'payment_intent'
  amount: number
  currency: string
  status: 'succeeded' | 'processing' | 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'canceled'
  metadata: {
    curso_id: string
    user_email: string
    [key: string]: string
  }
}

export interface StripeWebhookEvent {
  id: string
  object: 'event'
  type: string
  data: {
    object: StripeCheckoutSession | StripePaymentIntent | any
  }
}

// ==============================================
// HOTMART TYPES
// ==============================================

export interface HotmartWebhookEvent {
  event: 'PURCHASE_APPROVED' | 'PURCHASE_CANCELLED' | 'PURCHASE_REFUNDED' | 'PURCHASE_DELAYED'
  data: {
    product: {
      id: number
      name: string
    }
    buyer: {
      email: string
      name: string
    }
    purchase: {
      transaction: string
      status: string
      price: {
        value: number
        currency_code: string
      }
    }
  }
}

// ==============================================
// ORDER TYPES (PAYLOAD CMS)
// ==============================================

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'paid'
  | 'cancelled'
  | 'refunded'
  | 'failed'

export type PaymentGateway =
  | 'stripe'
  | 'hotmart'
  | 'manual'

export type PaymentMethod =
  | 'credit_card'
  | 'pix'
  | 'boleto'
  | 'transfer'

export interface Order {
  id: string
  orderNumber: string // NJ-20251116-001
  user: string | User // Relationship
  curso: string | Curso // Relationship
  status: OrderStatus
  gateway: PaymentGateway
  paymentMethod?: PaymentMethod
  pricing: {
    subtotal: number
    discount: number
    fees: number
    total: number
  }
  gatewayData?: {
    sessionId?: string
    transactionId?: string
    paymentIntentId?: string
    rawData?: Record<string, any>
  }
  customer: {
    nome: string
    email: string
    cpf?: string
    telefone?: string
  }
  billing?: {
    cep?: string
    rua?: string
    numero?: string
    complemento?: string
    bairro?: string
    cidade?: string
    estado?: string
  }
  notes?: string
  accessGranted: boolean
  accessGrantedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// ==============================================
// TRANSACTION TYPES
// ==============================================

export interface Transaction {
  id: string
  order: string | Order // Relationship
  gateway: PaymentGateway
  transactionId: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  gatewayResponse?: Record<string, any>
  createdAt: Date
}

// ==============================================
// CHECKOUT TYPES
// ==============================================

export interface CheckoutRequest {
  cursoId: string
  userEmail: string
  gateway: PaymentGateway
  couponCode?: string
}

export interface CheckoutResponse {
  sessionId?: string
  url: string
  expiresAt: Date
}

// ==============================================
// WEBHOOK PAYLOAD TYPES
// ==============================================

export interface WebhookPayload {
  event: string
  data: any
  signature?: string
  timestamp: number
}

// ==============================================
// API RESPONSE TYPES
// ==============================================

export interface PaymentAPIResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
}

// ==============================================
// HELPER TYPES
// ==============================================

export interface PricingCalculation {
  subtotal: number
  discount: number
  discountPercent: number
  fees: number
  total: number
}

export interface RefundRequest {
  orderId: string
  amount?: number // Opcional para reembolso parcial
  reason: string
}

// ==============================================
// USER & CURSO (simplified for payments)
// ==============================================

export interface User {
  id: string
  nome: string
  email: string
  role: 'aluno' | 'instrutor' | 'admin'
  cursosComprados?: string[] | Curso[]
}

export interface Curso {
  id: string
  titulo: string
  slug: string
  preco: number
  imagemCapa?: {
    url: string
  }
}
