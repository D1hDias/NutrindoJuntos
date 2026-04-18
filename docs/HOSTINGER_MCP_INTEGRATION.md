# 🌐 Integração Hostinger MCP - Guia Completo

## 📋 O que foi configurado?

O **servidor MCP da Hostinger** foi adicionado à sua configuração do Claude Code em `~/.cursor/mcp.json`.

### Servidor Configurado
- **Nome:** `hostinger-mcp`
- **Package:** `hostinger-api-mcp@latest` (via npx)
- **Token:** ⚠️ **PENDENTE - Precisa ser configurado**

---

## ⚠️ IMPORTANTE: Configurar Token da API

Para usar o MCP da Hostinger, você precisa:

### 1. Obter o Token da API Hostinger

1. Acesse: https://hpanel.hostinger.com
2. Vá em **Settings** → **API**
3. Crie um novo **API Token** com as permissões necessárias:
   - ✅ Websites management
   - ✅ Domains management
   - ✅ Email accounts management
   - ✅ Databases management
   - ✅ File management (FTP/SSH)
4. Copie o token gerado

### 2. Adicionar o Token na Configuração

Edite o arquivo `~/.cursor/mcp.json` e substitua `ENTER_TOKEN_HERE` pelo seu token:

```json
{
  "mcpServers": {
    "hostinger-mcp": {
      "command": "npx",
      "args": [
        "hostinger-api-mcp@latest"
      ],
      "env": {
        "API_TOKEN": "seu-token-aqui"
      }
    }
  }
}
```

### 3. Reiniciar o Claude Code

Após adicionar o token:
1. Feche completamente o Cursor
2. Reabra o Cursor
3. O MCP da Hostinger será carregado automaticamente

---

## 🎯 Recursos Disponíveis

O MCP da Hostinger fornece acesso direto para gerenciar sua hospedagem:

### 🌐 Websites
- Listar websites hospedados
- Gerenciar configurações de websites
- Deploy de aplicações
- Gerenciar SSL/TLS
- Configurar redirects

### 📧 Email
- Criar contas de email
- Listar contas existentes
- Configurar forwarders
- Gerenciar autoresponders
- Configurar filtros de spam

### 🗄️ Bancos de Dados
- Criar bancos de dados MySQL/PostgreSQL
- Listar databases existentes
- Gerenciar usuários de banco
- Backup e restore
- Monitorar performance

### 📁 Arquivos (FTP/SSH)
- Upload de arquivos
- Download de arquivos
- Gerenciar permissões
- Navegação de diretórios
- Backup de arquivos

### 🌍 Domínios
- Listar domínios
- Configurar DNS
- Gerenciar subdomínios
- Configurar redirects de domínio

---

## 💡 Exemplos de Uso no Claude Code

Após configurar o token e reiniciar o Claude Code, você pode usar comandos como:

### Exemplo 1: Listar Websites
```
Claude, usando o MCP da Hostinger, liste todos os meus websites hospedados
```

### Exemplo 2: Criar Conta de Email
```
Claude, usando o MCP da Hostinger, crie uma conta de email:
- Email: atendimento@nutrindojuntos.com.br
- Quota: 5GB
```

### Exemplo 3: Fazer Deploy
```
Claude, usando o MCP da Hostinger, faça deploy do projeto NutrindoJuntos:
- Caminho local: /mnt/e/NutrindoJuntos/apps/web/.next
- Servidor: nutrindojuntos.com.br
- Diretório remoto: /public_html
```

### Exemplo 4: Gerenciar Banco de Dados
```
Claude, usando o MCP da Hostinger, crie um banco de dados:
- Nome: nutrindojuntos_prod
- Tipo: PostgreSQL
- Usuário: nutrindojuntos_user
```

### Exemplo 5: Configurar SSL
```
Claude, ative o certificado SSL para o domínio nutrindojuntos.com.br
```

---

## 🚀 Uso Específico para NutrindoJuntos

### Deploy do Projeto

O MCP da Hostinger pode ser usado para automatizar o deploy:

1. **Build local do Next.js:**
   ```bash
   pnpm --filter web build
   ```

