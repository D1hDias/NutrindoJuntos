# 🥗 NUTRINDO JUNTOS

Plataforma educacional de nutrição focada em estudantes e nutricionistas em início de carreira.

## 🚀 Deploy Rápido (1 Comando!)

```bash
./deploy-to-production.sh "feat: sua mensagem aqui"
```

**Isso é tudo que você precisa!** ✨

O script automaticamente:
1. Comita mudanças locais
2. Faz push para GitHub
3. Puxa código no VPS
4. Instala dependências
5. Faz build de produção
6. Reinicia servidor
7. Verifica status

**Tempo:** ~2 minutos

---

## 📋 Desenvolvimento Local

### **Instalação:**
```bash
# Instalar dependências
pnpm install

# Rodar servidor de desenvolvimento
pnpm --filter web dev

# Abrir http://localhost:3000
```

### **Comandos Úteis:**
```bash
pnpm --filter web dev          # Servidor de desenvolvimento
pnpm --filter web build        # Build de produção
pnpm --filter web lint         # Verificar código
pnpm --filter web type-check   # Verificar tipos TypeScript
```

---

## 📁 Estrutura do Projeto

```
nutrindo-juntos/
├── apps/web/              # Next.js Frontend
├── docs/                  # Documentação
├── deploy.sh             # Script de deploy (VPS)
├── deploy-to-production.sh  # Script de deploy (Local)
└── DEPLOY_CHECKLIST.md   # Checklist rápido
```

---

## 📚 Documentação

- **Deploy:** `docs/GUIA_DEPLOY.md` ← **Leia primeiro!**
- **Setup SSH:** `docs/SETUP_SSH_KEY.md`
- **Bug Typography:** `docs/BUG_TYPOGRAPHY_MINIFICATION.md`
- **Checklist:** `DEPLOY_CHECKLIST.md`

---

## 🔗 Links

- **Produção:** https://nutrindojuntos.com.br
- **GitHub:** https://github.com/seu-usuario/nutrindo-juntos
- **Documentação Completa:** `CLAUDE.md`

---

## 🐛 Problemas?

1. Veja `docs/GUIA_DEPLOY.md` → Seção "Troubleshooting"
2. Verifique logs: `ssh root@31.97.245.82 "pm2 logs"`
3. Consulte `docs/BUG_TYPOGRAPHY_MINIFICATION.md`

---

## 🎯 Workflow Recomendado

```bash
# 1. Desenvolver localmente
pnpm --filter web dev

# 2. Testar mudanças
# (teste manualmente no navegador)

# 3. Fazer deploy
./deploy-to-production.sh "feat: nova funcionalidade"

# 4. Verificar produção
# Abrir https://nutrindojuntos.com.br
# Pressionar Ctrl+Shift+R
```

---

**Stack:** Next.js 15 • TypeScript • Tailwind CSS • PM2 • Nginx • VPS Hostinger

**Última atualização:** 18/04/2026
