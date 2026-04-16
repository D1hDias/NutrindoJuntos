-- ============================================
-- RESET DATABASE - Limpar tudo e começar do zero
-- ============================================
-- Execute ESTE script PRIMEIRO se tiver erros

-- Desabilitar RLS temporariamente
ALTER TABLE IF EXISTS categorias DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS equipe DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cursos DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS posts DISABLE ROW LEVEL SECURITY;

-- Remover políticas
DROP POLICY IF EXISTS "Categorias são públicas" ON categorias;
DROP POLICY IF EXISTS "Equipe ativa é pública" ON equipe;
DROP POLICY IF EXISTS "Cursos publicados são públicos" ON cursos;
DROP POLICY IF EXISTS "Posts publicados são públicos" ON posts;

-- Remover triggers
DROP TRIGGER IF EXISTS update_categorias_updated_at ON categorias;
DROP TRIGGER IF EXISTS update_equipe_updated_at ON equipe;
DROP TRIGGER IF EXISTS update_cursos_updated_at ON cursos;
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;

-- Remover funções
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS get_posts_by_categoria(TEXT);
DROP FUNCTION IF EXISTS increment_post_views(UUID);

-- Remover índices
DROP INDEX IF EXISTS idx_categorias_slug;
DROP INDEX IF EXISTS idx_equipe_ordem;
DROP INDEX IF EXISTS idx_cursos_slug;
DROP INDEX IF EXISTS idx_cursos_status;
DROP INDEX IF EXISTS idx_cursos_categoria;
DROP INDEX IF EXISTS idx_cursos_published_at;
DROP INDEX IF EXISTS idx_posts_slug;
DROP INDEX IF EXISTS idx_posts_status;
DROP INDEX IF EXISTS idx_posts_categoria;
DROP INDEX IF EXISTS idx_posts_featured;
DROP INDEX IF EXISTS idx_posts_published_at;
DROP INDEX IF EXISTS idx_posts_tags;
DROP INDEX IF EXISTS idx_posts_search;

-- Remover tabelas (em ordem devido às foreign keys)
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS cursos CASCADE;
DROP TABLE IF EXISTS equipe CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;

-- Remover tipos
DROP TYPE IF EXISTS content_status CASCADE;
DROP TYPE IF EXISTS curso_nivel CASCADE;

-- Pronto! Banco limpo
-- Agora execute o schema.sql normalmente
