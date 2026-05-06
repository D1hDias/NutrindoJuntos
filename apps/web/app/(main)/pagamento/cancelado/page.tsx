import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagamento cancelado | Nutrindo Juntos',
  robots: { index: false },
}

export default function PagamentoCanceladoPage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <XCircle className="h-16 w-16 text-red-500" />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Pagamento cancelado</h1>
        <p className="text-muted-foreground max-w-md">
          Seu pagamento foi cancelado. Nenhum valor foi cobrado.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/">Início</Link>
        </Button>
        <Button asChild>
          <Link href="/cursos">Ver cursos</Link>
        </Button>
      </div>
    </main>
  )
}
