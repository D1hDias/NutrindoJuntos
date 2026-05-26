#!/bin/bash

# git-push.sh — Commita e envia alterações locais para o GitHub
# Uso: ./scripts/git-push.sh "mensagem do commit"
#      ./scripts/git-push.sh          (pede a mensagem interativamente)

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Ir para a raiz do projeto (caso o script seja chamado de outro lugar)
cd "$(git rev-parse --show-toplevel)"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  NUTRINDO JUNTOS — Git Push${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Verificar se há algo para commitar
if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}⚠️  Nenhuma alteração detectada. Nada para commitar.${NC}"
  exit 0
fi

# Mostrar o que mudou
echo -e "\n${YELLOW}📋 Alterações detectadas:${NC}"
git status --short
echo ""

# Obter mensagem do commit
COMMIT_MSG="$1"
if [ -z "$COMMIT_MSG" ]; then
  read -rp "✏️  Mensagem do commit: " COMMIT_MSG
fi

if [ -z "$COMMIT_MSG" ]; then
  echo -e "${RED}❌ Mensagem do commit não pode ser vazia.${NC}"
  exit 1
fi

# Stage + commit + push
echo -e "\n${BLUE}📦 Adicionando arquivos...${NC}"
git add -A

echo -e "${BLUE}💾 Commitando: \"${COMMIT_MSG}\"${NC}"
git commit -m "$COMMIT_MSG"

echo -e "${BLUE}🚀 Enviando para o GitHub (origin/main)...${NC}"
git push origin main

echo -e "\n${GREEN}✅ Código enviado com sucesso para o GitHub!${NC}"
echo -e "${YELLOW}   Agora rode: ./scripts/deploy-vps.sh${NC}"
