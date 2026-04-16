/**
 * Global polyfills for server-side rendering
 * This file needs to be loaded before any other code
 */

// Fix "self is not defined" error on server-side
if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis
  console.log('✅ [Polyfills] globalThis.self polyfill applied')
}

if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  global.self = global
  console.log('✅ [Polyfills] global.self polyfill applied')
}

// Additional polyfills for webpack chunks
if (typeof window === 'undefined' && typeof self === 'undefined') {
  global.self = global
  console.log('✅ [Polyfills] webpack self polyfill applied')
}