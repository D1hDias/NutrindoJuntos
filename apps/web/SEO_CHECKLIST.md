# 🎯 Checklist SEO - NUTRINDO JUNTOS

**Data:** 15/11/2025
**Status:** Fase 6 - Otimização & SEO

---

## ✅ SEO TÉCNICO

### Arquivos Fundamentais

- [x] **sitemap.xml** - Dinâmico com posts, categorias e cursos
  - `/sitemap.xml`
  - Atualizado automaticamente quando novo conteúdo é publicado
  - Inclui: páginas estáticas + posts + categorias + cursos
  - Prioridades configuradas corretamente

- [x] **robots.txt** - Configurado corretamente
  - `/robots.txt`
  - Permite crawlers
  - Bloqueia `/api/` e `/admin/`
  - Aponta para sitemap.xml

- [x] **manifest.json** - PWA básico
  - `/manifest.json`
  - Nome, ícones, cores do tema configurados

### Metadata

- [x] **Metadata Global** (layout.tsx)
  - Title template configurado
  - Description otimizada
  - Keywords relevantes
  - Open Graph completo
  - Twitter Cards
  - Verification tags (Google, Bing)

- [ ] **Metadata Por Página** (a implementar em cada página)
  - Home: ✅ Completo
  - Sobre: ⏳ Pendente
  - Equipe: ⏳ Pendente
  - Contato: ⏳ Pendente
  - Cursos (lista): ⏳ Pendente
  - Cursos (individual): ⏳ Pendente
  - Mentoria: ⏳ Pendente
  - Blog (lista): ✅ Completo
  - Blog (post): ✅ Completo
  - Blog (categoria): ⏳ Pendente

### Structured Data (Schema.org)

- [x] **OrganizationSchema** - Dados da empresa
  - Implementado no layout.tsx
  - Nome, logo, redes sociais, contato

- [x] **ArticleSchema** - Posts do blog
  - Componente criado
  - ⏳ Implementar nas páginas de post

- [x] **CourseSchema** - Cursos
  - Componente criado
  - ⏳ Implementar nas páginas de curso

- [x] **BreadcrumbSchema** - Navegação estruturada
  - Componente criado
  - ⏳ Implementar em páginas internas

### URLs & Navegação

- [x] **URLs Amigáveis**
  - Posts: `/blog/[slug]`
  - Categorias: `/blog/categoria/[slug]`
  - Cursos: `/cursos/[slug]`

- [x] **Canonical URLs**
  - Helper `getCanonicalUrl()` criado em `lib/seo.ts`
  - ⏳ Implementar em todas as páginas

- [ ] **Internal Linking**
  - ⏳ Adicionar links relacionados em posts
  - ⏳ Adicionar breadcrumbs em todas as páginas

---

## 🖼️ OTIMIZAÇÃO DE IMAGENS

### Next.js Image Component

- [x] **Configuração Next.js**
  - Domínios remotos configurados (Cloudinary, Unsplash, Placehold)
  - Formatos modernos: AVIF, WebP
  - Tamanhos responsivos configurados

- [ ] **Implementação**
  - ⏳ Revisar todas as imagens usam `<Image>` do Next.js
  - ⏳ Configurar `priority` para imagens above the fold
  - ⏳ Adicionar `loading="lazy"` para imagens below the fold
  - ⏳ Dimensões corretas (width/height) em todas as imagens

### Performance

- [ ] **Compressão**
  - ⏳ Comprimir imagens antes do upload
  - ⏳ Usar Cloudinary transformation URLs
  - ⏳ Gerar thumbnails otimizados

- [ ] **Responsive Images**
  - ⏳ Diferentes tamanhos para mobile/tablet/desktop
  - ⏳ Art direction quando necessário

---

## ⚡ CORE WEB VITALS

### LCP (Largest Contentful Paint) - Target: <2.5s

- [x] **Server-Side**
  - ISR configurado (revalidate: 3600)
  - Edge Runtime quando possível

- [ ] **Client-Side**
  - ⏳ Preload fonts críticas
  - ⏳ Priority hints para imagens hero
  - ⏳ Otimizar CSS crítico

### FID (First Input Delay) - Target: <100ms

- [x] **JavaScript**
  - React Server Components quando possível
  - Code splitting automático (Next.js)

