/**
 * SUPABASE CLIENT CONFIGURATION
 * Cliente configurado para Next.js App Router
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Validar variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️  Supabase não configurado. Usando mock data.\n' +
    'Para ativar Supabase, configure:\n' +
    '- NEXT_PUBLIC_SUPABASE_URL\n' +
    '- NEXT_PUBLIC_SUPABASE_ANON_KEY (publishable key)\n' +
    '- SUPABASE_SERVICE_ROLE_KEY (secret key, server-side only)'
  )
}

/**
 * Cliente Supabase para uso client-side
 * Usa a anon key (segura para expor no browser)
 */
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: {
          'x-application-name': 'nutrindo-juntos',
        },
      },
    })
  : null

/**
 * Verifica se Supabase está configurado e disponível
 */
export function isSupabaseConfigured(): boolean {
  return supabase !== null
}

/**
 * Cliente Supabase para uso server-side
 * Usa a service role key (apenas server-side)
 */
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY não configurado. ' +
      'Necessário para operações server-side administrativas.'
    )
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: {
      schema: 'public',
    },
  })
}
