# 🚀 MCP Hostinger - Automação Enterprise para NUTRINDO JUNTOS

## 🎯 **Descoberta Incrível**

✅ **MCP Oficial Hostinger Confirmado**: `hostinger-api-mcp`  
🏢 **Integração Enterprise**: API completa disponível  
⚡ **Automação Total**: Deploy → Monitoring → Management

## 🔧 **Configuração do MCP Hostinger**

### 1. **Obter API Token Hostinger**

**Acesse:** [Hostinger hPanel → API](https://hpanel.hostinger.com/hosting/api)

**Passos:**
1. Login no hPanel Hostinger
2. Vá em **Hosting → API Management**
3. **Gerar novo token API**
4. **Copiar token** (formato: `hst_xxxxxxxxxxxxx`)

### 2. **Configurar MCP no Claude Code**

Adicione ao seu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "hostinger": {
      "command": "npx",
      "args": [
        "-y", 
        "hostinger-api-mcp@latest",
        "--stdio"
      ],
      "env": {
        "API_TOKEN": "seu-hostinger-api-token-aqui"
      }
    }
  }
}
```

### 3. **Variáveis de Ambiente**

Crie arquivo `.env.hostinger`:

```bash
# Hostinger API Configuration
HOSTINGER_API_TOKEN=seu-token-api-hostinger
HOSTINGER_DEBUG=true
HOSTINGER_DOMAIN=nutrindojuntos.com.br
HOSTINGER_SUBDOMAIN_PREFIX=nj
```

## 🛠️ **Capacidades do MCP Hostinger**

### **Gerenciamento de Domínios**
- ✅ Listar todos os domínios
- ✅ Configurar DNS records
- ✅ Criar/gerenciar subdomínios
- ✅ SSL certificate management
- ✅ Domain forwarding/redirects

### **File Management**
- ✅ Upload/download arquivos via API
- ✅ Sync automático de builds
- ✅ Backup/restore de arquivos
- ✅ Permissões de arquivos
- ✅ Cleanup automático

### **Database Management**
- ✅ Criar/gerenciar databases MySQL
- ✅ Import/export dados
- ✅ User management
- ✅ Performance monitoring
- ✅ Backup automático

### **Email Management**
- ✅ Criar contas de email profissionais
- ✅ Configurar forwards/aliases
- ✅ Spam protection
- ✅ Email analytics
- ✅ Autoresponders

### **Performance & Security**
- ✅ Performance monitoring
- ✅ Security scans
- ✅ Cache management
- ✅ Resource usage analytics
- ✅ Uptime monitoring

## 🚀 **Automações Específicas para NUTRINDO JUNTOS**

### **Deploy Pipeline Automático**

```mermaid
graph LR
    A[Git Push] --> B[GitHub Webhook]
    B --> C[MCP Hostinger Trigger]
    C --> D[Build Next.js]
    D --> E[Upload via SSH]
    E --> F[Update DNS]
    F --> G[SSL Check]
    G --> H[Performance Test]
    H --> I[Health Check]
    I --> J[Notify Success]
