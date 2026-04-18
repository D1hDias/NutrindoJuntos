# Guia Completo de Configuração VPS Hostinger - NutrindoJuntos

**Versão:** 1.0
**Data:** 17/04/2026
**Projeto:** NutrindoJuntos - Next.js 15 em produção

---

## 📋 REQUISITOS DO SERVIDOR VPS

### Especificações Mínimas Recomendadas
```yaml
Sistema Operacional: Ubuntu 22.04 LTS (ou superior)
vCPU: 2 cores
RAM: 4GB mínimo (8GB recomendado)
Storage: 50GB SSD
Network: 100Mbps
```

### Software Necessário
```yaml
Node.js: v20.x LTS
pnpm: v9.x
PM2: latest
Nginx: v1.24+
PostgreSQL: 15+ (opcional - usamos Supabase)
Certbot: para SSL/HTTPS
Git: latest
```

---

## 🔧 PASSO 1: PREPARAÇÃO INICIAL DO SERVIDOR

### 1.1. Atualizar Sistema
```bash
# Atualizar pacotes
apt update && apt upgrade -y

# Instalar utilitários essenciais
apt install -y curl wget git build-essential ufw fail2ban
```

### 1.2. Configurar Firewall
```bash
# Configurar UFW
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Verificar status
ufw status verbose
```

### 1.3. Configurar Timezone
```bash
# Configurar para Brasil (São Paulo)
timedatectl set-timezone America/Sao_Paulo
timedatectl
```

---

## 🔧 PASSO 2: INSTALAR NODE.JS E FERRAMENTAS

### 2.1. Instalar Node.js 20 LTS
```bash
# Adicionar repositório NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Instalar Node.js
apt install -y nodejs

# Verificar instalação
node --version  # deve mostrar v20.x.x
npm --version
```

### 2.2. Instalar pnpm
```bash
# Instalar pnpm globalmente
npm install -g pnpm

# Verificar instalação
pnpm --version  # deve mostrar v9.x.x

# Configurar pnpm
pnpm config set store-dir /var/pnpm-store
```

### 2.3. Instalar PM2
```bash
# Instalar PM2 globalmente
npm install -g pm2

# Configurar PM2 para iniciar no boot
pm2 startup systemd
# Executar o comando que o PM2 sugerir

# Verificar instalação
pm2 --version
```

---

## 🔧 PASSO 3: INSTALAR E CONFIGURAR NGINX

### 3.1. Instalar Nginx
```bash
# Instalar Nginx
apt install -y nginx

# Iniciar e habilitar Nginx
systemctl start nginx
systemctl enable nginx

# Verificar status
systemctl status nginx
```

### 3.2. Remover Configurações Antigas (IMPORTANTE!)
```bash
# Remover todas as configurações antigas
rm -f /etc/nginx/sites-enabled/*
rm -f /etc/nginx/sites-available/*

# Remover configuração padrão do Nginx
rm -f /etc/nginx/nginx.conf

# Criar nova configuração limpa do Nginx
cat > /etc/nginx/nginx.conf << 'EOF'
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;
    multi_accept on;
}

http {
    # Basic Settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 20M;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    # Logging Settings
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip Settings
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript
               application/json application/javascript application/xml+rss
               application/rss+xml font/truetype font/opentype
               application/vnd.ms-fontobject image/svg+xml;

    # Virtual Host Configs
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
EOF
```

### 3.3. Criar Configuração do NutrindoJuntos
```bash
# Criar arquivo de configuração
cat > /etc/nginx/sites-available/nutrindojuntos << 'EOF'
# HTTP redirect to HTTPS
server {
    listen 80;
    server_name nutrindojuntos.com.br www.nutrindojuntos.com.br;

    # Certbot challenge location
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name nutrindojuntos.com.br www.nutrindojuntos.com.br;

    # SSL certificates (serão configurados pelo Certbot)
    ssl_certificate /etc/letsencrypt/live/nutrindojuntos.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/nutrindojuntos.com.br/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Servir arquivos estáticos do Next.js
    location /_next/static/ {
        alias /var/www/nutrindojuntos/apps/web/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Servir arquivos públicos (images, fonts, etc)
    location /static/ {
        alias /var/www/nutrindojuntos/apps/web/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

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
}
EOF

# Criar symlink para sites-enabled
ln -sf /etc/nginx/sites-available/nutrindojuntos /etc/nginx/sites-enabled/

# Testar configuração
nginx -t

# NÃO reiniciar ainda - vamos configurar SSL primeiro
```

