# 📋 TAREFAS PENDENTES - NUTRINDO JUNTOS

**Última Atualização:** 21/11/2025
**Status:** Em Desenvolvimento - Fase 4 (Design)

---

## 🐛 ERROS DE TYPESCRIPT PENDENTES

### 1. API Routes - Brevo SMS Property
**Arquivos:**
- `app/api/leads/cursos/route.ts:81`
- `app/api/leads/cursos/route.ts:117`
- `app/api/leads/mentoria/route.ts:81`
- `app/api/leads/mentoria/route.ts:117`

**Erro:** `Property 'SMS' does not exist on type 'object'`

**Solução Necessária:**
- Verificar tipagem do Brevo SDK (@getbrevo/brevo@3.0.1)
- Remover uso de SMS ou atualizar tipos
- Focar apenas em email marketing por enquanto

---

### 2. Equipe - Social Links Website
**Arquivo:** `app/equipe/page.tsx:153, 155`

**Erro:** `Property 'website' does not exist on type '{ email: string; linkedin: string; instagram?: undefined; }'`

**Solução Necessária:**
- Atualizar tipo `TeamMember` em `types/payload.ts`
- Adicionar `website?: string` no `socialLinks`
- Ou remover uso de `website` na página

**Fix Rápido:**
```typescript
// types/payload.ts - linha 74-78
socialLinks?: {
  instagram?: string
  linkedin?: string
  website?: string  // ✅ Adicionar esta linha
}
```

---

### 3. Manifest - Icon Type
**Arquivo:** `app/manifest.ts:18`

**Erro:** `Type '"any maskable"' is not assignable to type '"any" | "maskable" | "monochrome" | undefined'`

**Solução Necessária:**
- Alterar de `"any maskable"` para `"maskable"`
- Ou criar duas entradas separadas no array de ícones

**Fix Rápido:**
```typescript
// app/manifest.ts
{
  src: '/icon-512x512.png',
  sizes: '512x512',
  type: 'image/png',
  purpose: 'maskable'  // ✅ Remover "any "
}
```

---

### 4. Mock Data - Curso Properties
**Arquivo:** `lib/mock-data.ts:350, 375, 400`

**Erro:** `Property 'shortDescription' does not exist in type 'Curso'. Did you mean 'description'?`

**Solução Necessária:**
- Substituir `shortDescription` por `description`
- Ou adicionar campo `shortDescription?: string` no tipo Curso

**Fix Rápido:**
```typescript
// lib/mock-data.ts
{
  title: 'Curso exemplo',
  description: 'Descrição do curso',  // ✅ Usar description ao invés de shortDescription
  // ...
}
```

---

## ⏳ INTEGRAÇÕES PENDENTES

### 1. Configuração Completa do Brevo
**Status:** 🔴 Aguardando

**Checklist:**
- [ ] Criar conta Brevo (tier gratuito - 300 emails/dia)
- [ ] Obter API Key
- [ ] Configurar variáveis de ambiente:
  ```bash
  BREVO_API_KEY=xkeysib-xxx
  BREVO_LIST_NEWSLETTER=123
  BREVO_LIST_LEADS_CURSOS=124
  BREVO_LIST_LEADS_MENTORIA=125
  BREVO_LIST_CONTATO=126
  ```
- [ ] Criar listas no Brevo:
  - Newsletter (geral)
  - Leads Cursos
  - Leads Mentoria
  - Contato Geral
- [ ] Criar templates de email:
  - Welcome newsletter
  - Confirmação interesse curso
  - Confirmação interesse mentoria
  - Confirmação contato
- [ ] Testar envio de emails
- [ ] Configurar tags e segmentação

