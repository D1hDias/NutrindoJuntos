-- Script de inicialização do PostgreSQL
-- Executado automaticamente na primeira vez que o container é criado

-- Criar extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- Para full-text search

-- Configurar encoding
ALTER DATABASE nutrindo_juntos SET timezone TO 'America/Sao_Paulo';

-- Criar schema se necessário (Payload cria as tabelas automaticamente)
-- Apenas garantindo que o database está pronto

-- Log de inicialização
SELECT 'Database nutrindo_juntos initialized successfully' AS status;
