# 🔐 Autenticação Gemini MCP - Guia Completo

**Data:** 16/11/2025
**Status:** Configuração Necessária

---

## 🎯 O que você precisa: API Key do Google AI Studio

O Gemini MCP usa **API Key** (não OAuth). É mais simples!

---

## 📝 PASSO A PASSO (5 minutos)

### **1️⃣ Obter API Key do Google AI Studio**

1. **Acesse:** https://aistudio.google.com/app/apikey
2. **Faça login** com sua conta Google
3. **Clique em "Create API Key"** ou **"Get API Key"**
4. **Escolha um projeto** (ou crie um novo)
5. **Copie a API Key** (começa com `AIza...`)

⚠️ **IMPORTANTE:** Guarde essa chave em local seguro!

---

### **2️⃣ Configurar no Projeto**

#### **Opção A: Variável de Ambiente (RECOMENDADO)**

Crie/edite o arquivo `.env.local` na raiz do projeto:

```bash
# .env.local
GOOGLE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

#### **Opção B: Configuração Global (para uso em todos os projetos)**

```bash
# Linux/Mac
echo 'export GOOGLE_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"' >> ~/.bashrc
source ~/.bashrc

# Windows (PowerShell)
[System.Environment]::SetEnvironmentVariable('GOOGLE_API_KEY', 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'User')
```

#### **Opção C: Passar diretamente no MCP config (NÃO RECOMENDADO - menos seguro)**

Edite `.claude/settings.json`:

```json
{
  "mcpServers": {
    "gemini-cli": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "gemini-mcp-tool"],
      "env": {
        "GOOGLE_API_KEY": "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    }
  }
}
```

---

### **3️⃣ Atualizar .gitignore (CRÍTICO!)**

Certifique-se que seu `.gitignore` protege as chaves:

```bash
# .gitignore
.env.local
.env
*.env
.claude/settings.json
```

---

### **4️⃣ Testar Autenticação**

```bash
# Teste 1: Verificar se a variável está configurada
echo $GOOGLE_API_KEY

# Teste 2: Usar o Gemini MCP via Claude Code
# No Claude Code, digite:
/mcp
# Você deve ver "gemini-cli" na lista

