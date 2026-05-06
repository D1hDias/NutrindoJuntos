'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PixModal } from '@/components/eventos/PixModal'
import { CreditCard, Zap } from 'lucide-react'

const INCLUDES = [
  'Imersão completa (8h de conteúdo)',
  'Coffee break',
  'Certificado de participação',
  'Acesso ao material do dia',
  'Suporte da equipe Nutrindo Juntos',
]

export function WebdietSidebar() {
  const [pixOpen, setPixOpen] = useState(false)

  return (
    <>
      <div className="sticky top-24 space-y-6">
        {/* Card de Inscrição */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Lote 1 — Vagas Antecipadas
          </p>

          <div className="mb-1 flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-primary-600">
              5x R$ 24,96
            </span>
          </div>
          <p className="mb-4 text-sm text-neutral-500">sem juros no cartão</p>

          <button
            onClick={() => setPixOpen(true)}
            className="mb-6 flex w-full items-center gap-2 rounded-lg bg-primary-50 px-3 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100"
          >
            <Zap className="h-4 w-4 shrink-0" />
            Pix com desconto — clique para ver
          </button>

          <Button size="lg" className="w-full font-semibold" asChild>
            <a
              href="https://www.asaas.com/c/qcpoodhw3kuvedth"
              target="_blank"
              rel="noopener noreferrer"
            >
              Garantir Minha Vaga
            </a>
          </Button>

          <div className="mt-4 border-t pt-4">
            <Button variant="outline" className="w-full" asChild>
              <a
                href="https://wa.me/5521980082458?text=Ol%C3%A1%21+Tenho+d%C3%BAvidas+sobre+a+Imers%C3%A3o+WEBDIET."
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a Equipe
              </a>
            </Button>
          </div>
        </div>

        {/* Card de Detalhes */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">O que está incluso:</h3>
          <div className="space-y-3 text-sm">
            {INCLUDES.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 shrink-0 text-primary-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PixModal isOpen={pixOpen} onClose={() => setPixOpen(false)} />
    </>
  )
}
