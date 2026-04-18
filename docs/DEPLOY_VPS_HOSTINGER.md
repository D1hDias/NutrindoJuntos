# 🚀 Deploy VPS Hostinger - NUTRINDO JUNTOS

## Visão Geral

Deploy simplificado para VPS Hostinger KVM 2 usando Docker.

## Arquitetura de Deploy

```
┌─────────────────────────────────────────┐
│  VPS Hostinger (KVM 2)                  │
│  ┌────────────────────────────────┐     │
│  │  Nginx (Reverse Proxy + SSL)   │     │
│  │  ↓                              │     │
│  │  Next.js Docker Container       │     │
│  │  (porta 3000)                   │     │
│  └────────────────────────────────┘     │
└─────────────────────────────────────────┘
                ↓
    ┌───────────────────────┐
    │  Supabase (Cloud)     │
    │  PostgreSQL + Storage │
    └───────────────────────┘
                ↓
    ┌───────────────────────┐
    │  Cloudflare CDN       │
    │  SSL + Cache          │
    └───────────────────────┘
```

## Pré-requisitos

### 1. VPS Configurado

```bash
# Specs mínimas
CPU: 2 cores
RAM: 4GB
Storage: 100GB SSD
OS: Ubuntu 22.04 LTS
```

### 2. Dependências Instaladas

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo apt install docker-compose-plugin -y

# Instalar Nginx
sudo apt install nginx -y

# Instalar Certbot (SSL)
sudo apt install certbot python3-certbot-nginx -y
```

### 3. Domínio Configurado

```bash
# DNS configurado no Registro.br
@ A    IP_DO_VPS
www A  IP_DO_VPS
```

## Estrutura de Arquivos

```
/home/user/nutrindojuntos/
├── .env.production             # Variáveis de produção
├── docker-compose.production.yml
├── apps/
│   └── web/
│       ├── Dockerfile.production
│       └── ...
└── nginx/
    └── nutrindojuntos.conf     # Config Nginx
```

## Passo a Passo

### 1. Clonar Repositório no VPS

```bash
cd /home/user
git clone https://github.com/seu-usuario/nutrindojuntos.git
cd nutrindojuntos
```

### 2. Configurar Variáveis de Ambiente

```bash
# Criar arquivo .env.production
nano .env.production
```

```env
# Site
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://nutrindojuntos.com.br

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Brevo
BREVO_API_KEY=xkeysib-your-api-key
BREVO_LIST_NEWSLETTER=3
BREVO_LIST_LEADS_CURSOS=4
BREVO_LIST_LEADS_MENTORIA=5
BREVO_LIST_CONTATO=6
CONTACT_EMAIL=atendimento@nutrindojuntos.com.br

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_AUTH_TOKEN=your_auth_token_here

# Rate Limiting (Upstash)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here

# Data Source
NEXT_PUBLIC_USE_MOCK_DATA=false  # IMPORTANTE: false em produção
```

### 3. Build da Aplicação

```bash
# Build e start
docker-compose -f docker-compose.production.yml up -d --build

# Ver logs
docker-compose -f docker-compose.production.yml logs -f web

# Status
docker-compose -f docker-compose.production.yml ps
```

### 4. Configurar Nginx

```bash
# Criar config
sudo nano /etc/nginx/sites-available/nutrindojuntos
```

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name nutrindojuntos.com.br www.nutrindojuntos.com.br;

    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name nutrindojuntos.com.br www.nutrindojuntos.com.br;

    # SSL (será configurado pelo Certbot)
    ssl_certificate /etc/letsencrypt/live/nutrindojuntos.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/nutrindojuntos.com.br/privkey.pem;

    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "origin-when-cross-origin" always;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss image/svg+xml;

    # Proxy para Next.js
    location / {
        proxy_pass http://localhost:3000;
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

    # Cache para assets estáticos
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }

    # Cache para imagens
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Health check
    location /api/health {
        proxy_pass http://localhost:3000;
        access_log off;
    }
}
```

```bash
# Ativar site
sudo ln -s /etc/nginx/sites-available/nutrindojuntos /etc/nginx/sites-enabled/

# Testar config
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### 5. Configurar SSL (Certbot)

```bash
# Obter certificado SSL
sudo certbot --nginx -d nutrindojuntos.com.br -d www.nutrindojuntos.com.br

# Renovação automática já está configurada
# Testar renovação
sudo certbot renew --dry-run
```

### 6. Configurar Firewall

```bash
# UFW (Firewall)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# Verificar status
sudo ufw status
```

## Scripts de Deploy

### Deploy Automático

```bash
#!/bin/bash
# scripts/deploy-vps.sh

