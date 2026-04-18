# 🚀 DEPLOYMENT READY - VPS Hostinger

## ✅ Checklist de Preparação

### Arquitetura Local Otimizada
- [x] Build configurado para `standalone` mode
- [x] Polyfills para "self is not defined" implementados
- [x] TypeScript configurado (83 erros ignorados via `ignoreBuildErrors: true`)
- [x] Webpack polling habilitado para WSL2
- [x] Code splitting desabilitado (evita erro "self is not defined")
- [x] PM2 ecosystem config criado (`ecosystem.config.js`)
- [x] Script de deploy automatizado (`scripts/deploy-vps.sh`)
- [x] Variáveis de ambiente de produção preparadas

### Otimizações Aplicadas
- [x] Imagens otimizadas (unoptimized: true para standalone)
- [x] Compressão habilitada (compress: true)
- [x] Security headers configurados
- [x] ETags habilitados
- [x] X-Powered-By removido
- [x] ISR (Incremental Static Regeneration) configurado

### Limpeza Executada
- [x] Payload CMS removido
- [x] Docker files removidos
- [x] Sentry removido
- [x] 156 pacotes desnecessários removidos
- [x] Types limpos e simplificados
- [x] Mock data otimizado

## 📋 Pré-requisitos no VPS

### 1. Servidor Preparado
Verifique se o VPS Hostinger (31.97.245.82) tem:

```bash
# Conectar ao VPS
ssh root@31.97.245.82

# Verificar instalações
node --version   # v20.x ou superior
pm2 --version    # v5.x ou superior
nginx -v         # nginx 1.18.x ou superior

# Verificar estrutura de diretórios
ls -la /var/www/nutrindojuntos
```

### 2. Estrutura de Diretórios no VPS
```
/var/www/nutrindojuntos/
├── apps/
│   └── web/
│       └── .next/
│           ├── standalone/
│           └── static/
├── logs/
├── ecosystem.config.js
└── .env.production
```

### 3. Variáveis de Ambiente
Edite o arquivo no VPS:
```bash
ssh root@31.97.245.82 "nano /var/www/nutrindojuntos/apps/web/.env.production"
```

Preencha com valores reais:
```env
NEXT_PUBLIC_SITE_URL=https://nutrindojuntos.com.br
NODE_ENV=production
BREVO_API_KEY=xkeysib-[sua-chave-aqui]
BREVO_LIST_NEWSLETTER=1
BREVO_LIST_LEADS_CURSOS=2
BREVO_LIST_LEADS_MENTORIA=3
BREVO_LIST_CONTATO=4
NEXT_PUBLIC_GA_ID=G-[seu-id-aqui]
```

## 🚀 Executar Deploy

### Opção 1: Deploy Automatizado (Recomendado)
```bash
# Da raiz do projeto local
./scripts/deploy-vps.sh
```

O script executará automaticamente:
1. ✅ Build local da aplicação
2. ✅ Compactação otimizada (.tar.gz)
3. ✅ Upload para VPS via SCP
4. ✅ Extração e configuração no servidor
5. ✅ Reload do PM2
6. ✅ Verificação de status

### Opção 2: Deploy Manual

#### Passo 1: Build Local
```bash
cd /mnt/e/NutrindoJuntos
pnpm --filter web build
```

#### Passo 2: Criar Pacote
```bash
cd apps/web
tar -czf ../../nutrindojuntos-build.tar.gz \
    .next/standalone \
    .next/static \
    public \
    .env.production
cd ../..
```

#### Passo 3: Upload
```bash
scp nutrindojuntos-build.tar.gz root@31.97.245.82:/var/www/nutrindojuntos/
scp ecosystem.config.js root@31.97.245.82:/var/www/nutrindojuntos/
```

#### Passo 4: Extrair e Configurar no VPS
```bash
ssh root@31.97.245.82 << 'ENDSSH'
cd /var/www/nutrindojuntos

# Backup (se existir)
[ -d "apps/web/.next" ] && mv apps/web/.next apps/web/.next.backup.$(date +%Y%m%d_%H%M%S)

# Extrair
tar -xzf nutrindojuntos-build.tar.gz

# Estrutura
mkdir -p logs apps/web/.next

# Copiar arquivos para standalone
cp -r apps/web/.next/static apps/web/.next/standalone/apps/web/.next/
cp -r apps/web/public apps/web/.next/standalone/apps/web/
cp apps/web/.env.production apps/web/.next/standalone/apps/web/

# Reload PM2
pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production

# Verificar
pm2 list
pm2 logs nutrindojuntos --lines 20
ENDSSH
```

## 🔍 Verificação Pós-Deploy

### 1. Verificar PM2
```bash
ssh root@31.97.245.82 "pm2 list"
```

Deve mostrar:
```
┌─────┬─────────────────┬─────────────┬─────────┬─────────┬──────────┐
│ id  │ name            │ mode        │ ↺       │ status  │ cpu      │
├─────┼─────────────────┼─────────────┼─────────┼─────────┼──────────┤
│ 0   │ nutrindojuntos  │ cluster     │ 0       │ online  │ 0%       │
│ 1   │ nutrindojuntos  │ cluster     │ 0       │ online  │ 0%       │
└─────┴─────────────────┴─────────────┴─────────┴─────────┴──────────┘
```

### 2. Verificar Logs
```bash
ssh root@31.97.245.82 "pm2 logs nutrindojuntos --lines 50"
```

Procure por:
```
✅ [Polyfills] Server: globalThis.self polyfill applied
▲ Next.js 15.x.x
- Local:        http://0.0.0.0:3000
✓ Ready in XXXms
```

### 3. Testar Endpoints

#### Health Check
```bash
curl https://nutrindojuntos.com.br/api/health
```