```

### **Configurações Automáticas**

**1. Subdomínios Inteligentes:**
```
blog.nutrindojuntos.com.br     → Frontend blog section
api.nutrindojuntos.com.br      → API proxy para Vercel CMS
admin.nutrindojuntos.com.br    → Redirect para Vercel CMS
staging.nutrindojuntos.com.br  → Branch staging
dev.nutrindojuntos.com.br      → Branch development
```

**2. Emails Profissionais:**
```
contato@nutrindojuntos.com.br    → Formulário de contato
cursos@nutrindojuntos.com.br     → Leads de cursos  
mentoria@nutrindojuntos.com.br   → Leads de mentoria
newsletter@nutrindojuntos.com.br → Newsletter/marketing
admin@nutrindojuntos.com.br      → Administração
```

**3. SSL Automático:**
- Certificado wildcard para *.nutrindojuntos.com.br
- Renovação automática
- Redirect automático HTTP → HTTPS

## 💡 **Casos de Uso Avançados**

### **1. Deploy Inteligente com Rollback**

```javascript
// Exemplo de automação via MCP
const deployWithRollback = async () => {
  // 1. Deploy nova versão
  const deployResult = await hostinger.deploy({
    source: 'github',
    branch: 'main',
    target: '/public_html'
  })
  
  // 2. Health check
  const healthCheck = await hostinger.healthCheck({
    url: 'https://nutrindojuntos.com.br',
    timeout: 30000
  })
  
  // 3. Rollback se necessário
  if (!healthCheck.success) {
    await hostinger.rollback({
      version: 'previous'
    })
    throw new Error('Deploy failed, rolled back')
  }
  
  return { success: true, version: deployResult.version }
}
```

### **2. Monitoramento Automático**

```javascript
// Monitoramento contínuo
const setupMonitoring = async () => {
  await hostinger.monitoring.setup({
    domain: 'nutrindojuntos.com.br',
    checks: [
      { type: 'uptime', interval: 60 },
      { type: 'performance', threshold: 3000 },
      { type: 'ssl', daysBeforeExpiry: 30 }
    ],
    alerts: {
      email: 'admin@nutrindojuntos.com.br',
      webhook: 'https://hooks.slack.com/...'
    }
  })
}
```

### **3. Backup Inteligente**

```javascript
// Backup automático antes de deploys
const intelligentBackup = async () => {
  const backupName = `backup_${Date.now()}`
  
  await hostinger.backup.create({
    name: backupName,
    include: ['files', 'databases'],
    retention: 30 // dias
  })
  
  // Cleanup de backups antigos
  await hostinger.backup.cleanup({
    keepLast: 10,
    maxAge: 90 // dias
  })
}
```

## 📊 **Dashboard de Controle**

O MCP Hostinger permite criar um dashboard centralizado:

```javascript
// Exemplo de dashboard via MCP
const getDashboardData = async () => {
  const [
    domainStatus,
    performanceMetrics, 
    securityStatus,
    backupStatus
  ] = await Promise.all([
    hostinger.domains.getStatus(),
    hostinger.performance.getMetrics(),
    hostinger.security.getScanResults(),
    hostinger.backup.getStatus()
  ])
  
  return {
    uptime: performanceMetrics.uptime,
    responseTime: performanceMetrics.averageResponse,
    sslStatus: domainStatus.ssl,
    lastBackup: backupStatus.lastBackup,
    securityScore: securityStatus.score
  }
}
```

## 🔐 **Segurança e Melhores Práticas**

### **Proteção do API Token**
```bash
# NUNCA commitar tokens no Git
echo "HOSTINGER_API_TOKEN=seu-token" >> .env.local
echo ".env.local" >> .gitignore

# Usar apenas em produção
if [ "$NODE_ENV" = "production" ]; then
  export HOSTINGER_API_TOKEN=$PROD_TOKEN
fi
```

### **Rate Limiting**
```javascript
// Implementar rate limiting para APIs
const rateLimiter = new Map()

const apiCall = async (endpoint, data) => {
  const now = Date.now()
  const lastCall = rateLimiter.get(endpoint) || 0
  
  if (now - lastCall < 1000) { // 1 call per second
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  rateLimiter.set(endpoint, now)
  return await hostinger.api.call(endpoint, data)
}
```

## 🎯 **Roadmap de Implementação**

### **Fase 1: Setup Básico (1 dia)**
- ✅ Configurar MCP Hostinger
- ✅ Testar conexão API
- ✅ Documentar endpoints disponíveis

### **Fase 2: Deploy Automático (2 dias)**
- 🔄 Script deploy via MCP
- 🔄 Health checks automáticos
- 🔄 Rollback em caso de falha

### **Fase 3: Monitoramento (1 dia)**
- ⏳ Alertas de uptime
- ⏳ Métricas de performance
- ⏳ Dashboard centralizado

### **Fase 4: Otimizações (2 dias)**
- ⏳ Cache automático
- ⏳ Compressão de assets
- ⏳ CDN configuration

### **Fase 5: Segurança (1 dia)**
- ⏳ SSL management
- ⏳ Security scanning
- ⏳ Backup automático

## 💰 **ROI da Implementação**

| Benefício | Economia/Mês | Tempo Economizado |
|-----------|--------------|-------------------|
| Deploy Automático | R$ 500 | 4 horas/semana |
| Monitoramento | R$ 300 | 2 horas/semana |
| Backup Automático | R$ 200 | 1 hora/semana |
| SSL Management | R$ 150 | 30 min/semana |
| **TOTAL** | **R$ 1.150** | **7.5h/semana** |

## 🚀 **Próximos Passos**

1. **Obter API Token** no hPanel Hostinger
2. **Configurar MCP** no Claude Code
3. **Testar conexão** com comandos básicos
4. **Implementar automações** fase por fase
5. **Monitorar resultados** e otimizar

---

**🏆 Com MCP Hostinger, transformamos NUTRINDO JUNTOS em uma plataforma enterprise-grade com automação total e custo zero adicional!**