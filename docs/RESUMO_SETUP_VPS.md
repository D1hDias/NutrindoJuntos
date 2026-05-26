# Resumo Executivo - Setup VPS Hostinger

**Versão:** 1.0
**Projeto:** NutrindoJuntos
**Tempo Estimado:** 1-2 horas

---

## 🎯 OBJETIVO

Configurar servidor VPS Hostinger **do zero** para hospedar o projeto NutrindoJuntos em produção com Next.js 15.

---

## 📋 PRÉ-REQUISITOS

✅ Servidor VPS Hostinger (Ubuntu 22.04 LTS)
✅ Acesso root via SSH
✅ Domínio `nutrindojuntos.com.br` apontado para o IP do VPS
✅ Código do projeto pronto para deploy

---

## 🚀 SETUP RÁPIDO - 10 PASSOS

### 1️⃣ Conectar ao Servidor
```bash
ssh root@SEU_IP_VPS
```

### 2️⃣ Atualizar Sistema
```bash
apt update && apt upgrade -y
apt install -y curl wget git build-essential ufw fail2ban
```

### 3️⃣ Configurar Firewall
```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### 4️⃣ Instalar Node.js 20 + pnpm + PM2
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# pnpm
npm install -g pnpm

# PM2
npm install -g pm2
pm2 startup systemd
```

### 5️⃣ Instalar Nginx
```bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```

### 6️⃣ Limpar Configurações Antigas (IMPORTANTE!)
```bash
# Remover configs antigas
rm -f /etc/nginx/sites-enabled/*
rm -f /etc/nginx/sites-available/*
```

### 7️⃣ Configurar SSL
```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Obter certificado
certbot --nginx -d nutrindojuntos.com.br -d www.nutrindojuntos.com.br
```

### 8️⃣ Deploy do Projeto
```bash
# Criar diretório
mkdir -p /var/www/nutrindojuntos

# Upload do código (do seu computador local)
# Execute no WSL:
rsync -avz --exclude 'node_modules' --exclude '.next' \
  /mnt/e/NutrindoJuntos/ \
  root@SEU_IP_VPS:/var/www/nutrindojuntos/

# No servidor, instalar e buildar
cd /var/www/nutrindojuntos
pnpm install
pnpm --filter web build
```

### 9️⃣ Configurar Nginx + PM2
```bash
# Copiar configurações do guia completo (VPS_SETUP_GUIA_COMPLETO.md)
# - /etc/nginx/sites-available/nutrindojuntos
# - /var/www/nutrindojuntos/ecosystem.config.js

# Ativar site
ln -s /etc/nginx/sites-available/nutrindojuntos /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Iniciar aplicação
cd /var/www/nutrindojuntos
pm2 start ecosystem.config.js
pm2 save
```

### 🔟 Validar Setup
```bash
# Fazer upload do script de validação
# Do seu computador:
scp /mnt/e/NutrindoJuntos/scripts/validate-vps-setup.sh \
  root@SEU_IP_VPS:/root/

# No servidor:
bash /root/validate-vps-setup.sh
```

---

## ✅ CHECKLIST VISUAL RÁPIDO

```
□ Ubuntu 22.04 instalado
□ Node.js v20.x instalado
□ pnpm v9.x instalado
□ PM2 instalado
□ Nginx instalado e rodando
□ Firewall (UFW) ativo
□ Certificado SSL configurado
□ Projeto deployado em /var/www/nutrindojuntos
□ Build Next.js completo (.next/standalone, .next/static)
□ .env.production configurado
□ ecosystem.config.js criado
□ Nginx configurado e testado (nginx -t)
□ PM2 rodando aplicação
□ Site acessível via HTTPS
□ CSS/JS carregando corretamente
```

---

## 🔍 VALIDAÇÃO FINAL

Execute estes comandos para validar:

```bash
# 1. Site responde via HTTPS
curl -I https://nutrindojuntos.com.br | grep "200 OK"

# 2. Next.js rodando
curl -I http://localhost:3000 | grep "200 OK"

# 3. PM2 status
pm2 list | grep "nutrindojuntos.*online"

# 4. Nginx status
systemctl status nginx | grep "active (running)"

# 5. SSL válido
certbot certificates | grep "nutrindojuntos.com.br"

# 6. CSS carregando
curl -I https://nutrindojuntos.com.br/_next/static/css/$(ls /var/www/nutrindojuntos/apps/web/.next/static/css/ | head -1) | grep "200 OK"
```

Se **todos** retornarem sucesso → ✅ **Setup completo!**

---

## 📚 DOCUMENTAÇÃO COMPLETA

Para detalhes de cada passo, consulte:

- **`docs/VPS_SETUP_GUIA_COMPLETO.md`** - Passo-a-passo detalhado
- **`scripts/validate-vps-setup.sh`** - Script de validação automático
- **`docs/DEPLOYMENT.md`** - Processo de deploy e atualizações
- **`docs/TROUBLESHOOTING.md`** - Solução de problemas

---

## 🆘 PROBLEMAS COMUNS

### Site não carrega (504)
```bash
pm2 restart nutrindojuntos
pm2 logs nutrindojuntos
```

### CSS não carrega (404)
```bash
# Verificar permissões
chmod -R 755 /var/www/nutrindojuntos/apps/web/.next/
systemctl reload nginx
```

### Next.js crashando
```bash
# Ver logs
pm2 logs nutrindojuntos --lines 100

# Verificar memória
free -h

# Reiniciar
pm2 restart nutrindojuntos
```

---

## 🎯 PRÓXIMOS PASSOS APÓS SETUP

1. ✅ Configurar monitoramento (PM2, logs)
2. ✅ Configurar backup automático
3. ✅ Testar performance (Lighthouse)
4. ✅ Configurar analytics (Google Analytics)
5. ✅ Documentar processo de atualização

---

**Última Atualização:** 17/04/2026
**Suporte:** Consulte CLAUDE.md ou VPS_SETUP_GUIA_COMPLETO.md
