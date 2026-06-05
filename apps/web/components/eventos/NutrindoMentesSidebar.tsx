import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const HOTMART_URL = 'https://pay.hotmart.com/Y105616197L?off=9azhwlh3'

const INCLUDES = [
  'Aulas ao vivo semanais',
  'Discussão de artigos e diretrizes',
  'Materiais de apoio e resumos práticos',
  'Sugestões de livros e conteúdos',
  'Certificados de participação',
  'Comunidade exclusiva de networking',
]

export function NutrindoMentesSidebar() {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Card de Assinatura */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-500">
          Assinatura mensal
        </p>

        {/* Preço */}
        <div className="mb-4 rounded-lg bg-primary-50 px-4 py-5 text-center">
          <p className="text-sm font-medium text-neutral-500">
            De <span className="line-through">R$19,90</span> por mês
          </p>
          <p className="mt-1 text-sm font-medium text-neutral-600">Por</p>
          <p className="font-display text-4xl font-bold text-primary-600">R$9,90</p>
          <p className="mt-1 text-xs text-primary-500">*no primeiro mês</p>
        </div>

        <Button size="lg" className="w-full font-semibold" asChild>
          <a href={HOTMART_URL} target="_blank" rel="noopener noreferrer">
            Quero Aproveitar
          </a>
        </Button>

        <p className="mt-3 text-center text-xs text-neutral-400">
          Assinatura mensal com acesso a todos os recursos da comunidade.
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
