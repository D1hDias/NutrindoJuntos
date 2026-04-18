# CLAUDE.md - Plataforma NUTRINDO JUNTOS

**Versão:** 1.1
**Data:** 15/11/2025
**Status:** Em Desenvolvimento - Fase 3.5 (Páginas Principais Concluídas)

---

## 📋 VISÃO GERAL DO PROJETO

### Resumo Executivo
Site institucional + blog + captura de leads para a NUTRINDO JUNTOS, plataforma educacional de nutrição focada em estudantes e nutricionistas em início de carreira.

### Objetivo do MVP
Validar demanda por conteúdo educacional e gerar leads qualificados para futuros cursos e mentorias através de:
- Site profissional que transmita credibilidade
- Blog otimizado para SEO (principal canal de aquisição)
- Sistema robusto de captura e gestão de leads

### Escopo do MVP
**INCLUÍDO:**
- ✅ Páginas institucionais (Home, Sobre, Equipe, Contato)
- ✅ Catálogo de cursos + páginas de detalhes
- ✅ Página de mentoria
- ✅ Blog completo (posts, categorias, busca, SEO)
- ✅ Formulários de captura de leads
- ✅ Integração com CRM (Brevo)
- ✅ Newsletter

**NÃO INCLUÍDO (Fase 2):**
- ❌ Login/Autenticação
- ❌ Área do aluno
- ❌ Pagamento online
- ❌ Vídeos on-demand
- ❌ Streaming ao vivo
- ❌ Comunidade/Fórum

---

## 🎯 OBJETIVOS DE NEGÓCIO

### Metas (6 meses)
| Métrica | Meta Mínima | Meta Aspiracional |
|---------|-------------|-------------------|
| Visitantes/mês | 3.000 | 7.000 |
| Leads qualificados | 300 | 600 |
| Taxa de conversão | 3% | 5% |
| Inscritos newsletter | 500 | 1.000 |
| Keywords top 10 | 10 | 20 |

### Hipóteses a Validar
1. **H1:** Demanda por conteúdo prático e científico em formato blog + cursos
2. **H2:** Leads captados têm ≥15% probabilidade de conversão em 6 meses
3. **H3:** Demanda suficiente por mentoria 1:1
4. **H4:** Blog SEO pode gerar ≥60% do tráfego total
5. **H5:** Usuários que leem 3+ posts têm 2x mais conversão

---

## 🏗️ ARQUITETURA TÉCNICA

### Stack Tecnológico

#### Frontend
```yaml
framework: Next.js 15.0+ (App Router)
language: TypeScript 5.3+
styling: Tailwind CSS 3.4+
ui_library: shadcn/ui (Radix UI + Tailwind)
forms: React Hook Form + Zod
animations: Framer Motion (essenciais apenas)
icons: Lucide React
fonts: Next/Font (Google Fonts otimizado)
state: React Context (mínimo necessário)
```

#### Backend/CMS
```yaml
cms: Payload CMS 2.0+ (self-hosted, TypeScript-native)
database: PostgreSQL 15+ (via Supabase)
storage: Cloudinary (imagens e mídia)
api: REST (Payload built-in)
```

#### Hospedagem & Infraestrutura
```yaml
frontend: Vercel (tier gratuito → Pro)
cms: VPS Hostinger (containerizado com Docker)
database: Supabase (tier gratuito - 500MB)
cdn: Cloudflare (tier gratuito)
domain: Registro.br (já adquirido)
ssl: Automático (Vercel + Let's Encrypt)
```

#### Integrações
```yaml
email_marketing: Brevo (ex-Sendinblue, tier gratuito 300 emails/dia)
analytics: Google Analytics 4
search_console: Google Search Console
monitoring: Sentry (tier gratuito, error tracking)
uptime: UptimeRobot (tier gratuito)
```

#### Desenvolvimento
```yaml
version_control: Git + GitHub
ci_cd: GitHub Actions + Vercel (auto-deploy)
package_manager: pnpm (performance)
linting: ESLint + Prettier
testing: Vitest (unit) + Playwright (E2E)
containerization: Docker + Docker Compose (abordagem híbrida)
```

### Por Que Essas Escolhas?

**Next.js 15:**
- SSR/SSG nativo → SEO excelente
- App Router → performance otimizada
- Image optimization automática
- Ecossistema maduro e ativo

