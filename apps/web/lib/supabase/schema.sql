-- ============================================
-- NUTRINDO JUNTOS - SUPABASE DATABASE SCHEMA
-- ============================================
-- Execute este script no Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Cole e execute

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Para busca full-text

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE curso_nivel AS ENUM ('iniciante', 'intermediario', 'avancado');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- ============================================
-- TABELA: categorias
-- ============================================

CREATE TABLE IF NOT EXISTS categorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  descricao TEXT,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para busca por slug
CREATE INDEX idx_categorias_slug ON categorias(slug);

-- ============================================
-- TABELA: equipe
-- ============================================

CREATE TABLE IF NOT EXISTS equipe (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  cargo VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  avatar TEXT,
  especialidades TEXT[],
  redes_sociais JSONB, -- { "instagram": "url", "linkedin": "url" }
  ordem INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para ordenação
CREATE INDEX idx_equipe_ordem ON equipe(ordem);

-- ============================================
-- TABELA: cursos
-- ============================================

CREATE TABLE IF NOT EXISTS cursos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  descricao_breve TEXT NOT NULL,
  descricao_completa TEXT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  preco_promocional DECIMAL(10, 2),
  carga_horaria INTEGER NOT NULL, -- em minutos
  nivel curso_nivel DEFAULT 'iniciante',
  status content_status DEFAULT 'draft',
  categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
  instrutor_id UUID REFERENCES equipe(id) ON DELETE SET NULL,
  imagem_capa TEXT,
  video_preview TEXT, -- URL do vídeo preview
  publico_alvo TEXT,
  pre_requisitos TEXT,
  objetivos JSONB, -- Array de objetivos: ["objetivo 1", "objetivo 2"]
  conteudo_programatico JSONB, -- Estrutura de módulos e aulas
  sales_count INTEGER DEFAULT 0,
  rating_avg DECIMAL(3, 2) DEFAULT 0.00,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_cursos_slug ON cursos(slug);
CREATE INDEX idx_cursos_status ON cursos(status);
CREATE INDEX idx_cursos_categoria ON cursos(categoria_id);
CREATE INDEX idx_cursos_published_at ON cursos(published_at DESC NULLS LAST);

-- ============================================
-- TABELA: posts (Blog)
-- ============================================

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  conteudo JSONB NOT NULL, -- Rich text em formato Lexical/Slate
  imagem_destaque TEXT,
  categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
  autor_id UUID REFERENCES equipe(id) ON DELETE SET NULL,
  status content_status DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 5, -- minutos
  tags TEXT[], -- Array de tags
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_categoria ON posts(categoria_id);
CREATE INDEX idx_posts_featured ON posts(featured) WHERE featured = true;
CREATE INDEX idx_posts_published_at ON posts(published_at DESC NULLS LAST);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);

-- Full-text search index
CREATE INDEX idx_posts_search ON posts USING GIN(
  to_tsvector('portuguese', titulo || ' ' || excerpt)
);

-- ============================================
-- TRIGGERS: updated_at automático
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categorias_updated_at
  BEFORE UPDATE ON categorias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipe_updated_at
  BEFORE UPDATE ON equipe
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cursos_updated_at
  BEFORE UPDATE ON cursos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Habilitar RLS em todas as tabelas

ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipe ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policies: Permitir leitura pública de conteúdo publicado

CREATE POLICY "Categorias são públicas"
  ON categorias FOR SELECT
  USING (true);

CREATE POLICY "Equipe ativa é pública"
  ON equipe FOR SELECT
  USING (ativo = true);

CREATE POLICY "Cursos publicados são públicos"
  ON cursos FOR SELECT
  USING (status = 'published');

CREATE POLICY "Posts publicados são públicos"
  ON posts FOR SELECT
  USING (status = 'published');

-- ============================================
-- FUNÇÕES ÚTEIS
-- ============================================

-- Buscar posts por categoria
CREATE OR REPLACE FUNCTION get_posts_by_categoria(categoria_slug TEXT)
RETURNS SETOF posts AS $$
BEGIN
  RETURN QUERY
  SELECT p.*
  FROM posts p
  JOIN categorias c ON p.categoria_id = c.id
  WHERE c.slug = categoria_slug
    AND p.status = 'published'
  ORDER BY p.published_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Incrementar views de um post
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SEED DATA (Opcional)
-- ============================================

-- Inserir categorias iniciais
INSERT INTO categorias (nome, slug, descricao, ordem) VALUES
  ('Nutrição Clínica', 'nutricao-clinica', 'Artigos sobre nutrição clínica e dietoterapia', 1),
  ('Nutrição Esportiva', 'nutricao-esportiva', 'Conteúdo sobre nutrição para atletas e praticantes de atividade física', 2),
  ('Gestão de Consultório', 'gestao-consultorio', 'Dicas para gestão e administração de consultórios nutricionais', 3)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- COMENTÁRIOS
-- ============================================

COMMENT ON TABLE categorias IS 'Categorias para organização de cursos e posts';
COMMENT ON TABLE equipe IS 'Membros da equipe/instrutores';
COMMENT ON TABLE cursos IS 'Cursos oferecidos na plataforma';
COMMENT ON TABLE posts IS 'Posts do blog';
COMMENT ON FUNCTION increment_post_views IS 'Incrementa contador de visualizações de um post';
