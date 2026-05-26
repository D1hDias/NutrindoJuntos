# Processo de Formatação e Reconfiguração do Servidor VPS

**Versão:** 1.0
**Data:** 17/04/2026
**Situação:** Servidor com configurações antigas de múltiplos projetos

---

## 🎯 OBJETIVO

Formatar completamente o servidor VPS Hostinger e reconfigurar do zero para o projeto NutrindoJuntos, eliminando:
- Configurações de projetos antigos (capitalcreditobrasil, ventushub)
- CMS Payload que não existe mais
- Chaves SSH inconsistentes
- Configurações legacy acumuladas

---

## ⚠️ ANTES DE COMEÇAR

### Fazer Backup de Dados Importantes

```bash
# 1. Backup de variáveis de ambiente
scp root@SEU_IP_VPS:/var/www/nutrindojuntos/apps/web/.env.production ./backup-env-$(date +%Y%m%d).txt

# 2. Backup de configurações (se necessário)
scp root@SEU_IP_VPS:/etc/nginx/sites-available/nutrindojuntos ./backup-nginx-$(date +%Y%m%d).conf

# 3. Listar processos PM2 atuais (para referência)
ssh root@SEU_IP_VPS "pm2 list" > backup-pm2-list-$(date +%Y%m%d).txt
```

---

## 🔧 OPÇÃO 1: FORMATAÇÃO COMPLETA VIA PAINEL HOSTINGER

### Passo a Passo

1. **Acessar Painel Hostinger**
   - Login em hpanel.hostinger.com
   - Navegar para VPS → Seu VPS

2. **Reinstalar Sistema Operacional**
   - Ir em "Settings" ou "OS"
   - Selecionar "Reinstall OS"
   - Escolher: **Ubuntu 22.04 LTS (64-bit)**
   - ⚠️ **ATENÇÃO:** Isso apaga TUDO no servidor
   - Confirmar reinstalação

3. **Aguardar Instalação**
   - Processo leva ~5-10 minutos
   - Você receberá nova senha root por email

4. **Configurar Acesso SSH**
   ```bash
   # Testar nova conexão
   ssh root@SEU_IP_VPS
   # Usar senha que recebeu por email

   # Opcional: Configurar chave SSH
   ssh-keygen -t ed25519 -C "nutrindojuntos-vps"
   ssh-copy-id root@SEU_IP_VPS
   ```

5. **Seguir Setup Completo**
   - Executar todos os passos do `VPS_SETUP_GUIA_COMPLETO.md`
   - Servidor agora está limpo e pronto

---

## 🔧 OPÇÃO 2: LIMPEZA MANUAL (SEM FORMATAR)

Se não quiser formatar completamente, pode limpar manualmente:

### 2.1. Remover Projetos Antigos

```bash
# Conectar ao servidor
ssh root@SEU_IP_VPS

# Listar projetos
ls -la /var/www/

# Remover projetos antigos
rm -rf /var/www/capitalcreditobrasil
rm -rf /var/www/ventushub
rm -rf /var/www/cms.nutrindojuntos  # se existir

# Manter apenas nutrindojuntos
ls -la /var/www/  # deve mostrar apenas nutrindojuntos
```

### 2.2. Limpar Configurações Nginx

```bash
# Ver todas as configurações
ls -la /etc/nginx/sites-available/

# Remover configs antigas
rm -f /etc/nginx/sites-available/capitalcreditobrasil
rm -f /etc/nginx/sites-available/ventushub
rm -f /etc/nginx/sites-available/cms.nutrindojuntos
rm -f /etc/nginx/sites-available/default

# Remover symlinks
rm -f /etc/nginx/sites-enabled/*

# Manter apenas nutrindojuntos
ln -s /etc/nginx/sites-available/nutrindojuntos /etc/nginx/sites-enabled/

# Testar
nginx -t
systemctl reload nginx
```

### 2.3. Limpar Processos PM2

```bash
# Ver todos os processos
pm2 list

# Remover processos antigos
pm2 delete capitalcreditobrasil  # se existir
pm2 delete ventushub  # se existir
pm2 delete cms  # se existir

# Manter apenas nutrindojuntos
pm2 list  # deve mostrar apenas nutrindojuntos

# Salvar configuração limpa
pm2 save
```

