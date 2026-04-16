'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error('Global error caught:', error)
  }, [error])

  return (
    <html lang="pt-BR">
      <body>
        <div style={{ padding: '2rem', maxWidth: '42rem', margin: '0 auto' }}>
          <div
            style={{
              border: '1px solid #ef4444',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              backgroundColor: '#fef2f2',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#991b1b' }}>
              Erro Crítico
            </h2>
            <p style={{ marginBottom: '1rem', color: '#7f1d1d' }}>
              Desculpe, ocorreu um erro crítico no aplicativo. Nossa equipe foi notificada.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  padding: '1rem',
                  borderRadius: '0.375rem',
                  marginTop: '1rem',
                }}
              >
                <pre style={{ fontSize: '0.75rem', color: '#7f1d1d', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {error.message}
                </pre>
                {error.digest && (
                  <p style={{ fontSize: '0.75rem', color: '#991b1b', marginTop: '0.5rem' }}>
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <button
                onClick={reset}
                style={{
                  backgroundColor: '#16a34a',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Tentar novamente
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                style={{
                  backgroundColor: 'white',
                  color: '#374151',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db',
                  cursor: 'pointer',
                }}
              >
                Voltar para home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
