# Setup Supabase Database - NUTRINDO JUNTOS

## 🎯 Objetivo
Configurar PostgreSQL no Supabase para o Payload CMS hospedado no Vercel.

## 📋 Passo a Passo

### 1. Criar Projeto Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login/cadastro
3. **Create New Project**
4. Configurações:
   - **Name**: `nutrindo-juntos`
   - **Database Password**: `NJ_2026_Secure!` (anote esta senha!)
   - **Region**: `South America (São Paulo)` 
   - **Pricing**: `Free tier` (500MB - suficiente para início)

### 2. Obter Connection String
Após criação do projeto:

1. Vá em **Settings → Database**
2. Na seção **Connection string**, copie a **URI**
3. Formato será algo como:
```
postgresql://postgres:NJ_2026_Secure!@db.abc123xyz.supabase.co:5432/postgres
```

### 3. Configurar Environment Variables

#### No Vercel (CMS):
```bash
# Acesse https://vercel.com → projeto CMS → Settings → Environment Variables

DATABASE_URL=postgresql://postgres:NJ_2026_Secure!@db.abc123xyz.supabase.co:5432/postgres
PAYLOAD_SECRET=sua-chave-super-secreta-aqui-min-32-chars
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key  
CLOUDINARY_API_SECRET=seu-api-secret
PAYLOAD_PUBLIC_SERVER_URL=https://cms.nutrindojuntos.com.br
NEXT_PUBLIC_SITE_URL=https://nutrindojuntos.com.br
```

#### Localmente (.env):
Crie arquivo `apps/cms/.env.local`:
```bash
DATABASE_URL=postgresql://postgres:NJ_2026_Secure!@db.abc123xyz.supabase.co:5432/postgres
PAYLOAD_SECRET=sua-chave-super-secreta-aqui-min-32-chars
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret  
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Configurar Cloudinary (Storage de Imagens)

1. Acesse [https://cloudinary.com](https://cloudinary.com)
2. Cadastre-se (tier gratuito: 25GB)
3. No Dashboard, copie:
   - **Cloud Name**
   - **API Key** 
   - **API Secret**
4. Adicione nas environment variables acima

### 5. Gerar PAYLOAD_SECRET
```bash
# Execute para gerar chave segura:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6. Testar Conexão Local

```bash
# Na pasta do CMS
cd apps/cms

# Instalar dependências se necessário
pnpm install

# Testar conexão
pnpm dev

# Acesse: http://localhost:3001/admin
# Crie primeiro usuário admin
```

### 7. Deploy CMS no Vercel

#### Opção A: Via GitHub (Recomendado)
1. Commit e push do código
2. Conecte repositório no Vercel
3. Configure environment variables
4. Deploy automático

#### Opção B: Via Vercel CLI
```bash
# Instalar CLI
npm i -g vercel

# Na pasta CMS
cd apps/cms

# Deploy
vercel --prod

# Configurar domínio customizado:
# cms.nutrindojuntos.com.br
```

### 8. Configurar DNS

No painel da Hostinger (DNS):
```
Tipo: CNAME
Nome: cms
Valor: cname.vercel-dns.com
TTL: 3600
```

### 9. Validar Setup Completo

#### ✅ Checklist:
- [ ] Projeto Supabase criado
- [ ] Connection string copiada
- [ ] Cloudinary configurado
- [ ] Environment variables configuradas
- [ ] CMS rodando localmente
- [ ] Deploy no Vercel funcionando
- [ ] DNS configurado
- [ ] Admin acessível: https://cms.nutrindojuntos.com.br/admin

### 🚨 Troubleshooting

#### Erro de Conexão Database:
```bash
# Verifique se a connection string está correta
# No Supabase → Settings → Database → Connection string
```

#### SSL/Security Error:
```bash
# Adicione ?sslmode=require na connection string
DATABASE_URL=postgresql://postgres:senha@host:5432/postgres?sslmode=require
```

#### Timeout/Performance:
```bash
# Configure pool de conexões no payload.config.ts:
db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }
})
```

## 🎉 Conclusão

Após este setup:
- ✅ **CMS Admin**: https://cms.nutrindojuntos.com.br/admin
- ✅ **API**: https://cms.nutrindojuntos.com.br/api
- ✅ **Database**: PostgreSQL Supabase
- ✅ **Storage**: Cloudinary
- ✅ **Custo**: $0/mês

**Próximo passo**: Configurar frontend para consumir API do CMS!