**Payload CMS:**
- TypeScript-native → type-safety total
- Self-hosted → controle total dos dados
- UI admin intuitiva → time de marketing autônomo
- Integração perfeita com Next.js
- Comunidade ativa e crescente

**Supabase (PostgreSQL):**
- Tier gratuito generoso
- Relacional → queries complexas
- Backups automáticos
- Escalável sem refatoração

**Brevo:**
- Tier gratuito robusto (300 emails/dia)
- CRM + Email Marketing integrados
- API simples e bem documentada
- Automações de email nativas

**Vercel:**
- Deploy automático no push
- CDN global edge
- Otimizações automáticas (images, fonts, code splitting)
- Preview deployments

**Docker (Abordagem Híbrida):**
- Payload CMS containerizado → consistência dev/prod
- PostgreSQL containerizado (opcional dev local)
- Next.js nativo em dev → melhor hot-reload
- Deploy facilitado na VPS Hostinger

---

## 📁 ESTRUTURA DE DIRETÓRIOS

```
nutrindo-juntos/
├── apps/
│   ├── web/                          # Next.js Frontend
│   │   ├── app/
│   │   │   ├── (main)/              # Rotas principais
│   │   │   │   ├── page.tsx         # Home
│   │   │   │   ├── sobre/
│   │   │   │   ├── equipe/
│   │   │   │   ├── contato/
│   │   │   │   ├── cursos/
│   │   │   │   │   ├── page.tsx     # Lista
│   │   │   │   │   └── [slug]/page.tsx
│   │   │   │   ├── mentoria/
│   │   │   │   └── blog/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── categoria/[slug]/
│   │   │   │       └── [slug]/page.tsx
│   │   │   ├── api/
│   │   │   │   ├── newsletter/route.ts
│   │   │   │   ├── curso-interesse/route.ts
│   │   │   │   ├── mentoria-interesse/route.ts
│   │   │   │   └── contato/route.ts
│   │   │   ├── layout.tsx
│   │   │   ├── sitemap.ts
│   │   │   ├── robots.ts
│   │   │   └── manifest.ts
│   │   ├── components/
│   │   │   ├── ui/                  # shadcn/ui
│   │   │   ├── layout/              # Header, Footer
│   │   │   ├── forms/               # Formulários
│   │   │   ├── blog/                # Blog components
│   │   │   ├── cursos/              # Curso components
│   │   │   ├── home/                # Home sections
│   │   │   └── shared/              # Reutilizáveis
│   │   ├── lib/
│   │   │   ├── payload-client.ts
│   │   │   ├── brevo-client.ts
│   │   │   ├── analytics.ts
│   │   │   ├── seo.ts
│   │   │   ├── utils.ts
│   │   │   └── validations.ts
│   │   ├── types/
│   │   ├── config/
│   │   ├── styles/
│   │   ├── public/
│   │   └── package.json
│   │
│   └── cms/                          # Payload CMS
│       ├── src/
│       │   ├── collections/
│       │   │   ├── Posts.ts
│       │   │   ├── Cursos.ts
│       │   │   ├── Categorias.ts
│       │   │   ├── Tags.ts
│       │   │   ├── Equipe.ts
│       │   │   └── Media.ts
│       │   ├── globals/
│       │   │   ├── SiteSettings.ts
│       │   │   └── SocialLinks.ts
│       │   ├── payload.config.ts
│       │   └── server.ts
│       └── package.json
│
├── docker/
│   ├── postgres/
│   │   └── init.sql
│   └── nginx/
│       ├── nginx.conf
│       └── ssl/
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── SETUP.md
│   ├── DOCKER.md
│   ├── CONTENT_GUIDE.md
│   └── TROUBLESHOOTING.md
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── lighthouse.yml
│
├── CLAUDE.md                         # Este arquivo
├── PRD Plataforma NUTRINDO JUNTOS.txt
├── README.md
├── .gitignore
├── pnpm-workspace.yaml
├── package.json
├── docker-compose.yml                # Desenvolvimento
└── docker-compose.prod.yml           # Produção VPS
```

---

## 🎨 DESIGN SYSTEM

### Paleta de Cores
```typescript
// tailwind.config.ts
colors: {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Main
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  secondary: {
    50: '#fef3c7',
    500: '#f59e0b',  // Accent
    700: '#d97706',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  }
}
```

