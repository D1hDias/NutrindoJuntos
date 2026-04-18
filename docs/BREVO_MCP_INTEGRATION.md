# 🚀 Integração Brevo MCP - Guia Completo

## 📋 O que foi configurado?

O **servidor MCP do Brevo** foi adicionado à sua configuração do Claude Code em `~/.cursor/mcp.json`.

### Servidor Configurado
- **Nome:** `brevo`
- **Endpoint:** `https://mcp.brevo.com/v1/brevo/mcp` (servidor principal com todos os 27 módulos)
- **Token:** Configurado automaticamente via variável de ambiente `BREVO_MCP_TOKEN`

---

## ✅ Como usar o MCP do Brevo

### 1. **Reiniciar o Claude Code**

Para que o Claude Code carregue a nova configuração MCP, você precisa:

1. Fechar completamente o Cursor/Claude Code
2. Reabrir o Cursor
3. O servidor MCP do Brevo será carregado automaticamente

### 2. **Verificar se o MCP está ativo**

Após reiniciar, você pode verificar se o MCP está funcionando através do comando:

```bash
# No Claude Code CLI
/mcp list
```

Você deve ver `brevo` na lista de servidores MCP disponíveis.

---

## 🎯 Recursos Disponíveis (27 módulos)

O servidor principal do Brevo (`https://mcp.brevo.com/v1/brevo/mcp`) fornece acesso a **todos** os recursos:

### 📧 Email Marketing
- **Contacts** - Gerenciar contatos e listas
- **Email Campaign Management** - Criar e gerenciar campanhas
- **Campaign Analytics** - Ver desempenho das campanhas
- **Templates** - Gerenciar modelos de email
- **Transactional Templates** - Modelos transacionais

### 🏢 CRM
- **Deals (Oportunidades)** - Gerenciar oportunidades
- **Companies (Empresas)** - Gerenciar empresas
- **Tasks (Tarefas)** - Gerenciar tarefas
- **Pipelines** - Configurar pipelines de vendas
- **Notes (Notas)** - Adicionar notas a contatos/deals

### 💬 Mensagens
- **SMS Campaigns** - Criar campanhas SMS
- **WhatsApp Campaigns** - Campanhas WhatsApp
- **WhatsApp Management** - Configurações WhatsApp

### 📊 Organização
- **Lists (Listas)** - Gerenciar listas de contatos
- **Segments (Segmentos)** - Segmentos de contato
- **Attributes (Atributos)** - Atributos personalizados
- **Contact Import/Export** - Importação em massa
- **Folders (Pastas)** - Organizar campanhas
- **Groups (Grupos)** - Grupos de contatos

### ⚙️ Configuração
- **Senders (Remetentes)** - Identidades de remetente
- **Domains (Domínios)** - Domínios de remetente
- **IPs** - IPs dedicados
- **Accounts (Contas)** - Conta e subcontas
- **Users (Usuários)** - Usuários e permissões
- **Webhooks Management** - Configurar webhooks
- **External Feeds** - Feeds RSS
- **Processes (Processos)** - Monitorar processos

---

## 💡 Exemplos de Uso no Claude Code

Após reiniciar o Claude Code, você pode usar comandos como:

### Exemplo 1: Listar Contatos
```
Claude, usando o MCP do Brevo, liste todos os contatos da lista "Newsletter"
```

### Exemplo 2: Criar Campanha de Email
```
Claude, crie uma campanha de email usando o MCP do Brevo:
- Nome: "Newsletter Semanal - Janeiro 2025"
- Lista: Newsletter
- Template: Boas-vindas
```

### Exemplo 3: Ver Analytics
```
Claude, mostre as estatísticas da última campanha de email usando o MCP do Brevo
```

### Exemplo 4: Gerenciar Listas
```
Claude, usando o MCP do Brevo, crie as 4 listas necessárias para o projeto:
1. Newsletter (ID: 3)
2. Leads Cursos (ID: 4)
3. Leads Mentoria (ID: 5)
4. Contato (ID: 6)
```

---

## 🔧 Servidores Individuais (Opcional)

Se você preferir usar apenas recursos específicos, pode configurar servidores individuais no `~/.cursor/mcp.json`:

### Exemplo: Apenas Contacts
```json
{
  "mcpServers": {
    "brevo_contacts": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.brevo.com/v1/brevo_contacts/mcp",
        "--header",
        "Authorization: Bearer ${BREVO_MCP_TOKEN}"
      ],
      "env": {
        "BREVO_MCP_TOKEN": "eyJhcGlfa2V5IjoieGtleXNpYi1mOGE2ZDJkMjIwMDE2ZTk2MmZhNmFkZjgxMjcyYjQxNmVkNTc5NTE1YmM5NTUzMWJjZjYwMmI2M2E5M2FmZDhmLVZzVjdaVXFTSWZrTjd5WDAifQ=="
      }
    }
  }
}
```

### Lista de Servidores Individuais

| Servidor | Endpoint | Descrição |
|----------|----------|-----------|
| `brevo_contacts` | `/v1/brevo_contacts/mcp` | Apenas contatos |
| `brevo_email_campaign_management` | `/v1/brevo_email_campaign_management/mcp` | Apenas campanhas |
| `brevo_templates` | `/v1/brevo_templates/mcp` | Apenas templates |
| `brevo_lists` | `/v1/brevo_lists/mcp` | Apenas listas |

**Veja todos os 27 servidores em:** https://developers.brevo.com/docs/mcp-protocol

---

## 🐛 Troubleshooting

### Problema: MCP não aparece na lista
**Solução:**
1. Verifique se o arquivo `~/.cursor/mcp.json` está correto
2. Reinicie completamente o Claude Code
3. Execute `cat ~/.cursor/mcp.json` para validar o JSON

### Problema: Erro de autorização
**Solução:**
1. Verifique se o token MCP está correto em `~/.cursor/mcp.json`
2. Gere um novo token em: https://app.brevo.com/settings/keys/api
3. Atualize o token no arquivo de configuração

### Problema: npx não encontrado
**Solução:**
```bash
# Instalar Node.js e npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

---

## 📚 Documentação Oficial

- **Brevo MCP Docs:** https://developers.brevo.com/docs/mcp-protocol
- **Brevo API Docs:** https://developers.brevo.com/docs
- **MCP Protocol:** https://modelcontextprotocol.io

---

## 🎉 Próximos Passos

1. **Reinicie o Claude Code** para carregar a configuração MCP
2. **Teste a conexão:** Peça ao Claude para listar suas listas do Brevo
3. **Crie as listas necessárias** usando o MCP (IDs 3, 4, 5, 6)
4. **Teste os formulários** do site para validar a integração completa

---

## 📝 Notas Importantes

- ✅ O MCP do Brevo usa a **mesma API Key** que você já tem configurada
- ✅ O token MCP é **base64 encoded** do formato `{"api_key": "xkeysib-..."}`
- ✅ A configuração MCP permite que o Claude Code **acesse diretamente** o Brevo sem código
- ✅ Você pode usar o MCP para **criar listas, campanhas, ver analytics** e muito mais!

---

**Data:** 15/04/2026
**Status:** ✅ Configurado e pronto para uso (requer restart do Claude Code)
