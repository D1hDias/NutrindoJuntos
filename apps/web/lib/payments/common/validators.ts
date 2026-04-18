/**
 * PAYMENT VALIDATORS
 * Schemas Zod para validação de pagamentos
 */

import { z } from 'zod'

/**
 * Validar CPF
 */
export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '')

  if (cpf.length !== 11) return false
  if (/^(\d)\1+$/.test(cpf)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let remainder = 11 - (sum % 11)
  const digit1 = remainder >= 10 ? 0 : remainder

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  remainder = 11 - (sum % 11)
  const digit2 = remainder >= 10 ? 0 : remainder

  return (
    parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2
  )
}

/**
 * Validar CNPJ
 */
export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '')

  if (cnpj.length !== 14) return false
  if (/^(\d)\1+$/.test(cnpj)) return false

  let length = cnpj.length - 2
  let numbers = cnpj.substring(0, length)
  const digits = cnpj.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) return false

  length = length + 1
  numbers = cnpj.substring(0, length)
  sum = 0
  pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  return result === parseInt(digits.charAt(1))
}

/**
 * Schema de Customer
 */
export const customerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  cpfCnpj: z.string().refine(
    (value) => {
      const clean = value.replace(/\D/g, '')
      return clean.length === 11 ? isValidCPF(clean) : isValidCNPJ(clean)
    },
    { message: 'CPF/CNPJ inválido' }
  ),
  phone: z.string().min(10, 'Telefone inválido'),
  postalCode: z.string().optional(),
  address: z.string().optional(),
  addressNumber: z.string().optional(),
  complement: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  state: z.string().length(2, 'Estado deve ter 2 caracteres').optional(),
})

/**
 * Schema de Product
 */
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(['course', 'mentoring', 'ebook', 'subscription']),
  price: z.number().positive('Preço deve ser positivo'),
  image: z.string().optional(),
})

/**
 * Schema de PaymentData
 */
export const paymentDataSchema = z.object({
  gateway: z.enum(['asaas', 'hotmart']),
  product: productSchema,
  customer: customerSchema,
  paymentMethod: z.enum(['credit_card', 'pix', 'boleto', 'debit_card']),
  installments: z.number().int().min(1).max(12).default(1),
  amount: z.number().positive(),
  description: z.string().optional(),
})

/**
 * Schema de Credit Card
 */
export const creditCardSchema = z.object({
  holderName: z.string().min(3, 'Nome do titular inválido'),
  number: z.string().regex(/^\d{13,19}$/, 'Número do cartão inválido'),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Mês inválido'),
  expiryYear: z.string().regex(/^\d{4}$/, 'Ano inválido'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV inválido'),
})

/**
 * Tipos exportados
 */
export type CustomerInput = z.infer<typeof customerSchema>
export type ProductInput = z.infer<typeof productSchema>
export type PaymentDataInput = z.infer<typeof paymentDataSchema>
export type CreditCardInput = z.infer<typeof creditCardSchema>
