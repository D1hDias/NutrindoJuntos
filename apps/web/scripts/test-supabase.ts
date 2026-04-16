/**
 * Script para testar conexão com Supabase
 * Execute: npx tsx scripts/test-supabase.ts
 */

// Carregar variáveis de ambiente do .env.local
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '../.env.local') })

import { supabase } from '../lib/supabase/client'

async function testSupabase() {
  console.log('🔍 Testando conexão com Supabase...\n')

  if (!supabase) {
    console.error('❌ Supabase client não configurado!')
    console.error('Verifique as variáveis de ambiente:')
    console.error('- NEXT_PUBLIC_SUPABASE_URL')
    console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
    process.exit(1)
  }

  try {
    // Teste 1: Verificar categorias
    console.log('📋 Teste 1: Buscar categorias...')
    const { data: categorias, error: catError } = await supabase
      .from('categorias')
      .select('*')

    if (catError) {
      console.error('❌ Erro ao buscar categorias:', catError.message)
    } else {
      console.log(`✅ Categorias encontradas: ${categorias?.length || 0}`)
      if (categorias && categorias.length > 0) {
        console.log('   Exemplo:', categorias[0])
      }
    }

    // Teste 2: Verificar cursos
    console.log('\n📚 Teste 2: Buscar cursos...')
    const { data: cursos, error: cursoError } = await supabase
      .from('cursos')
      .select('*')
      .limit(5)

    if (cursoError) {
      console.error('❌ Erro ao buscar cursos:', cursoError.message)
    } else {
      console.log(`✅ Cursos encontrados: ${cursos?.length || 0}`)
    }

    // Teste 3: Verificar posts
    console.log('\n📝 Teste 3: Buscar posts...')
    const { data: posts, error: postError } = await supabase
      .from('posts')
      .select('*')
      .limit(5)

    if (postError) {
      console.error('❌ Erro ao buscar posts:', postError.message)
    } else {
      console.log(`✅ Posts encontrados: ${posts?.length || 0}`)
    }

    // Teste 4: Verificar equipe
    console.log('\n👥 Teste 4: Buscar equipe...')
    const { data: equipe, error: equipeError } = await supabase
      .from('equipe')
      .select('*')

    if (equipeError) {
      console.error('❌ Erro ao buscar equipe:', equipeError.message)
    } else {
      console.log(`✅ Membros da equipe encontrados: ${equipe?.length || 0}`)
    }

    console.log('\n🎉 Teste concluído!')
    console.log('\n💡 Próximo passo: Migrar dados mock → Supabase')
    console.log('   Ou trocar para Supabase: NEXT_PUBLIC_USE_MOCK_DATA=false')
  } catch (error) {
    console.error('❌ Erro inesperado:', error)
    process.exit(1)
  }
}

testSupabase()
