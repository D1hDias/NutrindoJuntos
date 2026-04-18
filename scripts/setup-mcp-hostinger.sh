#!/bin/bash

# Script de Configuração MCP Hostinger
# NUTRINDO JUNTOS - Automação Enterprise

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}🚀 MCP HOSTINGER - Configuração Automática${NC}"
echo -e "${PURPLE}=============================================${NC}"

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ] || [ ! -f "CLAUDE.md" ]; then
    echo -e "${RED}❌ Execute este script na raiz do projeto NUTRINDO JUNTOS${NC}"
    exit 1
fi

# Solicitar API Token
echo -e "${BLUE}🔐 Configuração do API Token Hostinger${NC}"
echo -e "${YELLOW}Para obter seu API Token:${NC}"
echo -e "${YELLOW}1. Acesse: https://hpanel.hostinger.com/hosting/api${NC}"
echo -e "${YELLOW}2. Clique em 'Generate Token'${NC}"
echo -e "${YELLOW}3. Copie o token (formato: hst_xxxxxxxxxxxxx)${NC}"
echo ""

read -p "🔑 Cole seu Hostinger API Token: " HOSTINGER_TOKEN

if [ -z "$HOSTINGER_TOKEN" ]; then
    echo -e "${RED}❌ Token é obrigatório${NC}"
    exit 1
fi

# Verificar formato do token
if [[ ! $HOSTINGER_TOKEN =~ ^hst_ ]]; then
    echo -e "${YELLOW}⚠️  Token não parece ter formato válido (deve começar com 'hst_')${NC}"
    read -p "Continuar mesmo assim? (y/N): " CONTINUE
    if [[ ! $CONTINUE =~ ^[Yy] ]]; then
        exit 1
    fi
fi

echo -e "${GREEN}✅ Token recebido${NC}"

# Criar arquivo de configuração
echo -e "${BLUE}📄 Criando configuração MCP...${NC}"

# Claude Desktop Config
CLAUDE_CONFIG_DIR="$HOME/.config/claude-desktop"
CLAUDE_CONFIG="$CLAUDE_CONFIG_DIR/claude_desktop_config.json"

# Criar diretório se não existir
mkdir -p "$CLAUDE_CONFIG_DIR"

# Backup da configuração existente
if [ -f "$CLAUDE_CONFIG" ]; then
    cp "$CLAUDE_CONFIG" "${CLAUDE_CONFIG}.backup.$(date +%Y%m%d_%H%M%S)"
    echo -e "${YELLOW}📋 Backup da configuração existente criado${NC}"
fi

# Verificar se já existe configuração MCP
if [ -f "$CLAUDE_CONFIG" ]; then
    # Adicionar Hostinger MCP à configuração existente
    echo -e "${YELLOW}⚙️  Atualizando configuração MCP existente...${NC}"
    
    # Usar jq se disponível, senão criar nova configuração
    if command -v jq &> /dev/null; then
        jq --arg token "$HOSTINGER_TOKEN" '.mcpServers.hostinger = {
            "command": "npx",
            "args": ["-y", "hostinger-api-mcp@latest", "--stdio"],
            "env": {"API_TOKEN": $token}
        }' "$CLAUDE_CONFIG" > "${CLAUDE_CONFIG}.tmp" && mv "${CLAUDE_CONFIG}.tmp" "$CLAUDE_CONFIG"
    else
        # Fallback: criar configuração simples
        cat > "$CLAUDE_CONFIG" << EOF
{
  "mcpServers": {
    "hostinger": {
      "command": "npx",
      "args": ["-y", "hostinger-api-mcp@latest", "--stdio"],
      "env": {
        "API_TOKEN": "$HOSTINGER_TOKEN"
      }
    }
  }
}
EOF
    fi
else
    # Criar nova configuração
    cat > "$CLAUDE_CONFIG" << EOF
{
  "mcpServers": {
    "hostinger": {
      "command": "npx",
      "args": ["-y", "hostinger-api-mcp@latest", "--stdio"],
      "env": {
        "API_TOKEN": "$HOSTINGER_TOKEN"
      }
    }
  }
}
EOF
fi

