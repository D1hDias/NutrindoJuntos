/**
 * Redis-based rate limiter using Upstash
 *
 * Advantages over in-memory:
 * - Distributed: Works across multiple Vercel edge functions
 * - Persistent: Survives deployments and server restarts
 * - Scalable: Handles high traffic without memory issues
 * - Analytics: Built-in rate limit analytics
 *
 * Upstash Free Tier:
 * - 10,000 commands/day
 * - 256MB storage
 * - Global replication
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { logger } from './logger'

// Initialize Redis client
// Automatically uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from env
let redis: Redis | null = null

try {
  redis = Redis.fromEnv()
} catch (error) {
  logger.warn('Upstash Redis not configured, falling back to in-memory rate limiting', {
    error: error instanceof Error ? error.message : 'Unknown error',
  })
}

export interface RateLimitConfig {
  interval: number // in milliseconds
  maxRequests: number
  prefix?: string // Optional prefix for Redis keys
}

/**
 * Create a rate limiter instance
 * Uses sliding window algorithm for smooth rate limiting
 */
export function createRateLimiter(config: RateLimitConfig) {
  if (!redis) {
    // Fallback to null if Redis not available
    // Caller should handle this case
    return null
  }

  const windowSeconds = Math.floor(config.interval / 1000)

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.maxRequests, `${windowSeconds}s`),
    prefix: config.prefix || '@nutrindo-juntos/ratelimit',
    analytics: true, // Enable analytics for monitoring
    // Ephemeral cache to reduce Redis calls (recommended for edge functions)
    ephemeralCache: new Map(),
  })
}

/**
 * Rate limiters for different routes
 * Pre-configured for common use cases
 */
export const rateLimiters = {
  // Newsletter: 5 requests per minute
  newsletter: redis ? createRateLimiter({
    interval: 60000,
    maxRequests: 5,
    prefix: '@nj/newsletter',
  }) : null,

  // Contact form: 3 requests per minute
  contact: redis ? createRateLimiter({
    interval: 60000,
    maxRequests: 3,
    prefix: '@nj/contact',
  }) : null,

  // Curso leads: 5 requests per minute
  cursoLeads: redis ? createRateLimiter({
    interval: 60000,
    maxRequests: 5,
    prefix: '@nj/curso-leads',
  }) : null,

  // Mentoria leads: 3 requests per minute (more restrictive)
  mentoriaLeads: redis ? createRateLimiter({
    interval: 60000,
    maxRequests: 3,
    prefix: '@nj/mentoria-leads',
  }) : null,

  // API routes: 60 requests per minute (more permissive)
  api: redis ? createRateLimiter({
    interval: 60000,
    maxRequests: 60,
    prefix: '@nj/api',
  }) : null,
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (usually IP address)
 * @param limiter - Rate limiter instance
 * @returns Rate limit result with success, remaining, and reset info
 */
export async function checkRateLimit(
  identifier: string,
  limiter: Ratelimit | null
): Promise<{
  success: boolean
  limit: number
  remaining: number
  reset: number
  pending?: Promise<unknown>
}> {
  // If Redis not configured, allow all requests
  // This provides graceful degradation
  if (!limiter) {
    logger.warn('Rate limiter not available, allowing request', {
      identifier,
    })
    return {
      success: true,
      limit: Infinity,
      remaining: Infinity,
      reset: Date.now(),
    }
  }

  try {
    const result = await limiter.limit(identifier)

    // Log rate limit hits for monitoring
    if (!result.success) {
      logger.warn('Rate limit exceeded', {
        identifier,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      })
    }

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
      pending: result.pending, // For analytics
    }
  } catch (error) {
    // If Redis fails, log error but allow request (fail open)
    logger.error('Rate limit check failed', error as Error, {
      identifier,
    })
    return {
      success: true,
      limit: Infinity,
      remaining: Infinity,
      reset: Date.now(),
    }
  }
}

/**
 * Get client IP from request
 * Same implementation as before for consistency
 */
export function getClientIP(request: Request): string {
  // Try to get IP from various headers (proxy-aware)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  if (cfConnectingIP) {
    return cfConnectingIP
  }

  // Fallback to generic identifier
  return 'unknown'
}

/**
 * Block an identifier permanently (deny list)
 * Useful for blocking known bad actors
 */
export async function blockIdentifier(
  identifier: string,
  reason: string
): Promise<void> {
  if (!redis) {
    logger.warn('Cannot block identifier, Redis not configured', {
      identifier,
      reason,
    })
    return
  }

  try {
    // Store in Redis with no expiration
    await redis.set(`@nj/blocked:${identifier}`, {
      reason,
      blockedAt: Date.now(),
    })

    logger.info('Identifier blocked', {
      identifier,
      reason,
    })
  } catch (error) {
    logger.error('Failed to block identifier', error as Error, {
      identifier,
      reason,
    })
  }
}

/**
 * Check if an identifier is blocked
 */
export async function isBlocked(identifier: string): Promise<boolean> {
  if (!redis) {
    return false
  }

  try {
    const blocked = await redis.get(`@nj/blocked:${identifier}`)
    return blocked !== null
  } catch (error) {
    logger.error('Failed to check if identifier is blocked', error as Error, {
      identifier,
    })
    return false
  }
}

/**
 * Unblock an identifier
 */
export async function unblockIdentifier(identifier: string): Promise<void> {
  if (!redis) {
    logger.warn('Cannot unblock identifier, Redis not configured', {
      identifier,
    })
    return
  }

  try {
    await redis.del(`@nj/blocked:${identifier}`)
    logger.info('Identifier unblocked', {
      identifier,
    })
  } catch (error) {
    logger.error('Failed to unblock identifier', error as Error, {
      identifier,
    })
  }
}

/**
 * Get rate limit analytics
 * Requires analytics: true in Ratelimit config
 */
export async function getRateLimitAnalytics(
  prefix: string,
  identifier?: string
): Promise<any> {
  if (!redis) {
    return null
  }

  try {
    const key = identifier
      ? `${prefix}:${identifier}:analytics`
      : `${prefix}:analytics`
    return await redis.get(key)
  } catch (error) {
    logger.error('Failed to get rate limit analytics', error as Error, {
      prefix,
      identifier,
    })
    return null
  }
}

/**
 * Check if Upstash Redis is configured
 */
export function isRedisConfigured(): boolean {
  return redis !== null
}
