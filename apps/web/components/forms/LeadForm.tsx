'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EmailInput } from '@/components/ui/email-input'
import { PhoneInput } from '@/components/ui/phone-input'

export type LeadFormType = 'cursos' | 'mentoria'

interface LeadFormProps {
  type: LeadFormType
  cursoSlug?: string
  cursoTitle?: string
}

export function LeadForm({ type, cursoSlug, cursoTitle }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ...(type === 'cursos' && {
      curso: cursoTitle || '',
      message: '',
    }),
    ...(type === 'mentoria' && {
      experiencia: '',
      objetivos: '',
    }),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const endpoint = type === 'cursos' ? '/api/leads/cursos' : '/api/leads/mentoria'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Solicitação enviada com sucesso!',
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          ...(type === 'cursos' && {
            curso: cursoTitle || '',
            message: '',
          }),
          ...(type === 'mentoria' && {
            experiencia: '',
            objetivos: '',
          }),
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Erro ao enviar solicitação.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Erro de conexão. Tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Nome completo *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          E-mail *
        </label>
        <EmailInput
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onValidationChange={setIsEmailValid}
          placeholder="seu@email.com"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          Telefone/WhatsApp
        </label>
        <PhoneInput
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(00) 00000-0000"
          disabled={isSubmitting}
        />
      </div>

      {/* Curso-specific fields */}
      {type === 'cursos' && (
        <>
          {!cursoTitle && (
            <div>
              <label htmlFor="curso" className="mb-2 block text-sm font-medium">
                Curso de interesse
              </label>
              <input
                type="text"
                id="curso"
                name="curso"
                value={(formData as any).curso}
                onChange={handleChange}
                placeholder="Ex: Nutrição Esportiva, Nutrição Clínica..."
                className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                disabled={isSubmitting}
              />
            </div>
          )}

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={(formData as any).message}
              onChange={handleChange}
              placeholder="Conte-nos um pouco sobre suas expectativas..."
              className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              disabled={isSubmitting}
            />
          </div>
        </>
      )}

      {/* Mentoria-specific fields */}
      {type === 'mentoria' && (
        <>
          <div>
            <label htmlFor="experiencia" className="mb-2 block text-sm font-medium">
              Nível de experiência
            </label>
            <select
              id="experiencia"
              name="experiencia"
              value={(formData as any).experiencia}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              disabled={isSubmitting}
            >
              <option value="">Selecione...</option>
              <option value="Estudante">Estudante de Nutrição</option>
              <option value="Recém-formado">Recém-formado (até 2 anos)</option>
              <option value="Profissional">Profissional (2-5 anos)</option>
              <option value="Experiente">Experiente (5+ anos)</option>
            </select>
          </div>

          <div>
            <label htmlFor="objetivos" className="mb-2 block text-sm font-medium">
              Objetivos com a mentoria
            </label>
            <textarea
              id="objetivos"
              name="objetivos"
              rows={4}
              value={(formData as any).objetivos}
              onChange={handleChange}
              placeholder="Quais são seus principais objetivos profissionais? O que você espera alcançar com a mentoria?"
              className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              disabled={isSubmitting}
            />
          </div>
        </>
      )}

      {/* Status Messages */}
      {submitStatus.type && (
        <div
          className={`rounded-md p-4 ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          <p className="text-sm">{submitStatus.message}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        * Campos obrigatórios
      </p>
    </form>
  )
}