---

## 🔧 PASSO 4: CONFIGURAR SSL COM CERTBOT

### 4.1. Instalar Certbot
```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Criar diretório para challenges
mkdir -p /var/www/certbot
```

### 4.2. Configuração Temporária para SSL Inicial
```bash
# Remover as linhas SSL do arquivo (ainda não temos certificado)
sed -i '/ssl_certificate/d' /etc/nginx/sites-available/nutrindojuntos
sed -i '/include.*letsencrypt/d' /etc/nginx/sites-available/nutrindojuntos

# Modificar para listen 443 sem SSL temporariamente
sed -i 's/listen 443 ssl http2;/listen 443;/' /etc/nginx/sites-available/nutrindojuntos

# Testar e recarregar
nginx -t && systemctl reload nginx
```

### 4.3. Obter Certificado SSL
```bash
# Obter certificado
certbot --nginx -d nutrindojuntos.com.br -d www.nutrindojuntos.com.br

# Responder às perguntas:
# - Email: seu-email@exemplo.com
# - Termos: A (Agree)
# - Compartilhar email: N (No)
# - Redirect: 2 (Redirect HTTP to HTTPS)

# Verificar certificado
certbot certificates
```

### 4.4. Restaurar Configuração SSL Completa
```bash
# Voltar para a configuração completa com SSL
cat > /etc/nginx/sites-available/nutrindojuntos << 'EOF'
# HTTP redirect to HTTPS
server {
    listen 80;
    server_name nutrindojuntos.com.br www.nutrindojuntos.com.br;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name nutrindojuntos.com.br www.nutrindojuntos.com.br;

    ssl_certificate /etc/letsencrypt/live/nutrindojuntos.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/nutrindojuntos.com.br/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location /_next/static/ {
        alias /var/www/nutrindojuntos/apps/web/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location /static/ {
        alias /var/www/nutrindojuntos/apps/web/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

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
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

# Testar e recarregar
nginx -t && systemctl reload nginx
```

### 4.5. Auto-Renovação SSL
```bash
# Testar renovação
certbot renew --dry-run

# Configurar cron para renovação automática (já está configurado automaticamente)
systemctl status certbot.timer
```

---

## 🔧 PASSO 5: PREPARAR DIRETÓRIO DO PROJETO

### 5.1. Criar Estrutura de Diretórios
```bash
# Criar diretório do projeto
mkdir -p /var/www/nutrindojuntos

# Configurar permissões
chown -R www-data:www-data /var/www/nutrindojuntos
chmod -R 755 /var/www/nutrindojuntos
```

### 5.2. Configurar Git (para deploy)
```bash
# Configurar Git global
git config --global user.name "NutrindoJuntos Deploy"
git config --global user.email "deploy@nutrindojuntos.com.br"
git config --global init.defaultBranch main
```

---

## 🔧 PASSO 6: DEPLOY DO PROJETO

### 6.1. Clonar Projeto (ou fazer upload)
```bash
# Opção A: Clonar do GitHub
cd /var/www
git clone https://github.com/seu-usuario/nutrindojuntos.git
cd nutrindojuntos

# Opção B: Upload via rsync (do seu computador local)
# Execute no seu computador WSL:
rsync -avz --exclude 'node_modules' --exclude '.next' \
  /mnt/e/NutrindoJuntos/ \
  root@SEU_IP_VPS:/var/www/nutrindojuntos/
```

### 6.2. Instalar Dependências
```bash
cd /var/www/nutrindojuntos

# Instalar dependências
pnpm install

# Verificar se tudo instalou corretamente
pnpm list --depth=0
```

