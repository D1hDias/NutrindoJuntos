#!/bin/bash

# Script de Deploy para Hostinger
# NUTRINDO JUNTOS - Deploy Frontend Estático

set -e

echo "🚀 NUTRINDO JUNTOS - Deploy Hostinger"
echo "======================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script na raiz do projeto${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Verificando dependências...${NC}"

# Verificar se pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm não está instalado${NC}"
    exit 1
fi

# Verificar se Next.js config estático existe
if [ ! -f "apps/web/next.config.static.mjs" ]; then
    echo -e "${RED}❌ Configuração estática do Next.js não encontrada${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dependências verificadas${NC}"

# Limpar builds anteriores
echo -e "${BLUE}🧹 Limpando builds anteriores...${NC}"
rm -rf apps/web/.next
rm -rf apps/web/out
rm -rf dist/

echo -e "${GREEN}✅ Limpeza concluída${NC}"

# Build do frontend com configuração estática
echo -e "${BLUE}🏗️  Fazendo build estático...${NC}"
cd apps/web

# Usar configuração estática
cp next.config.static.mjs next.config.temp.mjs
mv next.config.mjs next.config.original.mjs
mv next.config.temp.mjs next.config.mjs

# Build e export
echo -e "${YELLOW}📦 Executando next build...${NC}"
pnpm build

echo -e "${YELLOW}📤 Executando next export...${NC}"
pnpm export

# Restaurar configuração original
mv next.config.mjs next.config.static.mjs
mv next.config.original.mjs next.config.mjs

cd ../..

echo -e "${GREEN}✅ Build estático concluído${NC}"

# Preparar arquivos para upload
echo -e "${BLUE}📁 Preparando arquivos para upload...${NC}"
mkdir -p dist/
cp -r apps/web/out/* dist/

# Criar arquivo .htaccess otimizado
echo -e "${YELLOW}⚙️  Criando .htaccess otimizado...${NC}"
cat > dist/.htaccess << 'EOF'
# NUTRINDO JUNTOS - Configuração Hostinger
# Performance & Security Optimized

# ==========================================
# GZIP COMPRESSION
# ==========================================
<IfModule mod_deflate.c>
    # Compactar tipos de arquivo
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# ==========================================
# BROWSER CACHING
# ==========================================
<IfModule mod_expires.c>
    ExpiresActive On
    
    # HTML (sem cache para atualizações frequentes)
    ExpiresByType text/html "access plus 1 hour"
    
    # CSS e JavaScript (cache longo)
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/javascript "access plus 1 year"
    
    # Imagens (cache longo)
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/avif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    
    # Fonts
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType application/font-woff "access plus 1 year"
    ExpiresByType application/font-woff2 "access plus 1 year"
    
    # Outros assets
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/x-component "access plus 1 month"
</IfModule>

# ==========================================
# CACHE HEADERS
# ==========================================
<IfModule mod_headers.c>
    # Remove ETags (usar Expires)
    Header unset ETag
    FileETag None
    
    # Cache headers para assets estáticos
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    
    # Headers de segurança
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# ==========================================
# REWRITE RULES (Next.js Routes)
# ==========================================
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Redirect para HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # Redirect www para non-www
    RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
    RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
    
    # Remover .html das URLs
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^([^\.]+)$ $1.html [NC,L]
    
    # Fallback para index.html (SPA routing)
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !^/admin
    RewriteRule . /index.html [L]
</IfModule>

# ==========================================
# SECURITY
# ==========================================
# Bloquear acesso a arquivos sensíveis
<Files ".htaccess">
    Order Allow,Deny
    Deny from All
</Files>

<Files "*.log">
    Order Allow,Deny
    Deny from All
</Files>

# Bloquear listagem de diretórios
Options -Indexes

# Limite de upload (se necessário)
php_value upload_max_filesize 32M
php_value post_max_size 32M
php_value max_execution_time 300

EOF

echo -e "${GREEN}✅ .htaccess criado${NC}"

# Criar arquivo de informações do deploy
echo -e "${YELLOW}📝 Criando informações do deploy...${NC}"
cat > dist/deploy-info.txt << EOF
NUTRINDO JUNTOS - Deploy Information
===================================

Deploy Date: $(date)
Build Type: Static Export (Next.js)
Target: Hostinger Business Hosting
Domain: nutrindojuntos.com.br

Files included:
- Static HTML/CSS/JS
- Optimized images
- .htaccess for performance
- Service worker (if available)

Upload Instructions:
1. Connect FTP: ftp://46.202.142.149
2. User: u344738169
3. Upload all files in /dist to /public_html
4. Verify .htaccess is uploaded
5. Test site: https://nutrindojuntos.com.br

Troubleshooting:
- If 404 errors: Check .htaccess upload
- If slow loading: Verify GZIP compression
- If routing issues: Check rewrite rules

EOF

echo -e "${GREEN}✅ Informações criadas${NC}"

# Exibir resumo
echo ""
echo -e "${GREEN}🎉 DEPLOY PREPARADO COM SUCESSO!${NC}"
echo -e "${BLUE}=====================================${NC}"
echo -e "${YELLOW}📁 Arquivos prontos em:${NC} ./dist/"
echo -e "${YELLOW}📊 Tamanho total:${NC} $(du -sh dist/ | cut -f1)"
echo -e "${YELLOW}📄 Arquivos:${NC} $(find dist/ -type f | wc -l) files"
echo ""
echo -e "${BLUE}🚀 Próximos passos:${NC}"
echo "1. Conecte via FTP: ftp://46.202.142.149"
echo "2. Usuário: u344738169"
echo "3. Upload todos arquivos ./dist/* para /public_html"
echo "4. Acesse: https://nutrindojuntos.com.br"
echo ""
echo -e "${GREEN}✅ Deploy concluído!${NC}"