### Tipografia
```typescript
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  serif: ['var(--font-lora)', 'Georgia', 'serif'],
}

fontSize: {
  'xs': '0.75rem',      // 12px
  'sm': '0.875rem',     // 14px
  'base': '1rem',       // 16px
  'lg': '1.125rem',     // 18px
  'xl': '1.25rem',      // 20px
  '2xl': '1.5rem',      // 24px
  '3xl': '1.875rem',    // 30px
  '4xl': '2.25rem',     // 36px
  '5xl': '3rem',        // 48px
}
```

### Spacing Scale
```typescript
spacing: {
  '0': '0',
  '1': '0.25rem',    // 4px
  '2': '0.5rem',     // 8px
  '3': '0.75rem',    // 12px
  '4': '1rem',       // 16px
  '6': '1.5rem',     // 24px
  '8': '2rem',       // 32px
  '12': '3rem',      // 48px
  '16': '4rem',      // 64px
  '24': '6rem',      // 96px
}
```

### Breakpoints
```typescript
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
}
```

---

## 🔐 PADRÕES DE CÓDIGO

### Componentes
```typescript
// ✅ BOM: Componente Server Component por padrão
export function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      {/* ... */}
    </Card>
  )
}

// ✅ BOM: Client Component quando necessário
'use client'

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  // ...
}
```

### Data Fetching
```typescript
// ✅ BOM: Server Component com ISR
export default async function BlogPage() {
  const posts = await getPosts({ limit: 12 })
  return <div>{/* ... */}</div>
}

// lib/payload-client.ts
export async function getPosts(params) {
  return fetch(`${API}/posts`, {
    next: { revalidate: 3600 } // ISR: 1 hora
  })
}
```

### Validação de Formulários
```typescript
// ✅ BOM: Schema Zod + React Hook Form
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().email('Email inválido'),
  consent: z.literal(true)
})

export function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })
  // ...
}
```

### API Routes
```typescript
// ✅ BOM: Validação + Error handling
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    // Process...

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Dados inválidos', errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Erro interno' },
      { status: 500 }
    )
  }
}
```

### SEO
```typescript
// ✅ BOM: Metadata por página
export const metadata: Metadata = {
  title: 'Título da Página',
  description: 'Descrição concisa e relevante',
  openGraph: {
    title: 'Título OG',
    description: 'Descrição OG',
    images: ['/og-image.jpg']
  }
}

// ✅ BOM: Metadata dinâmica
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    // ...
  }
}
```

---

## 🧪 TESTES

### Estratégia de Testes
```yaml
unit_tests:
  framework: Vitest
  coverage: ≥80% funções críticas
  focus: Utils, validations, helpers

integration_tests:
  framework: Vitest + MSW (Mock Service Worker)
  focus: API routes, Brevo integration

e2e_tests:
  framework: Playwright
  browsers: Chromium, Firefox, WebKit
  focus: User flows críticos
  scenarios:
    - Newsletter signup
    - Curso interesse submission
    - Blog navigation
    - Form validations

performance_tests:
  tool: Lighthouse CI
  thresholds:
    performance: ≥90
    accessibility: ≥95
    best_practices: ≥90
    seo: 100
```

### Testes Críticos
```typescript
// 1. Newsletter signup flow
test('should submit newsletter form successfully', async ({ page }) => {
  await page.goto('/')
  await page.fill('input[name="name"]', 'João Silva')
  await page.fill('input[name="email"]', 'joao@example.com')
  await page.check('input[name="consent"]')
  await page.click('button[type="submit"]')
  await expect(page.locator('text=Cadastro realizado')).toBeVisible()
})

// 2. Curso interesse submission
// 3. Blog post reading
// 4. Navigation flows
// 5. Form validations
```

---

## 📊 MÉTRICAS & MONITORAMENTO

### Google Analytics 4 - Eventos
```typescript
// Conversões
- newsletter_signup
- course_interest
- mentoring_interest
- contact_form_submit

// Engajamento
- scroll_depth (25%, 50%, 75%, 100%)
- reading_time
- social_share
- cta_click

// Navegação
- search (quando implementado)
- filter_applied
- related_post_click
```

