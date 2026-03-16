# 🔐 CONFIGURAÇÃO DE CONTAS - Guia Passo a Passo

**Tempo Total Estimado:** 30-40 minutos
**Última Atualização:** 14/11/2025

---

## 📋 Índice

1. [Supabase (Database)](#1-supabase-database)
2. [Cloudinary (Imagens)](#2-cloudinary-imagens)
3. [Brevo (Email Marketing)](#3-brevo-email-marketing)
4. [Vercel (Deploy Frontend - Opcional Agora)](#4-vercel-deploy-frontend)

---

## 1. Supabase (Database)

### ⏱️ Tempo: ~10 minutos

### Passo 1: Criar Projeto

1. Acesse: https://supabase.com/dashboard
2. Click em **"New Project"**
3. Preencha:
   - **Name:** `nutrindo-juntos-dev`
   - **Database Password:** [Gere uma senha forte e **GUARDE EM LUGAR SEGURO**]
   - **Region:** `South America (São Paulo)` ← **IMPORTANTE**
   - **Pricing Plan:** `Free` (suficiente para desenvolvimento)

4. Click **"Create new project"**
5. ⏳ Aguarde ~2 minutos (criação do database)

### Passo 2: Obter Connection String

1. No dashboard do projeto, vá em: **Settings** (ícone de engrenagem)
2. Click em **"Database"** no menu lateral
3. Procure a seção **"Connection string"**
4. Selecione **"URI"** (não "Session mode")
5. Copie a string que aparece (formato: `postgresql://postgres:[YOUR-PASSWORD]@...`)

**⚠️ IMPORTANTE:** Substitua `[YOUR-PASSWORD]` pela senha que você criou no Passo 1!

### Passo 3: Adicionar ao .env

Abra o arquivo `apps/cms/.env` e adicione:

```bash
DATABASE_URI=postgresql://postgres:SUA-SENHA-AQUI@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

### ✅ Verificar Configuração

Para testar se está funcionando:

```bash
# Opção 1: Via psql (se tiver instalado)
psql "postgresql://postgres:SUA-SENHA@db.xxxxx.supabase.co:5432/postgres"

# Opção 2: No dashboard Supabase
# Vá em "SQL Editor" e execute: SELECT version();
```

---

## 2. Cloudinary (Imagens)

### ⏱️ Tempo: ~5 minutos

### Passo 1: Acessar Dashboard

1. Acesse: https://console.cloudinary.com/
2. Faça login com sua conta existente
3. Você verá o **Dashboard principal**

### Passo 2: Obter Credenciais

No topo do dashboard, você verá um card **"Account Details"** ou **"Product Environment Credentials"**.

Copie as seguintes informações:

1. **Cloud name** (ex: `dxxxxx`)
2. **API Key** (número grande, ex: `123456789012345`)
3. **API Secret** (string alfanumérica)

💡 **Dica:** Click no ícone de "olho" para revelar o API Secret.

### Passo 3: Adicionar ao .env

Abra o arquivo `apps/cms/.env` e adicione:

```bash
CLOUDINARY_CLOUD_NAME=seu-cloud-name-aqui
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abc123xyz456-sua-api-secret
```

### Passo 4: Configurar Upload Preset (Opcional mas Recomendado)

1. No menu lateral, vá em **Settings** → **Upload**
2. Procure **"Upload presets"**
3. Click em **"Add upload preset"**
4. Configure:
   - **Preset name:** `nutrindo-juntos`
   - **Signing Mode:** `Signed`
   - **Folder:** `nutrindo-juntos/` (organiza uploads)
   - **Allowed formats:** `jpg,png,gif,webp`
5. **Save**

### ✅ Verificar Configuração

Teste no terminal:

```bash
curl -X POST "https://api.cloudinary.com/v1_1/SEU-CLOUD-NAME/image/upload" \
  -u "SUA-API-KEY:SEU-API-SECRET" \
  -F "file=https://picsum.photos/200" \
  -F "upload_preset=nutrindo-juntos"
```

Se retornar JSON com `secure_url`, está funcionando! ✅

---

## 3. Brevo (Email Marketing)

### ⏱️ Tempo: ~15 minutos

### Passo 1: Gerar API Key

1. Acesse: https://app.brevo.com/
2. Faça login
3. No menu superior direito, click no seu **nome**
4. Vá em **"SMTP & API"**
5. Na aba **"API Keys"**, click em **"Generate a new API key"**
6. Preencha:
   - **Name:** `nutrindo-juntos-dev`
7. Click **"Generate"**
8. **⚠️ COPIE A CHAVE AGORA** (começa com `xkeysib-...`) - ela só aparece uma vez!

### Passo 2: Criar Listas de Contatos

1. No menu lateral, vá em **"Contacts"** → **"Lists"**
2. Click em **"Create a list"**
3. Crie **4 listas** com os seguintes nomes:

**Lista 1: Newsletter**
- **Name:** `Newsletter NUTRINDO JUNTOS`
- **Folder:** Pode deixar em branco ou criar `NUTRINDO JUNTOS`
- Click **"Create"**
- **📝 Anote o ID da lista** (aparece na URL: `.../lists/123`)

**Lista 2: Leads - Cursos**
- **Name:** `Leads - Interesse em Cursos`
- **Folder:** `NUTRINDO JUNTOS`
- Click **"Create"**
- **📝 Anote o ID da lista**

**Lista 3: Leads - Mentoria**
- **Name:** `Leads - Interesse em Mentoria`
- **Folder:** `NUTRINDO JUNTOS`
- Click **"Create"**
- **📝 Anote o ID da lista**

**Lista 4: Contato Geral**
- **Name:** `Formulário de Contato`
- **Folder:** `NUTRINDO JUNTOS`
- Click **"Create"**
- **📝 Anote o ID da lista**

### Passo 3: Adicionar ao .env

Abra o arquivo `apps/web/.env.local` e adicione:

```bash
# Brevo
BREVO_API_KEY=xkeysib-sua-chave-completa-aqui
BREVO_LIST_NEWSLETTER=1       # Substitua pelo ID real
BREVO_LIST_LEADS_CURSOS=2     # Substitua pelo ID real
BREVO_LIST_LEADS_MENTORIA=3   # Substitua pelo ID real
BREVO_LIST_CONTATO=4          # Substitua pelo ID real
```

### Passo 4: Criar Templates de Email (Opcional - Pode fazer depois)

**Você pode pular isso agora** e criar os templates quando implementarmos os formulários na Fase 5.

Mas se quiser adiantar:

1. Vá em **"Campaigns"** → **"Templates"**
2. Click **"Create a template"**
3. Use o editor drag-and-drop
4. Templates necessários:
   - **Newsletter Welcome** - Boas-vindas newsletter
   - **Curso Confirmação** - Confirmação interesse curso
   - **Mentoria Confirmação** - Confirmação interesse mentoria
   - **Contato Confirmação** - Confirmação formulário contato

### ✅ Verificar Configuração

Teste a API:

```bash
curl -X GET "https://api.brevo.com/v3/account" \
  -H "api-key: SUA-API-KEY-AQUI"
```

Deve retornar JSON com informações da sua conta. ✅

---

## 4. Vercel (Deploy Frontend)

### ⏱️ Tempo: ~5 minutos

**📌 NOTA:** Você pode configurar isso **DEPOIS**, quando estivermos prontos para deploy (Fase 7). Por enquanto, vamos apenas preparar.

### Passo 1: Criar Projeto Vercel (Opcional Agora)

1. Acesse: https://vercel.com/
2. Faça login
3. Click em **"Add New..."** → **"Project"**
4. **Import Git Repository:**
   - Conecte seu GitHub
   - Selecione o repositório `nutrindo-juntos`
5. **Configure Project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `apps/web`
   - **Build Command:** `pnpm build`
   - **Output Directory:** `.next`
6. **Environment Variables:** Adicione depois (Fase 7)
7. Click **"Deploy"** (ou **"Skip for now"**)

### ✅ Por Enquanto:

Você **NÃO precisa** fazer deploy agora. Apenas tenha a conta criada. Voltaremos a isso na **Fase 7: Deploy**.

---

## 🔑 Gerando PAYLOAD_SECRET

### Método 1: Node.js (Recomendado)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie o resultado (64 caracteres) e adicione em `apps/cms/.env`:

```bash
PAYLOAD_SECRET=abc123def456...seu-secret-64-chars
```

### Método 2: OpenSSL

```bash
openssl rand -hex 32
```

### Método 3: Online

Acesse: https://generate-secret.vercel.app/32

**⚠️ IMPORTANTE:** Use um secret diferente para desenvolvimento e produção!

---

## 📝 Checklist Final

Depois de configurar tudo, seus arquivos `.env` devem estar assim:

### ✅ apps/web/.env.local

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Payload CMS API
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3001/api

# Brevo
BREVO_API_KEY=xkeysib-xxxxx... (✅ preenchido)
BREVO_LIST_NEWSLETTER=1 (✅ ID real)
BREVO_LIST_LEADS_CURSOS=2 (✅ ID real)
BREVO_LIST_LEADS_MENTORIA=3 (✅ ID real)
BREVO_LIST_CONTATO=4 (✅ ID real)

# Google Analytics (deixe vazio por enquanto)
# NEXT_PUBLIC_GA_ID=

# Sentry (deixe vazio por enquanto)
# NEXT_PUBLIC_SENTRY_DSN=
```

### ✅ apps/cms/.env

```bash
# Node
NODE_ENV=development
PORT=3001

# Database
DATABASE_URI=postgresql://postgres:SENHA@db.xxxxx.supabase.co:5432/postgres (✅ preenchido)

# Payload
PAYLOAD_SECRET=abc123...64-chars (✅ gerado)
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001

# Cloudinary
CLOUDINARY_CLOUD_NAME=dxxxxx (✅ preenchido)
CLOUDINARY_API_KEY=123456789012345 (✅ preenchido)
CLOUDINARY_API_SECRET=abc123xyz (✅ preenchido)

# CORS
PAYLOAD_PUBLIC_CORS=http://localhost:3000
```

---

## 🚀 Testar Tudo

Depois de configurar os `.env`, teste se está tudo funcionando:

```bash
# 1. Instalar dependências
pnpm install

# 2. Iniciar CMS (vai conectar no Supabase)
pnpm dev:cms

# Se aparecer "Payload Admin URL: http://localhost:3001/admin", está funcionando! ✅

# 3. Em outro terminal, iniciar frontend
pnpm dev:web

# Acesse http://localhost:3000 - deve aparecer a página! ✅
```

---

## ❓ Problemas Comuns

### "Cannot connect to database"
- ✅ Verificar DATABASE_URI no .env
- ✅ Verificar se substituiu [YOUR-PASSWORD] pela senha real
- ✅ Verificar se o projeto Supabase está ativo

### "Cloudinary authentication failed"
- ✅ Verificar API Key e Secret no .env
- ✅ Verificar se não tem espaços extras
- ✅ Tentar regenerar API Key no Cloudinary

### "Brevo API error"
- ✅ Verificar se a chave começa com `xkeysib-`
- ✅ Verificar se os IDs das listas estão corretos
- ✅ Testar a API key com o curl acima

### "PAYLOAD_SECRET is required"
- ✅ Gerar secret com 32+ caracteres
- ✅ Verificar se está no arquivo .env (não .env.example)

---

## 📞 Precisa de Ajuda?

Se encontrar algum problema:

1. **Verificar logs:** `pnpm dev:cms` mostra erros detalhados
2. **Verificar .env:** Confirme que não há espaços ou quebras de linha
3. **Documentação oficial:**
   - Supabase: https://supabase.com/docs
   - Cloudinary: https://cloudinary.com/documentation
   - Brevo: https://developers.brevo.com
   - Payload: https://payloadcms.com/docs

---

**Próximo Passo:** Após configurar tudo, volte e me avise que está pronto para a **Fase 2**! 🚀

**Última Atualização:** 14/11/2025
