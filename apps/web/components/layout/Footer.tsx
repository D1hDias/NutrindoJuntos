'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone, Clock, Instagram, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: 'Email obrigatório',
        description: 'Por favor, insira seu email.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: '',
          consent: true,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar na newsletter')
      }

      toast({
        title: 'Inscrição realizada!',
        description: 'Você receberá nossas novidades em breve.',
      })

      setEmail('')
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar',
        description: error instanceof Error ? error.message : 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#4A4A4A] text-white overflow-hidden">
      {/* Background Shape Image - Optimized with Next.js Image + Lazy Loading */}
      <div className="absolute inset-0 pointer-events-none h-[333px]">
        <Image
          src="/images/shapes/site-footer-shape-bg.webp"
          alt=""
          fill
          loading="lazy"
          quality={75}
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
            mixBlendMode: 'luminosity',
            opacity: 0.56,
          }}
        />
      </div>

      {/* Logo e Contact Button */}
      <div className="relative border-b border-white/10">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            {/* Logo + Descrição */}
            <div className="text-center md:text-left">
              <Link href="/" className="inline-block mb-4">
                <span className="font-display text-3xl lg:text-4xl font-bold text-white">
                  NUTRINDO <span className="text-primary-500">JUNTOS</span>
                </span>
              </Link>
              <p className="max-w-md text-base text-[#9DA6B5] leading-[28px]">
              Guiando nutricionistas da graduação à prática profissional, com formação aplicada, ciência e direção de carreira.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative border-b border-white/10 py-[100px]">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
            {/* Left Column - Contact Info + Social */}
            <div className="lg:col-span-6">
              {/* Contact Information */}
              <ul className="space-y-5 mb-12">
                {/* Email */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-4 w-4 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-white mb-1">Email:</p>
                    <a
                      href="mailto:contato@nutrindojuntos.com.br"
                      className="text-base text-[#9DA6B5] leading-[26px] hover:text-white transition-all duration-500"
                    >
                      contato@nutrindojuntos.com.br
                    </a>
                  </div>
                </li>

                {/* Location */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-4 w-4 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-white mb-1">Localização:</p>
                    <p className="text-base text-[#9DA6B5] leading-[26px]">
                      Rio de Janeiro, RJ<br />Brasil
                    </p>
                  </div>
                </li>

                {/* Phone */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Phone className="h-4 w-4 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-white mb-1">Telefone:</p>
                    <a
                      href="tel:+5511999999999"
                      className="text-base text-[#9DA6B5] leading-[26px] hover:text-white transition-all duration-500"
                    >
                      +55 (21) 98008-2458
                    </a>
                  </div>
                </li>

                {/* Working Hours */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Clock className="h-4 w-4 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-white mb-1">Atendimento:</p>
                    <p className="text-base text-[#9DA6B5] leading-[26px]">
                      Segunda - Sexta<br />09:00 - 18:00
                    </p>
                  </div>
                </li>
              </ul>

              {/* Social Media */}
              <div>
                <h4 className="text-xl font-medium text-white mb-7">Siga-nos:</h4>
                <div className="flex gap-[10px]">
                  {[
                    { href: 'https://www.instagram.com.br/nutrindo.juntos', icon: Instagram, label: 'Instagram' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-white/10 text-white hover:bg-primary-500 hover:border-primary-500 transition-all duration-500"
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Links + Newsletter */}
            <div className="lg:col-span-6 lg:ml-16">
              <div className="grid gap-12 sm:grid-cols-2 mb-12">
                {/* Quick Links */}
                <div>
                  <h4 className="text-xl font-medium text-white leading-[30px] mb-7">Links Rápidos</h4>
                  <ul className="space-y-[11px]">
                    {[
                      { href: '/', label: 'Home' },
                      { href: '/sobre', label: 'Sobre Nós' },
                      { href: '/cursos', label: 'Cursos' },
                      { href: '/blog', label: 'Blog' },
                      { href: '/contato', label: 'Contato' },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="group relative text-base text-[#9DA6B5] leading-[26px] hover:text-white hover:pl-[5px] transition-all duration-500 inline-block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-[2px] before:bg-white before:transition-all before:duration-500 hover:before:w-[5px]"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Useful Links */}
                <div>
                  <h4 className="text-xl font-medium text-white leading-[30px] mb-7">Links Úteis</h4>
                  <ul className="space-y-[11px]">
                    {[
                      { href: '/mentoria', label: 'Mentoria' },
                      { href: '/equipe', label: 'Nossa Equipe' },
                      { href: '/privacidade', label: 'Política de Privacidade' },
                      { href: '/termos', label: 'Termos de Uso' },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="group relative text-base text-[#9DA6B5] leading-[26px] hover:text-white hover:pl-[5px] transition-all duration-500 inline-block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-[2px] before:bg-white before:transition-all before:duration-500 hover:before:w-[5px]"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-xl font-medium text-white leading-[30px] mb-7">Newsletter</h4>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="flex-1 h-14 px-6 bg-white/5 border border-white/10 text-white placeholder:text-[#9DA6B5] focus-visible:ring-primary-500 focus-visible:border-primary-500 transition-all duration-500"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-14 px-6 bg-primary-500 hover:bg-primary-600 text-white font-medium transition-all duration-500"
                    >
                      {isSubmitting ? 'Enviando...' : (
                        <>
                          <ArrowRight className="h-4 w-4" />
                          <span className="ml-2">Assinar</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-[#9DA6B5] leading-[26px]">
                    Receba conteúdos exclusivos sobre nutrição diretamente no seu email.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Copyright */}
      <div className="relative py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-base text-[#9DA6B5] leading-[26px]">
              Copyright © {currentYear}{' '}
              <Link href="/" className="font-medium text-white hover:text-primary-500 transition-all duration-500">
                NUTRINDO JUNTOS
              </Link>
              . Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
