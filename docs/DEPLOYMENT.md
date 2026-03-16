# 🚀 DEPLOYMENT.md - Guia de Deploy em Produção

**Projeto:** NUTRINDO JUNTOS
**Versão:** 1.0
**Data:** 14/11/2025

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Ambientes](#ambientes)
3. [Deploy Frontend (Vercel)](#deploy-frontend-vercel)
4. [Deploy CMS (VPS Hostinger)](#deploy-cms-vps-hostinger)
5. [Configuração Database (Supabase)](#configuração-database-supabase)
6. [Configuração DNS](#configuração-dns)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Rollback Strategy](#rollback-strategy)
9. [Monitoring & Alerts](#monitoring--alerts)
10. [Troubleshooting](#troubleshooting)

---

## 1. Visão Geral

### Arquitetura de Deploy

```
┌────────────────────────────────────────────────┐
│            nutrindojuntos.com.br               │
│                 (Cloudflare DNS)               │
└───────────────┬────────────────────────────────┘
                │
       ┌────────┴────────┐
       │                 │
       ↓                 ↓
┌──────────────┐  ┌──────────────────┐
│   Frontend   │  │   CMS + API      │
│   (Vercel)   │  │ (VPS Hostinger)  │
│              │  │                  │
│ Next.js 15   │  │ Payload CMS      │
│ Static + SSR │  │ Node.js 18+      │
│              │  │ PM2              │
└──────────────┘  └──────────────────┘
       │                 │
       │                 ↓
       │          ┌──────────────┐
       │          │  PostgreSQL  │
       │          │  (Supabase)  │
       │          └──────────────┘
       │
       ↓
┌──────────────────────────────────┐
│       Integrações Externas       │
│  - Brevo (Email)                 │
│  - Cloudinary (Images)           │
│  - Google Analytics              │
│  - Sentry                        │
└──────────────────────────────────┘
```

### Checklist Pré-Deploy

```yaml
accounts_created:
  - ✅ Vercel
  - ✅ Supabase
  - ✅ Brevo
  - ✅ Cloudinary
  - ✅ Google Analytics
  - ✅ Sentry (opcional)
  - ✅ UptimeRobot (opcional)

domains:
  - ✅ nutrindojuntos.com.br (registrado)
  - ⚪ cms.nutrindojuntos.com.br (apontar para VPS)

vps_setup:
  - ✅ Node.js 18+ instalado
  - ✅ PM2 instalado
  - ✅ Nginx instalado
  - ✅ PostgreSQL instalado (ou usar Supabase)
  - ✅ SSL (Let's Encrypt)

repositories:
  - ✅ GitHub repo criado
  - ✅ Branches: main, develop
  - ✅ GitHub Actions configurado
```

---

## 2. Ambientes

### Development (Local)

```yaml
urls:
  frontend: http://localhost:3000
  cms: http://localhost:3001
  database: Supabase development project

environment: development

features:
  - Hot reload
  - Source maps
  - Debug mode
  - Local PostgreSQL ou Supabase dev

access: Developers only
```

### Staging (Preview)

```yaml
urls:
  frontend: https://staging.nutrindojuntos.com.br
  cms: https://cms-staging.nutrindojuntos.com.br
  database: Supabase staging project

environment: staging

features:
  - Production-like
  - Test integrations
  - QA testing
  - Sentry (separate project)

access: Team + stakeholders

deploy_trigger:
  - Push to branch 'develop'
  - Manual deploy
```

### Production

```yaml
urls:
  frontend: https://nutrindojuntos.com.br
  cms: https://cms.nutrindojuntos.com.br
  database: Supabase production project

environment: production

features:
  - Optimized builds
  - Monitoring enabled
  - Analytics enabled
  - Error tracking
  - Uptime monitoring

access: Public

deploy_trigger:
  - Push to branch 'main'
  - Manual approval required
```

---

## 3. Deploy Frontend (Vercel)

### 3.1 Setup Inicial no Vercel

**Passo 1: Conectar Repositório**

```bash
# Via Vercel CLI
npm i -g vercel
vercel login
cd apps/web
vercel
```

Ou via Dashboard:
1. Acesse https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import do GitHub: `seu-usuario/nutrindo-juntos`
4. Root Directory: `apps/web`
5. Framework Preset: Next.js

**Passo 2: Configurar Build Settings**

```yaml
# Vercel Dashboard → Project Settings → Build & Development

build_command: pnpm build
output_directory: .next
install_command: pnpm install --frozen-lockfile
development_command: pnpm dev

# Root Directory
root_directory: apps/web

# Node Version
node_version: 18.x
```

**Passo 3: Variáveis de Ambiente**

No Vercel Dashboard → Project → Settings → Environment Variables:

```bash
# Next.js
NEXT_PUBLIC_SITE_URL=https://nutrindojuntos.com.br

# Payload CMS API
NEXT_PUBLIC_PAYLOAD_API_URL=https://cms.nutrindojuntos.com.br/api

# Brevo
BREVO_API_KEY=xkeysib-xxxxxxxxxx
BREVO_LIST_NEWSLETTER=123
BREVO_LIST_LEADS_CURSOS=124
BREVO_LIST_LEADS_MENTORIA=125
BREVO_LIST_CONTATO=126

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry (opcional)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_AUTH_TOKEN=xxx

# Environments: Production, Preview, Development
```

**Passo 4: Configurar Domínio**

```bash
# Via CLI
vercel domains add nutrindojuntos.com.br

# Ou via Dashboard
# Settings → Domains → Add Domain
# Adicionar: nutrindojuntos.com.br
# Configurar: www.nutrindojuntos.com.br → redirect para apex
```

**Passo 5: Deploy**

```bash
# Deploy automático
git push origin main

# Ou manual via CLI
cd apps/web
vercel --prod
```

### 3.2 Configuração de Deploy

**vercel.json** (raiz do projeto):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "apps/web/$1"
    }
  ]
}
```

### 3.3 Otimizações Vercel

```yaml
# Vercel Dashboard → Project Settings

edge_config:
  enabled: true
  regions: [iad1, sfo1, gru1]  # US East, West, Brazil

image_optimization:
  enabled: true
  formats: [avif, webp]
  sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]

headers:
  cache_control: public, max-age=31536000, immutable
  x_frame_options: DENY

redirects:
  - source: /admin
    destination: https://cms.nutrindojuntos.com.br/admin
    permanent: true
```

---

## 4. Deploy CMS (VPS Hostinger)

### 4.1 Preparação da VPS

**Passo 1: Conectar via SSH**

```bash
ssh root@seu-vps-ip
# Ou com chave SSH
ssh -i ~/.ssh/id_rsa root@seu-vps-ip
```

**Passo 2: Instalar Dependências**

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalação
node --version  # v18.x.x
npm --version   # 9.x.x

# Instalar pnpm
npm install -g pnpm

# Instalar PM2 (process manager)
npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx

# Instalar Certbot (SSL)
sudo apt install -y certbot python3-certbot-nginx
```

**Passo 3: Configurar PostgreSQL (Opcional - se não usar Supabase)**

```bash
# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Criar database
sudo -u postgres psql
CREATE DATABASE nutrindo_juntos;
CREATE USER nutrindo_user WITH ENCRYPTED PASSWORD 'sua_senha_forte';
GRANT ALL PRIVILEGES ON DATABASE nutrindo_juntos TO nutrindo_user;
\q
```

### 4.2 Deploy Payload CMS

**Passo 1: Clone do Repositório**

```bash
# Criar diretório para aplicação
sudo mkdir -p /var/www/nutrindo-juntos
sudo chown -R $USER:$USER /var/www/nutrindo-juntos
cd /var/www/nutrindo-juntos

# Clone via HTTPS ou SSH
git clone git@github.com:seu-usuario/nutrindo-juntos.git .

# Instalar dependências
pnpm install
```

**Passo 2: Configurar Variáveis de Ambiente**

```bash
# Criar arquivo .env no diretório do CMS
cd apps/cms
nano .env
```

Conteúdo do `.env`:

```bash
# Database (Supabase)
DATABASE_URI=postgresql://user:pass@host:5432/db?sslmode=require

# Payload
PAYLOAD_SECRET=gere-uma-chave-aleatoria-segura-aqui-min-32-chars
PAYLOAD_PUBLIC_SERVER_URL=https://cms.nutrindojuntos.com.br

# Cloudinary
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret

# Server
PORT=3001
NODE_ENV=production
```

**Passo 3: Build da Aplicação**

```bash
cd /var/www/nutrindo-juntos/apps/cms
pnpm build
```

**Passo 4: Configurar PM2**

Criar arquivo `ecosystem.config.js` em `/var/www/nutrindo-juntos`:

```javascript
module.exports = {
  apps: [{
    name: 'nutrindo-cms',
    cwd: '/var/www/nutrindo-juntos/apps/cms',
    script: 'dist/server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/log/pm2/nutrindo-cms-error.log',
    out_file: '/var/log/pm2/nutrindo-cms-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
```

Iniciar aplicação:

```bash
# Criar diretório de logs
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# Iniciar com PM2
pm2 start ecosystem.config.js

# Configurar PM2 para iniciar no boot
pm2 startup systemd
# Execute o comando que o PM2 mostrar

pm2 save

# Verificar status
pm2 status
pm2 logs nutrindo-cms
```

### 4.3 Configurar Nginx

**Criar arquivo de configuração:**

```bash
sudo nano /etc/nginx/sites-available/nutrindo-cms
```

Conteúdo:

```nginx
server {
    listen 80;
    server_name cms.nutrindojuntos.com.br;

    # Logs
    access_log /var/log/nginx/nutrindo-cms-access.log;
    error_log /var/log/nginx/nutrindo-cms-error.log;

    # Proxy para Payload CMS
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Upload limit
    client_max_body_size 50M;
}
```

**Ativar configuração:**

```bash
# Criar symlink
sudo ln -s /etc/nginx/sites-available/nutrindo-cms /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### 4.4 Configurar SSL (Let's Encrypt)

```bash
# Gerar certificado SSL
sudo certbot --nginx -d cms.nutrindojuntos.com.br

# Responder às perguntas:
# Email: seu@email.com
# Termos: Agree
# Redirect HTTP to HTTPS: Yes (2)

# Certificado será renovado automaticamente
# Testar renovação automática:
sudo certbot renew --dry-run
```

### 4.5 Scripts de Deploy

Criar script de deploy em `/var/www/nutrindo-juntos/deploy-cms.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Iniciando deploy do Payload CMS..."

# Ir para diretório do projeto
cd /var/www/nutrindo-juntos

# Pull das alterações
echo "📥 Baixando alterações do git..."
git pull origin main

# Instalar dependências
echo "📦 Instalando dependências..."
pnpm install --frozen-lockfile

# Build
echo "🔨 Buildando aplicação..."
cd apps/cms
pnpm build

# Reiniciar PM2
echo "🔄 Reiniciando aplicação..."
pm2 restart nutrindo-cms

echo "✅ Deploy concluído com sucesso!"

# Verificar status
pm2 status
```

Dar permissão de execução:

```bash
chmod +x /var/www/nutrindo-juntos/deploy-cms.sh
```

Uso:

```bash
/var/www/nutrindo-juntos/deploy-cms.sh
```

---

## 5. Configuração Database (Supabase)

### 5.1 Criar Projeto no Supabase

1. Acesse https://supabase.com/dashboard
2. Click "New Project"
3. Configurações:
   - Name: `nutrindo-juntos-prod`
   - Database Password: [gerar senha forte]
   - Region: `South America (São Paulo)`
   - Pricing Plan: `Free` (inicialmente)
4. Aguardar criação (~2 minutos)

### 5.2 Obter Connection String

No Dashboard do Supabase:

1. Settings → Database → Connection string
2. Copiar URI mode:

```
postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJECT-REF].supabase.co:5432/postgres
```

3. Adicionar ao `.env` do Payload CMS

### 5.3 Configurar Backups

```yaml
# Supabase oferece backups automáticos

free_tier:
  automatic_backups: 7 dias
  point_in_time_recovery: Não

pro_tier:
  automatic_backups: 30 dias
  point_in_time_recovery: Sim
```

---

## 6. Configuração DNS

### 6.1 Registro.br (ou seu provedor)

**Domínio Principal:**

```yaml
# nutrindojuntos.com.br → Vercel
type: A
host: @
value: 76.76.21.21  # Vercel IP (ver Vercel dashboard)
ttl: 3600

# www.nutrindojuntos.com.br → Vercel
type: CNAME
host: www
value: cname.vercel-dns.com
ttl: 3600
```

**Subdomínio CMS:**

```yaml
# cms.nutrindojuntos.com.br → VPS
type: A
host: cms
value: [SEU-IP-DA-VPS]
ttl: 3600
```

### 6.2 Cloudflare (Opcional - Recomendado)

Para adicionar layer extra de CDN e segurança:

1. Criar conta no Cloudflare
2. Add Site: `nutrindojuntos.com.br`
3. Cloudflare fornecerá nameservers
4. Atualizar nameservers no Registro.br:
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```
5. Aguardar propagação (até 24h)

**Configurações Cloudflare:**

```yaml
ssl_tls:
  mode: Full (strict)
  edge_certificates: Automatic

caching:
  level: Standard
  browser_cache_ttl: 4 hours

speed:
  auto_minify: HTML, CSS, JS
  brotli: Enabled

security:
  security_level: Medium
  browser_integrity_check: On
```

---

## 7. CI/CD Pipeline

### 7.1 GitHub Actions Workflow

Criar arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run linting
        run: pnpm lint

      - name: Run type check
        run: pnpm type-check

      - name: Run tests
        run: pnpm test

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: apps/web

  deploy-cms:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/nutrindo-juntos
            ./deploy-cms.sh
```

**Secrets no GitHub:**

Repository → Settings → Secrets and variables → Actions → New secret:

```
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx
VPS_HOST=seu-ip
VPS_USERNAME=seu-usuario
VPS_SSH_KEY=sua-chave-privada-ssh
```

---

## 8. Rollback Strategy

### 8.1 Rollback Frontend (Vercel)

**Via Dashboard:**
1. Vercel Dashboard → Project → Deployments
2. Encontrar deploy anterior estável
3. Click nos três pontos → "Promote to Production"

**Via CLI:**
```bash
vercel rollback
# Ou específico
vercel rollback [deployment-url]
```

### 8.2 Rollback CMS (VPS)

```bash
# Voltar commit anterior
cd /var/www/nutrindo-juntos
git log  # Ver commits
git checkout [commit-hash-anterior]

# Rebuild e restart
cd apps/cms
pnpm build
pm2 restart nutrindo-cms

# Ou usar branches
git checkout main
git reset --hard origin/main
```

### 8.3 Rollback Database

**Supabase:**
```sql
-- Point-in-time recovery (Pro tier)
-- Via Dashboard: Database → Backups → Restore

-- Free tier: Backup manual antes de mudanças grandes
pg_dump > backup-$(date +%Y%m%d).sql
```

---

## 9. Monitoring & Alerts

### 9.1 Vercel Analytics

Automático. Ver em:
- Vercel Dashboard → Project → Analytics

### 9.2 Sentry (Error Tracking)

```bash
# Configurado automaticamente via next.config.js
# Errors aparecem em: https://sentry.io/organizations/[org]/issues
```

### 9.3 UptimeRobot

1. Criar conta: https://uptimerobot.com
2. Add Monitor:
   - Type: HTTP(s)
   - URL: https://nutrindojuntos.com.br
   - Interval: 5 minutes
3. Add outro monitor:
   - URL: https://cms.nutrindojuntos.com.br/api/health
4. Configurar alertas (email, webhook)

### 9.4 PM2 Monitoring

```bash
# Via CLI
pm2 monit

# Web dashboard (opcional)
pm2 plus  # Criar conta em pm2.io
```

---

## 10. Troubleshooting

### Problema: Frontend não carrega

**Sintomas:** Erro 500 ou página em branco

**Solução:**
```bash
# 1. Verificar logs do Vercel
vercel logs [deployment-url]

# 2. Verificar variáveis de ambiente
# Vercel Dashboard → Settings → Environment Variables

# 3. Testar build localmente
cd apps/web
pnpm build
pnpm start
```

### Problema: CMS não responde

**Sintomas:** 502 Bad Gateway ou timeout

**Solução:**
```bash
# 1. Verificar se PM2 está rodando
pm2 status

# 2. Ver logs do PM2
pm2 logs nutrindo-cms --lines 100

# 3. Verificar Nginx
sudo nginx -t
sudo systemctl status nginx

# 4. Reiniciar serviços
pm2 restart nutrindo-cms
sudo systemctl restart nginx
```

### Problema: Database connection failed

**Sintomas:** Erro "connection refused" ou "timeout"

**Solução:**
```bash
# 1. Testar conexão diretamente
psql "postgresql://..."

# 2. Verificar .env
cat apps/cms/.env | grep DATABASE_URI

# 3. Verificar Supabase status
# Dashboard → Settings → Database → Connection string

# 4. Verificar firewall (se PostgreSQL local)
sudo ufw status
sudo ufw allow 5432/tcp
```

### Problema: SSL certificate error

**Sintomas:** "Certificate not trusted" ou "Invalid certificate"

**Solução:**
```bash
# 1. Renovar certificado Let's Encrypt
sudo certbot renew

# 2. Verificar configuração Nginx
sudo nginx -t

# 3. Verificar certificados
sudo certbot certificates

# 4. Forçar renovação se necessário
sudo certbot renew --force-renewal
```

---

## 📊 Checklist Final de Deploy

```yaml
pre_deploy:
  - ✅ Todos os testes passando
  - ✅ Build funcionando localmente
  - ✅ Variáveis de ambiente configuradas
  - ✅ Domínios DNS propagados
  - ✅ SSL configurado

deploy:
  - ✅ Frontend deployed (Vercel)
  - ✅ CMS deployed (VPS)
  - ✅ Database conectado (Supabase)
  - ✅ Cloudinary configurado
  - ✅ Brevo configurado

post_deploy:
  - ✅ Smoke tests (páginas carregam)
  - ✅ Formulários funcionando
  - ✅ Emails enviando
  - ✅ Analytics tracking
  - ✅ Monitoring ativo
  - ✅ Backups configurados

security:
  - ✅ HTTPS funcionando
  - ✅ Security headers
  - ✅ Rate limiting
  - ✅ CORS configurado

performance:
  - ✅ Lighthouse score >90
  - ✅ Core Web Vitals "Good"
  - ✅ CDN caching
  - ✅ Images optimized
```

---

**Última Atualização:** 14/11/2025
**Próxima Revisão:** Após primeiro deploy em produção
