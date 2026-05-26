'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error('Global error boundary caught:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <Alert variant="destructive">
          <AlertTitle className="text-2xl font-bold mb-4">
            Algo deu errado!
          </AlertTitle>
          <AlertDescription className="space-y-4">
            <p className="text-base">
              Desculpe, ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div className="rounded-md bg-red-50 p-4 mt-4">
                <p className="font-mono text-xs text-red-800 break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="font-mono text-xs text-red-600 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <Button
                onClick={reset}
                variant="default"
              >
                Tentar novamente
              </Button>
              <Button
                onClick={() => (window.location.href = '/')}
                variant="outline"
              >
                Voltar para home
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
