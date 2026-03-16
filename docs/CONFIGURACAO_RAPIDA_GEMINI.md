# 🚀 Configuração Rápida - Gemini MCP

**⏱️ Tempo estimado:** 3 minutos

---

## 📝 3 Passos Simples

### **1️⃣ Obter API Key** (1 minuto)

1. Acesse: **https://aistudio.google.com/app/apikey**
2. Login com Google
3. Clique: **"Create API Key"**
4. **COPIE** a chave (começa com `AIza...`)

---

### **2️⃣ Configurar no Projeto** (1 minuto)

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite `.env.local` e adicione sua chave:

```bash
GOOGLE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

### **3️⃣ Testar** (1 minuto)

Reinicie o Claude Code e teste:

```bash
/mcp
# Deve mostrar "gemini-cli" na lista

# Teste simples
"Use Gemini para analisar: qual a capital do Brasil?"
```

---

## ✅ Pronto!

Agora você pode:

```bash
# Processar documentos grandes
"Use Gemini para ler o CLAUDE.md e criar um resumo"

# Combinar com Figma
"Use Figma para extrair cores + Gemini para sugerir paleta"

# Análise complexa
"Use Gemini para analisar toda a documentação em docs/ e criar um índice"
```

---

## 📚 Documentação Completa

Para mais detalhes: [`docs/AUTENTICACAO_GEMINI_MCP.md`](./docs/AUTENTICACAO_GEMINI_MCP.md)

---

## ⚠️ IMPORTANTE

**NUNCA commite `.env.local`!**

O arquivo já está protegido no `.gitignore`.

---

**Última Atualização:** 16/11/2025
