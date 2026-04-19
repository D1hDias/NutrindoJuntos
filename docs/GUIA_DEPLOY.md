# 🚀 Guia Rápido de Deploy

## Método Simples (Recomendado)

### **Passo Único:**
```bash
./deploy-to-production.sh "mensagem do commit"
```

**Exemplo:**
```bash
./deploy-to-production.sh "feat: adicionar nova página de blog"
```

**O que acontece automaticamente:**
1. ✅ Commit das mudanças locais
2. ✅ Push para GitHub
3. ✅ Pull no VPS
4. ✅ Instala dependências
5. ✅ Build de produção
6. ✅ Ajusta permissões
7. ✅ Reinicia servidor
8. ✅ Verifica status

**Tempo total:** ~2 minutos

---

## Método Manual (Se necessário)

### **1. Commit e Push:**
```bash
git add -A
git commit -m "sua mensagem"
git push origin main
```

### **2. Deploy no VPS:**
```bash
ssh root@31.97.245.82
cd /var/www/nutrindojuntos
./deploy.sh
```

---

## 📋 Checklist Pré-Deploy

Antes de fazer deploy, verifique:

```
✅ Testou localmente? (npm run dev)
✅ Build funciona? (npm run build)
✅ Não tem erros TypeScript? (npm run type-check)
✅ Não tem erros ESLint? (npm run lint)
✅ Revisou as mudanças? (git diff)
```

---

## 🐛 Troubleshooting

### **Problema: "Erro ao fazer git pull"**
**Solução:**
```bash
ssh root@31.97.245.82
cd /var/www/nutrindojuntos
git stash  # Salva mudanças locais
git pull origin main
```

### **Problema: "Erro no build"**
**Solução:**
```bash
# No VPS
cd /var/www/nutrindojuntos
rm -rf node_modules apps/web/.next
pnpm install
pnpm --filter web build
```

### **Problema: "Site não atualiza no navegador"**
**Solução:**
1. Pressione **Ctrl+Shift+R** (hard refresh)
2. Ou abra em modo anônimo
3. Ou limpe cache do navegador

### **Problema: "PM2 não reinicia"**
**Solução:**
```bash
ssh root@31.97.245.82
pm2 delete all
pm2 start ecosystem.config.js --env production
```

---

## 📊 Verificar Deploy

Após deploy, verifique:

```bash
# Status do PM2
ssh root@31.97.245.82 "pm2 list"

# Logs em tempo real
ssh root@31.97.245.82 "pm2 logs nutrindojuntos --lines 50"

# Última versão no Git
ssh root@31.97.245.82 "cd /var/www/nutrindojuntos && git log -1 --oneline"
```

---

## 🚨 Rollback (Desfazer Deploy)

Se algo der errado:

```bash
ssh root@31.97.245.82
cd /var/www/nutrindojuntos

# Voltar para commit anterior
git log --oneline -5  # Ver últimos commits
git reset --hard COMMIT_HASH  # Usar hash do commit bom
./deploy.sh  # Fazer deploy novamente
```

**Exemplo:**
```bash
git log --oneline -5
# ca1fd17 fix: resolver bug...
# 8e2a3b1 feat: nova feature (← Este está quebrado!)
# 5d9c4a2 fix: correção... (← Voltar para este)

git reset --hard 5d9c4a2
./deploy.sh
```

---

## ⏱️ Horários Recomendados

**Melhor horário para deploy:**
- ✅ Horário comercial (9h-18h) - se algo der errado, pode corrigir
- ✅ Dia de semana - mais fácil de monitorar

**Evite:**
- ❌ Sexta à noite
- ❌ Finais de semana
- ❌ Feriados
- ❌ Antes de reuniões importantes

---

## 📈 Monitoramento Pós-Deploy

Após cada deploy, monitore por **15 minutos**:

```bash
# Terminal 1: Logs do PM2
ssh root@31.97.245.82 "pm2 logs nutrindojuntos"

# Terminal 2: Status do servidor
watch -n 5 'ssh root@31.97.245.82 "pm2 list"'
```

Verifique:
- ✅ Site carrega normalmente
- ✅ Nenhum erro nos logs
- ✅ PM2 mostra status "online"
- ✅ Funcionalidades principais funcionam

---

## 🎯 Boas Práticas

1. **Sempre teste localmente primeiro**
2. **Faça commits pequenos e frequentes**
3. **Use mensagens de commit descritivas**
4. **Monitore após cada deploy**
5. **Mantenha backup do banco (se houver)**
6. **Documente mudanças importantes**

---

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs: `pm2 logs`
2. Consulte este guia
3. Verifique docs/TROUBLESHOOTING.md
4. Revise docs/BUG_TYPOGRAPHY_MINIFICATION.md

---

**Última atualização:** 18/04/2026
