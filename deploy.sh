#!/bin/bash

# deploy.sh — Executado NA VPS para atualizar o site
# Chamado remotamente por: scripts/deploy-vps.sh
# Chamada direta:  ssh root@31.97.245.82 "bash /var/www/nutrindojuntos/deploy.sh"

set -e

APP_DIR="/var/www/nutrindojuntos"
LOG_DIR="$APP_DIR/logs"
PM2_USER="nutriapp"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

mkdir -p "$LOG_DIR"

log()   { echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"; }
info()  { echo -e "${BLUE}[$(date +'%H:%M:%S')] $1${NC}"; }
warn()  { echo -e "${YELLOW}[$(date +'%H:%M:%S')] $1${NC}"; }
error() { echo -e "${RED}[$(date +'%H:%M:%S')] ❌ $1${NC}"; exit 1; }

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  NUTRINDO JUNTOS — Deploy VPS${NC}"
echo -e "${BLUE}  $(date '+%d/%m/%Y %H:%M:%S')${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

cd "$APP_DIR" || error "Diretório $APP_DIR não encontrado."

# Garantir que o Git aceita este diretório independente do dono
git config --global --add safe.directory "$APP_DIR"

# 1. Pull do GitHub
info "📥 Baixando atualizações do GitHub..."
git pull origin main

# 2. Instalar dependências (só se package.json mudou)
info "📦 Instalando dependências..."
pnpm install --frozen-lockfile

# 3. Build do Next.js (standalone)
info "🏗️  Fazendo build do Next.js..."
pnpm --filter web build

# 4. Copiar arquivos estáticos para o standalone
#    (necessário para o Next.js standalone funcionar corretamente)
info "📁 Copiando arquivos estáticos para o standalone..."
cp -r apps/web/public apps/web/.next/standalone/apps/web/public 2>/dev/null || true
cp -r apps/web/.next/static apps/web/.next/standalone/apps/web/.next/static 2>/dev/null || true

# 5. Recarregar PM2 (zero-downtime reload)
info "♻️  Recarregando PM2..."
if id "$PM2_USER" &>/dev/null; then
  runuser -l "$PM2_USER" -c "pm2 reload $APP_DIR/ecosystem.config.js --env production"
else
  pm2 reload "$APP_DIR/ecosystem.config.js" --env production
fi

# 6. Status final
echo ""
log "✅ Deploy concluído com sucesso!"
info "📊 Status do PM2:"
pm2 list --no-color | grep nutrindojuntos || true

echo ""
info "🔗 Site: https://nutrindojuntos.com.br"
