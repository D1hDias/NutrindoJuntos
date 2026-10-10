'use client'

import { Button } from '@/components/ui/button'
import { Check, ExternalLink } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const INCLUDES = [
  'Aulas 100% gravadas',
  'Acesso por 1 ano',
  'Estude no seu ritmo',
  'Materiais complementares',
  'Certificado de conclusão',
  'Grupo exclusivo no WhatsApp',
  'Encontros mensais ao vivo',
  'Aulas com especialistas convidados',
]

interface NutriCEOOfferProps {
  course: {
    slug: string
    title: string
    price: number
    originalPrice?: number
    installments?: {
      count: number
      value: number
    }
    paymentLink?: string
  }
}

export function NutriCEOOffer({ course }: NutriCEOOfferProps) {
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
      payment_provider: 'hotmart',
    })
  }

  return (
    <div className="space-y-5">
      {/* O que está incluso */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-500">
          O que está incluso
        </h3>
        <ul className="space-y-2">
          {INCLUDES.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Investimento */}
      <div className="rounded-lg border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-4 text-center">
        <p className="text-sm text-neutral-600">Investimento</p>
        {course.originalPrice && course.originalPrice > course.price && (
          <p className="text-sm text-neutral-500">
            De: <span className="line-through">{formatPrice(course.originalPrice)}</span>
          </p>
        )}
        {course.installments && (
          <p className="mt-1 font-display text-3xl font-bold text-primary-600">
            {course.installments.count} x de {formatPrice(course.installments.value)}
          </p>
        )}
        <p className="mt-1 text-sm text-neutral-600">
          Ou {formatPrice(course.price)} à vista
        </p>
      </div>

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
            Quero ser Nutri CEO
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        ) : (
          <span>Quero ser Nutri CEO</span>
        )}
      </Button>

      <p className="text-center text-xs text-neutral-500">
        Pagamento seguro processado por plataforma externa
      </p>
    </div>
  )
}
