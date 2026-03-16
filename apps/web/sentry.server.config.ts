/**
 * Sentry Server-Side Configuration
 *
 * Este arquivo inicializa o Sentry para o lado do servidor (Node.js).
 * É carregado automaticamente pelo @sentry/nextjs.
 */

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV,

  // Adiciona headers de request e IP para usuários
  sendDefaultPii: true,

  // Performance Monitoring
  // Em produção, capturar apenas uma amostra das transações
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Filtrar informações sensíveis
  beforeSend(event, hint) {
    // Remover informações sensíveis de headers
    if (event.request?.headers) {
      delete event.request.headers['authorization']
      delete event.request.headers['cookie']
      delete event.request.headers['x-api-key']
    }

    // Remover query params sensíveis
    if (event.request?.query_string && typeof event.request.query_string === 'string') {
      const sensitiveParams = ['token', 'key', 'secret', 'password']
      let queryString = event.request.query_string
      sensitiveParams.forEach(param => {
        if (queryString.includes(param)) {
          queryString = queryString.replace(
            new RegExp(`${param}=[^&]*`, 'g'),
            `${param}=[REDACTED]`
          )
        }
      })
      event.request.query_string = queryString
    }

    return event
  },

  // Ignorar erros conhecidos
  ignoreErrors: [
    // Erros de timeout comuns
    'ECONNRESET',
    'ETIMEDOUT',
    'ENOTFOUND',
    // Erros de cancelamento de request
    'AbortError',
    'Request aborted',
  ],

  // Release tracking (configurado via CI/CD)
  // release: process.env.SENTRY_RELEASE,
})
