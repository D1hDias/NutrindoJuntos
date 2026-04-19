# ✅ Checklist de Deploy - Versão Rápida

## Antes do Deploy

```
□ Testei localmente? (pnpm --filter web dev)
□ Build funciona? (pnpm --filter web build)
□ Revisei mudanças? (git status)
□ Commit message clara?
```

## Executar Deploy

```bash
./deploy-to-production.sh "feat: sua mensagem aqui"
```

## Após o Deploy

```
□ Site carrega? (https://nutrindojuntos.com.br)
□ Fiz Ctrl+Shift+R?
□ Funcionalidades OK?
□ Sem erros no console do navegador? (F12)
```

## Em Caso de Erro

```bash
# Ver logs
ssh root@31.97.245.82 "pm2 logs nutrindojuntos --lines 50"

# Rollback
ssh root@31.97.245.82
cd /var/www/nutrindojuntos
git reset --hard HEAD~1
./deploy.sh
```

---

**Documentação completa:** `docs/GUIA_DEPLOY.md`
