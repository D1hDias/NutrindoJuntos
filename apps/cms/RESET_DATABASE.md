# 🔄 RESETAR BANCO DE DADOS DO CMS

**⚠️ ATENÇÃO:** Este processo apaga **TODOS** os dados do CMS (posts, cursos, usuários, etc.)

---

## 📋 QUANDO USAR

Use o reset quando precisar:
- ✅ Limpar dados de teste/desenvolvimento
- ✅ Começar do zero com dados limpos
- ✅ Resolver problemas de migração do banco
- ✅ Preparar para dados de produção

---

## 🚀 COMO RESETAR

### Opção 1: Via Supabase Dashboard (Recomendado)

**Mais rápido e confiável - use o SQL Editor do Supabase:**

1. **Acesse:** https://supabase.com/dashboard
2. **Login:** Com suas credenciais
3. **Projeto:** Selecione o projeto do NUTRINDO JUNTOS
4. **SQL Editor:** Clique em "SQL Editor" no menu lateral
5. **Execute:** Cole e execute este SQL:

```sql
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
```

6. **Reinicie o CMS:**
```powershell
cd "C:\Users\diego\OneDrive\Desktop\Nutrindo Juntos\apps\cms"
pnpm dev
```

---

### Opção 2: Script SQL Local (Alternativa)

**Se preferir usar o script SQL localmente:**

```powershell
cd "C:\Users\diego\OneDrive\Desktop\Nutrindo Juntos\apps\cms"

# Execute o script SQL
psql $env:DATABASE_URI -f scripts/reset-database.sql

# Reinicie o servidor
pnpm dev
```

**Nota:** Requer PostgreSQL client (psql) instalado localmente.

---

## 🔐 PRIMEIRO ACESSO APÓS RESET

Após resetar o banco:

1. **Acesse:** http://localhost:3001/admin
2. **Você verá:** Tela de criação de primeiro usuário
3. **Preencha:**
   - Email: seu-email@example.com
   - Password: senha-forte-aqui
   - Confirm Password: mesma senha
4. **Clique:** "Create First User"
5. **Pronto!** Você agora é o admin do CMS

---

## 📊 O QUE ACONTECE NO RESET

### ✅ É Removido:
- Todos os posts do blog
- Todos os cursos
- Todas as categorias e tags
- Todos os membros da equipe
- Todas as imagens/media
- Todos os usuários (incluindo admin)
- Todas as configurações globais

### ✅ É Mantido:
- Estrutura das tabelas (será recriada automaticamente)
- Configurações do Payload (`payload.config.ts`)
- Imagens no Cloudinary (se já enviadas)
- Código do CMS
- Estilos customizados

---

## 🎨 DADOS MOCKADOS NO FRONTEND

Após resetar o CMS, o site (frontend) continuará funcionando normalmente porque usa **dados mockados**:

**Arquivo:** `/apps/web/lib/mock-data.ts`

```typescript
export const mockPosts = [
  {
    title: "Como começar uma carreira em nutrição esportiva",
    slug: "carreira-nutricao-esportiva",
    // ... dados mockados
  }
]

export const mockCursos = [
  {
    title: "Nutrição Clínica Avançada",
    slug: "nutricao-clinica-avancada",
    // ... dados mockados
  }
]
```

**Quando conectar o CMS ao frontend:**
1. Crie posts e cursos reais no CMS
2. Atualize o frontend para buscar do CMS em vez de mock
3. Remova ou comente os dados mockados

---

## ⚠️ CUIDADOS IMPORTANTES

### ❌ NÃO faça em produção
Este reset é para **desenvolvimento apenas**. Em produção:
- Faça backup antes de qualquer alteração
- Use migrações controladas
- Nunca delete dados sem backup

### ✅ Antes de resetar:
- Salve qualquer conteúdo importante
- Tire screenshots se necessário
- Documente configurações customizadas
- Faça backup das imagens do Cloudinary se precisar

### ✅ Após resetar:
- Recrie o usuário admin
- Configure novamente as globals (se houver)
- Reenvie imagens importantes
- Teste o CMS antes de criar conteúdo

---

## 🐛 TROUBLESHOOTING

### Erro: "Cannot connect to database"

**Solução:**
1. Verifique se o `.env` tem o `DATABASE_URI` correto
2. Teste a conexão:
```powershell
# Instalar psql (se não tiver)
# Testar conexão
psql "postgresql://postgres:senha@host:5432/db"
```

### Erro: "Table does not exist"

**Isso é normal!** Após o reset, as tabelas serão recriadas automaticamente quando você:
1. Reiniciar o servidor CMS (`pnpm dev`)
2. Acessar `/admin` pela primeira vez

### Script de reset não funciona

**Opção alternativa:**
```powershell
# Execute diretamente com tsx
npx tsx scripts/reset-database.ts
```

---

## 📚 REFERÊNCIAS

- **Script de Reset:** `/apps/cms/scripts/reset-database.ts`
- **Configuração do Banco:** `/apps/cms/.env` (DATABASE_URI)
- **Payload Config:** `/apps/cms/src/payload.config.ts`
- **Supabase Dashboard:** https://supabase.com/dashboard

---

**Última Atualização:** 16/11/2025
**Responsável:** Diego (NUTRINDO JUNTOS)