### Core Web Vitals
```yaml
LCP (Largest Contentful Paint):
  target: <2.5s
  good: 0-2.5s
  needs_improvement: 2.5-4.0s
  poor: >4.0s

FID (First Input Delay):
  target: <100ms
  good: 0-100ms
  needs_improvement: 100-300ms
  poor: >300ms

CLS (Cumulative Layout Shift):
  target: <0.1
  good: 0-0.1
  needs_improvement: 0.1-0.25
  poor: >0.25
```

### Sentry - Error Tracking
```typescript
// Configuração
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Sanitize sensitive data
    return event
  }
})
```

---

## 🔄 INTEGRAÇÃO BREVO

### Listas
```yaml
1_newsletter:
  id: BREVO_LIST_NEWSLETTER
  purpose: Inscritos na newsletter

2_leads_cursos:
  id: BREVO_LIST_LEADS_CURSOS
  purpose: Interessados em cursos

3_leads_mentoria:
  id: BREVO_LIST_LEADS_MENTORIA
  purpose: Interessados em mentoria

4_contato:
  id: BREVO_LIST_CONTATO
  purpose: Formulário de contato geral
```

### Tags
```yaml
# Por curso
tags_curso:
  - curso:nutricao-clinica
  - curso:nutricao-esportiva
  - curso:nutricao-funcional

# Por estágio
tags_estagio:
  - estagio:estudante
  - estagio:recem-formado
  - estagio:profissional

# Por interesse
tags_interesse:
  - interesse:nutricao-esportiva
  - interesse:nutricao-clinica
  - interesse:gestao-consultorio
```

### Templates de Email
```yaml
1_newsletter_welcome:
  template_id: 1
  trigger: Newsletter signup
  content: Boas-vindas + o que esperar

2_curso_confirmacao:
  template_id: 2
  trigger: Curso interesse submission
  content: Confirmação + próximos passos

3_mentoria_confirmacao:
  template_id: 3
  trigger: Mentoria interesse submission
  content: Confirmação + processo de matching

4_contato_confirmacao:
  template_id: 4
  trigger: Contato form submission
  content: Confirmação + tempo de resposta
```

---

## 🚀 DEPLOYMENT

### Ambientes
```yaml
development:
  url: http://localhost:3000
  cms: http://localhost:3001 (Docker)
  database: PostgreSQL local (Docker) ou Supabase

staging:
  url: https://staging.nutrindojuntos.com.br
  cms: https://cms-staging.nutrindojuntos.com.br (VPS Docker)
  database: Supabase staging

production:
  url: https://nutrindojuntos.com.br
  cms: https://cms.nutrindojuntos.com.br (VPS Docker)
  database: Supabase production
```

### Variáveis de Ambiente

**Frontend (.env.local)**
```bash
# Next.js
NEXT_PUBLIC_SITE_URL=https://nutrindojuntos.com.br

# Payload CMS
NEXT_PUBLIC_PAYLOAD_API_URL=https://cms.nutrindojuntos.com.br/api

# Brevo
BREVO_API_KEY=xkeysib-xxx
BREVO_LIST_NEWSLETTER=123
BREVO_LIST_LEADS_CURSOS=124
BREVO_LIST_LEADS_MENTORIA=125
BREVO_LIST_CONTATO=126

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

**CMS (.env)**
```bash
# Database
DATABASE_URI=postgresql://user:pass@host:5432/db

# Payload
PAYLOAD_SECRET=your-secret-key-here

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Server
PORT=3001
PAYLOAD_PUBLIC_SERVER_URL=https://cms.nutrindojuntos.com.br
```

### Pipeline CI/CD
```yaml
# .github/workflows/ci.yml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup pnpm
      - Install dependencies
      - Run linting
      - Run type checking
      - Run unit tests
      - Run E2E tests

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - Deploy to preview
      - Run Lighthouse CI
      - Comment PR with results

  deploy:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - Deploy to Vercel (production)
      - Deploy CMS to VPS Hostinger (via SSH + Docker)
