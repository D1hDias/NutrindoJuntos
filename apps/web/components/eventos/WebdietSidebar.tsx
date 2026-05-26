import { Button } from '@/components/ui/button'
import { CreditCard, Zap } from 'lucide-react'

const INCLUDES = [
  'Imersão completa (8h de conteúdo)',
  'Coffee break',
  'Certificado de participação',
  'Acesso ao material do dia',
  'Suporte da equipe Nutrindo Juntos',
]

export function WebdietSidebar() {
  return (
    <div className="sticky top-24 space-y-6">
        {/* Card de Inscrição */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Vendas Encerradas
          </p>

          <div className="mb-4 rounded-lg bg-neutral-100 px-4 py-3 text-center">
            <span className="text-sm font-medium text-neutral-500">
              As vagas para esta edição foram esgotadas.
            </span>
          </div>

          <button
            disabled
            className="mb-6 flex w-full cursor-not-allowed items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-400"
          >
            <Zap className="h-4 w-4 shrink-0" />
            Pix com desconto — indisponível
          </button>

          <Button size="lg" className="w-full cursor-not-allowed font-semibold opacity-50" disabled>
            Vagas Esgotadas
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
  )
}
