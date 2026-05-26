#!/bin/bash
# Script de Deploy Local → Produção
# Uso: ./deploy-to-production.sh "mensagem do commit"

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar se mensagem foi fornecida
if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: Forneça uma mensagem de commit${NC}"
    echo "Uso: ./deploy-to-production.sh \"sua mensagem aqui\""
    exit 1
fi

COMMIT_MSG="$1"

echo "========================================="
echo "🚀 DEPLOY PARA PRODUÇÃO - NUTRINDO JUNTOS"
echo "========================================="
echo ""

# 1. Verificar mudanças
echo -e "${BLUE}[1/5] Verificando mudanças locais...${NC}"
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo -e "${GREEN}✅ Mudanças detectadas!${NC}"
else
    echo -e "${YELLOW}⚠️  Nenhuma mudança detectada${NC}"
    read -p "Continuar mesmo assim? (s/N): " continue
    if [ "$continue" != "s" ] && [ "$continue" != "S" ]; then
        echo "Deploy cancelado."
        exit 0
    fi
fi
git status --short
echo ""

# 2. Commit local
echo -e "${BLUE}[2/5] Fazendo commit...${NC}"
git add -A
git commit -m "$COMMIT_MSG

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>" || {
    echo -e "${YELLOW}⚠️  Nada para commitar ou commit já existe${NC}"
}
echo -e "${GREEN}✅ Commit realizado!${NC}"
echo ""

# 3. Push para GitHub
echo -e "${BLUE}[3/5] Enviando para GitHub...${NC}"
git push origin main || {
    echo -e "${RED}❌ Erro ao fazer push!${NC}"
    exit 1
}
echo -e "${GREEN}✅ Push concluído!${NC}"
echo ""

# 4. Deploy no VPS
echo -e "${BLUE}[4/5] Executando deploy no VPS...${NC}"
echo -e "${YELLOW}(Isso pode levar 1-2 minutos)${NC}"
echo ""
ssh root@31.97.245.82 "cd /var/www/nutrindojuntos && ./deploy.sh" || {
    echo -e "${RED}❌ Erro no deploy!${NC}"
    exit 1
}
echo ""

# 5. Finalização
echo "========================================="
echo -e "${GREEN}✅ DEPLOY CONCLUÍDO COM SUCESSO!${NC}"
echo "========================================="
echo ""
echo -e "${YELLOW}📊 Informações:${NC}"
echo "• Site: https://nutrindojuntos.com.br"
echo "• Commit: $(git log -1 --oneline)"
echo "• Branch: $(git branch --show-current)"
echo ""
echo -e "${YELLOW}🔍 Próximos passos:${NC}"
echo "1. Abra: https://nutrindojuntos.com.br"
echo "2. Pressione Ctrl+Shift+R para limpar cache"
echo "3. Verifique se está tudo funcionando"
echo ""
