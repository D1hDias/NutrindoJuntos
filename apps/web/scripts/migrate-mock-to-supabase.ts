/**
 * Script para migrar dados mock para Supabase
 * Execute: npx tsx scripts/migrate-mock-to-supabase.ts
 */

import { getSupabaseAdmin } from '../lib/supabase/client'
import {
  MOCK_CURSOS,
  MOCK_POSTS,
  MOCK_CATEGORIAS,
  MOCK_EQUIPE,
} from '../lib/mock-data'

async function migrateToSupabase() {
  console.log('🚀 Iniciando migração Mock → Supabase...\n')

  const supabase = getSupabaseAdmin()

  try {
    // Migrar Categorias
    console.log('📋 Migrando categorias...')
    const { data: categorias, error: catError } = await supabase
      .from('categorias')
      .insert(
        MOCK_CATEGORIAS.map((cat) => ({
          nome: cat.nome,
          slug: cat.slug,
          descricao: cat.descricao || '',
          ordem: cat.ordem || 0,
        }))
      )
      .select()

    if (catError) {
      console.error('❌ Erro ao migrar categorias:', catError.message)
    } else {
      console.log(`✅ ${categorias?.length || 0} categorias migradas`)
    }

    // Migrar Equipe
    console.log('\n👥 Migrando equipe...')
    const { data: equipe, error: equipeError } = await supabase
      .from('equipe')
      .insert(
        MOCK_EQUIPE.map((membro, index) => ({
          nome: membro.nome,
          cargo: membro.cargo,
          bio: membro.bio,
          avatar: membro.avatar?.url || null,
          especialidades: membro.especialidades || [],
          redes_sociais: membro.redesSociais || null,
          ordem: index,
          ativo: true,
        }))
      )
      .select()

    if (equipeError) {
      console.error('❌ Erro ao migrar equipe:', equipeError.message)
    } else {
      console.log(`✅ ${equipe?.length || 0} membros da equipe migrados`)
    }

    // Buscar IDs das categorias para relacionamento
    const { data: categoriasDB } = await supabase
      .from('categorias')
      .select('id, slug')

    const categoriaMap = new Map(categoriasDB?.map((c) => [c.slug, c.id]))

    // Buscar IDs da equipe para relacionamento
    const { data: equipeDB } = await supabase.from('equipe').select('id, nome')

    const equipeMap = new Map(equipeDB?.map((e) => [e.nome, e.id]))

    // Migrar Cursos
    console.log('\n📚 Migrando cursos...')
    const { data: cursos, error: cursoError } = await supabase
      .from('cursos')
      .insert(
        MOCK_CURSOS.map((curso) => ({
          titulo: curso.titulo,
          slug: curso.slug,
          descricao_breve: curso.descricaoBreve,
          descricao_completa: curso.descricao,
          preco: curso.preco,
          preco_promocional: curso.precoPromocional || null,
          carga_horaria: curso.cargaHoraria,
          nivel: curso.nivel || 'iniciante',
          status: curso.status || 'published',
          categoria_id:
            categoriaMap.get(curso.categoria?.slug || '') || null,
          instrutor_id: equipeMap.get(curso.instrutor?.nome || '') || null,
          imagem_capa: curso.imagemCapa?.url || null,
          video_preview: curso.videoPreview || null,
          publico_alvo: curso.publicoAlvo || null,
          pre_requisitos: curso.preRequisitos || null,
          objetivos: curso.objetivos || null,
          conteudo_programatico: curso.conteudoProgramatico || null,
          sales_count: curso.salesCount || 0,
          rating_avg: curso.rating || 0,
          rating_count: curso.avaliacoes || 0,
          published_at: new Date().toISOString(),
        }))
      )
      .select()

    if (cursoError) {
      console.error('❌ Erro ao migrar cursos:', cursoError.message)
    } else {
      console.log(`✅ ${cursos?.length || 0} cursos migrados`)
    }

    // Migrar Posts
    console.log('\n📝 Migrando posts...')
    const { data: posts, error: postError } = await supabase
      .from('posts')
      .insert(
        MOCK_POSTS.map((post) => ({
          titulo: post.titulo,
          slug: post.slug,
          excerpt: post.excerpt,
          conteudo: post.conteudo,
          imagem_destaque: post.imagemDestaque?.url || null,
          categoria_id:
            categoriaMap.get(post.categoria?.slug || '') || null,
          autor_id: equipeMap.get(post.autor?.nome || '') || null,
          status: post.status || 'published',
          featured: post.featured || false,
          views: 0,
          reading_time: post.tempoLeitura || 5,
          tags: post.tags?.map((t) => t.nome) || [],
          meta_title: post.seo?.metaTitle || post.titulo,
          meta_description: post.seo?.metaDescription || post.excerpt,
          published_at: post.dataPublicacao || new Date().toISOString(),
        }))
      )
      .select()

    if (postError) {
      console.error('❌ Erro ao migrar posts:', postError.message)
    } else {
      console.log(`✅ ${posts?.length || 0} posts migrados`)
    }

    console.log('\n🎉 Migração concluída com sucesso!')
    console.log('\n💡 Próximo passo:')
    console.log('   Trocar NEXT_PUBLIC_USE_MOCK_DATA=false no .env.local')
    console.log('   Depois: pnpm --filter web dev')
  } catch (error) {
    console.error('\n❌ Erro durante migração:', error)
    process.exit(1)
  }
}

migrateToSupabase()
