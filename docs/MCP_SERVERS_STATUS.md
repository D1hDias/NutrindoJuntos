# 🔌 Servidores MCP - Status da Configuração

**Data:** 16/04/2026
**Projeto:** NutrindoJuntos
**Arquivo de Configuração:** `~/.cursor/mcp.json`

---

## 📊 Resumo Executivo

| MCP Server | Status | Token | Ferramentas | Última Verificação |
|------------|--------|-------|-------------|-------------------|
| **Brevo** | ✅ Ativo | ✅ Configurado | 200+ | 16/04/2026 ✅ Testado |
| **Hostinger** | ⚠️ Pendente | ❌ Pendente | 50+ | 16/04/2026 ⚠️ Aguardando token |

---

## 🟢 Brevo MCP - Status: ATIVO

### ✅ Configuração Completa

- **Servidor:** `https://mcp.brevo.com/v1/brevo/mcp`
- **Token:** Configurado e validado ✅
- **Versão:** MainBrevoMCPServer v1.13.0
- **Protocolo:** 2024-11-05

### 📋 Listas Configuradas

| ID | Nome | Contatos |
|----|------|----------|
| 3 | Newsletter NUTRINDO JUNTOS | 1 |
| 4 | Leads - Interesse em Cursos | 1 |
| 5 | Leads - Interesse em Mentoria | 1 |
| 6 | Formulário de Contato | 1 |

### 🛠️ Recursos Disponíveis (27 módulos)

- ✅ **Contacts** - Gerenciar contatos
- ✅ **Lists** - Gerenciar listas
- ✅ **Email Campaigns** - Criar campanhas
- ✅ **Templates** - Templates de email
- ✅ **Transactional Emails** - Emails transacionais
- ✅ **CRM** - Deals, Companies, Tasks
- ✅ **SMS/WhatsApp** - Campanhas de mensagens
- ✅ **Analytics** - Relatórios e estatísticas
- ✅ **Webhooks** - Configurar webhooks
- E mais 18 módulos...

### 🎯 Próximas Ações

- ✅ Nenhuma - MCP totalmente funcional!

### 📚 Documentação

- **Guia:** `docs/BREVO_MCP_INTEGRATION.md`
- **Docs oficiais:** https://developers.brevo.com/docs/mcp-protocol

---

## 🟡 Hostinger MCP - Status: AGUARDANDO TOKEN

### ⚠️ Configuração Incompleta

- **Package:** `hostinger-api-mcp@latest`
- **Token:** ❌ **PENDENTE - Precisa ser configurado**
- **Status:** Configuração criada, aguardando token da API

### 🛠️ Recursos Disponíveis (50+ ferramentas)

- ⏸️ **Websites** - Gerenciar websites hospedados
- ⏸️ **Email** - Criar e gerenciar contas de email
- ⏸️ **Databases** - MySQL/PostgreSQL management
- ⏸️ **Files** - FTP/SSH file management
- ⏸️ **Domains** - DNS e configurações de domínio
- ⏸️ **SSL** - Certificados SSL/TLS
- ⏸️ **Backup** - Backup e restore

### 🎯 Próximas Ações

1. [ ] Obter token da API em: https://hpanel.hostinger.com
2. [ ] Editar `~/.cursor/mcp.json` e adicionar o token
3. [ ] Reiniciar Claude Code
4. [ ] Testar listando websites

### 📚 Documentação

- **Guia:** `docs/HOSTINGER_MCP_INTEGRATION.md`
- **API Docs:** https://api.hostinger.com/docs

---

## 🚀 Como Usar os MCPs

### Após Reiniciar o Claude Code

Você pode usar comandos naturais como:

#### Brevo (Email Marketing)
```
Claude, usando o MCP do Brevo, mostre as estatísticas da lista Newsletter
```

```
Claude, crie uma campanha de email no Brevo com o template de boas-vindas
```

#### Hostinger (após configurar token)
```
Claude, liste todos os websites na minha conta Hostinger
```

```
Claude, faça deploy do build Next.js para nutrindojuntos.com.br
```

---

## 📝 Configuração Atual (`~/.cursor/mcp.json`)

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

## 🔍 Verificar Status dos MCPs

Após reiniciar o Claude Code, execute:

```
/mcp list
```

Você deve ver:
- ✅ `brevo` - Ativo
- ⚠️ `hostinger-mcp` - Erro de autenticação (até configurar token)

---

## 🎯 Integração com NutrindoJuntos

### Workflow Automatizado

1. **Desenvolvimento:**
   ```bash
   pnpm --filter web dev
   ```

2. **Build:**
   ```bash
   pnpm --filter web build
   ```

3. **Deploy (via Hostinger MCP):**
   ```
   Claude, faça deploy do build para produção
   ```

4. **Configurar Email (via Brevo MCP):**
   ```
   Claude, adicione o novo lead à lista de Newsletter
   ```

### Casos de Uso Práticos

| Ação | MCP Usado | Comando Exemplo |
|------|-----------|-----------------|
| Criar lista de emails | Brevo | "Crie uma nova lista 'Webinar Abril'" |
| Deploy do site | Hostinger | "Deploy apps/web/.next para produção" |
| Ver estatísticas de campanha | Brevo | "Mostre stats da última campanha" |
| Criar conta de email | Hostinger | "Crie email suporte@nutrindojuntos.com.br" |
| Backup do site | Hostinger | "Faça backup de todos os arquivos" |
| Enviar campanha | Brevo | "Envie newsletter semanal para lista Newsletter" |

---

## 📊 Métricas de Uso (será atualizado)

| Período | Brevo MCP | Hostinger MCP | Total de Operações |
|---------|-----------|---------------|-------------------|
| Abril 2026 | 0 | 0 | 0 |
| **Total** | **0** | **0** | **0** |

---

## 🔄 Próxima Revisão

- **Data:** Após configurar token da Hostinger
- **Objetivo:** Validar ambos os MCPs funcionando em conjunto
- **Testes:** Deploy automatizado + Email marketing integrado

---

**✅ Status Geral:** 1/2 MCPs totalmente configurados (50%)
**⏳ Próximo Passo:** Configurar token da API Hostinger
**🎯 Meta:** 2/2 MCPs ativos para automação completa do projeto
