# ⚙️ SETUP.md - Guia de Configuração do Ambiente

**Projeto:** NUTRINDO JUNTOS
**Tempo Estimado:** 30-45 minutos
**Dificuldade:** Intermediária

---

## 📋 Pré-requisitos

### Software Necessário

```bash
# Verificar instalações
node --version    # Precisa: v18.0.0 ou superior
npm --version     # Precisa: v9.0.0 ou superior
git --version     # Qualquer versão recente

# Instalar pnpm (package manager)
npm install -g pnpm
pnpm --version    # Deve mostrar v8.x.x

# Docker (opcional para desenvolvimento, obrigatório para produção VPS)
docker --version           # Precisa: v20.0.0 ou superior
docker-compose --version   # Precisa: v2.0.0 ou superior
```

### Contas Necessárias

- ✅ GitHub (para código)
- ✅ Vercel (frontend hosting)
- ✅ Supabase (PostgreSQL)
- ✅ Brevo (email marketing)
- ✅ Cloudinary (imagens)
- ⚪ Google Analytics (opcional, mas recomendado)
- ⚪ Sentry (opcional)

---

## 🚀 Setup Rápido (5 minutos)

### Opção 1: Desenvolvimento com Docker (Recomendado)

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/nutrindo-juntos.git
cd nutrindo-juntos

# 2. Configure variáveis de ambiente (ver seção abaixo)
cp apps/web/.env.local.example apps/web/.env.local
cp apps/cms/.env.example apps/cms/.env
# Edite os arquivos .env com suas credenciais

# 3. Inicie o ambiente com Docker
docker-compose up -d

# 4. Instale dependências do frontend (Next.js roda nativo)
pnpm install
cd apps/web && pnpm dev

# Acesse:
# Frontend: http://localhost:3000
# CMS Admin: http://localhost:3001/admin
# Adminer (DB): http://localhost:8080 (use: docker-compose --profile tools up)
```

### Opção 2: Desenvolvimento Sem Docker

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/nutrindo-juntos.git
cd nutrindo-juntos

# 2. Instale as dependências
pnpm install

# 3. Configure variáveis de ambiente
cp apps/web/.env.local.example apps/web/.env.local
cp apps/cms/.env.example apps/cms/.env
# Edite os arquivos .env com suas credenciais

# 4. Inicie o ambiente de desenvolvimento
pnpm dev

# Acesse:
# Frontend: http://localhost:3000
# CMS Admin: http://localhost:3001/admin
```

> **💡 Dica:** Para desenvolvimento com Docker, veja o guia completo em [docs/DOCKER.md](DOCKER.md)

---

## 🔧 Configuração Detalhada

### 1. Supabase (Database)

**Criar Projeto:**
1. Acesse https://supabase.com/dashboard
2. Click "New Project"
3. Configurações:
   - Name: `nutrindo-juntos-dev`
   - Database Password: [gerar senha forte e guardar]
   - Region: `South America (São Paulo)`
   - Plan: `Free`
4. Aguardar criação (~2 min)

**Obter Connection String:**
1. Settings → Database → Connection string
2. Modo: URI
3. Copiar string (formato: `postgresql://postgres:[SENHA]@...`)

**Adicionar ao .env:**
```bash
# apps/cms/.env
DATABASE_URI=postgresql://postgres:[SUA-SENHA]@db.[PROJECT-REF].supabase.co:5432/postgres
```

---

### 2. Cloudinary (Imagens)

**Criar Conta:**
1. Acesse https://cloudinary.com/users/register_free
2. Preencha formulário
3. Confirme email

**Obter Credenciais:**
1. Dashboard → Settings → Upload
2. Copiar:
   - Cloud Name
   - API Key
   - API Secret

**Adicionar ao .env:**
```bash
# apps/cms/.env
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
```

---

### 3. Brevo (Email Marketing)

**Criar Conta:**
1. Acesse https://www.brevo.com/
2. Criar conta gratuita
3. Confirmar email

**Gerar API Key:**
1. Settings → SMTP & API → API Keys
2. Click "Generate a new API key"
3. Nome: `nutrindo-juntos-dev`
4. Copiar chave

**Criar Listas:**
1. Contacts → Lists
2. Criar 4 listas:
   - `Newsletter`
   - `Leads - Cursos`
   - `Leads - Mentoria`
   - `Contato Geral`
3. Anotar os IDs das listas

**Adicionar ao .env:**
```bash
# apps/web/.env.local
BREVO_API_KEY=xkeysib-xxxxxxxxxxxx
BREVO_LIST_NEWSLETTER=1  # ID da lista
BREVO_LIST_LEADS_CURSOS=2
BREVO_LIST_LEADS_MENTORIA=3
BREVO_LIST_CONTATO=4
```

---

### 4. Payload CMS Secret

**Gerar Secret Key:**
```bash
# Gerar chave aleatória segura
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Adicionar ao .env:**
```bash
# apps/cms/.env
PAYLOAD_SECRET=[CHAVE-GERADA-ACIMA]
```

---

### 5. Google Analytics (Opcional)

**Criar Propriedade:**
1. Acesse https://analytics.google.com
2. Admin → Create Property
3. Nome: `NUTRINDO JUNTOS`
4. Timezone: `Brazil`
5. Criar Web Stream

**Obter ID:**
1. Copy Measurement ID (formato: `G-XXXXXXXXXX`)

**Adicionar ao .env:**
```bash
# apps/web/.env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📝 Arquivo .env Completo

