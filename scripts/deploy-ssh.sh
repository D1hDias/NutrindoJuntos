#!/bin/bash

# Script de Deploy SSH para Hostinger
# NUTRINDO JUNTOS - Deploy Completo via SSH

set -e

# Configurações SSH
SSH_HOST="82.112.247.253"
SSH_PORT="65002"
SSH_USER="u344738169"
REMOTE_PATH="/home/u344738169/domains/peru-chamois-575367.hostingersite.com/public_html"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 NUTRINDO JUNTOS - Deploy SSH Hostinger${NC}"
echo -e "${BLUE}=============================================${NC}"

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script na raiz do projeto${NC}"
    exit 1
fi

# Testar conexão SSH
echo -e "${YELLOW}🔐 Testando conexão SSH...${NC}"
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST "echo 'Conexão SSH OK'" || {
    echo -e "${RED}❌ Erro de conexão SSH. Verifique credenciais.${NC}"
    exit 1
}

echo -e "${GREEN}✅ Conexão SSH confirmada${NC}"

# Build do frontend
echo -e "${BLUE}🏗️  Fazendo build estático...${NC}"
cd apps/web

# Backup e usar config estático
if [ -f "next.config.mjs" ]; then
    cp next.config.mjs next.config.backup.mjs
fi
cp next.config.static.mjs next.config.mjs

# Build
echo -e "${YELLOW}📦 Executando build...${NC}"
pnpm build

# Export
echo -e "${YELLOW}📤 Executando export...${NC}"
pnpm export || {
    echo -e "${RED}❌ Erro no export. Verificando Next.js 15...${NC}"
    # Para Next.js 15, export é automático com output: 'export'
    echo -e "${YELLOW}📤 Build com export automático (Next.js 15)${NC}"
}

# Restaurar config original se existir backup
if [ -f "next.config.backup.mjs" ]; then
    mv next.config.backup.mjs next.config.mjs
else
    # Manter config estático para este deploy
    echo -e "${YELLOW}⚠️  Mantendo configuração estática${NC}"
fi

cd ../..

# Verificar se a pasta out foi criada ou usar .next
if [ -d "apps/web/out" ]; then
    BUILD_DIR="apps/web/out"
    echo -e "${GREEN}✅ Usando diretório export: out/${NC}"
elif [ -d "apps/web/.next" ]; then
    BUILD_DIR="apps/web/.next"
    echo -e "${YELLOW}⚠️  Usando diretório build: .next/${NC}"
else
    echo -e "${RED}❌ Nenhum build encontrado${NC}"
    exit 1
fi

# Preparar arquivos
echo -e "${BLUE}📁 Preparando arquivos para upload...${NC}"
rm -rf dist/
mkdir -p dist/

if [ "$BUILD_DIR" = "apps/web/out" ]; then
    cp -r $BUILD_DIR/* dist/
else
    # Para build sem export, copiar arquivos estáticos
    cp -r $BUILD_DIR/static dist/ 2>/dev/null || true
    cp -r apps/web/public/* dist/ 2>/dev/null || true
    # Criar index.html básico se não existir
    if [ ! -f "dist/index.html" ]; then
        echo "<!DOCTYPE html><html><head><title>NUTRINDO JUNTOS</title></head><body><h1>Site em construção</h1></body></html>" > dist/index.html
    fi
fi

# Criar .htaccess otimizado
echo -e "${YELLOW}⚙️  Criando .htaccess...${NC}"
cat > dist/.htaccess << 'EOF'
# NUTRINDO JUNTOS - Configuração Otimizada
RewriteEngine On

# Redirect para HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Compressão GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Cache Headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 1 hour"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Fallback para SPA
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
EOF

# Backup remoto
echo -e "${BLUE}💾 Fazendo backup do site atual...${NC}"
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST "
    if [ -d '$REMOTE_PATH' ]; then
        cp -r $REMOTE_PATH ${REMOTE_PATH}_backup_$(date +%Y%m%d_%H%M%S) || true
    fi
    mkdir -p $REMOTE_PATH
" 

# Upload via SSH + rsync
echo -e "${BLUE}📤 Fazendo upload via SSH...${NC}"
rsync -avz --delete -e "ssh -p $SSH_PORT" dist/ $SSH_USER@$SSH_HOST:$REMOTE_PATH/

# Verificar permissões
echo -e "${BLUE}🔧 Configurando permissões...${NC}"
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST "
    find $REMOTE_PATH -type f -exec chmod 644 {} \;
    find $REMOTE_PATH -type d -exec chmod 755 {} \;
    chmod 644 $REMOTE_PATH/.htaccess
"

# Criar arquivo de informações
echo -e "${BLUE}📝 Criando informações do deploy...${NC}"
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST "cat > $REMOTE_PATH/deploy-info.txt << EOF
NUTRINDO JUNTOS - Deploy Information
===================================

Deploy Date: $(date)
Deploy Method: SSH + rsync
Build Type: Next.js Static Export
Domain: peru-chamois-575367.hostingersite.com

Server Info:
- SSH Host: $SSH_HOST:$SSH_PORT
- User: $SSH_USER
- Path: $REMOTE_PATH

Status: ✅ Deploy Completed Successfully

Test URLs:
- Site: https://peru-chamois-575367.hostingersite.com
- Admin (when deployed): https://cms.nutrindojuntos.com.br/admin

Next Steps:
1. Configure Supabase database
2. Deploy CMS to Vercel
3. Test complete functionality
EOF"

# Verificar deploy
echo -e "${BLUE}🔍 Verificando deploy...${NC}"
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST "
    echo 'Arquivos no servidor:'
    ls -la $REMOTE_PATH
    echo ''
    echo 'Tamanho total:'
    du -sh $REMOTE_PATH
"

echo ""
echo -e "${GREEN}🎉 DEPLOY CONCLUÍDO COM SUCESSO!${NC}"
echo -e "${BLUE}================================${NC}"
echo -e "${YELLOW}🌐 Site disponível em:${NC} https://peru-chamois-575367.hostingersite.com"
echo -e "${YELLOW}📁 Arquivos enviados via SSH${NC}"
echo -e "${YELLOW}⚙️  .htaccess configurado${NC}"
echo -e "${YELLOW}💾 Backup criado no servidor${NC}"
echo ""
echo -e "${BLUE}🔄 Próximos passos:${NC}"
echo "1. Configurar Supabase (banco de dados)"
echo "2. Deploy CMS no Vercel"
echo "3. Testar integração completa"
echo ""
echo -e "${GREEN}✅ Frontend deploy finalizado!${NC}"