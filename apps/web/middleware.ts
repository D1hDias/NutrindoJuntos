/**
 * Next.js Middleware
 *
 * Runs before every request to add security headers and handle redirects.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone response
  const response = NextResponse.next()

  // Get request URL
  const { pathname } = request.nextUrl

  // Add security headers (these complement next.config.mjs headers)
  // Note: Most headers are already set in next.config.mjs
  // This middleware adds dynamic/request-specific headers

  // Add nonce for CSP (if needed in future for inline scripts)
  // const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  // response.headers.set('x-nonce', nonce)

  // Custom headers for specific paths
  if (pathname.startsWith('/api/')) {
    // Additional API-specific security headers
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  // Prevent caching of sensitive pages
  if (pathname.includes('/admin') || pathname.includes('/dashboard')) {
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    )
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  return response
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\..*|api/health).*)',
  ],
}
