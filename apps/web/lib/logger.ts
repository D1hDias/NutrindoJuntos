/**
 * Centralized Logging Service
 *
 * Wrapper consistente para logging usando Sentry.
 * Substitui console.log/warn/error em produção.
 */

// Temporarily disable Sentry to fix webpack "self is not defined" issue
// TODO: Re-enable after solving the build problem
const Sentry: any = null

/**
 * Log levels seguindo convenção padrão
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warning',
  ERROR = 'error',
  FATAL = 'fatal',
}

/**
 * Contexto adicional para logs
 */
export interface LogContext {
  [key: string]: any
  userId?: string
  email?: string
  ip?: string
  userAgent?: string
  requestId?: string
}

/**
 * Log genérico com nível e contexto
 */
export function log(
  level: LogLevel,
  message: string,
  context?: LogContext,
  error?: Error
) {
  // Em desenvolvimento, usar console
  if (process.env.NODE_ENV === 'development') {
    const logFn = {
      [LogLevel.DEBUG]: console.debug,
      [LogLevel.INFO]: console.info,
      [LogLevel.WARN]: console.warn,
      [LogLevel.ERROR]: console.error,
      [LogLevel.FATAL]: console.error,
    }[level]

    logFn(message, { context, error })
    return
  }

  // Em produção, usar Sentry se disponível
  if (Sentry && Sentry.withScope) {
    Sentry.withScope((scope: any) => {
      // Adicionar contexto
      if (context) {
        Object.entries(context).forEach(([key, value]) => {
          scope.setContext(key, value)
        })

        // Tags especiais
        if (context.userId) {
          scope.setUser({ id: context.userId, email: context.email })
        }
        if (context.requestId) {
          scope.setTag('request_id', context.requestId)
        }
      }

      // Adicionar nível
      scope.setLevel(level)

      // Enviar para Sentry
      if (error) {
        Sentry.captureException(error, { contexts: { custom: context } })
      } else {
        Sentry.captureMessage(message, level)
      }
    })
  } else {
    // Fallback para console se Sentry não estiver disponível
    const logFn = {
      [LogLevel.DEBUG]: console.debug,
      [LogLevel.INFO]: console.info,
      [LogLevel.WARN]: console.warn,
      [LogLevel.ERROR]: console.error,
      [LogLevel.FATAL]: console.error,
    }[level]

    logFn(message, { context, error })
  }
}

/**
 * Helpers específicos por nível
 */
export const logger = {
  debug: (message: string, context?: LogContext) =>
    log(LogLevel.DEBUG, message, context),

  info: (message: string, context?: LogContext) =>
    log(LogLevel.INFO, message, context),

  warn: (message: string, context?: LogContext) =>
    log(LogLevel.WARN, message, context),

  error: (message: string, error?: Error, context?: LogContext) =>
    log(LogLevel.ERROR, message, context, error),

  fatal: (message: string, error?: Error, context?: LogContext) =>
    log(LogLevel.FATAL, message, context, error),
}

/**
 * Capturar erro de API Route
 */
export function logApiError(
  route: string,
  error: Error,
  context?: LogContext
) {
  logger.error(`API Error in ${route}`, error, {
    route,
    ...context,
  })
}

/**
 * Capturar erro de integração externa
 */
export function logIntegrationError(
  service: string,
  operation: string,
  error: Error,
  context?: LogContext
) {
  logger.error(`Integration Error: ${service}.${operation}`, error, {
    service,
    operation,
    ...context,
  })
}

/**
 * Log de spam/bot detection
 */
export function logSpamAttempt(
  type: 'honeypot' | 'rate_limit' | 'suspicious',
  context: LogContext
) {
  logger.warn(`Spam attempt detected: ${type}`, {
    type,
    ...context,
  })
}

/**
 * Performance tracking
 */
export function logPerformance(
  operation: string,
  durationMs: number,
  context?: LogContext
) {
  if (durationMs > 1000) {
    logger.warn(`Slow operation: ${operation}`, {
      operation,
      duration_ms: durationMs,
      ...context,
    })
  } else {
    logger.debug(`Performance: ${operation}`, {
      operation,
      duration_ms: durationMs,
      ...context,
    })
  }
}

/**
 * Helper para medir tempo de operação
 */
export function measureTime<T>(
  operation: string,
  fn: () => T | Promise<T>,
  context?: LogContext
): Promise<T> {
  const start = Date.now()

  const handleResult = (result: T) => {
    const duration = Date.now() - start
    logPerformance(operation, duration, context)
    return result
  }

  const handleError = (error: any) => {
    const duration = Date.now() - start
    logger.error(`Error in ${operation}`, error, {
      operation,
      duration_ms: duration,
      ...context,
    })
    throw error
  }

  try {
    const result = fn()
    if (result instanceof Promise) {
      return result.then(handleResult).catch(handleError)
    }
    return Promise.resolve(handleResult(result))
  } catch (error) {
    handleError(error)
    throw error
  }
}