### 2.4. Limpar Certificados SSL Antigos

```bash
# Ver todos os certificados
certbot certificates

# Revogar certificados antigos (se existirem)
certbot revoke --cert-name capitalcreditobrasil.com.br
certbot revoke --cert-name ventushub.com.br
certbot revoke --cert-name cms.nutrindojuntos.com.br

# Manter apenas certificado do nutrindojuntos
certbot certificates  # deve mostrar apenas nutrindojuntos.com.br
```

### 2.5. Limpar Logs Antigos

```bash
# Remover logs antigos
rm -rf /var/log/nginx/capitalcreditobrasil*
rm -rf /var/log/nginx/ventushub*
rm -rf /var/log/nginx/cms*

# Limpar logs PM2 antigos
rm -rf /var/log/pm2/capitalcreditobrasil*
rm -rf /var/log/pm2/ventushub*
rm -rf /var/log/pm2/cms*

# Limpar journalctl
journalctl --vacuum-time=7d
```

### 2.6. Limpar Chaves SSH

```bash
# Ver chaves autorizadas
cat ~/.ssh/authorized_keys

# Editar e remover chaves antigas/não reconhecidas
nano ~/.ssh/authorized_keys
# Manter apenas suas chaves atuais

# Verificar permissões
chmod 600 ~/.ssh/authorized_keys
```

### 2.7. Limpar Cron Jobs

```bash
# Ver cron jobs
crontab -l

# Editar e remover jobs de projetos antigos
crontab -e
# Manter apenas jobs do nutrindojuntos (se houver)
```

---

## ✅ VALIDAÇÃO PÓS-LIMPEZA

Após formatação OU limpeza manual:

```bash
# 1. Apenas um projeto em /var/www
ls /var/www/  # deve mostrar apenas: nutrindojuntos

# 2. Apenas uma config Nginx
ls /etc/nginx/sites-available/  # deve mostrar apenas: nutrindojuntos

# 3. Apenas um processo PM2
pm2 list  # deve mostrar apenas: nutrindojuntos

# 4. Apenas um certificado SSL
certbot certificates  # deve mostrar apenas: nutrindojuntos.com.br

# 5. Site funcionando
curl -I https://nutrindojuntos.com.br | grep "200 OK"
```

---

## 🎯 RECOMENDAÇÃO

**Para servidor com múltiplos projetos antigos:** ✅ **OPÇÃO 1 (Formatação Completa)**

**Vantagens:**
- ✅ Servidor 100% limpo
- ✅ Sem configurações legacy
- ✅ Sem conflitos
- ✅ Melhor performance
- ✅ Mais seguro

**Desvantagens:**
- ⏱️ Requer setup completo do zero (~1-2 horas)
- 📦 Precisa reinstalar tudo

---

**Para servidor com apenas 1-2 projetos antigos:** ⚠️ **OPÇÃO 2 (Limpeza Manual)**

**Vantagens:**
- ⚡ Mais rápido
- 📦 Não precisa reinstalar tudo

**Desvantagens:**
- ⚠️ Pode deixar resíduos
- ⚠️ Risco de conflitos futuros

---

## 📋 CHECKLIST DECISÃO

Use **FORMATAÇÃO COMPLETA** se:
- ☑️ Servidor tem 3+ projetos antigos
- ☑️ Configurações muito bagunçadas
- ☑️ Tempo não é problema crítico
- ☑️ Quer garantia de servidor limpo
- ☑️ Tem problemas recorrentes inexplicáveis

Use **LIMPEZA MANUAL** se:
- ☑️ Servidor tem apenas 1-2 projetos antigos
- ☑️ Precisa de solução rápida
- ☑️ Conhece bem o que está fazendo
- ☑️ Não tem problemas graves

---

## 🚀 PRÓXIMOS PASSOS

Após formatação/limpeza:

1. ✅ Seguir `VPS_SETUP_GUIA_COMPLETO.md` do início ao fim
2. ✅ Executar `validate-vps-setup.sh` para validar
3. ✅ Testar site completamente
4. ✅ Configurar monitoramento
5. ✅ Documentar qualquer customização

---

**Última Atualização:** 17/04/2026
**Recomendação Atual:** FORMATAÇÃO COMPLETA (Opção 1)
