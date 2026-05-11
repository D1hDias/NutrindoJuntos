#!/bin/bash

# deploy-vps.sh — Conecta na VPS e executa o deploy remoto
# Uso: ./scripts/deploy-vps.sh
#
# Fluxo completo recomendado:
#   1. ./scripts/git-push.sh "mensagem"   → commita e envia para o GitHub
#   2. ./scripts/deploy-vps.sh            → VPS puxa do GitHub e atualiza o site

set -e

VPS_HOST="31.97.245.82"
VPS_USER="root"
APP_DIR="/var/www/nutrindojuntos"

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  NUTRINDO JUNTOS — Deploy → VPS${NC}"
echo -e "${BLUE}  $VPS_USER@$VPS_HOST${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Verificar que o código local está enviado ao GitHub
LOCAL_HASH=$(git rev-parse HEAD 2>/dev/null || echo "unknown")
REMOTE_HASH=$(git ls-remote origin refs/heads/main 2>/dev/null | cut -f1 || echo "unknown")

if [ "$LOCAL_HASH" != "unknown" ] && [ "$REMOTE_HASH" != "unknown" ] && [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
  echo -e "${YELLOW}⚠️  Atenção: commit local ($LOCAL_HASH) difere do GitHub ($REMOTE_HASH).${NC}"
  echo -e "${YELLOW}   Rode primeiro: ./scripts/git-push.sh \"mensagem\"${NC}"
  read -rp "   Continuar mesmo assim? (s/N): " CONFIRM
  [[ "$CONFIRM" =~ ^[Ss]$ ]] || exit 0
fi

echo -e "\n${BLUE}🔐 Conectando à VPS e iniciando deploy...${NC}\n"

ssh "$VPS_USER@$VPS_HOST" "bash $APP_DIR/deploy.sh"

echo -e "\n${GREEN}✅ Deploy finalizado!${NC}"
echo -e "${YELLOW}   Site: https://nutrindojuntos.com.br${NC}"