**Documentação:**
- [Brevo API Docs](https://developers.brevo.com)
- [Brevo Node SDK](https://github.com/getbrevo/brevo-node)

---

### 2. Google Analytics 4
**Status:** 🟡 Parcialmente Configurado

**Pendente:**
- [ ] Criar propriedade GA4
- [ ] Obter ID de medição (G-XXXXXXXXXX)
- [ ] Atualizar `NEXT_PUBLIC_GA_ID` em `.env.local`
- [ ] Configurar eventos customizados:
  - `newsletter_signup`
  - `course_interest`
  - `mentoring_interest`
  - `contact_form_submit`
- [ ] Testar tracking em desenvolvimento

---

### 3. Sentry (Error Tracking)
**Status:** 🟡 Parcialmente Configurado

**Pendente:**
- [ ] Criar projeto Sentry (tier gratuito)
- [ ] Obter DSN
- [ ] Atualizar `NEXT_PUBLIC_SENTRY_DSN` em `.env.local`
- [ ] Testar captura de erros
- [ ] Configurar source maps para produção

---

## 🎨 DESIGN PENDENTE

### 1. Template Fistudy - Conversão Completa
**Status:** 🔴 Em Andamento

**Seções a Implementar:**
- [ ] Hero Section (REFAZER baseado no template original)
- [ ] Sliding Text (marquee)
- [ ] Category Section (já existe, validar com template)
- [ ] About Section
- [ ] Courses Section (grid 3x3)
- [ ] Why Choose Section (4 cards de diferenciais)
- [ ] Counter Section (estatísticas animadas)
- [ ] Team Section (nutritionistas)
- [ ] Testimonial Section (depoimentos)
- [ ] Blog Section (últimos posts)
- [ ] Newsletter Section (já existe, validar)

**Referência:**
- Template: `NJ_temp/media/Fistudy Template/fistudy-pack/01-html-file/index-one-page.html`
- CSS: `NJ_temp/media/Fistudy Template/fistudy-pack/01-html-file/assets/css/`

---

### 2. Imagens e Assets
**Status:** 🟡 Parcialmente Completo

**Pendente:**
- [x] Hero main image (`hero-main.png`) - ✅ DISPONÍVEL
- [ ] Category icons (8 ícones para áreas de nutrição)
- [ ] Shapes decorativas (círculos, ondas, padrões)
- [ ] Team photos (fotos dos nutricionistas)
- [ ] Course thumbnails (capas dos cursos)
- [ ] Blog post thumbnails
- [ ] Testimonial avatars

---

### 3. Animações e Interações
**Status:** 🟡 Básico Implementado

**Implementado:**
- [x] Float animations (cards flutuantes)
- [x] Marquee animation (texto rolante)
- [x] Hover effects (botões, cards)

**Pendente:**
- [ ] Scroll animations (AOS/Framer Motion)
- [ ] Counter animations (odometer)
- [ ] Parallax effects
- [ ] Loading states
- [ ] Skeleton loaders
- [ ] Toast notifications (sucesso/erro)

---

## 🧪 TESTES PENDENTES

### 1. E2E Tests (Playwright)
**Status:** ✅ Configurado, Pendente Execução

**Suites Criadas:**
- [x] `home.spec.ts` (5 testes)
- [x] `newsletter.spec.ts` (3 testes)
- [x] `curso-interesse.spec.ts` (3 testes)

**Pendente:**
- [ ] Executar testes após Hero refactor
- [ ] Criar testes para:
  - Mentoria interesse
  - Contato form
  - Blog navigation
  - Course details
- [ ] CI/CD integration (GitHub Actions)
- [ ] Visual regression tests

---

### 2. Unit Tests (Vitest)
**Status:** 🔴 Não Iniciado

**Pendente:**
- [ ] Setup Vitest
- [ ] Testes de utils (validations, formatters)
- [ ] Testes de API clients (Payload, Brevo)
- [ ] Coverage mínimo: 80% funções críticas

---

## 📊 PERFORMANCE & SEO

### 1. Otimizações Pendentes
**Status:** 🔴 Não Iniciado

**Pendente:**
- [ ] Image optimization (WebP, AVIF)
- [ ] Font optimization (subset, preload)
- [ ] Code splitting otimizado
- [ ] Bundle analysis
- [ ] Lighthouse CI setup
- [ ] Core Web Vitals monitoring

**Metas:**
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: 100

---

### 2. SEO Completo
**Status:** 🟡 Básico Implementado

**Implementado:**
- [x] Metadata por página
- [x] sitemap.xml dinâmico
- [x] robots.txt

**Pendente:**
- [ ] Open Graph images customizadas
- [ ] Twitter Cards
- [ ] Schema.org markup:
  - Organization
  - Course
  - Article
  - Person (team)
- [ ] Breadcrumbs
- [ ] Canonical URLs validation
- [ ] Google Search Console setup
- [ ] Bing Webmaster Tools

---

## 🚀 DEPLOY & INFRAESTRUTURA

### 1. Ambientes
**Status:** 🔴 Não Configurado

**Pendente:**
- [ ] Vercel (Frontend)
  - [ ] Conectar repositório GitHub
  - [ ] Configurar variáveis de ambiente
  - [ ] Setup preview deployments
  - [ ] Configurar domínio (nutrindojuntos.com.br)

- [ ] VPS Hostinger (Payload CMS)
  - [ ] Provisionar servidor
  - [ ] Setup Docker + Docker Compose
  - [ ] Nginx reverse proxy
  - [ ] SSL/TLS (Let's Encrypt)
  - [ ] Configurar subdomain (cms.nutrindojuntos.com.br)

- [ ] Supabase (Database)
  - [ ] Criar projeto
  - [ ] Configurar PostgreSQL
  - [ ] Setup backups automáticos

---

### 2. CI/CD
**Status:** 🔴 Não Configurado

**Pendente:**
- [ ] GitHub Actions workflows:
  - [ ] Lint + Type Check
  - [ ] Unit Tests
  - [ ] E2E Tests
  - [ ] Lighthouse CI
  - [ ] Auto-deploy to Vercel (main branch)
  - [ ] Auto-deploy CMS to VPS (main branch)

---

## 📝 DOCUMENTAÇÃO

### 1. Guias Técnicos
**Status:** 🟡 Parcialmente Completo

**Criados:**
- [x] CLAUDE.md (guia principal)
- [x] TEMPLATE_FISTUDY_COMPLETO.md
- [x] ANALISE_SITE_FISTUDY_REFERENCIA.md
- [x] MCP_BEST_PRACTICES.md

**Pendente:**
- [ ] ARCHITECTURE.md (decisões arquiteturais)
- [ ] DEPLOYMENT.md (guia de deploy completo)
- [ ] DOCKER.md (guia Docker desenvolvimento + produção)
- [ ] SETUP.md (setup inicial do projeto)
- [ ] CONTENT_GUIDE.md (guia de criação de conteúdo)
- [ ] TROUBLESHOOTING.md (solução de problemas comuns)
- [ ] API.md (documentação das API routes)

---

### 2. Conteúdo Inicial
**Status:** 🔴 Não Iniciado

**Pendente:**
- [ ] 10 posts de blog iniciais (SEO)
- [ ] 5 cursos de exemplo completos
- [ ] 3 perfis de nutricionistas
- [ ] Copy de todas as páginas (final)
- [ ] FAQs
- [ ] Termos de Uso (validação jurídica)
- [ ] Política de Privacidade (validação jurídica LGPD)

---

## 🎯 PRIORIDADES IMEDIATAS

### Próxima Sprint (Semana)
1. ✅ Refazer HeroSection baseado no template original
2. ✅ Ajustar padding/spacing
3. ✅ Usar imagem hero-main.png real
4. ⏳ Criar demais seções da Home
5. ⏳ Corrigir erros de TypeScript
6. ⏳ Setup Brevo + testar emails

---

## 📞 CONTATOS IMPORTANTES

### Brevo Support
- Docs: https://developers.brevo.com
- Support: https://help.brevo.com

### Vercel Support
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord

### Supabase Support
- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com

---

**Status Legend:**
- 🔴 Não Iniciado
- 🟡 Em Andamento / Parcialmente Completo
- ✅ Completo
- ⏳ Bloqueado / Aguardando

**Última Revisão:** 21/11/2025
