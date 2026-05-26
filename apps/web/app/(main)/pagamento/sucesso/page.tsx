import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagamento confirmado | Nutrindo Juntos',
  robots: { index: false },
}

export default function PagamentoSucessoPage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <CheckCircle className="h-16 w-16 text-green-500" />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Pagamento confirmado!</h1>
        <p className="text-muted-foreground max-w-md">
          Obrigado pela sua compra. Você receberá um e-mail com os detalhes em
          breve.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Voltar ao início</Link>
      </Button>
    </main>
  )
}