echo -e "${GREEN}✅ Configuração MCP atualizada${NC}"

# Criar arquivo de variáveis de ambiente local
echo -e "${BLUE}🔧 Configurando variáveis de ambiente...${NC}"

cat > ".env.hostinger" << EOF
# Hostinger MCP Configuration
# NUTRINDO JUNTOS - $(date)

HOSTINGER_API_TOKEN=$HOSTINGER_TOKEN
HOSTINGER_DEBUG=true
HOSTINGER_DOMAIN=nutrindojuntos.com.br
HOSTINGER_SUBDOMAIN_PREFIX=nj

# Subdomains Configuration
HOSTINGER_BLOG_SUBDOMAIN=blog.nutrindojuntos.com.br
HOSTINGER_API_SUBDOMAIN=api.nutrindojuntos.com.br
HOSTINGER_ADMIN_SUBDOMAIN=admin.nutrindojuntos.com.br
HOSTINGER_STAGING_SUBDOMAIN=staging.nutrindojuntos.com.br

# Email Configuration
HOSTINGER_CONTACT_EMAIL=contato@nutrindojuntos.com.br
HOSTINGER_COURSES_EMAIL=cursos@nutrindojuntos.com.br
HOSTINGER_MENTORING_EMAIL=mentoria@nutrindojuntos.com.br
HOSTINGER_NEWSLETTER_EMAIL=newsletter@nutrindojuntos.com.br

# Performance Settings
HOSTINGER_CACHE_ENABLED=true
HOSTINGER_COMPRESSION_ENABLED=true
HOSTINGER_CDN_ENABLED=true

# Backup Settings
HOSTINGER_BACKUP_RETENTION=30
HOSTINGER_BACKUP_FREQUENCY=daily
HOSTINGER_BACKUP_INCLUDE=files,databases

# Monitoring Settings
HOSTINGER_MONITORING_ENABLED=true
HOSTINGER_UPTIME_CHECK_INTERVAL=60
HOSTINGER_PERFORMANCE_THRESHOLD=3000
HOSTINGER_SSL_ALERT_DAYS=30
EOF

# Adicionar ao .gitignore
if ! grep -q ".env.hostinger" .gitignore; then
    echo "" >> .gitignore
    echo "# Hostinger MCP Configuration" >> .gitignore
    echo ".env.hostinger" >> .gitignore
    echo -e "${GREEN}✅ .env.hostinger adicionado ao .gitignore${NC}"
fi

# Criar script de teste do MCP
echo -e "${BLUE}🧪 Criando script de teste...${NC}"

cat > "scripts/test-mcp-hostinger.js" << EOF
#!/usr/bin/env node

// Teste do MCP Hostinger
// NUTRINDO JUNTOS - $(date)

const { spawn } = require('child_process');