# Teste 3: Fazer uma chamada de teste
# No Claude Code, peça:
"Use o Gemini para analisar este texto: 'Teste de autenticação'"
```

---

## 🔧 CONFIGURAÇÃO ATUAL DO PROJETO

### **Arquivo: `.claude/settings.json`**

Atualmente você tem:

```json
{
  "mcpServers": {
    "gemini-cli": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "gemini-mcp-tool"],
      "env": {}  // ← VAZIO! Precisa adicionar GOOGLE_API_KEY
    },
    "figma": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=sua-chave-figma-aqui",
        "--stdio"
      ]
    }
  }
}
```

### **Como Corrigir:**

**Opção 1 (RECOMENDADO): Usar variável de ambiente**

1. Crie `.env.local` com `GOOGLE_API_KEY=sua_chave`
2. Mantenha `.claude/settings.json` como está (env vazio)
3. O MCP vai pegar automaticamente da variável de ambiente

**Opção 2: Adicionar no settings.json**

```json
{
  "mcpServers": {
    "gemini-cli": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "gemini-mcp-tool"],
      "env": {
        "GOOGLE_API_KEY": "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    }
  }
}
```

---

## ⚠️ IMPORTANTE: Segurança das Chaves

### **NUNCA faça isso:**
❌ Commite `.env.local` ou `.claude/settings.json` com chaves
❌ Compartilhe suas chaves em código ou documentação
❌ Use chaves em repositórios públicos

### **SEMPRE faça isso:**
✅ Use variáveis de ambiente
✅ Adicione arquivos com chaves no `.gitignore`
✅ Use `.env.example` sem valores reais
✅ Revogue chaves se forem expostas acidentalmente

---

## 🔄 Como Revogar/Regenerar Chave (se exposta)

1. Acesse: https://aistudio.google.com/app/apikey
2. Encontre a chave exposta
3. Clique em **"Delete"** ou **"Revoke"**
4. Crie uma nova API Key
5. Atualize em todos os lugares

---

## 🧪 TESTES APÓS CONFIGURAÇÃO

### **Teste 1: Análise Simples**
```bash
"Use Gemini para analisar: qual a melhor forma de estruturar um componente React?"
```

### **Teste 2: Processamento de Arquivo Grande**
```bash
"Use Gemini para ler o arquivo CLAUDE.md e me dar um resumo executivo"
```

### **Teste 3: Combinação com Figma (nosso caso de uso!)**
```bash
"Use Figma MCP para extrair a seção Hero e depois Gemini para analisar a melhor forma de implementar"
```

---

## 📊 MODELOS DISPONÍVEIS

O Gemini MCP suporta vários modelos:

| Modelo | Contexto | Velocidade | Custo | Uso Recomendado |
|--------|----------|------------|-------|-----------------|
| **gemini-2.5-pro** | 1M tokens | Média | Médio | Análise profunda, raciocínio |
| **gemini-2.0-flash-exp** | 1M tokens | Muito rápida | Baixo | Tarefas simples, respostas rápidas |
| **gemini-exp-1206** | 2M tokens | Rápida | Baixo | Experimental, contexto muito grande |

### **Como escolher modelo:**
```bash
# No mcp__gemini-cli__ask-gemini
"model": "gemini-2.5-pro"  # Padrão
"model": "gemini-2.0-flash-exp"  # Mais rápido
```

---

## 🐛 TROUBLESHOOTING

### **Erro: "Requested entity was not found"**
**Causa:** Modelo não existe ou nome incorreto
**Solução:** Use `gemini-2.5-pro` ou `gemini-2.0-flash-exp`

### **Erro: "request to https://oauth2.googleapis.com/token failed"**
**Causa:** Tentando usar OAuth em vez de API Key
**Solução:** Configure `GOOGLE_API_KEY` corretamente

### **Erro: "API key not valid"**
**Causa:** Chave incorreta ou expirada
**Solução:** Verifique a chave em https://aistudio.google.com/app/apikey

### **Erro: "Rate limit exceeded"**
**Causa:** Muitas requisições em pouco tempo
**Solução:** Aguarde alguns minutos ou upgrade para tier pago

---

## 💰 CUSTOS E LIMITES (Tier Gratuito)

### **Google AI Studio - Free Tier:**
- **15 requisições/minuto**
- **1.500 requisições/dia**
- **1 milhão requisições/mês**
- **Grátis para sempre** (com limites)

### **Quando precisa pagar:**
- Se ultrapassar os limites do tier gratuito
- Para usar em produção com alto volume
- Para SLA garantido

**Documentação de preços:** https://ai.google.dev/pricing

---

## 📚 RECURSOS ÚTEIS

- **Google AI Studio:** https://aistudio.google.com
- **Documentação Gemini API:** https://ai.google.dev/docs
- **Gemini MCP GitHub:** https://github.com/modelcontextprotocol/servers
- **Gerenciar API Keys:** https://aistudio.google.com/app/apikey

---

## ✅ CHECKLIST DE CONFIGURAÇÃO

- [ ] Acessei https://aistudio.google.com/app/apikey
- [ ] Criei uma API Key
- [ ] Copiei a chave (começa com `AIza...`)
- [ ] Adicionei ao `.env.local` OU `.claude/settings.json`
- [ ] Verifiquei que `.gitignore` protege as chaves
- [ ] Testei com `/mcp` no Claude Code
- [ ] Fiz um teste simples com Gemini
- [ ] Documentei a chave em local seguro

---

## 🚀 PRÓXIMOS PASSOS APÓS AUTENTICAÇÃO

1. **Testar análise do Figma:**
   ```bash
   "Use Gemini para analisar a estrutura completa do design Figma que extraímos e criar um roadmap de implementação"
   ```

2. **Processar documentação grande:**
   ```bash
   "Use Gemini para ler todos os arquivos .md em docs/ e criar um índice interativo"
   ```

3. **Combinar com outros MCPs:**
   ```bash
   "Use Figma para extrair cores + Gemini para sugerir paleta harmônica + atualizar tailwind.config.ts"
   ```

---

**Última Atualização:** 16/11/2025
**Próxima Ação:** Obter API Key e configurar