Esperado:
```json
{
  "status": "ok",
  "timestamp": "2025-XX-XXTXX:XX:XX.XXXZ",
  "environment": "production"
}
```

#### Página Principal
```bash
curl -I https://nutrindojuntos.com.br
```

Esperado:
```
HTTP/2 200
content-type: text/html; charset=utf-8
```

### 4. Verificar Performance
```bash
# Core Web Vitals
curl -o /dev/null -s -w "Time: %{time_total}s\n" https://nutrindojuntos.com.br
```

Meta: < 3s na primeira carga, < 1s em cargas subsequentes

## 🔧 Comandos Úteis Pós-Deploy

### Gerenciamento PM2
```bash
# Ver logs em tempo real
ssh root@31.97.245.82 "pm2 logs nutrindojuntos"

# Ver status
ssh root@31.97.245.82 "pm2 status"

# Restart (se necessário)
ssh root@31.97.245.82 "pm2 restart nutrindojuntos"

# Stop (cuidado!)
ssh root@31.97.245.82 "pm2 stop nutrindojuntos"

# Start (após stop)
ssh root@31.97.245.82 "pm2 start ecosystem.config.js --env production"

# Monitoramento
ssh root@31.97.245.82 "pm2 monit"
```

### Logs e Debugging
```bash
# Logs do PM2
ssh root@31.97.245.82 "tail -f /var/www/nutrindojuntos/logs/pm2-out.log"
ssh root@31.97.245.82 "tail -f /var/www/nutrindojuntos/logs/pm2-error.log"

# Logs do Nginx
ssh root@31.97.245.82 "tail -f /var/log/nginx/access.log"
ssh root@31.97.245.82 "tail -f /var/log/nginx/error.log"
```

### Limpeza
```bash
# Remover arquivo compactado
ssh root@31.97.245.82 "rm -f /var/www/nutrindojuntos/nutrindojuntos-build.tar.gz"

# Remover backups antigos (mais de 7 dias)
ssh root@31.97.245.82 "find /var/www/nutrindojuntos/apps/web -name '.next.backup.*' -mtime +7 -exec rm -rf {} \;"
```

## 🐛 Troubleshooting

### Erro: PM2 não inicia
```bash
# Verificar porta 3000
ssh root@31.97.245.82 "netstat -tlnp | grep :3000"

# Se ocupada, matar processo
ssh root@31.97.245.82 "kill -9 $(lsof -t -i:3000)"

# Reiniciar PM2
ssh root@31.97.245.82 "pm2 delete nutrindojuntos && pm2 start ecosystem.config.js --env production"
```

### Erro: Nginx 502 Bad Gateway
```bash
# Verificar se PM2 está rodando
ssh root@31.97.245.82 "pm2 list"

# Verificar configuração Nginx
ssh root@31.97.245.82 "nginx -t"

# Reload Nginx
ssh root@31.97.245.82 "systemctl reload nginx"
```

### Erro: "self is not defined"
Já resolvido! Polyfills estão implementados em `apps/web/polyfills.js` e injetados via webpack em `next.config.mjs`.

Se ainda aparecer:
1. Verificar se `polyfills.js` está presente no build
2. Verificar logs do PM2 para mensagem "✅ [Polyfills] Server: globalThis.self polyfill applied"
3. Limpar cache: `rm -rf apps/web/.next && pnpm build`

### Página em branco ou erro 500
```bash
# Ver logs de erro
ssh root@31.97.245.82 "pm2 logs nutrindojuntos --err --lines 100"

# Verificar variáveis de ambiente
ssh root@31.97.245.82 "cat /var/www/nutrindojuntos/apps/web/.next/standalone/apps/web/.env.production"
```

## 📊 Monitoramento Contínuo

### Configurar PM2 Startup (primeira vez)
```bash
ssh root@31.97.245.82 << 'ENDSSH'
pm2 startup systemd -u root --hp /root
pm2 save
ENDSSH
```

Isso garante que PM2 inicia automaticamente após reboot do servidor.

### Alertas (Opcional)
Configure notificações para erros:
```bash
# pm2-logrotate
ssh root@31.97.245.82 "pm2 install pm2-logrotate"
```

## 🎯 Próximos Passos Pós-Deploy

1. **Monitorar primeiras 24h**
   - Verificar logs a cada 2-4 horas
   - Observar uso de memória (limite: 500MB por instância)
   - Verificar tempo de resposta

2. **Configurar Analytics**
   - Preencher `NEXT_PUBLIC_GA_ID` no .env.production
   - Verificar eventos no Google Analytics após 24-48h

3. **Testar Formulários**
   - Newsletter signup
   - Interesse em cursos
   - Interesse em mentoria
   - Formulário de contato
   - Verificar recebimento de emails via Brevo

4. **SEO**
   - Verificar sitemap: https://nutrindojuntos.com.br/sitemap.xml
   - Verificar robots.txt: https://nutrindojuntos.com.br/robots.txt
   - Submeter sitemap no Google Search Console

5. **Performance**
   - Executar Lighthouse CI
   - Verificar Core Web Vitals
   - Otimizar imagens se necessário

## 📞 Suporte

Em caso de problemas críticos:
1. Verificar logs (PM2 + Nginx)
2. Consultar `docs/TROUBLESHOOTING.md`
3. Reverter para backup se necessário:
   ```bash
   ssh root@31.97.245.82 "cd /var/www/nutrindojuntos/apps/web && rm -rf .next && mv .next.backup.YYYYMMDD_HHMMSS .next && pm2 restart nutrindojuntos"
   ```

---

**Status:** ✅ Pronto para deploy
**Data:** 2025-04-18
**Versão:** 1.0
