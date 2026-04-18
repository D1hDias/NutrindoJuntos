# 🔄 Git Workflow - NUTRINDO JUNTOS

## Workflow Profissional para Desenvolvimento e Deploy

---

## 📋 **Estrutura de Branches**

```
main (produção)
  ↑
develop (desenvolvimento)
  ↑
feature/* (features individuais)
```

### **Branches:**

- **`main`** - Produção (sempre estável, deploy automático)
- **`develop`** - Desenvolvimento (testes e integração)
- **`feature/*`** - Features individuais

---

## 🔒 **Arquivos Protegidos (NUNCA commitar)**

✅ **.gitignore já protege:**
- `.env.local` - Variáveis locais
- `.env.production` - Variáveis de produção
- `node_modules/` - Dependências
- `.next/` - Build do Next.js
- `temp/` - Arquivos temporários
- Credenciais e tokens

⚠️ **SEMPRE commitar:**
- `.env.local.example` - Template de variáveis
- `pnpm-lock.yaml` - Lock de dependências
- Código-fonte e configurações

---

## 🎯 **Workflow Diário**

### **1. Antes de começar o dia:**

```bash
# Atualizar repositório
git checkout develop
git pull origin develop

# Criar branch de feature
git checkout -b feature/nome-da-feature
```

### **2. Durante o desenvolvimento:**

```bash
# Ver o que mudou
git status

# Adicionar arquivos específicos (NUNCA use git add .)
git add apps/web/components/...
git add apps/web/lib/...

# Commit com mensagem clara
git commit -m "feat: adicionar componente X"
```

### **3. Finalizar feature:**

```bash
# Push da feature
git push origin feature/nome-da-feature

# Criar Pull Request no GitHub
# Aguardar review e merge
```

---

## 📝 **Padrão de Commits (Conventional Commits)**

### **Formato:**
```
tipo(escopo): descrição curta

Descrição detalhada (opcional)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### **Tipos:**

- **`feat`** - Nova funcionalidade
  ```bash
  git commit -m "feat(cursos): adicionar filtro por categoria"
  ```

- **`fix`** - Correção de bug
  ```bash
  git commit -m "fix(newsletter): corrigir validação de email"
  ```

- **`refactor`** - Refatoração de código
  ```bash
  git commit -m "refactor(database): migrar de Payload para Supabase"
  ```

- **`docs`** - Documentação
  ```bash
  git commit -m "docs: atualizar README com instruções Supabase"
  ```

- **`style`** - Formatação, estilo
  ```bash
  git commit -m "style(button): ajustar espaçamento do botão"
  ```

- **`test`** - Testes
  ```bash
  git commit -m "test(api): adicionar testes para rota de newsletter"
  ```

- **`chore`** - Tarefas de manutenção
  ```bash
  git commit -m "chore: atualizar dependências"
  ```

- **`perf`** - Performance
  ```bash
  git commit -m "perf(images): otimizar carregamento de imagens"
  ```

---

## 🚀 **Deploy para Produção**

### **Automático (GitHub → Supabase/VPS):**

```bash
# 1. Merge develop → main
git checkout main
git merge develop

# 2. Trocar para modo produção
# Verificar que em produção:
# NEXT_PUBLIC_USE_MOCK_DATA=false

# 3. Push para produção
git push origin main

# 4. GitHub Actions + Supabase fazem deploy automático
```

### **Manual (VPS Hostinger):**

```bash
# 1. SSH no VPS
ssh user@nutrindojuntos.com.br

# 2. Atualizar código
cd /home/user/nutrindojuntos
git pull origin main

# 3. Rebuild
docker-compose -f docker-compose.production.yml up -d --build

# 4. Verificar
curl https://nutrindojuntos.com.br/api/health
```

---

## 🔄 **Supabase + GitHub Integration**

### **O que acontece automaticamente:**

1. **Push para `main`** →
2. **GitHub Actions** executa testes →
3. **Supabase** roda migrations se houver →
4. **Deploy** automático

### **Migrations Supabase:**

```bash
# Criar nova migration
supabase migration new nome_da_migration