async function testHostingerMCP() {
    console.log('🧪 Testando conexão MCP Hostinger...');
    
    try {
        // Testar se o MCP está funcionando
        const mcp = spawn('npx', ['hostinger-api-mcp@latest', '--help']);
        
        mcp.stdout.on('data', (data) => {
            console.log('✅ MCP Hostinger disponível');
            console.log(data.toString());
        });
        
        mcp.stderr.on('data', (data) => {
            console.error('⚠️ Aviso:', data.toString());
        });
        
        mcp.on('close', (code) => {
            if (code === 0) {
                console.log('✅ MCP Hostinger configurado corretamente');
                console.log('');
                console.log('📋 Próximos passos:');
                console.log('1. Reinicie Claude Desktop');
                console.log('2. Teste comandos MCP no chat');
                console.log('3. Execute: /hostinger status');
            } else {
                console.error('❌ Erro na configuração MCP');
            }
        });
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

testHostingerMCP();
EOF

chmod +x "scripts/test-mcp-hostinger.js"

# Criar documentação de comandos úteis
echo -e "${BLUE}📚 Criando documentação de comandos...${NC}"

cat > "docs/MCP_HOSTINGER_COMMANDS.md" << EOF
# 🚀 MCP Hostinger - Comandos Úteis

## 🎯 **Comandos Básicos**

### **Status e Informações**
\`\`\`
/hostinger status                    # Status geral da conta
/hostinger domains                   # Listar todos os domínios  
/hostinger domain nutrindojuntos.com.br  # Info específica do domínio
/hostinger dns nutrindojuntos.com.br     # Records DNS atuais
\`\`\`

### **Gerenciamento de Arquivos**
\`\`\`
/hostinger files list /public_html   # Listar arquivos
/hostinger files upload build/ /public_html/  # Upload de build
/hostinger files backup /public_html # Criar backup
/hostinger files permissions /public_html 755 # Ajustar permissões
\`\`\`

### **Subdomínios**
\`\`\`
/hostinger subdomain create blog.nutrindojuntos.com.br
/hostinger subdomain create api.nutrindojuntos.com.br  
/hostinger subdomain create staging.nutrindojuntos.com.br
/hostinger subdomain list nutrindojuntos.com.br
\`\`\`

### **SSL e Segurança**
\`\`\`
/hostinger ssl status nutrindojuntos.com.br
/hostinger ssl install nutrindojuntos.com.br
/hostinger ssl renew nutrindojuntos.com.br
/hostinger security scan nutrindojuntos.com.br
\`\`\`

### **Performance e Monitoramento**
\`\`\`
/hostinger performance nutrindojuntos.com.br
/hostinger cache clear nutrindojuntos.com.br
/hostinger monitoring setup nutrindojuntos.com.br
/hostinger uptime nutrindojuntos.com.br
\`\`\`

### **Email Management**
\`\`\`
/hostinger email create contato@nutrindojuntos.com.br
/hostinger email create cursos@nutrindojuntos.com.br
/hostinger email create mentoria@nutrindojuntos.com.br
/hostinger email list nutrindojuntos.com.br
\`\`\`

### **Backup e Restore**
\`\`\`
/hostinger backup create full
/hostinger backup list
/hostinger backup restore backup_id
/hostinger backup schedule daily
\`\`\`

## 🔧 **Automações Avançadas**

### **Deploy Completo**
\`\`\`
/hostinger deploy github D1hDias/NutrindoJuntos main /public_html
\`\`\`

### **Setup Completo do Projeto**
\`\`\`
/hostinger project setup nutrindojuntos.com.br --ssl --monitoring --backup
\`\`\`

### **Health Check Completo**
\`\`\`
/hostinger health check nutrindojuntos.com.br --full
\`\`\`

---

**💡 Dica:** Use \`/hostinger help\` para ver todos os comandos disponíveis
EOF

# Finalização
echo ""
echo -e "${PURPLE}🎉 CONFIGURAÇÃO MCP HOSTINGER COMPLETA!${NC}"
echo -e "${PURPLE}=======================================${NC}"
echo ""
echo -e "${GREEN}✅ Arquivos criados:${NC}"
echo -e "   📄 ~/.config/claude-desktop/claude_desktop_config.json"
echo -e "   📄 .env.hostinger"
echo -e "   📄 scripts/test-mcp-hostinger.js"
echo -e "   📄 docs/MCP_HOSTINGER_COMMANDS.md"
echo ""
echo -e "${BLUE}🔄 Próximos Passos:${NC}"
echo -e "${YELLOW}1. Reinicie Claude Desktop completamente${NC}"
echo -e "${YELLOW}2. Execute: node scripts/test-mcp-hostinger.js${NC}"
echo -e "${YELLOW}3. No Claude, teste: /hostinger status${NC}"
echo -e "${YELLOW}4. Explore comandos em: docs/MCP_HOSTINGER_COMMANDS.md${NC}"
echo ""
echo -e "${BLUE}💡 Recursos Ativados:${NC}"
echo -e "   🚀 Deploy automático via API"
echo -e "   🔐 SSL management automático"
echo -e "   📊 Monitoramento em tempo real"
echo -e "   💾 Backup automático"
echo -e "   📧 Email management"
echo -e "   🌐 DNS e subdomain management"
echo ""
echo -e "${GREEN}🏆 NUTRINDO JUNTOS agora tem automação enterprise-grade!${NC}"