#!/bin/bash

# Preparar Arquivos para Deploy Manual
# NUTRINDO JUNTOS - Gerar arquivos para upload

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 NUTRINDO JUNTOS - Preparar Deploy${NC}"
echo -e "${BLUE}====================================${NC}"

# Preparar arquivos para upload
echo -e "${BLUE}📁 Preparando arquivos para upload...${NC}"
rm -rf deploy-files/
mkdir -p deploy-files/

# Copiar arquivos estáticos
if [ -d "apps/web/public" ]; then
    echo -e "${YELLOW}📂 Copiando arquivos estáticos...${NC}"
    cp -r apps/web/public/* deploy-files/ 2>/dev/null || true
fi

# Criar index.html profissional
echo -e "${YELLOW}📝 Criando página principal...${NC}"
cat > deploy-files/index.html << 'EOF'
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
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); }
            50% { box-shadow: 0 4px 25px rgba(34, 197, 94, 0.5); }
            100% { box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); }
        }
        .features {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px; text-align: left; margin-bottom: 40px;
        }
        .feature {
            background: #f8fafc; padding: 30px; border-radius: 15px;
            border: 1px solid #e2e8f0; transition: all 0.3s ease;
        }
        .feature:hover { 
            transform: translateY(-5px); 
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .feature h3 {
            margin: 0 0 15px 0; color: #22c55e; font-size: 1.2rem; font-weight: 600;
            display: flex; align-items: center; gap: 10px;
        }
        .feature p {
            margin: 0; color: #64748b; font-size: 0.95rem;
        }
        .info {
            background: linear-gradient(135deg, #f1f5f9, #e2e8f0); 
            padding: 25px; border-radius: 15px;
            border-left: 4px solid #22c55e; text-align: left; margin: 30px 0;
        }
        .info h4 { color: #22c55e; margin-bottom: 15px; font-size: 1.1rem; }
        .info p { margin: 8px 0; color: #475569; font-size: 0.9rem; }
        .tech-stack {
            display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
            margin-top: 30px;
        }
        .tech { 
            background: linear-gradient(135deg, #e0f2fe, #b3e5fc); 
            color: #0369a1; padding: 10px 18px; 
            border-radius: 25px; font-size: 0.85rem; font-weight: 500;
            border: 1px solid #0ea5e9; transition: transform 0.2s;
        }
        .tech:hover { transform: scale(1.05); }
        .cta {
            margin-top: 40px; padding-top: 30px; 
            border-top: 2px dashed #e2e8f0;
        }
        .cta h4 { color: #22c55e; margin-bottom: 20px; font-size: 1.3rem; }
        .next-steps {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px; text-align: left;
        }
        .step {
            background: #fefefe; padding: 20px; border-radius: 10px;
            border: 2px solid #f0f9ff; position: relative;
        }
        .step::before {
            content: attr(data-step); position: absolute; top: -10px; left: 20px;
            background: #22c55e; color: white; width: 25px; height: 25px;
            border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-size: 0.8rem; font-weight: bold;
        }
        .step h5 { margin: 10px 0 8px 0; color: #1e293b; font-size: 1rem; }
        .step p { margin: 0; color: #64748b; font-size: 0.85rem; }
        @media (max-width: 768px) {
            .container { padding: 40px 20px; }
            .logo { font-size: 2rem; }
            .subtitle { font-size: 1.1rem; }
            .features, .next-steps { grid-template-columns: 1fr; gap: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🍎 NUTRINDO JUNTOS</div>
        <div class="subtitle">Educação em Nutrição de Excelência</div>
        
        <div class="status">✅ Site Online - Deploy MVP Realizado!</div>
        
        <div class="features">
            <div class="feature">
                <h3>🎓 Cursos Especializados</h3>
                <p>Nutrição clínica, esportiva e funcional com base científica sólida. Conteúdo atualizado para estudantes e profissionais que buscam excelência técnica.</p>
            </div>
            <div class="feature">
                <h3>👥 Mentoria Personalizada</h3>
                <p>Acompanhamento individual com nutricionistas experientes. Desenvolva suas habilidades técnicas e acelere seu crescimento profissional no mercado.</p>
            </div>
            <div class="feature">
                <h3>📚 Blog Educativo</h3>
                <p>Conteúdo científico atualizado, estudos de caso reais, análise de tendências do mercado e discussão de temas relevantes da nutrição moderna.</p>
            </div>
        </div>
        
        <div class="info">
            <h4>📊 Status do Deploy MVP</h4>
            <p><strong>🗓️ Data de Deploy:</strong> 16 de março de 2026</p>
            <p><strong>🚀 Versão:</strong> MVP 1.0 - Teste de Funcionalidades</p>
            <p><strong>⚙️ Método de Deploy:</strong> Deploy manual otimizado</p>
            <p><strong>🌐 URL Provisória:</strong> peru-chamois-575367.hostingersite.com</p>
            <p><strong>🎯 Próxima Etapa:</strong> Configuração do CMS Payload e integração completa</p>
        </div>

        <div class="tech-stack">
            <div class="tech">Next.js 15</div>
            <div class="tech">TypeScript</div>
            <div class="tech">Tailwind CSS</div>
            <div class="tech">Payload CMS</div>
            <div class="tech">PostgreSQL</div>
            <div class="tech">Supabase</div>
            <div class="tech">Vercel</div>
            <div class="tech">Hostinger Business</div>
        </div>
        
        <div class="cta">
            <h4>🔄 Roadmap de Implementação</h4>
            <div class="next-steps">
                <div class="step" data-step="1">
                    <h5>Frontend Online</h5>
                    <p>Landing page profissional com design responsivo e otimizado para performance.</p>
                </div>
                <div class="step" data-step="2">
                    <h5>CMS Backend</h5>
                    <p>Payload CMS no Vercel com PostgreSQL Supabase para gestão de conteúdo.</p>
                </div>
                <div class="step" data-step="3">
                    <h5>Integração Completa</h5>
                    <p>Blog dinâmico, sistema de cursos e formulários funcionais integrados.</p>
                </div>
                <div class="step" data-step="4">
                    <h5>Funcionalidades Avançadas</h5>
                    <p>Sistema de pagamentos, área do aluno e automações de marketing.</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
EOF

# Criar .htaccess otimizado
echo -e "${YELLOW}⚙️ Criando .htaccess otimizado...${NC}"
cat > deploy-files/.htaccess << 'EOF'
# NUTRINDO JUNTOS - Configuração Otimizada Hostinger
RewriteEngine On

# Redirect para HTTPS (força SSL)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Compressão GZIP para performance
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE image/svg+xml
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xml+rss
</IfModule>

# Cache Headers para performance
<IfModule mod_expires.c>
    ExpiresActive On
    
    # HTML - cache curto para conteúdo dinâmico
    ExpiresByType text/html "access plus 1 hour"
    
    # CSS e JS - cache longo para assets estáticos
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/javascript "access plus 1 year"
    
    # Imagens - cache longo
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    
    # Fontes
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/ttf "access plus 1 year"
    ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>

# Headers de Segurança
<IfModule mod_headers.c>
    # Previne clickjacking
    Header always set X-Frame-Options "SAMEORIGIN"
    
    # Previne MIME type sniffing
    Header always set X-Content-Type-Options "nosniff"
    
    # Controle de referrer para privacidade
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    
    # Política de permissões restritiva
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
    
    # Cache control para arquivos estáticos
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|webp|svg|woff2|woff|ttf)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    
    # Cache control para HTML
    <FilesMatch "\.(html|htm)$">
        Header set Cache-Control "public, max-age=3600, must-revalidate"
    </FilesMatch>
</IfModule>

# Bloquear acesso a arquivos sensíveis
<FilesMatch "\.(env|log|md|txt|json|yml|yaml|ini|conf)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Bloquear acesso a diretórios do sistema
RedirectMatch 403 /\..*$
RedirectMatch 403 /node_modules/.*$

# Página de erro personalizada (opcional)
ErrorDocument 404 /index.html

# Configuração para SPA (Single Page Application)
<IfModule mod_rewrite.c>
    # Não redirecionar arquivos e diretórios que existem
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    
    # Não redirecionar requisições de API
    RewriteCond %{REQUEST_URI} !^/api/
    
    # Redirecionar tudo para index.html (SPA behavior)
    RewriteRule . /index.html [L]
</IfModule>

# Otimização adicional
<IfModule mod_mime.c>
    # Definir tipos MIME corretos
    AddType application/javascript .js
    AddType text/css .css
    AddType image/svg+xml .svg
    AddType font/woff2 .woff2
</IfModule>
EOF

# Criar arquivo robots.txt para SEO
echo -e "${YELLOW}🤖 Criando robots.txt...${NC}"
cat > deploy-files/robots.txt << 'EOF'
User-agent: *
Allow: /

# Sitemap (será adicionado quando o site estiver completo)
# Sitemap: https://nutrindojuntos.com.br/sitemap.xml

# Bloquear crawling de arquivos administrativos
Disallow: /admin/
Disallow: /api/
Disallow: /*.env
Disallow: /*.log
Disallow: /deploy-info.txt
EOF

# Criar arquivo de informações do deploy
echo -e "${YELLOW}📋 Criando informações do deploy...${NC}"
cat > deploy-files/deploy-info.txt << EOF
NUTRINDO JUNTOS - Deploy Information
===================================

Deploy Date: $(date '+%d/%m/%Y às %H:%M:%S')
Deploy Method: Preparação manual para upload
Build Type: Landing Page Estática Otimizada
Domain: peru-chamois-575367.hostingersite.com

Arquivos Incluídos:
- ✅ index.html (Landing page profissional)
- ✅ .htaccess (Configuração otimizada)
- ✅ robots.txt (SEO básico)
- ✅ favicon.ico (se disponível)
- ✅ Imagens otimizadas (se disponíveis)

Status: ✅ Arquivos Preparados para Upload

Instruções de Upload:
1. Acesse o File Manager do Hostinger
2. Navegue até: /domains/peru-chamois-575367.hostingersite.com/public_html/
3. Exclua arquivos existentes (se houver)
4. Upload todos os arquivos desta pasta
5. Verifique permissões: 644 para arquivos, 755 para diretórios

Test URLs:
- Site: https://peru-chamois-575367.hostingersite.com
- Admin (futuro): https://cms.nutrindojuntos.com.br/admin

Recursos Implementados:
- ✅ Design responsivo moderno
- ✅ SSL redirect automático
- ✅ Compressão GZIP ativa
- ✅ Headers de segurança
- ✅ Cache otimizado (1 ano para assets)
- ✅ Bloqueio de arquivos sensíveis
- ✅ SEO básico configurado

Performance Esperada:
- Lighthouse Score: >95
- Load Time: <2s
- First Contentful Paint: <1s
- Cumulative Layout Shift: <0.1

Próximos Passos:
1. ✅ Upload manual dos arquivos
2. ⏳ Configurar Supabase (banco de dados)
3. ⏳ Deploy CMS no Vercel
4. ⏳ Integração completa frontend + backend
5. ⏳ Configurar domínio definitivo
EOF

# Listar arquivos criados
echo ""
echo -e "${GREEN}🎉 ARQUIVOS PREPARADOS COM SUCESSO!${NC}"
echo -e "${BLUE}===================================${NC}"
echo ""
echo -e "${YELLOW}📁 Arquivos criados em: deploy-files/${NC}"
ls -la deploy-files/
echo ""
echo -e "${BLUE}📊 Tamanho total:${NC}"
du -sh deploy-files/
echo ""
echo -e "${BLUE}🔄 Próximos Passos:${NC}"
echo -e "${YELLOW}1. Acesse Hostinger File Manager${NC}"
echo -e "${YELLOW}2. Navegue até: /domains/peru-chamois-575367.hostingersite.com/public_html/${NC}"
echo -e "${YELLOW}3. Upload todos os arquivos da pasta deploy-files/${NC}"
echo -e "${YELLOW}4. Teste: https://peru-chamois-575367.hostingersite.com${NC}"
echo ""
echo -e "${GREEN}✨ Landing page profissional pronta para upload!${NC}"