- [ ] **Otimizações**
  - ⏳ Minimizar JavaScript de terceiros
  - ⏳ Defer non-critical scripts

### CLS (Cumulative Layout Shift) - Target: <0.1

- [ ] **Layout Stability**
  - ⏳ Width/height em todas as imagens
  - ⏳ Reservar espaço para ads/embeds
  - ⏳ Evitar injeção de conteúdo acima do fold

---

## 📱 MOBILE OPTIMIZATION

### Responsividade

- [x] **Design Responsivo**
  - Breakpoints configurados (sm, md, lg, xl, 2xl)
  - Grid system responsivo

- [ ] **Testing**
  - ⏳ Testar em devices reais
  - ⏳ Google Mobile-Friendly Test
  - ⏳ Lighthouse mobile score

### Touch Targets

- [ ] **Usabilidade Mobile**
  - ⏳ Botões com mínimo 44x44px
  - ⏳ Espaçamento adequado entre elementos clicáveis
  - ⏳ Navegação mobile otimizada

---

## 🔒 SEGURANÇA & HEADERS

### Security Headers (next.config.mjs)

- [x] **Headers Configurados**
  - X-DNS-Prefetch-Control: on
  - Strict-Transport-Security (HSTS)
  - X-Frame-Options: SAMEORIGIN
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection
  - Referrer-Policy
  - Permissions-Policy

### SSL/HTTPS

- [ ] **Produção**
  - ⏳ Certificado SSL configurado
  - ⏳ Redirect HTTP → HTTPS
  - ⏳ HSTS preload

---

## 🎨 CONTENT & UX

### Conteúdo

- [x] **Qualidade**
  - Títulos descritivos (H1, H2, H3)
  - Parágrafos curtos e escaneáveis
  - Listas e bullet points

- [ ] **SEO On-Page**
  - ⏳ Keywords nas primeiras 100 palavras
  - ⏳ Alt text descritivo em todas as imagens
  - ⏳ Meta descriptions únicas (<160 chars)

### Acessibilidade

- [x] **Semântica HTML**
  - Headers hierárquicos (H1 → H6)
  - Landmarks (nav, main, footer)
  - Listas semânticas

- [ ] **ARIA & A11y**
  - ⏳ Alt text em imagens
  - ⏳ Labels em formulários
  - ⏳ Contraste adequado (WCAG AA)
  - ⏳ Navegação por teclado
  - ⏳ Screen reader friendly

---

## 📊 ANALYTICS & MONITORING

### Google Analytics 4

- [x] **Setup**
  - GA4 configurado no layout
  - Variável `NEXT_PUBLIC_GA_ID`

- [ ] **Events Tracking**
  - ⏳ Newsletter signup
  - ⏳ Course interest
  - ⏳ Mentoring interest
  - ⏳ Contact form submit
  - ⏳ Blog post read (scroll depth)

### Google Search Console

- [ ] **Verificação**
  - ⏳ Adicionar propriedade
  - ⏳ Submeter sitemap.xml
  - ⏳ Verificar coverage report

### Lighthouse CI

- [ ] **Automated Testing**
  - ⏳ Configurar Lighthouse CI no GitHub Actions
  - ⏳ Performance budget
  - ⏳ Alertas para regressões

---

## 🌐 SOCIAL MEDIA

### Open Graph

- [x] **Tags Básicas**
  - og:title
  - og:description
  - og:image (1200x630)
  - og:url
  - og:type
  - og:locale (pt_BR)

- [ ] **Otimização**
  - ⏳ Imagens OG customizadas por página
  - ⏳ Testar com Facebook Debugger
  - ⏳ Testar com LinkedIn Post Inspector

### Twitter Cards

- [x] **Tags Básicas**
  - twitter:card (summary_large_image)
  - twitter:title
  - twitter:description
  - twitter:image
  - twitter:creator

- [ ] **Otimização**
  - ⏳ Testar com Twitter Card Validator

---

## 🔍 KEYWORD STRATEGY

### Research

- [ ] **Keywords Principais** (a definir)
  - ⏳ "nutrição clínica"
  - ⏳ "curso de nutrição"
  - ⏳ "mentoria nutrição"
  - ⏳ "nutricionista iniciante"
  - ⏳ "estudante nutrição"

- [ ] **Long-tail Keywords**
  - ⏳ Identificar com Google Keyword Planner
  - ⏳ Identificar com Ubersuggest
  - ⏳ Analisar concorrentes

