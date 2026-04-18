#!/bin/bash

# Script de Validação de Setup VPS Hostinger - NutrindoJuntos
# Executa checklist completo para validar configuração do servidor

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "  Validação de Setup VPS - NutrindoJuntos"
echo "========================================"
echo ""

# Função para verificar comando
check_command() {
    local cmd=$1
    local expected=$2
    local name=$3

    if command -v $cmd &> /dev/null; then
        local version=$($cmd --version 2>&1 | head -1)
        echo -e "${GREEN}✅ $name instalado:${NC} $version"
        return 0
    else
        echo -e "${RED}❌ $name NÃO instalado${NC}"
        return 1
    fi
}

# Função para verificar serviço
check_service() {
    local service=$1
    local name=$2

    if systemctl is-active --quiet $service; then
        echo -e "${GREEN}✅ $name rodando${NC}"
        return 0
    else
        echo -e "${RED}❌ $name NÃO está rodando${NC}"
        return 1
    fi
}

# Função para verificar porta
check_port() {
    local port=$1
    local name=$2

    if netstat -tuln | grep -q ":$port "; then
        echo -e "${GREEN}✅ Porta $port ($name) aberta${NC}"
        return 0
    else
        echo -e "${RED}❌ Porta $port ($name) NÃO aberta${NC}"
        return 1
    fi
}

# Função para verificar URL
check_url() {
    local url=$1
    local name=$2

    if curl -s -I "$url" | grep -q "HTTP.*200\|HTTP.*301\|HTTP.*302"; then
        echo -e "${GREEN}✅ $name respondendo${NC}"
        return 0
    else
        echo -e "${RED}❌ $name NÃO respondendo${NC}"
        return 1
    fi
}

echo "=== 1. SISTEMA BASE ==="
echo ""

# Sistema Operacional
if [ -f /etc/lsb-release ]; then
    source /etc/lsb-release
    echo -e "${GREEN}✅ Sistema:${NC} $DISTRIB_DESCRIPTION"
else
    echo -e "${YELLOW}⚠️  Não foi possível detectar versão do Ubuntu${NC}"
fi

# Node.js
check_command "node" "v20" "Node.js"

# pnpm
check_command "pnpm" "v9" "pnpm"

# PM2
check_command "pm2" "" "PM2"

# Nginx
check_command "nginx" "" "Nginx"

# Git
check_command "git" "" "Git"

# Certbot
check_command "certbot" "" "Certbot"

echo ""
echo "=== 2. SERVIÇOS ==="
echo ""

# Nginx
check_service "nginx" "Nginx"

# PM2 (verificar se existe processo)
if pm2 list 2>/dev/null | grep -q "nutrindojuntos"; then
    echo -e "${GREEN}✅ PM2 nutrindojuntos rodando${NC}"
else
    echo -e "${RED}❌ PM2 nutrindojuntos NÃO rodando${NC}"
fi

echo ""
echo "=== 3. PORTAS ==="
echo ""

check_port "80" "HTTP"
check_port "443" "HTTPS"
check_port "3000" "Next.js"

echo ""
echo "=== 4. FIREWALL ==="
echo ""

if ufw status | grep -q "Status: active"; then
    echo -e "${GREEN}✅ UFW ativo${NC}"

    # Verificar regras
    if ufw status | grep -q "80/tcp.*ALLOW"; then
        echo -e "${GREEN}✅ Porta 80 permitida${NC}"
    else
        echo -e "${RED}❌ Porta 80 NÃO permitida${NC}"
    fi

    if ufw status | grep -q "443/tcp.*ALLOW"; then
        echo -e "${GREEN}✅ Porta 443 permitida${NC}"
    else
        echo -e "${RED}❌ Porta 443 NÃO permitida${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  UFW não está ativo${NC}"
fi

echo ""
echo "=== 5. DIRETÓRIOS E ARQUIVOS ==="
echo ""

# Diretório do projeto
if [ -d "/var/www/nutrindojuntos" ]; then
    echo -e "${GREEN}✅ Diretório do projeto existe${NC}"

    # Verificar subdiretórios importantes
    if [ -d "/var/www/nutrindojuntos/apps/web/.next" ]; then
        echo -e "${GREEN}✅ Build Next.js existe${NC}"
    else
        echo -e "${RED}❌ Build Next.js NÃO existe${NC}"
    fi

    if [ -f "/var/www/nutrindojuntos/apps/web/.env.production" ]; then
        echo -e "${GREEN}✅ .env.production existe${NC}"
    else
        echo -e "${YELLOW}⚠️  .env.production NÃO existe${NC}"
    fi
else
    echo -e "${RED}❌ Diretório do projeto NÃO existe${NC}"
fi

