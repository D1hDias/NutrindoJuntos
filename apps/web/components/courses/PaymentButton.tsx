'use client'

import { Button } from '@/components/ui/button'
import { ExternalLink, CreditCard } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

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
    paymentLink?: string
    isLive?: boolean
  }
}

export function PaymentOptions({ course }: PaymentOptionsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-neutral-600">Investimento</span>
        <span className="text-2xl font-bold text-primary-600">
          {course.price === 0 ? 'Gratuito' : formatPrice(course.price)}
        </span>
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