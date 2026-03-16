# 🏗️ ARCHITECTURE.md - Arquitetura Técnica Detalhada

**Projeto:** NUTRINDO JUNTOS
**Versão:** 1.0
**Data:** 14/11/2025

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Decisões Arquiteturais](#decisões-arquiteturais)
3. [Diagrama de Arquitetura](#diagrama-de-arquitetura)
4. [Stack Tecnológico Detalhado](#stack-tecnológico-detalhado)
5. [Fluxos de Dados](#fluxos-de-dados)
6. [Estratégia de Data Fetching](#estratégia-de-data-fetching)
7. [Integrações Externas](#integrações-externas)
8. [Segurança](#segurança)
9. [Performance](#performance)
10. [Escalabilidade](#escalabilidade)

---

## 1. Visão Geral

### Arquitetura Jamstack Moderna

A plataforma NUTRINDO JUNTOS adota uma **arquitetura Jamstack** com separação clara entre:

- **Frontend (Next.js):** Geração estática/SSR, otimizado para SEO e performance
- **Backend/CMS (Payload):** API REST para gerenciamento de conteúdo
- **Database (PostgreSQL):** Armazenamento relacional via Supabase
- **Integrações:** Serviços externos para email, analytics, storage

### Princípios Arquiteturais

```yaml
principles:
  - separation_of_concerns: "Frontend ≠ Backend ≠ Data"
  - api_first: "CMS expõe API REST para consumo"
  - static_first: "SSG quando possível, SSR quando necessário"
  - progressive_enhancement: "Funciona sem JS, melhor com JS"
  - mobile_first: "Design e performance para mobile prioritário"
  - security_by_default: "Validação server-side obrigatória"
```

---

## 2. Decisões Arquiteturais

### ADR-001: Next.js App Router vs Pages Router

**Status:** ✅ Aprovado
**Data:** 14/11/2025

**Contexto:**
- Next.js oferece dois roteadores: Pages (antigo) e App (novo)
- App Router traz Server Components, melhor performance, layouts compartilhados

**Decisão:** Usar **App Router**

**Justificativa:**
- ✅ Server Components por padrão (menor bundle JS)
- ✅ Melhor performance (streaming SSR)
- ✅ Layouts compartilhados nativos
- ✅ Loading e error states padronizados
- ✅ Futuro do Next.js (Pages será deprecated)

**Consequências:**
- ⚠️ Curva de aprendizado inicial
- ✅ Melhor performance long-term
- ✅ Código mais organizado

---

### ADR-002: Payload CMS vs Strapi vs Contentful

**Status:** ✅ Aprovado
**Data:** 14/11/2025

**Contexto:**
- Necessidade de CMS headless para autonomia do time de marketing
- Orçamento limitado no início
- Time com pouca experiência em CMS

**Opções Avaliadas:**

| CMS | Prós | Contras | Custo |
|-----|------|---------|-------|
| **Payload** | TypeScript-native, UI intuitiva, self-hosted | Comunidade menor | Grátis |
| **Strapi** | Comunidade grande, maduro | JavaScript, complexo | Grátis |
| **Contentful** | Managed, confiável | Caro, vendor lock-in | $300+/mês |
| **Sanity** | Flexível, real-time | Curva aprendizado | $99+/mês |

**Decisão:** Usar **Payload CMS**

**Justificativa:**
- ✅ TypeScript-native (melhor DX e type-safety)
- ✅ Self-hosted (controle total, sem custos)
- ✅ UI admin intuitiva (time não-técnico consegue usar)
- ✅ Integração perfeita com Next.js
- ✅ Documentação excelente

**Consequências:**
- ✅ Economia de custos
- ⚠️ Responsabilidade de manutenção (mitigado: VPS já existente)
- ✅ Flexibilidade total

---

### ADR-003: PostgreSQL (Supabase) vs MongoDB

**Status:** ✅ Aprovado
**Data:** 14/11/2025

**Contexto:**
- Payload suporta ambos PostgreSQL e MongoDB
- Dados estruturados (posts, cursos, equipe)
- Necessidade de queries relacionais

**Decisão:** Usar **PostgreSQL via Supabase**

**Justificativa:**
- ✅ Relacional (melhor para dados estruturados)
- ✅ Supabase oferece tier gratuito generoso (500MB)
- ✅ Backups automáticos
- ✅ Dashboard visual para debugging
- ✅ Suporte a queries complexas (JOINs)
- ✅ ACID compliance

**Consequências:**
- ✅ Queries mais poderosas
- ✅ Integridade referencial
- ⚠️ Schema migrations necessárias (mitigado: Payload gerencia)

---

### ADR-004: Brevo vs Mailchimp vs SendGrid

**Status:** ✅ Aprovado
**Data:** 14/11/2025

**Contexto:**
- Necessidade de CRM + Email Marketing + Emails Transacionais
- Orçamento limitado no início
- Previsão de 300-600 leads em 6 meses

**Decisão:** Usar **Brevo (ex-Sendinblue)**

**Justificativa:**
- ✅ Tier gratuito: 300 emails/dia (suficiente para início)
- ✅ CRM incluso (não precisa ferramenta separada)
- ✅ Emails transacionais + marketing na mesma plataforma
- ✅ API simples e bem documentada
- ✅ UI intuitiva para time de marketing

**Alternativas Descartadas:**
- ❌ Mailchimp: Caro desde o início (~$20/mês)
- ❌ SendGrid: Focado em transacional, CRM fraco
- ❌ Amazon SES: Complexo, sem CRM

---

### ADR-005: Cloudinary vs S3 vs Supabase Storage

**Status:** ✅ Aprovado
**Data:** 14/11/2025

**Contexto:**
- Blog terá muitas imagens (15+ posts no lançamento)
- Necessidade de otimização automática (WebP, redimensionamento)
- CDN global para performance

**Decisão:** Usar **Cloudinary**

**Justificativa:**
- ✅ Tier gratuito: 25GB storage + 25GB bandwidth/mês
- ✅ Transformações automáticas (resize, crop, format)
- ✅ CDN global incluso
- ✅ API simples
- ✅ Integração fácil com Payload

**Alternativas Descartadas:**
- ❌ AWS S3: Complexo, sem transformações automáticas
- ❌ Supabase Storage: 1GB apenas, sem CDN otimizado
- ❌ VPS Hostinger: Sem CDN, usa banda da VPS

---

### ADR-006: pnpm vs npm vs yarn

**Status:** ✅ Aprovado
**Data:** 14/11/2025

**Decisão:** Usar **pnpm**

**Justificativa:**
- ✅ Mais rápido que npm/yarn (até 2x)
- ✅ Economiza espaço em disco (hard links)
- ✅ Gerenciamento de workspaces nativo
- ✅ Compatível com npm packages
- ✅ Segurança melhorada (não hoisting fantasma)

---

### ADR-007: Estratégia Docker - Abordagem Híbrida

**Status:** ✅ Aprovado
**Data:** 14/11/2025

**Contexto:**
- Necessidade de ambiente de desenvolvimento consistente
- Facilitação de deploy na VPS Hostinger
- Equipe já possui VPS Hostinger configurada
- Performance do hot-reload é crítica para produtividade

**Opções Avaliadas:**

| Abordagem | Prós | Contras | Conclusão |
|-----------|------|---------|-----------|
| **Sem Docker** | Hot-reload mais rápido | Inconsistência dev/prod, setup manual complexo | ❌ Não recomendado |
| **Docker Total** | Consistência máxima | Hot-reload lento no Next.js (~3-5s) | ❌ Prejudica DX |
| **Híbrido** | Performance + consistência | Configuração um pouco mais complexa | ✅ **ESCOLHIDO** |

**Decisão:** Usar **Abordagem Híbrida**

**COM Docker:**
- ✅ **Payload CMS** (apps/cms) → Multi-stage build, deploy facilitado VPS
- ✅ **PostgreSQL** (dev local opcional) → Alternativa ao Supabase offline
- ✅ **Adminer** (dev opcional) → Interface web para PostgreSQL
- ✅ **Nginx** (produção VPS) → Reverse proxy com SSL

**SEM Docker:**
- ✅ **Next.js** (apps/web) → Hot-reload instantâneo, melhor DX

**Justificativa:**
1. **Performance:** Next.js nativo ~100-300ms vs Docker ~3-5s (10-50x mais rápido)
2. **Deploy VPS:** CMS containerizado facilita deploy, rollback, e monitoramento
3. **Consistência:** CMS self-hosted → Docker garante paridade dev/prod
4. **Vercel:** Next.js vai para Vercel → não usa Docker (deploy otimizado)

**Arquivos Criados:**
- `docker-compose.yml` - Desenvolvimento (postgres, cms, adminer)
- `docker-compose.prod.yml` - Produção VPS (cms, nginx, overrides)
- `apps/cms/Dockerfile` - Multi-stage build (deps, builder, dev, prod)
- `docker/postgres/init.sql` - Init scripts database
- `docs/DOCKER.md` - Guia completo Docker

**Workflow Desenvolvimento:**
```bash
# Opção 1: Docker completo
docker-compose up -d && cd apps/web && pnpm dev

# Opção 2: Híbrido (CMS Docker + Supabase)
docker-compose up cms -d && cd apps/web && pnpm dev

# Opção 3: Tudo nativo
pnpm dev
```

**Workflow Produção (VPS):**
```bash
# Deploy
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Atualização
git pull && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Monitoramento
docker-compose logs -f cms && docker stats
```

**Consequências:**
- ✅ Melhor DX com Next.js nativo
- ✅ Deploy facilitado CMS na VPS
- ✅ Consistência ambiente CMS dev/prod
- ⚠️ Configuração mais complexa (mitigado: docs/DOCKER.md)

**Referências:** Ver `docs/DOCKER.md` para guia completo

---

## 3. Diagrama de Arquitetura

### Arquitetura Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                          USUÁRIO                                │
│                    (Browser / Mobile)                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE CDN                               │
│              (Cache, SSL, DDoS Protection)                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                  NEXT.JS APP (Vercel)                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Server Components:                                      │  │
│  │  - SSG: Home, Blog posts, Cursos                        │  │
│  │  - SSR: Listagens com filtros                           │  │
│  │                                                          │  │
│  │  Client Components:                                      │  │
│  │  - Formulários (React Hook Form)                        │  │
│  │  - Navegação mobile                                     │  │
│  │  - Filtros dinâmicos                                    │  │
│  │                                                          │  │
│  │  API Routes:                                             │  │
│  │  - /api/newsletter                                       │  │
│  │  - /api/curso-interesse                                 │  │
│  │  - /api/mentoria-interesse                              │  │
│  │  - /api/contato                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────┬──────────────┬──────────────┬──────────────────────┘
             │              │              │
             ↓              ↓              ↓
┌─────────────────┐  ┌────────────┐  ┌──────────────────────────┐
│  PAYLOAD CMS    │  │   BREVO    │  │   CLOUDINARY             │
│  (VPS Hostinger)│  │ (API REST) │  │   (Images CDN)           │
│                 │  │            │  │                          │
│  - Posts        │  │ - Contacts │  │  - Image optimization    │
│  - Cursos       │  │ - Lists    │  │  - Transformations       │
│  - Equipe       │  │ - Tags     │  │  - CDN delivery          │
│  - Media        │  │ - Emails   │  │                          │
│  - API REST     │  └────────────┘  └──────────────────────────┘
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   SUPABASE      │
│  (PostgreSQL)   │
│                 │
│  - Content DB   │
│  - Backups      │
│  - Dashboard    │
└─────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    ANALYTICS & MONITORING                        │
│  - Google Analytics 4                                           │
│  - Google Search Console                                        │
│  - Sentry (Error Tracking)                                      │
│  - UptimeRobot (Monitoring)                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Stack Tecnológico Detalhado

### Frontend Stack

```yaml
framework:
  name: Next.js
  version: 15.0+
  features:
    - App Router (RSC - React Server Components)
    - Image optimization automática
    - Font optimization
    - Dynamic imports / Code splitting
    - Middleware para redirects
    - API Routes para backend

language:
  name: TypeScript
  version: 5.3+
  config:
    strict: true
    noImplicitAny: true
    strictNullChecks: true

styling:
  framework: Tailwind CSS 3.4+
  components: shadcn/ui (Radix UI + Tailwind)
  utilities:
    - clsx: Conditional classes
    - tailwind-merge: Merge Tailwind classes
    - cva: Class variance authority

forms:
  validation: Zod (schema validation)
  state_management: React Hook Form
  features:
    - Server-side validation
    - Custom error messages
    - Accessibility (ARIA)

state_management:
  global: React Context (mínimo)
  server: React Server Components
  client: useState / useReducer

animations:
  library: Framer Motion
  usage: Essential animations only
  target: <10KB bundle

icons:
  library: Lucide React
  format: Tree-shakeable SVG
  size: ~20KB total

fonts:
  loader: next/font
  fonts:
    - Inter (sans-serif, body)
    - Lora (serif, headings)
  optimization: Automatic subsetting
```

### Backend Stack

```yaml
cms:
  name: Payload CMS
  version: 2.0+
  features:
    - TypeScript-native
    - REST API automática
    - Admin UI built-in
    - Access control granular
    - Hooks & plugins
    - Media management

  collections:
    - Posts (blog)
    - Cursos
    - Categorias
    - Tags
    - Equipe
    - Depoimentos (futuro)
    - Media

  globals:
    - SiteSettings
    - SocialLinks
    - NavigationMenu

database:
  type: PostgreSQL
  version: 15+
  provider: Supabase
  features:
    - Relational queries
    - Full-text search
    - Row-level security
    - Automatic backups
    - Dashboard UI

  connection:
    pooling: true
    max_connections: 20
    ssl: required

storage:
  provider: Cloudinary
  features:
    - Automatic optimization
    - Format conversion (WebP, AVIF)
    - Responsive images
    - CDN global
    - Transformations on-the-fly

  limits:
    storage: 25GB (free tier)
    bandwidth: 25GB/month
    transformations: unlimited
```

### Integrações

```yaml
email:
  provider: Brevo
  features:
    - Transactional emails
    - Marketing campaigns
    - CRM built-in
    - Contact lists & tags
    - Automation workflows

  apis_used:
    - POST /v3/contacts (criar/atualizar)
    - POST /v3/smtp/email (enviar)
    - GET /v3/contacts/lists (listas)

  templates:
    1: Newsletter welcome
    2: Curso confirmação
    3: Mentoria confirmação
    4: Contato confirmação
    5: Admin notification

analytics:
  google_analytics:
    version: GA4
    events:
      conversions:
        - newsletter_signup
        - course_interest
        - mentoring_interest
        - contact_form_submit
      engagement:
        - scroll_depth
        - reading_time
        - social_share
        - cta_click

  search_console:
    purpose: SEO monitoring
    features:
      - Index coverage
      - Search performance
      - Core Web Vitals
      - Mobile usability

monitoring:
  error_tracking:
    provider: Sentry
    features:
      - Error logging
      - Source maps
      - User context
      - Release tracking

  uptime:
    provider: UptimeRobot
    interval: 5 minutes
    alerts:
      - Email
      - Webhook
```

---

## 5. Fluxos de Dados

### Fluxo 1: Usuário Lê Post do Blog

```
┌──────────┐
│ Usuário  │
└─────┬────┘
      │ 1. GET /blog/slug-do-post
      ↓
┌─────────────────┐
│   Cloudflare    │ 2. Cache HIT? → Retorna
│      CDN        │    Cache MISS? → Próximo
└─────┬───────────┘
      │ 3. Forward request
      ↓
┌─────────────────┐
│   Next.js       │ 4. generateStaticParams
│   (Vercel)      │    ou getPost(slug)
└─────┬───────────┘
      │ 5. Fetch da API
      ↓
┌─────────────────┐
│  Payload CMS    │ 6. Query PostgreSQL
│  (VPS)          │    WHERE slug = 'slug-do-post'
└─────┬───────────┘
      │ 7. Retorna JSON
      ↓
┌─────────────────┐
│   PostgreSQL    │ 8. SELECT * FROM posts
│   (Supabase)    │    JOIN author, category
└─────────────────┘
      │ 9. Dados retornam
      ↓
┌─────────────────┐
│   Next.js       │ 10. Renderiza HTML (RSC)
│                 │     + Imagens Cloudinary
└─────┬───────────┘
      │ 11. HTML + CSS + JS mínimo
      ↓
┌─────────────────┐
│   Cloudflare    │ 12. Cache por 1 hora
│      CDN        │
└─────┬───────────┘
      │ 13. Response
      ↓
┌──────────┐
│ Usuário  │ 14. Página renderizada
└──────────┘

Tempo total: ~500ms (sem cache), ~50ms (com cache CDN)
```

### Fluxo 2: Usuário Manifesta Interesse em Curso

```
┌──────────┐
│ Usuário  │
└─────┬────┘
      │ 1. Preenche formulário
      │    - Nome, Email, Curso
      ↓
┌─────────────────┐
│  React Hook     │ 2. Validação client-side
│     Form        │    (Zod schema)
└─────┬───────────┘
      │ 3. POST /api/curso-interesse
      ↓
┌─────────────────┐
│   API Route     │ 4. Validação server-side
│   Next.js       │    (Zod parse)
└─────┬───────────┘
      │ 5. Se válido, continua
      ↓
┌─────────────────┐
│  Brevo Client   │ 6. POST /v3/contacts
│  (lib/brevo)    │    {
└─────┬───────────┘      email, name,
      │                  listIds: [LEADS_CURSOS],
      │                  tags: ['curso:slug']
      │                }
      │ 7. Contato criado/atualizado
      ↓
┌─────────────────┐
│  Brevo API      │ 8. Adiciona à lista
│                 │    + Tag específica do curso
└─────┬───────────┘
      │ 9. Trigger automação
      ↓
┌─────────────────┐
│  Brevo Email    │ 10. Email template #2
│  Automation     │     "Confirmação de Interesse"
└─────┬───────────┘
      │ 11. Email enviado
      ↓
┌──────────┐
│ Lead no  │ 12. Lead capturado
│ Brevo    │     + Email confirmação
└──────────┘

┌─────────────────┐
│   API Route     │ 13. Retorna success: true
│   Next.js       │
└─────┬───────────┘
      │ 14. Response JSON
      ↓
┌──────────┐
│ Usuário  │ 15. Mensagem de sucesso
└──────────┘     "Entraremos em contato!"

Tempo total: ~1-2s
```

### Fluxo 3: Admin Publica Novo Post

```
┌──────────┐
│  Admin   │
└─────┬────┘
      │ 1. Acessa /admin
      ↓
┌─────────────────┐
│  Payload Admin  │ 2. Login (JWT)
│      UI         │
└─────┬───────────┘
      │ 3. Navega para Posts
      ↓
┌─────────────────┐
│  Payload CMS    │ 4. Cria novo post
│                 │    - Título, Conteúdo
└─────┬───────────┘    - Categoria, Tags
      │                - Featured Image
      │ 5. Upload imagem
      ↓
┌─────────────────┐
│  Cloudinary     │ 6. Upload + Otimização
│                 │    - Gera URL
└─────┬───────────┘    - Transformations
      │ 7. URL retorna
      ↓
┌─────────────────┐
│  Payload CMS    │ 8. Salva no PostgreSQL
│                 │    INSERT INTO posts
└─────┬───────────┘    VALUES (...)
      │ 9. Webhook (opcional)
      ↓
┌─────────────────┐
│  Vercel Webhook │ 10. Revalidate ISR
│  (revalidate)   │     revalidatePath('/blog')
└─────┬───────────┘
      │ 11. Cache invalidado
      ↓
┌──────────┐
│ Frontend │ 12. Próxima requisição
└──────────┘     gera página atualizada

Tempo total: ~5-10s (upload + save)
```

---

## 6. Estratégia de Data Fetching

### Server Components (Padrão)

```typescript
// app/(main)/blog/page.tsx
// ✅ Server Component por padrão
export default async function BlogPage() {
  // Fetch direto, sem useState/useEffect
  const posts = await getPosts({ limit: 12 })

  return <div>{/* Renderiza */}</div>
}
```

**Vantagens:**
- ✅ Zero JavaScript no cliente para fetching
- ✅ SEO perfeito (HTML completo no servidor)
- ✅ Acesso direto a database/API
- ✅ Nenhum loading state necessário

### Static Site Generation (SSG) + ISR

```typescript
// Gera páginas estáticas em build time
export async function generateStaticParams() {
  const posts = await getPosts({ limit: 100 })
  return posts.docs.map(post => ({ slug: post.slug }))
}

// Revalida a cada 1 hora
export const revalidate = 3600

export default async function PostPage({ params }) {
  const post = await getPost(params.slug)
  return <article>{/* ... */}</article>
}
```

**Quando usar:**
- ✅ Páginas que mudam pouco (posts, cursos)
- ✅ Conteúdo que pode estar "desatualizado" por 1h
- ✅ Performance crítica

**Revalidation Times:**
- Posts de blog: 1 hora (3600s)
- Cursos: 6 horas (21600s)
- Equipe: 24 horas (86400s)
- Home: 30 minutos (1800s)

### Server-Side Rendering (SSR)

```typescript
// Força SSR (sem cache)
export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }) {
  const results = await searchPosts(searchParams.q)
  return <div>{/* ... */}</div>
}
```

**Quando usar:**
- ✅ Conteúdo personalizados
- ✅ Filtros/busca dinâmica
- ✅ Dados em tempo real

### Client Components

```typescript
'use client' // Marca como Client Component

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  // ...
}
```

**Quando usar:**
- ✅ Interatividade (formulários, animações)
- ✅ useState, useEffect, event handlers
- ✅ Browser APIs (localStorage, window)

**Minimizar uso:** Apenas quando necessário!

---

## 7. Integrações Externas

### Payload CMS API

**Base URL:** `https://cms.nutrindojuntos.com.br/api`

```typescript
// lib/payload-client.ts
export async function getPosts(params = {}) {
  const url = new URL(`${PAYLOAD_API}/posts`)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600, tags: ['posts'] }
  })

  return res.json()
}
```

**Endpoints Principais:**
- `GET /api/posts` - Listar posts
- `GET /api/posts/{id}` - Post específico
- `GET /api/cursos` - Listar cursos
- `GET /api/equipe` - Listar membros
- `GET /api/categorias` - Categorias
- `GET /api/tags` - Tags

### Brevo API

**Base URL:** `https://api.brevo.com/v3`

```typescript
// lib/brevo-client.ts
export async function createOrUpdateContact({ email, attributes, listIds }) {
  const res = await fetch(`${BREVO_API}/contacts`, {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ email, attributes, listIds })
  })

  return res.json()
}
```

**Endpoints Usados:**
- `POST /contacts` - Criar/atualizar contato
- `POST /smtp/email` - Enviar email transacional
- `GET /contacts/lists` - Listar listas

**Rate Limits:**
- 300 emails/dia (tier free)
- 10 requisições/segundo (API)

### Cloudinary

**Base URL:** `https://res.cloudinary.com/{cloud_name}`

```typescript
// Payload CMS config
import { cloudinaryAdapter } from '@payloadcms/plugin-cloud-storage/cloudinary'

export default buildConfig({
  plugins: [
    cloudinaryAdapter({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      folder: 'nutrindo-juntos'
    })
  ]
})
```

**Transformações Automáticas:**
```
# Thumbnail
/image.jpg?w=300&h=200&c=fill&q=80&f=auto

# Hero image
/image.jpg?w=1200&h=600&c=fill&q=90&f=auto

# Blog post
/image.jpg?w=800&q=85&f=auto
```

---

## 8. Segurança

### Autenticação & Autorização

```yaml
payload_admin:
  method: JWT
  storage: httpOnly cookies
  expiry: 7 days
  refresh: Automatic

api_routes:
  authentication: None (public read)
  authorization: None (public endpoints)
  rate_limiting: 100 req/min per IP
```

### Validação

```typescript
// Server-side validation OBRIGATÓRIA
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Zod parse (throws se inválido)
    const data = newsletterSchema.parse(body)

    // Processo...
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      )
    }
  }
}
```

### Security Headers

```typescript
// next.config.js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()'
        }
      ]
    }
  ]
}
```

### HTTPS & SSL

```yaml
development: http://localhost (OK)
production: https:// (OBRIGATÓRIO)

ssl_provider:
  - Vercel (automático)
  - VPS (Let's Encrypt)
  - Cloudflare (proxy)

certificates:
  renewal: Automatic
  grade: A+ (SSL Labs)
```

### Rate Limiting

```typescript
// middleware.ts (exemplo)
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m')
})

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new Response('Too Many Requests', { status: 429 })
  }

  return NextResponse.next()
}
```

---

## 9. Performance

### Lighthouse Targets

```yaml
performance: >90
  metrics:
    LCP: <2.5s
    FID: <100ms
    CLS: <0.1
    TTI: <3.5s
    Speed Index: <3.0s

seo: 100
  requirements:
    - Meta tags completos
    - Sitemap.xml
    - Robots.txt
    - Schema markup
    - Canonical URLs

accessibility: >95
  requirements:
    - WCAG 2.1 AA
    - Keyboard navigation
    - Screen reader friendly
    - Contrast AAA (preferencial)

best_practices: >90
  requirements:
    - HTTPS
    - Security headers
    - No console errors
    - Modern image formats
```

### Otimizações Implementadas

#### 1. Images

```typescript
// next.config.js
images: {
  domains: ['res.cloudinary.com'],
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 31536000 // 1 ano
}

// Uso
<Image
  src={post.featuredImage.url}
  alt={post.featuredImage.alt}
  width={1200}
  height={630}
  priority={isAboveTheFold}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

#### 2. Fonts

```typescript
// app/layout.tsx
import { Inter, Lora } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap', // FOIT prevention
  preload: true
})
```

#### 3. Code Splitting

```typescript
// Dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false // Client-only se necessário
})
```

#### 4. Caching Strategy

```
┌─────────────────┬──────────────┬───────────────────┐
│ Resource        │ Cache Time   │ Strategy          │
├─────────────────┼──────────────┼───────────────────┤
│ Static assets   │ 1 year       │ immutable         │
│ Blog posts      │ 1 hour       │ stale-while-      │
│                 │              │   revalidate      │
│ Cursos          │ 6 hours      │ stale-while-      │
│                 │              │   revalidate      │
│ Home            │ 30 minutes   │ stale-while-      │
│                 │              │   revalidate      │
│ API responses   │ 0            │ no-cache          │
└─────────────────┴──────────────┴───────────────────┘
```

---

## 10. Escalabilidade

### Horizontal Scaling

```yaml
vercel_frontend:
  scaling: Automático
  regions: Global (edge)
  limit: Ilimitado (Pro plan)

vps_payload:
  scaling: Manual (upgrade VPS)
  load_balancer: Opcional (Nginx)
  strategy: Vertical primeiro, depois horizontal

supabase_db:
  scaling: Automático (até limite tier)
  connections: Pooling automático
  read_replicas: Disponível (paid tiers)
```

### Limites Conhecidos (Tier Free)

```yaml
supabase:
  storage: 500MB
  bandwidth: 2GB/month
  connections: 60 simultâneas

cloudinary:
  storage: 25GB
  bandwidth: 25GB/month
  transformations: ilimitadas

brevo:
  emails: 300/dia
  contacts: ilimitados
  api_calls: 10/segundo

vercel:
  bandwidth: 100GB/month
  build_minutes: 6.000/month
  edge_functions: 100.000 invocações/dia
```

### Quando Escalar?

```yaml
trigger_1:
  metric: Vercel bandwidth >80GB/month
  action: Upgrade para Pro ($20/mês)

trigger_2:
  metric: Cloudinary storage >20GB
  action: Upgrade para paid ($99/mês) ou otimizar

trigger_3:
  metric: Brevo emails >250/dia (consistente)
  action: Upgrade para Lite ($25/mês)

trigger_4:
  metric: Supabase storage >400MB
  action: Upgrade para Pro ($25/mês)

trigger_5:
  metric: VPS CPU >80% (consistente)
  action: Upgrade VPS ou load balancer
```

### Estratégia de Crescimento

```
Fase 1 (0-6 meses): Tier Free
├─ Custo: ~R$ 0/mês
├─ Visitantes: 0-7.000/mês
└─ Leads: 0-600

Fase 2 (6-12 meses): Paid Tiers
├─ Custo: ~R$ 400/mês
├─ Visitantes: 7.000-30.000/mês
├─ Leads: 600-3.000
└─ Upgrades: Vercel Pro, Brevo Lite

Fase 3 (12-24 meses): Growth
├─ Custo: ~R$ 1.500/mês
├─ Visitantes: 30.000-100.000/mês
├─ Leads: 3.000-10.000
└─ Upgrades: Cloudinary, Supabase, VPS

Fase 4 (24+ meses): Scale
├─ Custo: ~R$ 5.000+/mês
├─ Visitantes: 100.000+/mês
├─ Leads: 10.000+
└─ Infraestrutura própria (considerar)
```

---

## 📊 Métricas de Monitoramento

### Dashboards

```yaml
vercel_analytics:
  - Requests/second
  - Bandwidth usage
  - Build times
  - Edge function invocations

google_analytics:
  - Pageviews
  - Users (new vs returning)
  - Conversions (leads)
  - Traffic sources
  - Bounce rate

sentry:
  - Error rate
  - Error types
  - User impact
  - Release health

uptimerobot:
  - Uptime %
  - Response time
  - Downtime incidents
```

---

**Última Atualização:** 14/11/2025
**Próxima Revisão:** Após Fase 1 (Setup completo)
