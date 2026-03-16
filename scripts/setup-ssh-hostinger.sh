#!/bin/bash

# Script de Configuração SSH - Hostinger para GitHub
# NUTRINDO JUNTOS - Configuração Git via SSH

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔐 CONFIGURAÇÃO SSH - Hostinger → GitHub${NC}"
echo -e "${BLUE}============================================${NC}"

# Verificar se SSH key existe no sistema
SSH_DIR="$HOME/.ssh"
SSH_KEY_PATH="$SSH_DIR/id_rsa_hostinger"
SSH_PUB_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDeMoEIpEef94nOHDo9C0uRRtiHPvsYYInuWZD5wHhEec2fhfTWHm0AWzFztSGhCwXplHrfdGVoDrCgjGmuYCuWMwlDiLrjzB0HBkQIuUkw+67x7rQtaCgWMMd3ERUpbQfoZxFcP2tRHgnROUXnoNSxQnzG7hmFgl346g3ksgO9H7bqOorhVsfIsuF3FrWFQ93khwMJXB7fMMdwTQSad5xiDmgZ7bR88zHMgiilZ7jUZtfgYzetqJj+ALLtgJFFQAcrt+cBYO2Bzbt91CdhsNF3o4WEIIZpZr+zeoZY9VjB2ibwtHb6wrka6IuSlw+yw5lLFHza2QNb8fsbWOQuqMe0S/wZnh5TQ8ksF3+BHAuKXsZLUG7vcx5nPjslt4rtz5NmEdh19kFhWRQmSdnUw1LVaEYERmZDEKAuRj9+/8q4UHDcYPogyiCgfpPgOT1/yVAY/CKUYqTMQ0ztzSO5V1eg3TlRWopiSrd3JjW44+B0drSYgsr0MW+UfqZsMoYnMNE= u344738169@br-asc-web1663.main-hosting.eu"

echo -e "${YELLOW}📁 Configurando diretório SSH...${NC}"

# Criar diretório .ssh se não existir
mkdir -p "$SSH_DIR"
chmod 700 "$SSH_DIR"

# Adicionar chave pública ao arquivo authorized_keys (para referência local)
echo -e "${YELLOW}🔑 Configurando chave SSH Hostinger...${NC}"

# Criar arquivo de chave pública para referência
echo "$SSH_PUB_KEY" > "${SSH_KEY_PATH}.pub"
chmod 644 "${SSH_KEY_PATH}.pub"

# Configurar SSH config para GitHub
echo -e "${YELLOW}⚙️ Configurando SSH config...${NC}"

SSH_CONFIG="$SSH_DIR/config"

# Backup do config existente se houver
if [ -f "$SSH_CONFIG" ]; then
    cp "$SSH_CONFIG" "${SSH_CONFIG}.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Adicionar configuração GitHub se não existir
if ! grep -q "github.com" "$SSH_CONFIG" 2>/dev/null; then
    cat >> "$SSH_CONFIG" << 'EOF'

# GitHub - Hostinger Business
Host github.com
    HostName github.com
    User git
    AddKeysToAgent yes
    UseKeychain yes
    IdentitiesOnly yes
    PreferredAuthentications publickey

# GitHub - alternativo (caso precise)
Host github-hostinger
    HostName github.com
    User git
    AddKeysToAgent yes
    UseKeychain yes
    IdentitiesOnly yes
    PreferredAuthentications publickey
EOF
    chmod 600 "$SSH_CONFIG"
    echo -e "${GREEN}✅ Configuração SSH adicionada${NC}"
else
    echo -e "${YELLOW}⚠️ Configuração SSH já existe${NC}"
fi

# Atualizar remote do git para SSH
echo -e "${BLUE}🔄 Atualizando Git remote para SSH...${NC}"

# Verificar se estamos no diretório do projeto
if [ ! -f "package.json" ] || [ ! -f "CLAUDE.md" ]; then
    echo -e "${RED}❌ Execute este script na raiz do projeto NUTRINDO JUNTOS${NC}"
    exit 1
fi

# Backup da configuração atual
CURRENT_REMOTE=$(git remote get-url origin)
echo -e "${YELLOW}📋 Remote atual: $CURRENT_REMOTE${NC}"

# Atualizar para SSH
git remote set-url origin git@github.com:D1hDias/NutrindoJuntos.git

# Verificar nova configuração
NEW_REMOTE=$(git remote get-url origin)
echo -e "${GREEN}✅ Novo remote SSH: $NEW_REMOTE${NC}"

echo ""
echo -e "${BLUE}📋 PRÓXIMOS PASSOS MANUAIS:${NC}"
echo -e "${YELLOW}1. Acesse GitHub → Settings → SSH and GPG keys${NC}"
echo -e "${YELLOW}2. Clique 'New SSH key'${NC}"
echo -e "${YELLOW}3. Title: 'Hostinger Business - NUTRINDO JUNTOS'${NC}"
echo -e "${YELLOW}4. Cole a chave pública:${NC}"
echo ""
echo -e "${GREEN}$SSH_PUB_KEY${NC}"
echo ""
echo -e "${YELLOW}5. Salve e execute: git push para testar${NC}"
echo ""
echo -e "${BLUE}📄 Informações da chave salvas em:${NC}"
echo -e "${GREEN}   ${SSH_KEY_PATH}.pub${NC}"
echo ""
echo -e "${GREEN}🎉 Configuração SSH preparada!${NC}"