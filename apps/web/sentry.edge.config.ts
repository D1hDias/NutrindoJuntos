/**
 * Sentry Edge Runtime Configuration
 *
 * Este arquivo inicializa o Sentry para o Edge Runtime (middleware, edge functions).
 * É carregado via instrumentation.ts quando NEXT_RUNTIME === 'edge'.
 */

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Edge runtime não suporta todas as features
  // Manter configuração mínima

  // Filtrar informações sensíveis
  beforeSend(event) {
    // Remover informações sensíveis de headers
    if (event.request?.headers) {
      delete event.request.headers['authorization']
      delete event.request.headers['cookie']
      delete event.request.headers['x-api-key']
    }

    return event
  },

  // Release tracking
  // release: process.env.SENTRY_RELEASE,
})
