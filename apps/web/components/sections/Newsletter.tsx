'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EmailInput } from '@/components/ui/email-input'

interface NewsletterProps {
  variant?: 'default' | 'compact'
  className?: string
}

export function Newsletter({ variant = 'default', className = '' }: NewsletterProps) {
  const [email, setEmail] = useState('')
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
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Inscrição realizada com sucesso!',
        })
        setEmail('')
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Erro ao realizar inscrição.',
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

  if (variant === 'compact') {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onValidationChange={setIsEmailValid}
              placeholder="seu@email.com"
              className="flex-1"
              required
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Assinar'}
            </Button>
          </div>

          {submitStatus.type && (
            <p
              className={`text-xs ${
                submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {submitStatus.message}
            </p>
          )}
        </form>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 text-white ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="mb-2 text-2xl font-bold md:text-3xl">
          Receba conteúdo exclusivo
        </h3>
        <p className="mb-6 text-white/90">
          Cadastre-se e receba dicas, novidades e conteúdos sobre nutrição
          diretamente no seu email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onValidationChange={setIsEmailValid}
              placeholder="seu@email.com"
              className="flex-1 border-0 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus-visible:ring-white"
              required
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={isSubmitting}
              className="sm:w-auto"
            >
              {isSubmitting ? 'Enviando...' : 'Quero receber'}
            </Button>
          </div>

          {submitStatus.type && (
            <p
              className={`text-sm ${
                submitStatus.type === 'success'
                  ? 'text-white'
                  : 'text-red-100'
              }`}
            >
              {submitStatus.message}
            </p>
          )}

          <p className="text-xs text-white/70">
            Sem spam. Cancele a inscrição a qualquer momento.
          </p>
        </form>
      </div>
    </div>
  )
}
