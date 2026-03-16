import { z } from 'zod'

/**
 * Validations Library
 * Centralized Zod schemas for all forms and API routes
 */

// ============================================
// Common Validators
// ============================================

const emailSchema = z
  .string()
  .min(1, 'Email é obrigatório')
  .email('Email inválido')
  .refine(
    (email) => {
      const validTLDs = ['.com', '.com.br', '.br', '.net', '.org', '.edu', '.gov', '.io']
      return validTLDs.some((tld) => email.toLowerCase().endsWith(tld))
    },
    {
      message: 'Domínio inválido. Use .com, .com.br, etc.',
    }
  )

const nameSchema = z
  .string()
  .min(1, 'Nome é obrigatório')
  .min(3, 'Nome deve ter pelo menos 3 caracteres')
  .max(100, 'Nome deve ter no máximo 100 caracteres')
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços')

const phoneSchema = z
  .string()
  .optional()
  .refine(
    (phone) => {
      if (!phone) return true // Optional field
      // Remove formatting and check if has 10 or 11 digits
      const numbers = phone.replace(/\D/g, '')
      return numbers.length === 10 || numbers.length === 11
    },
    {
      message: 'Telefone deve ter 10 ou 11 dígitos. Ex: (11) 98765-4321',
    }
  )

const messageSchema = z
  .string()
  .min(1, 'Mensagem é obrigatória')
  .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
  .max(1000, 'Mensagem deve ter no máximo 1000 caracteres')

// ============================================
// Honeypot Field (Anti-Spam)
// ============================================

/**
 * Honeypot field that should remain empty
 * Bots typically fill all fields, humans leave this hidden field empty
 */
const honeypotSchema = z
  .string()
  .max(0, 'Spam detected')
  .optional()
  .or(z.literal(''))

/**
 * Check if honeypot field was filled (indicates bot)
 */
export function isSpamBot(honeypot: string | undefined): boolean {
  return honeypot !== undefined && honeypot !== ''
}

// ============================================
// Newsletter Schema
// ============================================

export const newsletterSchema = z.object({
  email: emailSchema,
  name: z.string().optional(),
  _honeypot: honeypotSchema,
})

export type NewsletterFormData = z.infer<typeof newsletterSchema>

// ============================================
// Contact Form Schema
// ============================================

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z
    .string()
    .min(1, 'Assunto é obrigatório')
    .min(5, 'Assunto deve ter pelo menos 5 caracteres')
    .max(150, 'Assunto deve ter no máximo 150 caracteres'),
  message: messageSchema,
  _honeypot: honeypotSchema,
})

export type ContactFormData = z.infer<typeof contactSchema>

// ============================================
// Lead Form - Cursos Schema
// ============================================

export const leadCursoSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  curso: z.string().optional(),
  message: z.string().optional().or(z.literal('')),
  _honeypot: honeypotSchema,
})

export type LeadCursoFormData = z.infer<typeof leadCursoSchema>

// ============================================
// Lead Form - Mentoria Schema
// ============================================

export const leadMentoriaSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  experiencia: z.enum(
    ['', 'Estudante', 'Recém-formado', 'Profissional', 'Experiente'],
    {
      errorMap: () => ({ message: 'Selecione um nível de experiência válido' }),
    }
  ).optional(),
  objetivos: z.string().optional().or(z.literal('')),
  _honeypot: honeypotSchema,
})

export type LeadMentoriaFormData = z.infer<typeof leadMentoriaSchema>

// ============================================
// Helper Functions
// ============================================

/**
 * Format validation errors for display
 */
export function formatZodError(error: z.ZodError): Record<string, string> {
  const formatted: Record<string, string> = {}

  error.errors.forEach((err) => {
    const path = err.path.join('.')
    formatted[path] = err.message
  })

  return formatted
}

/**
 * Validate data and return either success or formatted errors
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  return { success: false, errors: formatZodError(result.error) }
}
