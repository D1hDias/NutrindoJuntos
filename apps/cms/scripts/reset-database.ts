/**
 * Script para RESETAR o banco de dados do Payload CMS
 *
 * ⚠️ ATENÇÃO: Este script apaga TODOS os dados do CMS!
 *
 * Uso:
 * 1. Pare o servidor CMS (Ctrl+C)
 * 2. Execute: npx tsx scripts/reset-database.ts
 * 3. Reinicie o servidor: pnpm dev
 * 4. Acesse /admin e crie um novo usuário admin
 */

import pkg from 'pg'
const { Pool } = pkg
import { config } from 'dotenv'

// Carregar variáveis de ambiente
config()

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  console.error('❌ DATABASE_URI não encontrada no .env')
  process.exit(1)
}

const pool = new Pool({
  connectionString: DATABASE_URI,
})

async function resetDatabase() {
  console.log('🔄 Iniciando reset do banco de dados...\n')

  try {
    // Lista de tabelas do Payload CMS
    const tables = [
      'payload_preferences',
      'payload_preferences_rels',
      'posts',
      'posts_rels',
      'cursos',
      'cursos_rels',
      'categorias',
      'tags',
      'equipe',
      'media',
      'users',
      'payload_migrations',
    ]

    console.log('📋 Tabelas que serão removidas:')
    tables.forEach(table => console.log(`   - ${table}`))
    console.log('')

    // Dropar todas as tabelas
    for (const table of tables) {
      try {
        await pool.query(`DROP TABLE IF EXISTS "${table}" CASCADE`)
        console.log(`✅ Tabela "${table}" removida`)
      } catch (error) {
        console.log(`⚠️  Tabela "${table}" não existe (ok)`)
      }
    }

    console.log('\n✅ Reset concluído com sucesso!')
    console.log('\n📝 Próximos passos:')
    console.log('   1. Reinicie o servidor CMS: pnpm dev')
    console.log('   2. Acesse http://localhost:3001/admin')
    console.log('   3. Crie um novo usuário administrador')
    console.log('')

  } catch (error) {
    console.error('❌ Erro ao resetar banco:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Executar
resetDatabase()
