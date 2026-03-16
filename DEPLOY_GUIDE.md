# 🚀 Guia de Deploy - NUTRINDO JUNTOS

## ✅ Status da Implementação

### **Arquitetura Híbrida Configurada**
- 🏗️ **Frontend**: Next.js estático → Hostinger
- ⚙️ **Backend**: Payload CMS → Vercel  
- 🗄️ **Database**: PostgreSQL → Supabase
- 📧 **Email**: Hostinger Email Business + Brevo
- 🖼️ **Assets**: Cloudinary

### **Custos Totais**: $0/mês (aproveita Hostinger pago por 4 anos)

---

## 🎯 Deploy em 3 Etapas

### 📅 **Etapa 1: Setup Backend (30 min)**
```bash
# 1. Criar projeto Supabase
# 2. Deploy CMS no Vercel
# 3. Configurar DNS cms.nutrindojuntos.com.br
```
**Resultado**: Admin funcionando em https://cms.nutrindojuntos.com.br/admin

### 📅 **Etapa 2: Deploy Frontend (15 min)**
```bash
# 1. Executar script de build
./scripts/deploy-hostinger.sh

# 2. Upload via FTP para Hostinger
# 3. Verificar site funcionando
```
**Resultado**: Site funcionando em https://nutrindojuntos.com.br

### 📅 **Etapa 3: Integração & Testes (15 min)**
```bash
# 1. Testar formulários
# 2. Verificar performance
# 3. Configurar monitoramento
```
**Resultado**: Sistema completo funcionando

---

## 📋 Instruções Detalhadas

### 🔧 **1. Setup Backend**

#### Supabase (Database)
```bash
# Siga: scripts/setup-supabase.md
# Resultado: Connection string PostgreSQL
```

#### Vercel (CMS)
```bash
# 1. Push código para GitHub
git add .
git commit -m "feat: configuração para deploy híbrido"
git push origin main

# 2. Conectar Vercel ao repositório
# 3. Configurar environment variables (ver setup-supabase.md)
# 4. Deploy automático
```

#### DNS (Subdomínio CMS)
```bash
# No painel Hostinger → DNS
Tipo: CNAME
Nome: cms  
Valor: cname.vercel-dns.com
TTL: 3600
```

### 🖥️ **2. Deploy Frontend**

#### Build Estático
```bash
# Na raiz do projeto
./scripts/deploy-hostinger.sh

# Resultado: arquivos prontos em ./dist/
```

#### Upload FTP
```bash
# Conexão FTP
Host: ftp://46.202.142.149
User: u344738169
Password: [sua senha]

# Upload
# Origem: ./dist/*
# Destino: /public_html/
```

#### Verificação
```bash
# Acesse: https://peru-chamois-575367.hostingersite.com
# Depois: https://nutrindojuntos.com.br (após DNS)
```

---

## 🛠️ **Comandos Úteis**

### Development
```bash
# Frontend
pnpm --filter web dev

# Backend  
pnpm --filter cms dev

# Ambos
pnpm dev
```

### Deploy
```bash
# Build estático para Hostinger
./scripts/deploy-hostinger.sh

# Deploy CMS para Vercel
cd apps/cms && vercel --prod
```

### Manutenção
```bash
# Update content
# → Admin: https://cms.nutrindojuntos.com.br/admin
# → Frontend rebuild automático via ISR

# Performance check
# → https://pagespeed.web.dev/
```

---

## 🔍 **Troubleshooting**

### Frontend não carrega
```bash
# Verificar .htaccess foi uploaded
# Verificar DNS propagação: https://dnschecker.org
# Verificar logs Hostinger
```

### CMS não conecta database
```bash
# Verificar connection string Supabase
# Verificar environment variables Vercel
# Verificar logs: https://vercel.com/dashboard
```

### Performance lenta
```bash
# Verificar GZIP ativado
# Verificar CDN Hostinger funcionando  
# Verificar otimização imagens Cloudinary
```

---

## 📊 **Métricas Esperadas**

### Performance
- **Lighthouse Score**: 90+ (Performance)
- **LCP**: <2.5s (Brasil)
- **FID**: <100ms
- **CLS**: <0.1

### Uptime
- **Hostinger**: 99.9% (SLA)
- **Vercel**: 99.9% (SLA)
- **Supabase**: 99.9% (SLA)

### Custos
- **Mensal**: $0 (tier gratuitos)
- **Anual**: $0 (Hostinger já pago)
- **ROI**: 100% (aproveitamento total recursos)

---

## 🎉 **Próximos Passos**

### Pós-Deploy
1. ✅ **Content**: Adicionar posts iniciais no admin
2. ✅ **SEO**: Configurar Google Analytics + Search Console
3. ✅ **Email**: Testar formulários + Brevo
4. ✅ **Performance**: Monitorar + otimizar
5. ✅ **Marketing**: Começar estratégia de conteúdo

### Escalabilidade (Futuro)
- **Vercel Pro**: $20/mês (+ recursos)
- **Supabase Pro**: $25/mês (+ database)
- **Cloudinary Advanced**: $89/mês (+ storage)

---

**🚀 Deploy pronto! Máximo aproveitamento dos recursos Hostinger + tecnologia moderna + $0 custo adicional!**