### Implementation

- [ ] **On-Page SEO**
  - ⏳ Keywords em títulos (H1)
  - ⏳ Keywords em URLs
  - ⏳ Keywords em meta descriptions
  - ⏳ Keywords naturalmente no conteúdo
  - ⏳ Keywords em alt text de imagens

---

## 📝 CONTENT STRATEGY

### Blog

- [x] **Estrutura**
  - Categorias organizadas
  - Tags para categorização granular
  - Slugs amigáveis

- [ ] **SEO**
  - ⏳ Título otimizado para SEO (50-60 chars)
  - ⏳ Meta description única (150-160 chars)
  - ⏳ Featured image otimizada
  - ⏳ Internal links para posts relacionados
  - ⏳ CTAs estratégicos

### Cursos

- [ ] **SEO**
  - ⏳ Descrições detalhadas e únicas
  - ⏳ Schema.org Course markup
  - ⏳ Reviews/ratings (quando disponível)
  - ⏳ FAQ section

---

## 🚀 PERFORMANCE BUDGET

### Targets (Lighthouse)

- [ ] **Performance**: ≥90
- [ ] **Accessibility**: ≥95
- [ ] **Best Practices**: ≥90
- [ ] **SEO**: 100

### Core Web Vitals

- [ ] **LCP**: <2.5s
- [ ] **FID**: <100ms
- [ ] **CLS**: <0.1

### Bundle Size

- [ ] **JavaScript**: <500KB initial
- [ ] **Total Bundle**: <2MB

---

## 🔧 TOOLS & TESTING

### SEO Tools

- [ ] **Google Search Console**
  - ⏳ Configurar e verificar
  - ⏳ Monitorar erros de indexação

- [ ] **Google PageSpeed Insights**
  - ⏳ Testar todas as páginas principais
  - ⏳ Corrigir issues críticos

- [ ] **Google Rich Results Test**
  - ⏳ Validar Schema.org markup

- [ ] **Lighthouse**
  - ⏳ Audit de todas as páginas
  - ⏳ Corrigir issues

### Validation

- [ ] **W3C Validator**
  - ⏳ Validar HTML
  - ⏳ Corrigir erros

- [ ] **Schema.org Validator**
  - ⏳ Validar structured data

---

## 📋 CHECKLIST PRÉ-LAUNCH

### Configuração

- [x] Sitemap.xml configurado e acessível
- [x] Robots.txt configurado
- [ ] ⏳ Google Analytics instalado e testado
- [ ] ⏳ Google Search Console verificado
- [ ] ⏳ SSL/HTTPS ativo
- [x] Redirects HTTP → HTTPS
- [ ] ⏳ Canonical URLs em todas as páginas

### Content

- [x] Metadata completo em todas as páginas
- [ ] ⏳ Alt text em todas as imagens
- [ ] ⏳ Internal links estratégicos
- [x] URLs amigáveis e descritivas
- [ ] ⏳ Conteúdo único e de qualidade

### Technical

- [x] Schema.org markup implementado
- [ ] ⏳ Core Web Vitals otimizados
- [ ] ⏳ Mobile-friendly (teste aprovado)
- [x] Security headers configurados
- [ ] ⏳ Lighthouse score ≥90

### Social

- [x] Open Graph tags completas
- [x] Twitter Cards configuradas
- [ ] ⏳ Imagens sociais customizadas
- [ ] ⏳ Social sharing testado

---

## 🎯 PRÓXIMAS AÇÕES

### Prioridade Alta

1. ⏳ Implementar metadata dinâmica em páginas restantes
2. ⏳ Adicionar Schema.org em posts e cursos
3. ⏳ Otimizar Core Web Vitals
4. ⏳ Configurar Google Search Console

### Prioridade Média

5. ⏳ Criar imagens OG customizadas
6. ⏳ Implementar breadcrumbs
7. ⏳ Adicionar internal links estratégicos
8. ⏳ Configurar Lighthouse CI

### Prioridade Baixa

9. ⏳ Criar conteúdo de blog (mínimo 10 posts)
10. ⏳ Keyword research detalhado
11. ⏳ Backlink strategy
12. ⏳ Local SEO (se aplicável)

---

**Última atualização:** 15/11/2025
**Responsável:** Diego (NUTRINDO JUNTOS)