### 6.3. Configurar Variáveis de Ambiente
```bash
# Criar arquivo .env.production no diretório apps/web/
cat > apps/web/.env.production << 'EOF'
# Next.js
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://nutrindojuntos.com.br

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://pdtrujakhknawlvklrap.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkdHJ1amFraGtuYXdsdmtscmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMjA0NTYsImV4cCI6MjA3ODY5NjQ1Nn0.pS-DZRpifEVhvQszS0l3qE2YVNMdJFu1WgibUiV97Qo
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkdHJ1amFraGtuYXdsdmtscmFwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzEyMDQ1NiwiZXhwIjoyMDc4Njk2NDU2fQ.95LOXst8F5HCeIItHpxmHDS1T5t787E2lhYXW0cSOiE

# Brevo (Email Marketing)
BREVO_API_KEY=eyJhcGlfa2V5IjoieGtleXNpYi1mOGE2ZDJkMjIwMDE2ZTk2MmZhNmFkZjgxMjcyYjQxNmVkNTc5NTE1YmM5NTUzMWJjZjYwMmI2M2E5M2FmZDhmLWE3RVZObGhiTDhhS1FxNzgifQ==
BREVO_NEWSLETTER_LIST_ID=sua_lista_id_aqui

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry (opcional - error tracking)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
EOF

# Ajustar permissões
chmod 600 apps/web/.env.production
```

### 6.4. Build do Projeto
```bash
cd /var/www/nutrindojuntos

# Build do projeto Next.js
pnpm --filter web build

# Verificar se build foi bem-sucedido
ls -la apps/web/.next/

# Deve conter:
# - standalone/
# - static/
# - package.json
```

---

## 🔧 PASSO 7: CONFIGURAR PM2

### 7.1. Criar Arquivo de Configuração PM2
```bash
cat > /var/www/nutrindojuntos/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'nutrindojuntos',
    cwd: '/var/www/nutrindojuntos/apps/web',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 1,
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    error_file: '/var/log/pm2/nutrindojuntos-error.log',
    out_file: '/var/log/pm2/nutrindojuntos-out.log',
    log_file: '/var/log/pm2/nutrindojuntos-combined.log',
    time: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    listen_timeout: 10000,
    kill_timeout: 5000,
  }]
}
EOF
```

### 7.2. Criar Diretório de Logs
```bash
mkdir -p /var/log/pm2
chown -R www-data:www-data /var/log/pm2
```

### 7.3. Iniciar Aplicação com PM2
```bash
cd /var/www/nutrindojuntos

# Iniciar aplicação
pm2 start ecosystem.config.js

# Salvar configuração PM2
pm2 save

# Verificar status
pm2 list
pm2 logs nutrindojuntos --lines 50
```

---

## 🔧 PASSO 8: CONFIGURAR MONITORAMENTO

### 8.1. Configurar PM2 Monitoring
```bash
# Ver informações em tempo real
pm2 monit

# Configurar alertas de memória/CPU
pm2 set pm2:autodump true
pm2 set pm2:autodump-interval 3600000
```

### 8.2. Configurar Logrotate
```bash
cat > /etc/logrotate.d/pm2-nutrindojuntos << 'EOF'
/var/log/pm2/nutrindojuntos-*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
EOF
```

---

## ✅ CHECKLIST DE VALIDAÇÃO

Execute cada comando para validar a configuração:

### Sistema Base
```bash
# ✅ Verificar versão Ubuntu
lsb_release -a

# ✅ Verificar Node.js
node --version  # Deve ser v20.x.x

# ✅ Verificar pnpm
pnpm --version  # Deve ser v9.x.x

# ✅ Verificar PM2
pm2 --version

# ✅ Verificar Nginx
nginx -v

# ✅ Verificar firewall
ufw status
```

### Certificado SSL
```bash
# ✅ Verificar certificado
certbot certificates

# ✅ Testar SSL
curl -I https://nutrindojuntos.com.br | grep -i "HTTP/1.1 200"
```

### Aplicação
```bash
# ✅ Verificar Next.js rodando
curl -I http://localhost:3000 | grep "HTTP/1.1 200"

# ✅ Verificar PM2 status
pm2 list | grep "nutrindojuntos"

# ✅ Testar site via HTTPS
curl -I https://nutrindojuntos.com.br | grep "x-nextjs-cache"
```

### Arquivos Estáticos
```bash
# ✅ Testar CSS
curl -I https://nutrindojuntos.com.br/_next/static/css/$(ls /var/www/nutrindojuntos/apps/web/.next/static/css/ | head -1) | grep "200 OK"

# ✅ Verificar permissões
ls -la /var/www/nutrindojuntos/apps/web/.next/static/
```

---

## 🚀 COMANDOS ÚTEIS PARA O DIA-A-DIA