2. **Deploy via MCP:**
   ```
   Claude, faça deploy do build do Next.js para a Hostinger:
   - Projeto: apps/web/.next
   - Servidor: nutrindojuntos.com.br
   - Método: FTP
   ```

### Configuração de Email

Para criar os emails da equipe:

```
Claude, crie as seguintes contas de email na Hostinger:
1. atendimento@nutrindojuntos.com.br (10GB)
2. suporte@nutrindojuntos.com.br (5GB)
3. contato@nutrindojuntos.com.br (5GB)
```

### Backup Automático

```
Claude, faça backup de todos os arquivos do site nutrindojuntos.com.br e salve localmente em /backups
```

---

## 🔧 Configuração Completa (Múltiplos MCPs)

Seu arquivo `~/.cursor/mcp.json` agora tem 2 servidores MCP:

```json
{
  "mcpServers": {
    "brevo": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.brevo.com/v1/brevo/mcp",
        "--header",
        "Authorization: Bearer ${BREVO_MCP_TOKEN}"
      ],
      "env": {
        "BREVO_MCP_TOKEN": "eyJ..."
      }
    },
    "hostinger-mcp": {
      "command": "npx",
      "args": [
        "hostinger-api-mcp@latest"
      ],
      "env": {
        "API_TOKEN": "ENTER_TOKEN_HERE"
      }
    }
  }
}
```

---

## 📊 Integração com o Projeto

### Variáveis de Ambiente

Adicione no `apps/web/.env.local` (opcional, para scripts):

```bash
# Hostinger API (opcional - usado via MCP)
HOSTINGER_API_TOKEN=seu-token-aqui
HOSTINGER_DOMAIN=nutrindojuntos.com.br
```

### Workflow de Deploy

1. **Desenvolvimento Local:**
   ```bash
   pnpm --filter web dev
   ```

2. **Build para Produção:**
   ```bash
   pnpm --filter web build
   ```

3. **Deploy via MCP:**
   ```
   Claude, faça deploy do build para produção na Hostinger
   ```

4. **Verificar Deploy:**
   ```
   Claude, verifique o status do site nutrindojuntos.com.br na Hostinger
   ```

---

## 🐛 Troubleshooting

### Problema: MCP não aparece na lista
**Solução:**
1. Verifique se o token foi adicionado em `~/.cursor/mcp.json`
2. Reinicie completamente o Claude Code
3. Execute: `cat ~/.cursor/mcp.json` para validar o JSON

### Problema: Erro de autenticação
**Solução:**
1. Gere um novo token em: https://hpanel.hostinger.com
2. Verifique as permissões do token
3. Atualize o token no arquivo de configuração

### Problema: npx não encontra o pacote
**Solução:**
```bash
# Instalar globalmente (opcional)
npm install -g hostinger-api-mcp

# Ou forçar npx a baixar
npx hostinger-api-mcp@latest --version
```

---

## 📚 Documentação Oficial

- **Hostinger API Docs:** https://api.hostinger.com/docs
- **MCP Hostinger Package:** https://www.npmjs.com/package/hostinger-api-mcp
- **Hostinger hPanel:** https://hpanel.hostinger.com

---

## 🎉 Próximos Passos

1. **Obter Token da API** da Hostinger
2. **Adicionar token** em `~/.cursor/mcp.json`
3. **Reiniciar Claude Code** para carregar o MCP
4. **Testar conexão:** Listar websites hospedados
5. **Automatizar deploy** do projeto NutrindoJuntos

---

## 📝 Checklist de Configuração

- [ ] Gerar token da API na Hostinger
- [ ] Adicionar token em `~/.cursor/mcp.json`
- [ ] Reiniciar Claude Code
- [ ] Testar listando websites
- [ ] Configurar emails (atendimento@, suporte@, contato@)
- [ ] Fazer primeiro deploy via MCP
- [ ] Configurar SSL para o domínio
- [ ] Testar backup automático

---

**Data:** 16/04/2026
**Status:** ⚠️ Configurado (aguardando token da API Hostinger)
**Integra com:** Brevo MCP, Next.js Build, Deploy Workflow