### apps/web/.env.local

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Payload CMS API
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3001/api

# Brevo
BREVO_API_KEY=xkeysib-xxxxxxxxxxxx
BREVO_LIST_NEWSLETTER=1
BREVO_LIST_LEADS_CURSOS=2
BREVO_LIST_LEADS_MENTORIA=3
BREVO_LIST_CONTATO=4

# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry (opcional)
# NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

### apps/cms/.env

```bash
# Database
DATABASE_URI=postgresql://postgres:[SENHA]@db.[REF].supabase.co:5432/postgres

# Payload
PAYLOAD_SECRET=[CHAVE-GERADA-32-CHARS]
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001

# Cloudinary
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret

# Server
PORT=3001
NODE_ENV=development
```

---

## 🧪 Verificar Setup

### Com Docker

```bash
# Verificar containers rodando
docker-compose ps

# Ver logs do CMS
docker-compose logs -f cms

# Acessar
# Frontend: http://localhost:3000
# CMS Admin: http://localhost:3001/admin
# Adminer: http://localhost:8080 (docker-compose --profile tools up)

# Criar primeiro usuário admin no CMS
# Email: seu@email.com
# Senha: [escolher senha forte]
```

### Sem Docker

```bash
# Testar frontend
cd apps/web
pnpm dev
# Abrir: http://localhost:3000

# Testar CMS (em outro terminal)
cd apps/cms
pnpm dev
# Abrir: http://localhost:3001/admin

# Criar primeiro usuário admin no CMS
# Email: seu@email.com
# Senha: [escolher senha forte]
```

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"

**Solução:**
1. Verificar `DATABASE_URI` no `.env`
2. Testar conexão diretamente:
   ```bash
   psql "postgresql://..."
   ```
3. Verificar se Supabase está ativo no dashboard

### Erro: "Cloudinary upload failed"

**Solução:**
1. Verificar credenciais no `.env`
2. Testar no dashboard: https://cloudinary.com/console
3. Verificar limite de upload (25MB free tier)

### Erro: "Brevo API error"

**Solução:**
1. Verificar `BREVO_API_KEY` no `.env`
2. Testar API:
   ```bash
   curl -X GET "https://api.brevo.com/v3/account" \
     -H "api-key: sua-api-key"
   ```
3. Verificar IDs das listas

### Port já em uso

**Solução:**
```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Ou porta 3001
lsof -ti:3001 | xargs kill -9

# Com Docker: parar containers
docker-compose down
```

### Docker: Container não inicia

**Solução:**
```bash
# Ver logs detalhados
docker-compose logs cms

# Rebuild imagem
docker-compose build --no-cache cms
docker-compose up -d cms

# Remover tudo e reiniciar (cuidado: remove volumes)
docker-compose down -v
docker-compose up -d
```

### Docker: PostgreSQL connection error

**Solução:**
```bash
# Verificar se PostgreSQL está rodando
docker-compose ps postgres

# Ver logs do PostgreSQL
docker-compose logs postgres

# Conectar diretamente ao PostgreSQL
docker-compose exec postgres psql -U nutrindo -d nutrindo_juntos

# Se usar Supabase, verificar DATABASE_URI no .env
```

---

## ✅ Checklist de Setup Completo

### Básico
- [ ] Node.js 18+ instalado
- [ ] pnpm instalado
- [ ] Docker instalado (opcional para dev, obrigatório para prod)
- [ ] Repositório clonado
- [ ] Dependências instaladas (`pnpm install`)

### Contas & Credenciais
- [ ] Conta Supabase criada
- [ ] Database connection string configurada
- [ ] Conta Cloudinary criada
- [ ] Credenciais Cloudinary configuradas
- [ ] Conta Brevo criada
- [ ] API key Brevo configurada
- [ ] Listas Brevo criadas (4 listas)
- [ ] Payload secret gerado

### Configuração
- [ ] Arquivos `.env` copiados dos templates
- [ ] `apps/web/.env.local` preenchido
- [ ] `apps/cms/.env` preenchido

### Verificação
- [ ] Docker containers rodando (se usando Docker)
- [ ] Frontend rodando (localhost:3000)
- [ ] CMS rodando (localhost:3001)
- [ ] Primeiro usuário admin criado no CMS
- [ ] Upload de imagem testado (Cloudinary)
- [ ] Formulário newsletter testado (Brevo)

---

## 📚 Próximos Passos

Após setup completo:

1. **Ler documentação completa:**
   - [CLAUDE.md](../CLAUDE.md) - Guia completo do projeto
   - [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitetura técnica
   - [DOCKER.md](DOCKER.md) - Guia completo Docker
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy em produção

2. **Começar desenvolvimento:**
   - Fase 1: Setup & Infraestrutura
   - Fase 2: Core (Layout & Componentes)

3. **Contato para dúvidas:**
   - Abrir issue no GitHub
   - Slack da equipe

---

**Última Atualização:** 14/11/2025
**Autor:** Time de Desenvolvimento NUTRINDO JUNTOS
