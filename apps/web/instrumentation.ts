/**
 * Next.js Instrumentation Hook
 *
 * Este arquivo é chamado uma vez quando o servidor Next.js inicia.
 * É usado para inicializar o Sentry e outros serviços de observabilidade.
 *
 * Docs: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // Apenas inicializar no servidor
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  // Para Edge Runtime (middleware, edge functions)
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}
