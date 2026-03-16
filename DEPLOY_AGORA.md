# 🚀 DEPLOY AGORA - Instruções Passo a Passo

## ✅ **Status**: Tudo configurado e pronto para deploy!

### 🎯 **Deploy Completo em 3 Passos (30 minutos total)**

---

## 📋 **Passo 1: Deploy Frontend (10 min)**

### Execute o script SSH:
```bash
# Na raiz do projeto
./scripts/deploy-ssh.sh
```

**O que o script faz:**
- ✅ Build otimizado do Next.js
- ✅ Upload via SSH para Hostinger
- ✅ Configura .htaccess otimizado
- ✅ Define permissões corretas
- ✅ Cria backup do site atual

**Resultado**: Site funcionando em https://peru-chamois-575367.hostingersite.com

---

## 📋 **Passo 2: Setup Database (10 min)**

### 2.1 Criar Projeto Supabase:
1. Acesse [https://supabase.com](https://supabase.com)
2. **Create New Project**:
   - **Name**: `nutrindo-juntos`
   - **Database Password**: `NJ_2026_Secure!` (anote!)
   - **Region**: `South America (São Paulo)`
   - **Plan**: `Free tier`

### 2.2 Copiar Connection String:
1. **Settings → Database**
2. Copiar **Connection string**:
```
postgresql://postgres:NJ_2026_Secure!@db.abc123xyz.supabase.co:5432/postgres
```

---

## 📋 **Passo 3: Deploy CMS (10 min)**

### 3.1 Setup Cloudinary (Storage):
1. Acesse [https://cloudinary.com](https://cloudinary.com)
2. Cadastre-se (tier gratuito)
3. Copie do Dashboard:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3.2 Deploy no Vercel:
1. Acesse [https://vercel.com](https://vercel.com)
2. **Import Git Repository**
3. Selecione pasta: `/apps/cms`
4. **Configure Environment Variables**:

```bash
DATABASE_URL=sua-connection-string-supabase
PAYLOAD_SECRET=sua-chave-secreta-32-chars
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
PAYLOAD_PUBLIC_SERVER_URL=https://cms.nutrindojuntos.com.br
NEXT_PUBLIC_SITE_URL=https://peru-chamois-575367.hostingersite.com
```

5. **Deploy**

### 3.3 Configurar DNS:
No painel Hostinger → DNS:
```
Tipo: CNAME
Nome: cms
Valor: cname.vercel-dns.com
TTL: 3600
```

---

## 🧪 **Testando Tudo (5 min)**

### ✅ **Checklist de Teste:**
- [ ] Frontend: https://peru-chamois-575367.hostingersite.com
- [ ] Admin: https://cms.nutrindojuntos.com.br/admin
- [ ] Criar primeiro usuário admin no CMS
- [ ] Adicionar conteúdo teste
- [ ] Verificar se frontend exibe conteúdo do CMS

---

## 🚨 **Se Algo Der Errado**

### Frontend não carrega:
```bash
# Verificar logs SSH
ssh -p 65002 u344738169@82.112.247.253 "ls -la /home/u344738169/domains/peru-chamois-575367.hostingersite.com/public_html"
```

### CMS não conecta database:
- Verificar connection string no Vercel
- Verificar se Supabase está ativo
- Verificar logs: https://vercel.com/dashboard

### Deploy script falha:
- Verificar conexão SSH
- Verificar permissões de escrita
- Executar: `chmod +x scripts/deploy-ssh.sh`

---

## ⚡ **Comandos Úteis**

### Rebuild frontend:
```bash
./scripts/deploy-ssh.sh
```

### Verificar status servidor:
```bash
ssh -p 65002 u344738169@82.112.247.253 "pwd && df -h && free -m"
```

### Ver logs Hostinger:
```bash
ssh -p 65002 u344738169@82.112.247.253 "tail -f domains/*/logs/error.log"
```

---

## 🎯 **URLs Finais**

### Produção (Teste):
- **Site**: https://peru-chamois-575367.hostingersite.com
- **Admin**: https://cms.nutrindojuntos.com.br/admin
- **API**: https://cms.nutrindojuntos.com.br/api

### Desenvolvimento:
- **Frontend**: http://localhost:3000
- **CMS**: http://localhost:3001/admin

---

## 💰 **Custos Reais**
- **Hostinger**: Já pago (4 anos)
- **Vercel**: $0/mês (Hobby)
- **Supabase**: $0/mês (Free tier)
- **Cloudinary**: $0/mês (Free tier)
- **Total**: **$0/mês** 🎉

---

**🚀 Pronto! Execute `./scripts/deploy-ssh.sh` e em 30 minutos terá o site completo funcionando!**