# Configuração Nginx
if [ -f "/etc/nginx/sites-available/nutrindojuntos" ]; then
    echo -e "${GREEN}✅ Configuração Nginx existe${NC}"

    if [ -L "/etc/nginx/sites-enabled/nutrindojuntos" ]; then
        echo -e "${GREEN}✅ Symlink Nginx ativo${NC}"
    else
        echo -e "${RED}❌ Symlink Nginx NÃO ativo${NC}"
    fi
else
    echo -e "${RED}❌ Configuração Nginx NÃO existe${NC}"
fi

# Ecosystem PM2
if [ -f "/var/www/nutrindojuntos/ecosystem.config.js" ]; then
    echo -e "${GREEN}✅ ecosystem.config.js existe${NC}"
else
    echo -e "${RED}❌ ecosystem.config.js NÃO existe${NC}"
fi

echo ""
echo "=== 6. CERTIFICADO SSL ==="
echo ""

if [ -d "/etc/letsencrypt/live/nutrindojuntos.com.br" ]; then
    echo -e "${GREEN}✅ Certificado SSL existe${NC}"

    # Verificar validade
    CERT_FILE="/etc/letsencrypt/live/nutrindojuntos.com.br/cert.pem"
    if [ -f "$CERT_FILE" ]; then
        EXPIRY=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)
        echo -e "${GREEN}✅ Certificado válido até:${NC} $EXPIRY"
    fi
else
    echo -e "${RED}❌ Certificado SSL NÃO existe${NC}"
fi

echo ""
echo "=== 7. CONECTIVIDADE ==="
echo ""

# Localhost
check_url "http://localhost:3000" "Next.js localhost"

# HTTPS
check_url "https://nutrindojuntos.com.br" "Site HTTPS"

# CSS estático
if [ -d "/var/www/nutrindojuntos/apps/web/.next/static/css" ]; then
    FIRST_CSS=$(ls /var/www/nutrindojuntos/apps/web/.next/static/css/*.css 2>/dev/null | head -1)
    if [ ! -z "$FIRST_CSS" ]; then
        CSS_FILE=$(basename "$FIRST_CSS")
        check_url "https://nutrindojuntos.com.br/_next/static/css/$CSS_FILE" "CSS estático"
    fi
fi

echo ""
echo "=== 8. RECURSOS DO SISTEMA ==="
echo ""

# Memória
TOTAL_MEM=$(free -h | awk '/^Mem:/ {print $2}')
USED_MEM=$(free -h | awk '/^Mem:/ {print $3}')
FREE_MEM=$(free -h | awk '/^Mem:/ {print $4}')
echo -e "${GREEN}💾 Memória:${NC} Total: $TOTAL_MEM | Usado: $USED_MEM | Livre: $FREE_MEM"

# Disco
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
DISK_TOTAL=$(df -h / | awk 'NR==2 {print $2}')
DISK_USED=$(df -h / | awk 'NR==2 {print $3}')

if [ "$DISK_USAGE" -gt 80 ]; then
    echo -e "${RED}💿 Disco:${NC} Total: $DISK_TOTAL | Usado: $DISK_USED (${DISK_USAGE}%) - ATENÇÃO: Uso alto!"
else
    echo -e "${GREEN}💿 Disco:${NC} Total: $DISK_TOTAL | Usado: $DISK_USED (${DISK_USAGE}%)"
fi

# CPU Load
LOAD_AVG=$(uptime | awk -F'load average:' '{print $2}')
echo -e "${GREEN}⚡ CPU Load Average:${NC}$LOAD_AVG"

echo ""
echo "=== 9. PROCESSOS PM2 ==="
echo ""

if command -v pm2 &> /dev/null; then
    pm2 list
else
    echo -e "${RED}❌ PM2 não instalado${NC}"
fi

echo ""
echo "=== 10. LOGS RECENTES ==="
echo ""

echo -e "${YELLOW}📋 Últimas 10 linhas do log do Next.js:${NC}"
if [ -f "/var/log/pm2/nutrindojuntos-out.log" ]; then
    tail -10 /var/log/pm2/nutrindojuntos-out.log
else
    echo -e "${RED}❌ Log não encontrado${NC}"
fi

echo ""
echo -e "${YELLOW}📋 Últimas 10 linhas de erro:${NC}"
if [ -f "/var/log/pm2/nutrindojuntos-error.log" ]; then
    tail -10 /var/log/pm2/nutrindojuntos-error.log
else
    echo "Sem erros recentes"
fi

echo ""
echo "========================================"
echo "  Validação Completa!"
echo "========================================"
echo ""
echo "Para corrigir problemas, consulte:"
echo "  - docs/VPS_SETUP_GUIA_COMPLETO.md"
echo "  - docs/TROUBLESHOOTING.md"
echo ""