```

---

## 🔧 COMANDOS SUPERC LAUDE

### Setup & Planejamento
```bash
/load                          # Carregar contexto do projeto
/analyze --comprehensive       # Análise completa do código
/design                        # Planejamento de design
/document --setup-guide        # Documentar setup
```

### Desenvolvimento
```bash
/implement --type component    # Implementar componente
/implement --type api          # Implementar API route
/build --setup                 # Setup inicial
/build --components            # Build sistema de componentes
/ui                            # Geração de UI com Magic
```

### Qualidade & Otimização
```bash
/improve --focus performance   # Otimizar performance
/improve --focus seo           # Otimizar SEO
/improve --focus accessibility # Melhorar acessibilidade
/cleanup                       # Limpeza de código
/test --e2e                    # Testes end-to-end
/test --integration            # Testes de integração
```

### Git & Deploy
```bash
/git commit                    # Commit com mensagem gerada
/git                           # Operações git gerais
/build --production            # Build de produção
```

### Flags Úteis
```bash
--magic                        # Ativar Magic MCP (UI components)
--c7                           # Ativar Context7 (docs de libs)
--seq                          # Ativar Sequential (análise complexa)
--play                         # Ativar Playwright (testes E2E)
--validate                     # Ativar validação rigorosa
--safe-mode                    # Modo seguro (produção)
```

### Personas Recomendadas por Fase
```bash
# Fase 0-2: Design & Setup
--persona-frontend             # UI/UX specialist
--persona-architect            # Architecture decisions

# Fase 3-4: Implementação
--persona-frontend             # Páginas e componentes
--persona-backend              # API routes e integrações

# Fase 5: Formulários
--persona-backend              # Integrações Brevo
--persona-security             # Validação e segurança

# Fase 6: Otimização
--persona-performance          # Performance tuning
--persona-frontend             # SEO e acessibilidade

# Fase 7: Testes & Deploy
--persona-qa                   # Quality assurance
--persona-devops               # Deployment
```

---

## 📅 CRONOGRAMA DETALHADO

### Fase 0: Planejamento & Design (Semanas 1-3)
- **Semana 1:** Research, wireframes, definição de componentes
- **Semana 2:** Design high-fidelity, mockups 3 breakpoints
- **Semana 3:** Design tokens, setup repositório, handoff

**Entregáveis:**
- ✅ Figma com design system completo
- ✅ Wireframes de todas as páginas
- ✅ Mockups mobile/tablet/desktop
- ✅ Design tokens (tailwind.config.ts)
- ✅ Assets exportados

---

### Fase 1: Setup & Infraestrutura (Semana 4)
**Entregáveis:**
- ✅ Next.js 15 + TypeScript rodando
- ✅ Payload CMS configurado
- ✅ PostgreSQL (Supabase) conectado
- ✅ Todos os serviços integrados
- ✅ Repositório GitHub com CI/CD

**Comandos:**
```bash
/load
/build --setup
/document --setup-guide
```

---

### Fase 2: Core (Semanas 5-6)
**Entregáveis:**
- ✅ Header + Footer responsivos
- ✅ shadcn/ui components
- ✅ Payload API client
- ✅ Types e validações

**Comandos:**
```bash
/implement --type component --persona-frontend
/ui --magic
```

---

### Fase 3: Páginas Principais (Semanas 7-8)
**Entregáveis:**
- ✅ Home, Sobre, Equipe, Contato
- ✅ Cursos (lista + individual)
- ✅ Mentoria

**Comandos:**
```bash
/implement --persona-frontend --magic
/test --e2e
```

---

### Fase 4: Blog (Semana 9)
**Entregáveis:**
- ✅ Listagem + filtros + paginação
- ✅ Post individual com SEO completo
- ✅ Social sharing

**Comandos:**
```bash
/implement --type blog --c7
/improve --focus seo
```

---

### Fase 5: Formulários (Semana 10)
**Entregáveis:**
- ✅ Todos os formulários funcionais
- ✅ Integração Brevo completa
- ✅ Emails automáticos

**Comandos:**
```bash
/implement --type api --persona-backend
/test --integration
/analyze --focus security
```

---

### Fase 6: Otimização (Semana 11)
**Entregáveis:**
- ✅ Lighthouse scores ótimos
- ✅ SEO completo
- ✅ Performance otimizada

**Comandos:**
```bash
/improve --focus performance
/improve --focus seo
/analyze --comprehensive
```

---

### Fase 7: Testes & Deploy (Semana 12)
**Entregáveis:**
- ✅ Todos os testes passando
- ✅ Site em produção
- ✅ Conteúdo inicial publicado

**Comandos:**
```bash
/test --e2e --play
/build --production
/git commit
```

---

## 🎯 CRITÉRIOS DE QUALIDADE

### Performance
- ✅ Lighthouse Performance > 90
- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1
- ✅ TTI < 3.5s

### SEO
- ✅ Lighthouse SEO = 100
- ✅ All meta tags present
- ✅ Sitemap.xml dinâmico
- ✅ Robots.txt configurado
- ✅ Schema markup (Organization, Article)
- ✅ Open Graph tags completos
- ✅ Canonical URLs

### Acessibilidade
- ✅ Lighthouse Accessibility > 95
- ✅ WCAG 2.1 AA compliance
- ✅ Navegação por teclado completa
- ✅ Screen reader friendly
- ✅ Contraste adequado (AAA preferencial)
- ✅ Touch targets ≥44px
- ✅ Forms com labels e aria-*

### Segurança
- ✅ HTTPS obrigatório
- ✅ Security headers (CSP, HSTS, X-Frame-Options)
- ✅ Rate limiting em formulários
- ✅ Validação server-side
- ✅ Sanitização de inputs
- ✅ LGPD compliance

---

## 🐛 TROUBLESHOOTING

### Problemas Comuns

**1. Payload CMS não conecta ao PostgreSQL**
```bash
# Verificar connection string
echo $DATABASE_URI