# Editar arquivo em:
supabase/migrations/TIMESTAMP_nome_da_migration.sql

# Commit e push
git add supabase/migrations/
git commit -m "feat(db): adicionar tabela de pagamentos"
git push origin develop
```

---

## ✅ **Checklist Antes de Commitar**

```bash
# 1. Verificar o que mudou
git status
git diff

# 2. Rodar testes localmente
pnpm --filter web lint
pnpm --filter web type-check

# 3. Verificar se .env.local NÃO está sendo commitado
git status | grep .env.local
# (não deve aparecer nada!)

# 4. Adicionar apenas arquivos necessários
git add apps/web/...

# 5. Commit com mensagem clara
git commit -m "tipo(escopo): descrição"

# 6. Push
git push origin branch-name
```

---

## 🚨 **Situações de Emergência**

### **Committou .env.local por engano:**

```bash
# PARAR IMEDIATAMENTE!
# NÃO fazer push ainda!

# Remover do staging
git reset HEAD .env.local

# Se já fez commit mas NÃO push:
git reset --soft HEAD~1
git reset HEAD .env.local
git commit -m "mensagem correta"

# Se já fez PUSH:
# 1. Rotacionar TODAS as credenciais imediatamente
# 2. Gerar novas keys no Supabase/Brevo
# 3. Atualizar .env.local
```

### **Deploy quebrou produção:**

```bash
# Rollback rápido no VPS
ssh user@server
cd /home/user/nutrindojuntos
git reset --hard HEAD~1
docker-compose -f docker-compose.production.yml up -d --build

# Ou usar branch anterior
git checkout HASH_DO_COMMIT_ANTERIOR
docker-compose -f docker-compose.production.yml up -d --build
```

---

## 📊 **Monitoramento**

### **Após cada deploy, verificar:**

```bash
# 1. Health check
curl https://nutrindojuntos.com.br/api/health

# 2. Logs do servidor
docker logs -f nutrindo-web

# 3. Supabase Dashboard
# Verificar se migrations rodaram
# Verificar se não há erros

# 4. Sentry (se configurado)
# Verificar novos erros
```

---

## 🎓 **Boas Práticas**

✅ **SEMPRE:**
- Fazer pull antes de começar
- Commits pequenos e frequentes
- Mensagens descritivas
- Testar localmente antes de commitar
- Revisar código antes de push

❌ **NUNCA:**
- Commitar diretamente na `main`
- Usar `git add .` (sempre específico!)
- Commitar arquivos `.env.*` (exceto .example)
- Force push em branches compartilhadas
- Commitar `node_modules/` ou `.next/`

---

## 🔗 **Links Úteis**

- **GitHub Repo:** https://github.com/seu-usuario/nutrindojuntos
- **Supabase Dashboard:** https://supabase.com/dashboard/project/pdtrujakhknawlvklrap
- **Produção:** https://nutrindojuntos.com.br
- **Staging:** https://staging.nutrindojuntos.com.br (se tiver)

---

## 📝 **Exemplo Completo de Workflow**

```bash
# 1. Nova feature
git checkout develop
git pull origin develop
git checkout -b feature/adicionar-filtro-cursos

# 2. Desenvolver
# ... codificar ...

# 3. Testar
pnpm --filter web dev
# ... testar manualmente ...
pnpm --filter web lint
pnpm --filter web type-check

# 4. Commit
git status
git add apps/web/components/courses/CourseFilter.tsx
git add apps/web/app/cursos/page.tsx
git commit -m "feat(cursos): adicionar filtro por categoria e nível

Permite filtrar cursos por:
- Categoria (Nutrição Clínica, Esportiva, etc)
- Nível (Iniciante, Intermediário, Avançado)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 5. Push
git push origin feature/adicionar-filtro-cursos

# 6. Criar PR no GitHub
# ... aguardar review ...

# 7. Após merge, deletar branch local
git checkout develop
git pull origin develop
git branch -d feature/adicionar-filtro-cursos
```

---

**Última atualização:** 2025-01-15
**Responsável:** Equipe NUTRINDO JUNTOS