set -e

echo "🚀 Iniciando deploy..."

# Pull latest code
git pull origin main

# Rebuild containers
docker-compose -f docker-compose.production.yml down
docker-compose -f docker-compose.production.yml up -d --build

# Health check
sleep 10
curl -f http://localhost:3000/api/health || exit 1

echo "✅ Deploy concluído com sucesso!"
```

```bash
# Tornar executável
chmod +x scripts/deploy-vps.sh

# Executar deploy
./scripts/deploy-vps.sh
```

### Rollback

```bash
#!/bin/bash
# scripts/rollback-vps.sh

set -e

echo "⏮️  Fazendo rollback..."

# Voltar para commit anterior
git reset --hard HEAD~1

# Rebuild
docker-compose -f docker-compose.production.yml up -d --build

echo "✅ Rollback concluído!"
```

## Monitoramento

### Logs

```bash
# Logs do Next.js
docker logs -f nutrindo-web

# Logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Health Check

```bash
# Verificar status da aplicação
curl https://nutrindojuntos.com.br/api/health

# Verificar SSL
openssl s_client -connect nutrindojuntos.com.br:443 -servername nutrindojuntos.com.br
```

### Recursos do Sistema

```bash
# Uso de recursos
docker stats

# Espaço em disco
df -h

# Memória
free -h
```

## Backup

### Backup Automático

```bash
# Criar script de backup
nano /home/user/backup.sh
```

```bash
#!/bin/bash
# Backup do projeto

BACKUP_DIR="/home/user/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Criar diretório de backup
mkdir -p $BACKUP_DIR

# Backup do código
tar -czf $BACKUP_DIR/nutrindojuntos_$DATE.tar.gz /home/user/nutrindojuntos

# Manter apenas últimos 7 backups
ls -t $BACKUP_DIR/*.tar.gz | tail -n +8 | xargs -r rm

echo "✅ Backup criado: nutrindojuntos_$DATE.tar.gz"
```

```bash
# Agendar backup diário (crontab)
crontab -e

# Adicionar:
0 2 * * * /home/user/backup.sh
```

## Troubleshooting

### Aplicação não inicia

```bash
# Verificar logs
docker logs nutrindo-web

# Verificar variáveis de ambiente
docker exec nutrindo-web printenv | grep NEXT_PUBLIC

# Rebuild completo
docker-compose -f docker-compose.production.yml down -v
docker-compose -f docker-compose.production.yml up -d --build
```

### SSL não funciona

```bash
# Verificar certificado
sudo certbot certificates

# Renovar manualmente
sudo certbot renew --nginx

# Reiniciar Nginx
sudo systemctl restart nginx
```

### Alta latência

```bash
# Verificar cache do Nginx
sudo nginx -V 2>&1 | grep --color 'http_gzip'

# Verificar conexão com Supabase
curl https://your-project.supabase.co/rest/v1/

# Verificar DNS
dig nutrindojuntos.com.br
```

## Checklist de Deploy

- [ ] VPS provisionado e configurado
- [ ] Docker e Docker Compose instalados
- [ ] Código clonado do repositório
- [ ] `.env.production` configurado corretamente
- [ ] `NEXT_PUBLIC_USE_MOCK_DATA=false` em produção
- [ ] Build do Docker executado com sucesso
- [ ] Nginx configurado e rodando
- [ ] SSL (Certbot) configurado
- [ ] Firewall (UFW) ativo
- [ ] DNS configurado corretamente
- [ ] Health check funcionando
- [ ] Supabase conectado e funcionando
- [ ] Brevo configurado e testado
- [ ] Analytics (GA4) configurado
- [ ] Sentry configurado para error tracking
- [ ] Backups automatizados configurados
- [ ] Monitoramento configurado

## Recursos Adicionais

**Custo mensal estimado:**
- VPS Hostinger KVM 2: ~R$50-70/mês
- Supabase (tier gratuito → Pro): R$0-150/mês
- Domínio (.com.br): ~R$40/ano
- **Total:** ~R$50-220/mês

**Performance esperada:**
- Load time: <2s
- FCP: <1.5s
- LCP: <2.5s
- Uptime: >99.5%

**Escalabilidade:**
- Até 10K visitantes/mês: VPS atual OK
- 10K-50K visitantes: Upgrade VPS ou Vercel
- 50K+: Considerar Vercel Pro + CDN
