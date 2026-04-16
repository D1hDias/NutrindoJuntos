/**
 * Script para testar conexão com Supabase (versão simplificada)
 * Execute: npx tsx scripts/test-supabase-simple.ts
 */

// Carregar variáveis de ambiente
import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'

config({ path: resolve(__dirname, '../.env.local') })

async function testSupabase() {
  console.log('🔍 Testando conexão com Supabase...\n')

  // Ler variáveis diretamente
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('📋 Variáveis carregadas:')
  console.log(`   URL: ${supabaseUrl ? '✅ OK' : '❌ FALTANDO'}`)
  console.log(`   Key: ${supabaseKey ? '✅ OK (' + supabaseKey.substring(0, 20) + '...)' : '❌ FALTANDO'}`)
  console.log()

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variáveis não configuradas!')
    process.exit(1)
  }

  // Criar cliente diretamente
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Teste 1: Categorias
    console.log('📋 Teste 1: Buscar categorias...')
    const { data: categorias, error: catError } = await supabase
      .from('categorias')
      .select('*')

    if (catError) {
      console.error('❌ Erro:', catError.message)
    } else {
      console.log(`✅ Categorias encontradas: ${categorias?.length || 0}`)
      if (categorias && categorias.length > 0) {
        console.log('   Primeira:', categorias[0].nome)
      }
    }

    // Teste 2: Cursos
    console.log('\n📚 Teste 2: Buscar cursos...')
    const { data: cursos, error: cursoError } = await supabase
      .from('cursos')
      .select('*')

    if (cursoError) {
      console.error('❌ Erro:', cursoError.message)
    } else {
      console.log(`✅ Cursos encontrados: ${cursos?.length || 0}`)
    }

    // Teste 3: Posts
    console.log('\n📝 Teste 3: Buscar posts...')
    const { data: posts, error: postError } = await supabase
      .from('posts')
      .select('*')

    if (postError) {
      console.error('❌ Erro:', postError.message)
    } else {
      console.log(`✅ Posts encontrados: ${posts?.length || 0}`)
    }

    // Teste 4: Equipe
    console.log('\n👥 Teste 4: Buscar equipe...')
    const { data: equipe, error: equipeError } = await supabase
      .from('equipe')
      .select('*')

    if (equipeError) {
      console.error('❌ Erro:', equipeError.message)
    } else {
      console.log(`✅ Membros encontrados: ${equipe?.length || 0}`)
    }

    console.log('\n🎉 Conexão com Supabase funcionando!')
    console.log('\n💡 Próximo passo:')
    console.log('   Migrar dados mock → Supabase')
    console.log('   OU trocar: NEXT_PUBLIC_USE_MOCK_DATA=false')
  } catch (error) {
    console.error('\n❌ Erro inesperado:', error)
    process.exit(1)
  }
}

testSupabase()
