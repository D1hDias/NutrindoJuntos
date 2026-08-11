'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ExternalLink, CreditCard, Check, PlayCircle, Radio } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

interface PaymentButtonProps {
  paymentLink?: string
  courseSlug: string
  courseTitle: string
  price: number
  isLive?: boolean
  disabled?: boolean
  variant?: 'default' | 'outline'
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

export function PaymentButton({
  paymentLink,
  courseSlug,
  courseTitle,
  price,
  isLive = false,
  disabled = false,
  variant = 'default',
  size = 'default',
  className = ''
}: PaymentButtonProps) {
  
  const handlePaymentClick = () => {
    // Track conversion event
    trackEvent('course_payment_click', {
      course_slug: courseSlug,
      course_title: courseTitle,
      price: price,
      payment_provider: getPaymentProvider(paymentLink)
    })

    // Redirect to payment link
    if (paymentLink) {
      window.open(paymentLink, '_blank', 'noopener,noreferrer')
    }
  }

  const getPaymentProvider = (link?: string): string => {
    if (!link) return 'unknown'
    if (link.includes('hotmart')) return 'hotmart'
    if (link.includes('kiwify')) return 'kiwify'
    if (link.includes('asaas')) return 'asaas'
    return 'custom'
  }

  const getButtonText = (): string => {
    if (disabled) return 'Indisponível'
    if (!isLive) return 'Em Breve'
    if (price === 0) return 'Acessar Gratuitamente'
    return 'Quero me Inscrever'
  }

  const isDisabled = disabled || !isLive || !paymentLink

  return (
    <Button
      onClick={handlePaymentClick}
      disabled={isDisabled}
      variant={variant}
      size={size}
      className={`${className} ${!isDisabled ? 'bg-primary-500 hover:bg-primary-600 text-white' : ''}`}
    >
      {!isDisabled && (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          {getButtonText()}
          <ExternalLink className="ml-2 h-4 w-4" />
        </>
      )}
      {isDisabled && getButtonText()}
    </Button>
  )
}

// Componente para exibir opções de pagamento
interface PaymentOptionsProps {
  course: {
    slug: string
    title: string
    price: number
    installments?: {
      count: number
      value: number
    }
    paymentLink?: string
    isLive?: boolean
  }
}

export function PaymentOptions({ course }: PaymentOptionsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Preço Parcelado - DESTAQUE */}
      {course.installments && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-600">Investimento</p>
          <div className="rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 p-4 border-2 border-primary-200">
            <div className="text-center">
              <p className="text-sm font-semibold text-primary-700 mb-1">
                Parcelado no cartão
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-primary-600">
                  {course.installments.count}x
                </span>
                <span className="text-3xl font-bold text-primary-600">
                  {formatPrice(course.installments.value)}
                </span>
              </div>
              <p className="text-xs text-primary-600 mt-1">
                sem juros
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preço à Vista - Secundário */}
      <div className="text-center">
        <p className="text-xs text-neutral-500 mb-1">ou à vista por</p>
        <p className="text-xl font-semibold text-neutral-700">
          {course.price === 0 ? 'Gratuito' : formatPrice(course.price)}
        </p>
      </div>

      <PaymentButton
        paymentLink={course.paymentLink}
        courseSlug={course.slug}
        courseTitle={course.title}
        price={course.price}
        isLive={course.isLive}
        size="lg"
        className="w-full"
      />

      {course.price > 0 && (
        <div className="text-center">
          <p className="text-xs text-neutral-500">
            Pagamento seguro processado por plataforma externa
          </p>
        </div>
      )}
    </div>
  )
}

// Modalidades do curso (Gravado x Ao Vivo) — exibidas como abas na coluna de preço
const MODALITIES = [
  {
    id: 'gravado',
    label: 'Gravado',
    title: 'NCA Gravado',
    badge: '100% GRAVADO',
    Icon: PlayCircle,
    features: [
      'Aulas 100% gravadas',
      'Acesso por 1 ano',
      'Estude no seu ritmo',
      'Materiais complementares',
      'Certificado de conclusão',
    ],
    headerClass: 'bg-primary-600',
    badgeClass: 'bg-primary-100 text-primary-700',
    checkClass: 'text-primary-500',
    priceClass: 'text-primary-600',
    tabActiveClass: 'bg-primary-50 text-primary-600',
    tabIconClass: 'text-primary-500',
    tabBarClass: 'bg-primary-500',
    partnerClass: 'text-primary-600',
  },
  {
    id: 'ao-vivo',
    label: 'Ao Vivo',
    title: 'NCA Ao Vivo',
    badge: 'AO VIVO COM ESPECIALISTAS',
    Icon: Radio,
    features: [
      'Tudo do NCA Gravado',
      'Aulas ao vivo com especialistas',
      'Discussão de casos clínicos',
      'Encontros para dúvidas',
      'Materiais extras e exclusivos',
    ],
    headerClass: 'bg-amber-500',
    badgeClass: 'bg-amber-100 text-amber-800',
    checkClass: 'text-amber-500',
    priceClass: 'text-amber-600',
    tabActiveClass: 'bg-amber-50 text-amber-600',
    tabIconClass: 'text-amber-500',
    tabBarClass: 'bg-amber-500',
    partnerClass: 'text-amber-700',
  },
] as const

