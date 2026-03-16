'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { EmailInput } from '@/components/ui/email-input'

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
      const response = await fetch('/api/contact', {
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
          message: data.message || 'Mensagem enviada com sucesso!',
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Erro ao enviar mensagem. Tente novamente.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Erro ao enviar mensagem. Verifique sua conexão e tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-600 md:text-5xl">
          Contato
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Entre em contato conosco. Estamos aqui para ajudar!
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Nome completo
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

          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium">
              Assunto
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
              disabled={isSubmitting}
            />
          </div>

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

          <div className="text-center">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
