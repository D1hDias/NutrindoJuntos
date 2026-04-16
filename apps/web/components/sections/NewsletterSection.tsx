'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'

interface NewsletterSectionProps {
  title: string
  description: string
  variant?: 'default' | 'equipe'
}

export function NewsletterSection({
  title,
  description,
  variant = 'default'
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot: '' })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Cadastro realizado com sucesso!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.message || 'Erro ao cadastrar. Tente novamente.')
      }
    } catch {
      setStatus('error')
      setMessage('Erro de conexão. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="newsletter-one relative block pb-16 z-1">
      <div className="container mx-auto px-4">
        <div className="newsletter-one__inner relative block rounded-[40px] text-center py-10 px-10 md:py-[60px] md:px-10 overflow-hidden z-1"
             style={{ background: 'linear-gradient(90deg, #4A4A4A 0%, #6B6B6B 50%, #8C8C8C 100%)' }}>
          {/* Background Shape - Optimized with Next.js Image */}
          <div className="newsletter-one__bg-shape absolute inset-0 z-0" style={{ filter: 'grayscale(1) brightness(1.3) opacity(0.5)' }}>
            <Image
              src="/images/shapes/newsletter-one-bg-shape.webp"
              alt=""
              fill
              quality={75}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>

          {/* Decorative Shape 1 - Bottom Left */}
          <div className="newsletter-one__shape-1 absolute left-0 bottom-0 z-0 float-bob-y" style={{ filter: 'grayscale(1) brightness(1.3) opacity(0.5)' }}>
            <Image
              src="/images/shapes/newsletter-one-shape-1.webp"
              alt=""
              width={150}
              height={150}
              className="w-auto opacity-[0.19]"
            />
          </div>

          {/* Decorative Shape 2 - Bottom Right */}
          <div className="newsletter-one__shape-2 absolute right-[50px] bottom-[55px] z-0 img-bounce" style={{ filter: 'grayscale(1) brightness(1.3) opacity(0.5)' }}>
            <Image
              src="/images/shapes/newsletter-one-shape-2.webp"
              alt=""
              width={100}
              height={100}
              className="w-auto"
            />
          </div>

          {/* Title with Stroke Effect */}
          <h2 className="newsletter-one__title relative z-10 text-5xl md:text-[80px] font-semibold leading-tight md:leading-[80px] text-transparent mb-5"
              style={{ WebkitTextStroke: '2px white' }}>
            {title}
          </h2>

          {/* Description */}
          <p className="newsletter-one__text relative z-10 text-lg md:text-xl leading-relaxed text-white mt-[18px] mb-[52px] max-w-3xl mx-auto">
            {description}
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="newsletter-one__contact-form relative z-10 block max-w-[630px] w-full mx-auto"
            aria-label="Formulário de inscrição na newsletter"
          >
            <div className="newsletter-one__contact-input-box relative block">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu melhor e-mail"
                required
                disabled={isSubmitting}
                className="h-[75px] w-full border-none outline-none text-lg text-gray-700 pr-[180px] pl-6 bg-white border-3 border-gray-200 rounded-[40px] disabled:cursor-not-allowed disabled:bg-gray-100"
                aria-label="Email"
              />
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="thm-btn absolute top-[11px] right-[11px] bottom-[11px] bg-green-700 hover:bg-green-800 text-white font-medium px-6 rounded-[40px] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2"
              >
                <span className="icon-angles-right text-sm">→</span>
                {isSubmitting ? 'Enviando...' : 'Quero continuar aprendendo'}
              </button>

              {/* Honeypot (hidden anti-spam) */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px]"
                aria-hidden="true"
              />
            </div>

            {/* Privacy Notice */}
            <p className="mt-2 text-xs text-white/80 text-center">
              Sem spam. Só conteúdo que faz sentido para quem está construindo carreira.
            </p>

            {/* Status Messages */}
            {status === 'success' && (
              <p className="mt-4 text-sm text-white bg-green-800/50 rounded-lg py-2 px-4" role="status">
                {message}
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm text-white bg-red-500/50 rounded-lg py-2 px-4" role="alert">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
