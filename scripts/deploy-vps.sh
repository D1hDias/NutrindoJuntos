#!/bin/bash

###############################################################################
# Deploy Script - NutrindoJuntos VPS Hostinger
#
# Uso: ./scripts/deploy-vps.sh
#
# Pre-requisitos:
# - SSH key configurada para root@31.97.245.82
# - Servidor VPS preparado conforme docs/VPS_SETUP_GUIA_COMPLETO.md
###############################################################################

set -e  # Exit on error

# Configurações
VPS_IP="31.97.245.82"
VPS_USER="root"
VPS_PATH="/var/www/nutrindojuntos"
APP_NAME="nutrindojuntos"

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Funções auxiliares
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Header
echo "=================================="
echo "  Deploy NutrindoJuntos VPS"
echo "  Servidor: ${VPS_IP}"
echo "=================================="
echo ""

# 1. Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    log_error "Execute este script da raiz do projeto!"
    exit 1
fi

# 2. Build local do projeto
log_info "Construindo aplicação..."
pnpm --filter web build

if [ $? -ne 0 ]; then
    log_error "Build falhou! Corrija os erros antes de continuar."
    exit 1
fi

# 3. Criar arquivo .tar.gz otimizado
log_info "Compactando build..."
cd apps/web
tar -czf ../../nutrindojuntos-build.tar.gz \
    .next/standalone \
    .next/static \
    public \
    .env.production
cd ../..

# 4. Upload para o servidor
log_info "Enviando build para VPS..."
scp -o StrictHostKeyChecking=no \
    nutrindojuntos-build.tar.gz \
    ${VPS_USER}@${VPS_IP}:${VPS_PATH}/

# 5. Upload do ecosystem.config.js
log_info "Enviando configuração PM2..."
scp -o StrictHostKeyChecking=no \
    ecosystem.config.js \
    ${VPS_USER}@${VPS_IP}:${VPS_PATH}/

# 6. Executar comandos no servidor
log_info "Extraindo e configurando no servidor..."
ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_IP} << 'ENDSSH'
set -e

# Ir para diretório do app
cd /var/www/nutrindojuntos

# Backup do build anterior (se existir)
if [ -d "apps/web/.next" ]; then
    echo "[INFO] Criando backup do build anterior..."
    mv apps/web/.next apps/web/.next.backup.$(date +%Y%m%d_%H%M%S) || true
fi

# Extrair novo build
echo "[INFO] Extraindo novo build..."
tar -xzf nutrindojuntos-build.tar.gz

# Criar estrutura de diretórios
mkdir -p logs
mkdir -p apps/web/.next

# Copiar arquivos estáticos para standalone
cp -r apps/web/.next/static apps/web/.next/standalone/apps/web/.next/
cp -r apps/web/public apps/web/.next/standalone/apps/web/

# Copiar .env.production
if [ -f "apps/web/.env.production" ]; then
    cp apps/web/.env.production apps/web/.next/standalone/apps/web/.env.production
fi

# Remover arquivo temporário
rm -f nutrindojuntos-build.tar.gz

# Recarregar PM2
echo "[INFO] Recarregando aplicação com PM2..."
pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production

# Verificar status
pm2 list
pm2 logs nutrindojuntos --lines 20

ENDSSH

# 7. Verificar se deploy foi bem-sucedido
log_info "Verificando status da aplicação..."
sleep 5

ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_IP} "pm2 list | grep ${APP_NAME}"

if [ $? -eq 0 ]; then
    log_info "✅ Deploy concluído com sucesso!"
    echo ""
    echo "URLs:"
    echo "  - Site: https://nutrindojuntos.com.br"
    echo "  - Health: https://nutrindojuntos.com.br/api/health"
    echo ""
    echo "Comandos úteis:"
    echo "  - Ver logs: ssh ${VPS_USER}@${VPS_IP} 'pm2 logs ${APP_NAME}'"
    echo "  - Status: ssh ${VPS_USER}@${VPS_IP} 'pm2 list'"
    echo "  - Restart: ssh ${VPS_USER}@${VPS_IP} 'pm2 restart ${APP_NAME}'"
else
    log_error "Deploy falhou! Verifique os logs do servidor."
    exit 1
fi

# Cleanup local
rm -f nutrindojuntos-build.tar.gz

log_info "Script finalizado!"
