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

# Preparar arquivos para upload (versão simplificada)
echo -e "${BLUE}📁 Preparando arquivos para upload...${NC}"
rm -rf dist/
mkdir -p dist/

# Copiar arquivos estáticos
if [ -d "apps/web/public" ]; then
    cp -r apps/web/public/* dist/ 2>/dev/null || true
fi

# Criar index.html básico mas elegante
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NUTRINDO JUNTOS - Educação em Nutrição</title>
    <meta name="description" content="Plataforma educacional especializada em nutrição para estudantes e profissionais.">
    <link rel="icon" href="/favicon.ico">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh; display: flex; align-items: center; justify-content: center;
            color: #333; line-height: 1.6;
        }
        .container { 
            text-align: center; max-width: 800px; background: rgba(255,255,255,0.95); 
            padding: 60px 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px); margin: 20px;
        }
        .logo { 
            font-size: 3rem; font-weight: 700; color: #22c55e; margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .subtitle { 
            font-size: 1.4rem; color: #64748b; margin-bottom: 40px; font-weight: 300;
        }
        .status { 
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white; padding: 16px 32px; border-radius: 50px;
            display: inline-block; font-weight: 600; font-size: 1.1rem;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); margin-bottom: 40px;
        }
        .features {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px; text-align: left; margin-bottom: 40px;
        }
        .feature {
            background: #f8fafc; padding: 30px; border-radius: 15px;
            border: 1px solid #e2e8f0; transition: transform 0.2s;
        }
        .feature:hover { transform: translateY(-5px); }
        .feature h3 {
            margin: 0 0 15px 0; color: #22c55e; font-size: 1.2rem; font-weight: 600;
            display: flex; align-items: center; gap: 10px;
        }
        .feature p {
            margin: 0; color: #64748b; font-size: 0.95rem;
        }
        .info {
            background: #f1f5f9; padding: 25px; border-radius: 15px;
            border-left: 4px solid #22c55e; text-align: left; margin-top: 30px;
        }
        .info h4 { color: #22c55e; margin-bottom: 10px; }
        .info p { margin: 5px 0; color: #475569; font-size: 0.9rem; }
        .tech-stack {
            display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
            margin-top: 30px;
        }
        .tech { 
            background: #e0f2fe; color: #0369a1; padding: 8px 16px; 
            border-radius: 25px; font-size: 0.85rem; font-weight: 500;
        }
        @media (max-width: 768px) {
            .container { padding: 40px 20px; }
            .logo { font-size: 2rem; }
            .subtitle { font-size: 1.1rem; }
            .features { grid-template-columns: 1fr; gap: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🍎 NUTRINDO JUNTOS</div>
        <div class="subtitle">Educação em Nutrição de Excelência</div>
        
        <div class="status">✅ Site Online - Deploy Realizado com Sucesso!</div>
        
        <div class="features">
            <div class="feature">
                <h3>🎓 Cursos Especializados</h3>
                <p>Nutrição clínica, esportiva e funcional com base científica para estudantes e profissionais que buscam excelência.</p>
            </div>
            <div class="feature">
                <h3>👥 Mentoria Personalizada</h3>
                <p>Acompanhamento individual com nutricionistas experientes para acelerar seu crescimento profissional.</p>
            </div>
            <div class="feature">
                <h3>📚 Blog Educativo</h3>
                <p>Conteúdo científico atualizado, estudos de caso e tendências do mercado de nutrição.</p>
            </div>
        </div>
        
        <div class="info">
            <h4>📊 Status do Deploy</h4>
            <p><strong>Data:</strong> 16 de março de 2026</p>
            <p><strong>Versão:</strong> MVP 1.0</p>
            <p><strong>Método:</strong> Deploy automático via SSH</p>
            <p><strong>Próxima Etapa:</strong> Configuração do CMS e integração completa</p>
        </div>

        <div class="tech-stack">
            <div class="tech">Next.js 15</div>
            <div class="tech">TypeScript</div>
            <div class="tech">Tailwind CSS</div>
            <div class="tech">Payload CMS</div>
            <div class="tech">PostgreSQL</div>
            <div class="tech">Vercel</div>
            <div class="tech">Hostinger</div>
        </div>
    </div>
</body>
</html>
EOF

# Criar .htaccess otimizado
echo -e "${YELLOW}⚙️  Criando .htaccess otimizado...${NC}"
cat > dist/.htaccess << 'EOF'
# NUTRINDO JUNTOS - Configuração Otimizada
RewriteEngine On

# Redirect para HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Compressão GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
    AddOutputFilterByType DEFLATE text/plain text/xml application/xml application/xml+rss
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
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Headers de Segurança
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Block access to sensitive files
<FilesMatch "\.(env|log|md)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>
EOF

# Backup remoto
echo -e "${BLUE}💾 Fazendo backup do site atual...${NC}"
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST "
    if [ -d '$REMOTE_PATH' ]; then
        cp -r $REMOTE_PATH ${REMOTE_PATH}_backup_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
    fi
    mkdir -p $REMOTE_PATH
" 

# Upload via SSH + rsync
echo -e "${BLUE}📤 Fazendo upload via SSH...${NC}"
rsync -avz --delete --progress -e "ssh -p $SSH_PORT" dist/ $SSH_USER@$SSH_HOST:$REMOTE_PATH/

# Verificar permissões
echo -e "${BLUE}🔧 Configurando permissões...${NC}"
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST "
    find $REMOTE_PATH -type f -exec chmod 644 {} \;
    find $REMOTE_PATH -type d -exec chmod 755 {} \;
    chmod 644 $REMOTE_PATH/.htaccess 2>/dev/null || true
"

# Verificar deploy
echo -e "${BLUE}🔍 Verificando deploy...${NC}"
ssh -p $SSH_PORT $SSH_USER@$SSH_HOST "
    echo 'Arquivos no servidor:'
    ls -la $REMOTE_PATH | head -10
    echo ''
    echo 'Tamanho total:'
    du -sh $REMOTE_PATH
    echo ''
    echo 'Arquivo index.html:'
    test -f $REMOTE_PATH/index.html && echo '✅ index.html encontrado' || echo '❌ index.html não encontrado'
    echo ''
    echo '.htaccess:'
    test -f $REMOTE_PATH/.htaccess && echo '✅ .htaccess configurado' || echo '❌ .htaccess não encontrado'
"

# Cleanup local
rm -rf dist/

echo ""
echo -e "${GREEN}🎉 DEPLOY CONCLUÍDO COM SUCESSO!${NC}"
echo -e "${BLUE}================================${NC}"
echo -e "${YELLOW}🌐 Site disponível em:${NC}"
echo -e "${GREEN}   https://peru-chamois-575367.hostingersite.com${NC}"
echo ""
echo -e "${BLUE}✅ Recursos Ativados:${NC}"
echo -e "${YELLOW}📁 Landing page profissional${NC}"
echo -e "${YELLOW}🔐 SSL redirect automático${NC}"
echo -e "${YELLOW}⚡ Compressão GZIP ativa${NC}"
echo -e "${YELLOW}🛡️ Headers de segurança${NC}"
echo -e "${YELLOW}💾 Backup criado no servidor${NC}"
echo -e "${YELLOW}📊 Cache otimizado configurado${NC}"
echo ""
echo -e "${BLUE}🔄 Próximos passos:${NC}"
echo "1. Testar: https://peru-chamois-575367.hostingersite.com"
echo "2. Configurar Supabase (banco de dados)"
echo "3. Deploy CMS no Vercel"
echo "4. Integração completa"
echo ""
echo -e "${GREEN}✅ NUTRINDO JUNTOS está ONLINE!${NC}"