const WAITLIST_WHATSAPP =
  'https://wa.me/5521980082458?text=' +
  encodeURIComponent(
    'Olá! Quero entrar na lista de espera do NCA Ao Vivo e ser avisado em primeira mão.',
  )

interface CourseModalitiesProps {
  course: {
    slug: string
    title: string
    price: number
    installments?: {
      count: number
      value: number
    }
    paymentLink?: string
  }
}

export function CourseModalities({ course }: CourseModalitiesProps) {
  const [active, setActive] = useState<string>('gravado')
  const modality = MODALITIES.find((m) => m.id === active)!

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)

  const handleCheckoutClick = () => {
    trackEvent('course_payment_click', {
      course_slug: course.slug,
      course_title: course.title,
      price: course.price,
      modality: 'gravado',
      payment_provider: 'hotmart',
    })
  }

  const handleWaitlistClick = () => {
    trackEvent('course_waitlist_click', {
      course_slug: course.slug,
      course_title: course.title,
      modality: 'ao-vivo',
    })
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-base font-bold text-graphite">
          Escolha a modalidade ideal para você
        </h3>
        <p className="mt-1 text-xs text-neutral-500">
          Dois formatos completos para você aprender do seu jeito.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border shadow-sm">
        {/* Abas */}
        <div className="grid grid-cols-2 border-b">
          {MODALITIES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActive(m.id)}
              aria-pressed={active === m.id}
              className={cn(
                'relative flex items-center justify-center gap-1.5 px-2 py-3 text-xs font-semibold transition-colors',
                active === m.id
                  ? m.tabActiveClass
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700',
              )}
            >
              <m.Icon
                className={cn(
                  'h-4 w-4',
                  active === m.id ? m.tabIconClass : 'text-neutral-400',
                )}
              />
              {m.label}
              {active === m.id && (
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-0.5 w-full rounded-full',
                    m.tabBarClass,
                  )}
                />
              )}
            </button>
          ))}
        </div>

        {/* Cabeçalho da modalidade */}
        <div className={cn('px-4 py-3 text-center', modality.headerClass)}>
          <p className="text-base font-bold uppercase tracking-wide text-white">
            {modality.title}
          </p>
        </div>

        <div className="space-y-4 p-5">
          <div className="text-center">
            <span
              className={cn(
                'inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide',
                modality.badgeClass,
              )}
            >
              {modality.badge}
            </span>
          </div>

          <ul className="space-y-2">
            {modality.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-neutral-700">
                <Check
                  className={cn('mt-0.5 h-4 w-4 flex-shrink-0', modality.checkClass)}
                />
                {feature}
              </li>
            ))}
          </ul>

          <p
            className={cn(
              'border-t pt-4 text-sm font-medium leading-snug',
              modality.partnerClass,
            )}
          >
            Acesso às condições especiais da parceria com a RH+*
          </p>

          {/* Investimento */}
          <div className="text-center">
            <p className="text-sm text-neutral-500">Investimento</p>

            {modality.id === 'gravado' ? (
              <>
                {course.installments && (
                  <p
                    className={cn(
                      'mt-1 font-display text-3xl font-bold',
                      modality.priceClass,
                    )}
                  >
                    {course.installments.count} x de {formatPrice(course.installments.value)}
                  </p>
                )}
                <p className="mt-1 text-sm text-neutral-600">
                  Ou {formatPrice(course.price)} à vista
                </p>
              </>
            ) : (
              <>
                <p
                  className={cn(
                    'mt-1 font-display text-3xl font-bold',
                    modality.priceClass,
                  )}
                >
                  Em breve!
                </p>
                <p className="mt-1 text-sm leading-snug text-neutral-600">
                  Entre na lista de espera e seja avisado em primeira mão.
                </p>
              </>
            )}
          </div>

          {modality.id === 'gravado' ? (
            <Button
              size="lg"
              className="w-full bg-primary-600 text-white hover:bg-primary-700"
              disabled={!course.paymentLink}
              asChild={!!course.paymentLink}
            >
              {course.paymentLink ? (
                <a
                  href={course.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCheckoutClick}
                >
                  Quero o NCA Gravado
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              ) : (
                <span>Quero o NCA Gravado</span>
              )}
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full bg-amber-500 text-white hover:bg-amber-600"
              asChild
            >
              <a
                href={WAITLIST_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWaitlistClick}
              >
                Entrar na Lista de Espera
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>

      <p className="text-[11px] leading-snug text-neutral-500">
        *Serviços da RH+ não inclusos no valor do NCA e contratados separadamente.
      </p>
    </div>
  )
}