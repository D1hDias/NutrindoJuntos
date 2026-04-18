/**
 * Global polyfills for both server-side and client-side
 * CRITICAL: Fixes "self is not defined" error in webpack chunks
 */

// Server-side polyfills
if (typeof window === 'undefined') {
  // Server environment
  if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
    globalThis.self = globalThis
    console.log('✅ [Polyfills] Server: globalThis.self polyfill applied')
  }

  if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
    global.self = global
    console.log('✅ [Polyfills] Server: global.self polyfill applied')
  }
} else {
  // Client-side polyfills
  if (typeof window.self === 'undefined') {
    window.self = window
    console.log('✅ [Polyfills] Client: window.self polyfill applied')
  }

  if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
    globalThis.self = globalThis
    console.log('✅ [Polyfills] Client: globalThis.self polyfill applied')
  }
}