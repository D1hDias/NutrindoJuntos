# Estratégia de Deploy - Hostinger Web Hosting

## 📊 Infraestrutura Disponível

### Hostinger Web Hosting
- **Domínio Provisório:** https://peru-chamois-575367.hostingersite.com
- **IP:** 46.202.142.149
- **Node.js:** Versões 24.x, 22.x, 20.x, 18.x
- **Frameworks:** Next.js, React, Express, NestJS suportados
- **FTP:** u344738169@46.202.142.149
- **Upload Path:** public_html

## 🎯 Arquitetura Adaptada

### Frontend (Next.js)
```yaml
Plataforma: Vercel (Recomendado)
Alternativa: Hostinger Node.js
Domínio: nutrindojuntos.com.br
Tipo: Static Site Generation (SSG) + API Routes
```

### Backend (Payload CMS)
```yaml
Opção 1 (Recomendada): Supabase + Vercel
  - Database: Supabase PostgreSQL
  - CMS: Payload rodando no Vercel
  - Storage: Cloudinary

Opção 2: Hostinger Node.js
  - Database: Supabase PostgreSQL  
  - CMS: Payload no Hostinger
  - Storage: Cloudinary
  - Limitação: Sem acesso SSH para configuração avançada
```

## 🏗️ Opção 1: Deploy Híbrido (Recomendada)

### Vantagens
- ✅ Performance otimizada (Vercel CDN)
- ✅ Escalabilidade automática
- ✅ Deploy automático via Git
- ✅ Zero configuração de servidor
- ✅ SSL automático
- ✅ Monitoramento integrado

### Stack Final
```yaml
Frontend: Vercel (Next.js SSG)
Backend/CMS: Vercel (Payload API)
Database: Supabase (PostgreSQL)
Storage: Cloudinary
Email: Brevo
Domain: Registro.br → Vercel
```

### Custos
```yaml
Vercel: $0/mês (Hobby plan suficiente)
Supabase: $0/mês (500MB database)
Cloudinary: $0/mês (25GB storage)
Brevo: $0/mês (300 emails/dia)
Total: $0/mês no início
```

## 🏗️ Opção 2: Deploy na Hostinger

### Vantagens
- ✅ Tudo em um lugar
- ✅ Já pago/disponível
- ✅ Node.js nativo

### Limitações
- ❌ Sem acesso SSH
- ❌ Configuração limitada
- ❌ Sem Docker
- ❌ Monitoramento básico

### Implementação
```yaml
Localização: public_html/
Estrutura:
  - /public_html/cms/ (Payload CMS)
  - /public_html/ (Next.js build)
Database: Supabase (externo)
```

## 🚀 Plano de Execução - Opção 1 (Recomendada)

### Fase 1: Setup Supabase
```bash
# 1. Criar projeto Supabase
# 2. Obter connection string
# 3. Configurar tabelas via Payload
```

### Fase 2: Deploy CMS no Vercel
```bash
# 1. Configurar Payload para produção
# 2. Deploy via GitHub
# 3. Configurar environment variables
# 4. Testar acesso admin
```

### Fase 3: Deploy Frontend
```bash
# 1. Configurar Next.js para SSG
# 2. Deploy via GitHub
# 3. Configurar domínio
# 4. Testar site completo
```

### Fase 4: Configuração Domínio
```bash
# 1. Apontar DNS para Vercel
# 2. Configurar SSL
# 3. Migrar do domínio provisório
```

## 🔧 Configurações Específicas

### Payload CMS (Vercel)
```typescript
// payload.config.ts
export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  // Upload para Cloudinary
  upload: cloudinaryPlugin({}),
  // Configuração para Vercel
  admin: {
    bundler: webpackBundler(),
  },
})
```

### Next.js (Vercel)
```typescript
// next.config.js
module.exports = {
  output: 'standalone', // Para Vercel
  images: {
    domains: ['res.cloudinary.com'],
  },
  // ISR para blog
  experimental: {
    isrMemoryCacheSize: 0,
  },
}
```

## 🎯 Plano de Execução - Opção 2 (Hostinger)

### Fase 1: Preparar Build
```bash
# 1. Build otimizado para produção
# 2. Configurar para environment Hostinger
# 3. Setup database externa (Supabase)
```

### Fase 2: Upload via FTP
```bash
# 1. Build do projeto
# 2. Upload via FTP para public_html
# 3. Configurar Node.js no painel
# 4. Configurar environment variables
```

### Limitações Técnicas
- Sem controle de processo Node.js
- Configuração via painel web apenas
- Debugging limitado
- Sem CI/CD automático

## 🤔 Recomendação Final

**Sugiro fortemente a Opção 1 (Vercel)** pelos seguintes motivos:

1. **Performance:** CDN global + otimizações automáticas
2. **Confiabilidade:** 99.9% uptime garantido
3. **Facilidade:** Deploy automático via Git
4. **Escalabilidade:** Cresce com o negócio
5. **Custo:** Gratuito no início
6. **SEO:** Otimizações automáticas para Next.js

### Uso da Hostinger
Podemos usar o hosting Hostinger como:
- **Backup/Staging:** Ambiente de testes
- **Redirecionamento:** Temporary redirect para Vercel
- **Futuro:** Migração quando precisar de mais controle

## 📋 Próximos Passos

### Se escolher Opção 1 (Vercel)
1. Criar conta Supabase
2. Configurar projeto no GitHub
3. Deploy automático no Vercel
4. Configurar domínio final

### Se escolher Opção 2 (Hostinger)
1. Adaptar configuração para hosting
2. Build do projeto
3. Upload via FTP
4. Configuração via painel

**Qual opção prefere? Recomendo começarmos com a Opção 1.**