### Gerenciar Aplicação
```bash
# Ver logs em tempo real
pm2 logs nutrindojuntos

# Reiniciar aplicação
pm2 restart nutrindojuntos

# Recarregar com zero-downtime
pm2 reload nutrindojuntos

# Parar aplicação
pm2 stop nutrindojuntos

# Ver uso de recursos
pm2 monit
```

### Gerenciar Nginx
```bash
# Testar configuração
nginx -t

# Recarregar configuração
systemctl reload nginx

# Reiniciar Nginx
systemctl restart nginx

# Ver logs de erro
tail -f /var/log/nginx/error.log

# Ver logs de acesso
tail -f /var/log/nginx/access.log
```

### Deploy de Atualizações
```bash
# 1. Navegar para o diretório
cd /var/www/nutrindojuntos

# 2. Atualizar código (Git)
git pull origin main

# 3. Instalar novas dependências (se houver)
pnpm install

# 4. Rebuild
pnpm --filter web build

# 5. Recarregar aplicação
pm2 reload nutrindojuntos

# 6. Verificar logs
pm2 logs nutrindojuntos --lines 50
```

---

## 🆘 TROUBLESHOOTING

### Site não carrega (504 Gateway Timeout)
```bash
# Verificar se Next.js está rodando
pm2 list

# Ver logs de erro
pm2 logs nutrindojuntos --err --lines 100

# Reiniciar aplicação
pm2 restart nutrindojuntos
```

### CSS/JS não carrega (404)
```bash
# Verificar se arquivos existem
ls -la /var/www/nutrindojuntos/apps/web/.next/static/

# Verificar permissões
chmod -R 755 /var/www/nutrindojuntos/apps/web/.next/

# Testar configuração Nginx
nginx -t

# Recarregar Nginx
systemctl reload nginx
```

### Aplicação crashando repetidamente
```bash
# Ver logs completos
pm2 logs nutrindojuntos --lines 200

# Verificar uso de memória
free -h
pm2 monit

# Aumentar limite de memória no ecosystem.config.js
# max_memory_restart: '1G'  # de 500M para 1G

# Recarregar configuração
pm2 delete nutrindojuntos
pm2 start ecosystem.config.js
pm2 save
```

### SSL não funciona
```bash
# Verificar certificado
certbot certificates

# Renovar manualmente
certbot renew

# Ver logs do Certbot
journalctl -u certbot
```

---

## 📊 MONITORAMENTO E MANUTENÇÃO

### Verificações Diárias
```bash
# Status geral
pm2 list && systemctl status nginx

# Uso de disco
df -h

# Uso de memória
free -h

# Logs recentes
pm2 logs nutrindojuntos --lines 20 --nostream
```

### Manutenção Semanal
```bash
# Atualizar sistema
apt update && apt upgrade -y

# Limpar logs antigos
journalctl --vacuum-time=7d

# Verificar certificado SSL
certbot certificates
```

### Backup (Mensal)
```bash
# Backup do código
tar -czf /root/backup-nutrindojuntos-$(date +%Y%m%d).tar.gz /var/www/nutrindojuntos

# Backup das configurações Nginx
cp /etc/nginx/sites-available/nutrindojuntos /root/backup-nginx-nutrindojuntos-$(date +%Y%m%d).conf

# Backup do ecosystem.config.js
cp /var/www/nutrindojuntos/ecosystem.config.js /root/backup-ecosystem-$(date +%Y%m%d).js
```

---

## 🎯 RESUMO EXECUTIVO

**Ordem de Execução para Servidor Limpo:**

1. ✅ Atualizar sistema e instalar utilitários
2. ✅ Configurar firewall
3. ✅ Instalar Node.js 20, pnpm, PM2
4. ✅ Instalar e limpar Nginx (remover configs antigas!)
5. ✅ Configurar SSL com Certbot
6. ✅ Preparar diretório do projeto
7. ✅ Deploy do código e build
8. ✅ Configurar PM2 e iniciar aplicação
9. ✅ Validar com checklist
10. ✅ Configurar monitoramento

**Tempo Estimado:** 1-2 horas para servidor completamente novo

**Documentos Relacionados:**
- `DEPLOYMENT.md` - Guia de deploy e atualizações
- `TROUBLESHOOTING.md` - Solução de problemas comuns
- `CLAUDE.md` - Documentação geral do projeto

---

**Última Atualização:** 17/04/2026
**Autor:** Claude Code SuperClaude
**Projeto:** NutrindoJuntos - Next.js 15 Production
