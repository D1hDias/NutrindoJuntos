-- Script SQL para RESETAR o banco de dados do Payload CMS
-- ⚠️ ATENÇÃO: Este script apaga TODOS os dados do CMS!

-- Dropar todas as tabelas do Payload CMS
DROP TABLE IF EXISTS payload_preferences CASCADE;
DROP TABLE IF EXISTS payload_preferences_rels CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS posts_rels CASCADE;
DROP TABLE IF EXISTS cursos CASCADE;
DROP TABLE IF EXISTS cursos_rels CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS equipe CASCADE;
DROP TABLE IF EXISTS equipe_rels CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS payload_migrations CASCADE;

-- Mensagem de sucesso
SELECT '✅ Reset concluído! Todas as tabelas foram removidas.' AS status;
SELECT '📝 Próximos passos:' AS info;
SELECT '   1. Reinicie o servidor CMS: pnpm dev' AS step_1;
SELECT '   2. Acesse http://localhost:3001/admin' AS step_2;
SELECT '   3. Crie um novo usuário administrador' AS step_3;
