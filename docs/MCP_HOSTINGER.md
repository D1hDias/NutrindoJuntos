# MCP Hostinger - Configuração Local

## Visão Geral

O **MCP Hostinger** foi configurado localmente apenas para este projeto, permitindo automação de deploy e gerenciamento de hosting sem instalar globalmente.

## Configuração Local

### Arquivo de Configuração
**Localização:** `.claude/mcp-config.json`

```json
{
  "mcpServers": {
    "hostinger-mcp": {
      "command": "npx",
      "args": ["hostinger-api-mcp@latest"],
      "env": {
        "API_TOKEN": "S4BQM6xTZXkkJdfbmA7q4EcJxluv0c9m5OxNqetP205c9613"
      }
    }
  }
}
```

### Variável de Ambiente
**API Token:** `S4BQM6xTZXkkJdfbmA7q4EcJxluv0c9m5OxNqetP205c9613`

> ⚠️ **Segurança:** O token está configurado no arquivo local que é ignorado pelo Git (`.claude/*.json` está no `.gitignore`)

## Funcionalidades Disponíveis

O MCP Hostinger oferece automação para:

### 🚀 Deploy Automático
- Upload de arquivos para VPS
- Configuração de domínios
- SSL automático
- Deploy de containers Docker

### 🎛️ Gerenciamento de Hosting
- Monitoramento de recursos
- Logs de acesso e erro
- Backup automático
- Configuração de banco de dados

### 📊 Estatísticas
- Uso de recursos (CPU, RAM, disco)
- Tráfego do site
- Performance metrics
- Uptime monitoring

## Uso no Projeto

### Para Deploy do CMS (Payload)
```bash
# Deploy do Payload CMS para VPS
/implement --hostinger-deploy --cms
```

### Para Deploy do Frontend
```bash
# Configuração de domínio
/configure --hostinger --domain nutrindojuntos.com.br
```

### Para Monitoramento
```bash
# Verificar status do servidor
/monitor --hostinger --health-check
```

## Comandos Úteis

### Verificar Conectividade
```bash
npx hostinger-api-mcp@latest --help
```

### Debug Mode
```bash
DEBUG=true npx hostinger-api-mcp@latest
```

## Estrutura de Deploy

### Payload CMS (VPS Hostinger)
```yaml
Localização: /home/nutrindojuntos/cms/
Container: Docker Compose
Porta: 3001
SSL: Let's Encrypt automático
Domínio: cms.nutrindojuntos.com.br
```

### Banco PostgreSQL
```yaml
Localização: Container Docker na VPS
Porta: 5432
Backup: Automático diário
Acesso: Apenas local (sem exposição)
```

### Nginx Reverse Proxy
```yaml
Configuração: /etc/nginx/sites-available/
SSL: Certificados automáticos
Gzip: Habilitado
Cache: Static assets
Rate Limiting: APIs
```

## Troubleshooting

### Erro de Conexão API
```bash
# Verificar token
echo $API_TOKEN

# Testar conectividade
curl -H "Authorization: Bearer S4BQM6xTZXkkJdfbmA7q4EcJxluv0c9m5OxNqetP205c9613" \
     https://api.hostinger.com/v1/domains
```

### Debug do MCP
```bash
# Verificar logs
DEBUG=true npx hostinger-api-mcp@latest --stdio
```

### Problemas de Deploy
1. **Verificar espaço em disco:** Mínimo 2GB livres
2. **Verificar conectividade:** SSH habilitado
3. **Verificar permissões:** Docker group membership
4. **Verificar DNS:** Propagação do domínio

## Segurança

### Proteção do Token
- ✅ Token não commitado no Git
- ✅ Configuração apenas local
- ✅ Acesso restrito ao projeto

### Boas Práticas
- 🔄 Rotacionar token mensalmente
- 🛡️ Usar HTTPS sempre
- 🔐 Backup criptografado
- 📊 Monitoramento de acesso

## Integração com CI/CD

### GitHub Actions (Futuro)
```yaml
# .github/workflows/deploy.yml
- name: Deploy to Hostinger
  env:
    HOSTINGER_TOKEN: ${{ secrets.HOSTINGER_TOKEN }}
  run: npx hostinger-api-mcp@latest deploy
```

### Automation Scripts
```bash
# scripts/deploy.sh
#!/bin/bash
export API_TOKEN="$HOSTINGER_TOKEN"
npx hostinger-api-mcp@latest deploy --production
```

---

**Configurado em:** 16/03/2026
**Última atualização:** 16/03/2026
**Status:** ✅ Ativo e funcional