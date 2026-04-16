#!/bin/bash

# Script de Health Check - NUTRINDO JUNTOS
# Verifica se todos os serviços estão funcionando corretamente

set -e

# Configurações
VPS_USER="root"
VPS_HOST="31.97.245.82"
SITE_URL="https://www.nutrindojuntos.com.br"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções utilitárias
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_info "🔍 Verificando saúde da aplicação NUTRINDO JUNTOS"

# 1. Verificar containers no VPS
log_info "📦 Verificando containers Docker..."
sshpass -p '148919713@Vante' ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_HOST << 'ENDSSH'
    echo "=== STATUS DOS CONTAINERS ==="
    cd /home/deploy/nutrindo-juntos
    docker-compose -f docker-compose.production.yml ps
    
    echo -e "\n=== LOGS RECENTES ==="
    docker-compose -f docker-compose.production.yml logs --tail=20 web
ENDSSH

# 2. Teste de conectividade
log_info "🌐 Testando conectividade com o site..."

# Testar API health
if curl -f -s "$SITE_URL/api/health" > /dev/null; then
    log_success "✅ API Health check passou"
else
    log_error "❌ API Health check falhou"
fi

# Testar página inicial
if curl -f -s "$SITE_URL" > /dev/null; then
    log_success "✅ Página inicial carregando"
else
    log_error "❌ Página inicial não está carregando"
fi

# Testar páginas principais
pages=("/sobre" "/cursos" "/blog" "/contato")
for page in "${pages[@]}"; do
    if curl -f -s "$SITE_URL$page" > /dev/null; then
        log_success "✅ Página $page carregando"
    else
        log_warning "⚠️ Página $page pode ter problemas"
    fi
done

# 3. Verificar certificado SSL
log_info "🔒 Verificando certificado SSL..."
ssl_info=$(openssl s_client -connect nutrindojuntos.com.br:443 -servername nutrindojuntos.com.br 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
if [ $? -eq 0 ]; then
    log_success "✅ Certificado SSL válido"
    echo "$ssl_info"
else
    log_error "❌ Problema com certificado SSL"
fi

# 4. Verificar uso de recursos no VPS
log_info "💾 Verificando recursos do VPS..."
sshpass -p '148919713@Vante' ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_HOST << 'ENDSSH'
    echo "=== USO DE CPU E MEMÓRIA ==="
    free -h
    
    echo -e "\n=== USO DE DISCO ==="
    df -h /
    
    echo -e "\n=== PROCESSOS DOCKER ==="
    docker stats --no-stream
ENDSSH

# 5. Teste de velocidade básico
log_info "⚡ Testando velocidade de resposta..."
response_time=$(curl -o /dev/null -s -w "%{time_total}" "$SITE_URL")
if (( $(echo "$response_time < 3.0" | bc -l) )); then
    log_success "✅ Tempo de resposta: ${response_time}s (< 3s)"
else
    log_warning "⚠️ Tempo de resposta lento: ${response_time}s"
fi

log_info "🎉 Verificação de saúde concluída"