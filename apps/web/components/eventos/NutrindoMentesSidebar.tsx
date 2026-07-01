'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Zap, Star, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLANS = [
  {
    id: 'mensal',
    label: 'Mensal',
    Icon: Zap,
    originalPrice: 'R$29,90',
    price: 'R$19,90',
    period: 'por mês',
    perMonth: null,
    badge: null,
    badgeColor: null,
    description: 'Assinatura mensal com acesso a todos os recursos da comunidade.',
    url: 'https://pay.hotmart.com/Y105616197L?off=cncbocoe',
    highlight: false,
  },
  {
    id: 'semestral',
    label: 'Semestral',
    Icon: Star,
    originalPrice: 'R$159,90',
    price: 'R$99,90',
    period: 'por 6 meses',
    perMonth: 'R$16,65/mês',
    badge: 'POPULAR',
    badgeColor: 'bg-amber-400 text-amber-900',
    description: 'Pague uma vez e tenha 6 meses de acesso completo.',
    url: 'https://pay.hotmart.com/Y105616197L?off=lz9g9vv1',
    highlight: true,
  },
  {
    id: 'anual',
    label: 'Anual',
    Icon: Crown,
    originalPrice: 'R$299,90',
    price: 'R$179,90',
    period: 'por ano',
    perMonth: 'R$14,99/mês',
    badge: 'MELHOR VALOR',
    badgeColor: 'bg-primary-500 text-white',
    description: 'O melhor custo-benefício para quem quer aprender o ano todo.',
    url: 'https://pay.hotmart.com/Y105616197L?off=ekwfw0mz',
    highlight: false,
  },
]

const INCLUDES = [
  'Aulas ao vivo semanais',
  'Discussão de artigos e diretrizes',
  'Materiais de apoio e resumos práticos',
  'Sugestões de livros e conteúdos',
  'Certificados de participação',
  'Comunidade exclusiva de networking',
]

export function NutrindoMentesSidebar() {
  const [active, setActive] = useState('semestral')
  const plan = PLANS.find((p) => p.id === active)!

  return (
    <div className="sticky top-24 space-y-6">
      {/* Card de Assinatura */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {/* Tabs */}
        <div className="grid grid-cols-3 border-b">
          {PLANS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={cn(
                'relative flex flex-col items-center gap-0.5 px-2 py-3 text-xs font-semibold transition-colors',
                active === p.id
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700',
              )}
            >
              {p.badge && (
                <span
                  className={cn(
                    'absolute -top-px right-0 rounded-bl-md px-1.5 py-px text-[9px] font-bold uppercase tracking-wide',
                    p.badgeColor,
                  )}
                >
                  {p.badge}
                </span>
              )}
              <p.Icon
                className={cn(
                  'h-4 w-4',
                  active === p.id ? 'text-primary-500' : 'text-neutral-400',
                )}
              />
              {p.label}
              {active === p.id && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary-500" />
              )}
            </button>
          ))}
        </div>

        {/* Conteúdo do plano */}
        <div className="p-6">
          {/* Preço */}
          <div
            className={cn(
              'mb-4 rounded-lg px-4 py-5 text-center transition-colors',
              plan.highlight ? 'bg-amber-50' : 'bg-primary-50',
            )}
          >
            <p className="text-sm font-medium text-neutral-500">
              De{' '}
              <span className="line-through">{plan.originalPrice}</span>{' '}
              {plan.period}
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-600">Por</p>
            <p
              className={cn(
                'font-display text-4xl font-bold',
                plan.highlight ? 'text-amber-600' : 'text-primary-600',
              )}
            >
              {plan.price}
            </p>
            {plan.perMonth ? (
              <p
                className={cn(
                  'mt-1 text-xs font-semibold',
                  plan.highlight ? 'text-amber-500' : 'text-primary-500',
                )}
              >
                equivale a {plan.perMonth}
              </p>
            ) : (
              <p className="mt-1 text-xs text-primary-500">*no primeiro mês</p>
            )}
          </div>

          <Button
            size="lg"
            className={cn(
              'w-full font-semibold',
              plan.highlight &&
                'bg-amber-500 text-white hover:bg-amber-600',
            )}
            asChild
          >
            <a href={plan.url} target="_blank" rel="noopener noreferrer">
              Quero Aproveitar
            </a>
          </Button>

          <p className="mt-3 text-center text-xs text-neutral-400">
            {plan.description}
          </p>

          <div className="mt-4 border-t pt-4">
            <Button variant="outline" className="w-full" asChild>
              <a
                href="https://wa.me/5521980082458?text=Ol%C3%A1%21+Tenho+d%C3%BAvidas+sobre+a+comunidade+Nutrindo+Mentes."
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a Equipe
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Card de Detalhes */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">O que está incluso:</h3>
        <div className="space-y-3 text-sm">
          {INCLUDES.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-primary-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
