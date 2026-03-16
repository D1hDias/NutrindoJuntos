import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-6xl font-bold text-primary-600">404</h1>
      <h2 className="mb-4 text-3xl font-bold">Página não encontrada</h2>
      <p className="mb-8 text-lg text-muted-foreground">
        Desculpe, a página que você está procurando não existe.
      </p>
      <div className="flex gap-4">
        <Button size="lg" asChild>
          <Link href="/">Voltar para Início</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/blog">Ver Blog</Link>
        </Button>
      </div>
    </main>
  )
}