# Testar conexão
psql $DATABASE_URI

# Verificar Payload config
# payload.config.ts deve ter database adapter correto
```

**2. Images não carregam do Cloudinary**
```bash
# Verificar env vars
echo $CLOUDINARY_CLOUD_NAME

# Verificar next.config.js
# domains deve incluir 'res.cloudinary.com'
```

**3. Formulários não enviam para Brevo**
```bash
# Verificar API key
curl -X GET "https://api.brevo.com/v3/account" \
  -H "api-key: $BREVO_API_KEY"

# Verificar logs da API route
# app/api/newsletter/route.ts
```

**4. Build falha no Vercel**
```bash
# Verificar env vars em Vercel dashboard
# Verificar erros de TypeScript
pnpm type-check

# Verificar erros de build localmente
pnpm build
```

---

## 📚 RECURSOS & REFERÊNCIAS

### Documentação Oficial
- [Next.js Docs](https://nextjs.org/docs)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Brevo API Docs](https://developers.brevo.com)

### Guias Internos
- `docs/ARCHITECTURE.md` - Decisões arquiteturais (ADRs)
- `docs/DEPLOYMENT.md` - Guia de deploy (VPS Hostinger)
- `docs/DOCKER.md` - Guia completo Docker (desenvolvimento e produção)
- `docs/SETUP.md` - Instruções de setup inicial
- `docs/CONTENT_GUIDE.md` - Criação de conteúdo
- `docs/TROUBLESHOOTING.md` - Solução de problemas
- `docs/MCP_BEST_PRACTICES.md` - ⭐ **Uso inteligente de MCPs (IMPORTANTE)**

### Design
- Figma: [Link para projeto]
- Design System: Ver seção "Design System" acima

---

## 👥 EQUIPE & RESPONSABILIDADES

### Roles
- **Product Owner:** Decisões de produto, prioridades, aprovações
- **Tech Lead:** Arquitetura, code reviews, decisões técnicas
- **Frontend Developer:** Implementação UI/UX, componentes, páginas
- **Backend Developer:** API routes, integrações, CMS setup
- **Designer:** UI/UX, design system, assets
- **Content Creator:** Posts de blog, descrições de cursos, copywriting

### Comunicação
- **Daily Standup:** 15min/dia (progresso, blockers)
- **Planning:** Início de cada fase
- **Review:** Final de cada fase
- **Retrospectiva:** Final de cada fase

---

## 🔄 PRÓXIMAS FASES (Pós-MVP)

### Fase 2: Plataforma de Cursos (6-12 meses)
- Login/Autenticação (NextAuth.js)
- Área do aluno
- Player de vídeo (Mux ou similar)
- Progresso de curso
- Certificados digitais
- Pagamento online (Stripe/Hotmart)

### Fase 3: Comunidade (12-18 meses)
- Fórum/Comunidade
- Grupos de estudo
- Eventos ao vivo
- Gamificação

### Fase 4: Mobile (18+ meses)
- App React Native
- Notificações push
- Offline mode

---

## 🤖 USO INTELIGENTE DE MCPs (Model Context Protocol)

### ⚠️ IMPORTANTE: Otimização de Tokens e Informações Atualizadas

Este projeto utiliza MCPs para **otimizar o uso de tokens** e garantir **informações sempre atualizadas**.

**📖 Documentação Completa:** `docs/MCP_BEST_PRACTICES.md`

### Quick Reference

#### 🔹 **MCP Gemini** - Para Documentação Grande
**Quando usar:**
- Documentação > 5.000 tokens
- Análise de múltiplos arquivos
- Logs extensos ou traces
- Comparação de documentos

**Benefícios:**
- ⚡ Economia de até 66% de tokens
- 🎯 Respostas focadas e diretas
- 💰 Custo-benefício para processamento bulk

**Exemplo:**
```typescript
mcp__gemini-cli__ask-gemini({
  prompt: "Analise a documentação do Next.js 15 sobre App Router e explique as principais mudanças em async params",
  model: "gemini-2.5-pro"
})
```

#### 🔹 **MCP Context7** - Para SDKs e Bibliotecas Atualizadas
**Quando usar:**
- Implementando features com bibliotecas externas
- Verificando breaking changes
- Precisando de código de exemplo oficial
- Consultando APIs atualizadas

**Benefícios:**
- 📖 Documentação oficial sempre atualizada
- ✅ Código de exemplo confiável
- 🔍 Busca inteligente por tópico

**Bibliotecas Críticas do Projeto:**
- `/vercel/next.js` - Next.js 15
- `/getbrevo/brevo` - Brevo SDK
- `/payloadcms/payload` - Payload CMS
- `/shadcn/ui` - shadcn/ui components
- `/colinhacks/zod` - Zod validation

**Exemplo:**
```typescript
// 1. Resolver library ID
const id = await mcp__context7__resolve-library-id({
  libraryName: "next.js"
})

