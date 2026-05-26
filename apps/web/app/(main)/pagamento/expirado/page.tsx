import Link from 'next/link'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Link expirado | Nutrindo Juntos',
  robots: { index: false },
}

export default function PagamentoExpiradoPage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <Clock className="h-16 w-16 text-yellow-500" />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Link expirado</h1>
        <p className="text-muted-foreground max-w-md">
          O link de pagamento expirou. Clique abaixo para gerar um novo.
        </p>
      </div>
      <Button asChild>
        <Link href="/cursos">Ver cursos</Link>
      </Button>
    </main>
  )
}
