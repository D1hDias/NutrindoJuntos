/**
 * Next.js Instrumentation Hook
 *
 * Este arquivo é chamado uma vez quando o servidor Next.js inicia.
 * É usado para inicializar o Sentry e outros serviços de observabilidade.
 *
 * Docs: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // Fix "self is not defined" error on server-side
  console.log('🔧 [Instrumentation] Registering polyfills...')
  
  if (typeof globalThis.self === 'undefined') {
    ;(globalThis as any).self = globalThis
    console.log('✅ [Instrumentation] self polyfill applied')
  }
  
  // Extra polyfills for webpack vendor chunks
  if (typeof global !== 'undefined' && typeof (global as any).self === 'undefined') {
    ;(global as any).self = global
    console.log('✅ [Instrumentation] global.self polyfill applied')
  }
  
  // Temporarily disable Sentry to fix build issues
  // TODO: Re-enable after fixing webpack "self is not defined" problem
  
  /* 
  // Apenas inicializar no servidor
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  // Para Edge Runtime (middleware, edge functions)
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
  */
}