// 2. Obter documentação
const docs = await mcp__context7__get-library-docs({
  context7CompatibleLibraryID: id,
  topic: "app router metadata",
  tokens: 5000
})
```

### Workflow Recomendado

```
Nova Feature/Bug
      ↓
Precisa docs externa?
      ↓
┌─────┴─────┐
│           │
SIM        NÃO → Use Read tool
│
↓
Docs > 5K tokens?
│
┌────┴────┐
│         │
SIM      NÃO
│         │
↓         ↓
Gemini   Context7
│         │
└────┬────┘
     ↓
Implementar
```

### Regras de Ouro

✅ **SEMPRE:**
1. Use Context7 PRIMEIRO para docs oficiais
2. Use Gemini quando docs são muito grandes (>5K tokens)
3. Combine ambos para features complexas
4. Salve insights em documentação do projeto

❌ **NUNCA:**
1. Não use Gemini para código interno do projeto
2. Não ignore versões - sempre especifique versão da biblioteca
3. Não reprocesse a mesma documentação várias vezes
4. Não use MCPs quando Read tool é suficiente

### Economia de Tokens

| Operação | Sem MCP | Com MCP | Economia |
|----------|---------|---------|----------|
| Docs Next.js | ~15K | ~5K | **66%** |
| Pesquisa biblioteca | ~30min | ~5min | **83%** |
| Bugs por docs desatualizadas | 5/sprint | 1/sprint | **80%** |

---

## 📝 CHANGELOG

### v1.0 - 2025-11-14
- ✅ Documento inicial criado
- ✅ Arquitetura técnica definida
- ✅ Stack tecnológico aprovado
- ✅ Cronograma de 12 semanas estabelecido
- ✅ Padrões de código documentados

### v1.1 - 2025-11-15
- ✅ Fase 2.5 concluída (Core Components)
- ✅ Fase 3.5 concluída (Páginas Principais)
- ✅ Home page completa com 7 seções
- ✅ Páginas /equipe, /privacidade, /termos criadas
- ✅ 17 componentes shadcn/ui instalados
- ✅ Sistema de Toast implementado
- ✅ Validações Zod centralizadas
- ✅ Error boundaries globais
- ✅ Loading states padronizados
- ✅ **Documentação de uso inteligente de MCPs adicionada**

---

**Última Atualização:** 15/11/2025
**Próxima Revisão:** Após Fase 4.5 (Blog Completo)
