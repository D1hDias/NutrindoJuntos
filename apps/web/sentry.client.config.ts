/**
 * Sentry Client-Side Configuration
 *
 * Este arquivo inicializa o Sentry para o lado do cliente (browser).
 * É carregado automaticamente pelo @sentry/nextjs.
 */

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV,

  // Adiciona headers de request e IP para usuários
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Performance Monitoring
  // Captura 100% das transações em desenvolvimento
  // Em produção, ajustar para valor menor (ex: 0.1 = 10%)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session Replay
  // Captura 10% de todas as sessões em produção
  // Captura 100% das sessões com erros
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysOnErrorSampleRate: 1.0,

  // Integrations
  integrations: [
    // Session Replay - apenas para client-side
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),

    // User Feedback
    Sentry.feedbackIntegration({
      colorScheme: 'system',
      showBranding: false,
    }),
  ],

  // Filtrar erros conhecidos e não-críticos
  beforeSend(event, hint) {
    // Ignorar erros de extensões de browser
    if (event.exception) {
      const firstException = event.exception.values?.[0]
      if (firstException?.value?.includes('extension')) {
        return null
      }
    }

    // Ignorar erros de rede em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      const error = hint.originalException
      if (error instanceof Error && error.message.includes('fetch')) {
        return null
      }
    }

    return event
  },

  // Ignorar determinados erros
  ignoreErrors: [
    // Erros de browser/extensões
    'Non-Error promise rejection captured',
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    // Erros de rede comuns
    'NetworkError',
    'Failed to fetch',
    'Load failed',
  ],

  // Release tracking (configurado via CI/CD)
  // release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
})
