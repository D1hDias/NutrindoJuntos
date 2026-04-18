# 🥗 NUTRINDO JUNTOS - Plataforma Educacional de Nutrição

> Educação continuada em nutrição para estudantes e profissionais em início de carreira

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-2.0-orange)](https://payloadcms.com/)
[![License](https://img.shields.io/badge/license-Private-red.svg)](LICENSE)

---

## 📋 Sobre o Projeto

A **NUTRINDO JUNTOS** é uma plataforma educacional focada em fornecer conteúdo científico aplicado, cursos práticos e mentoria personalizada para nutricionistas em início de carreira.

### MVP - Fase 1 (Este Projeto)

Este repositório contém o **MVP (Minimum Viable Product)** da plataforma:

- ✅ Site institucional profissional
- ✅ Blog otimizado para SEO
- ✅ Sistema de captura e gestão de leads
- ✅ Catálogo de cursos com páginas de detalhes
- ✅ Página de mentoria
- ✅ Integração completa com CRM (Brevo)

**NÃO incluído neste MVP:**
- ❌ Área do aluno (Fase 2)
- ❌ Pagamentos online (Fase 2)
- ❌ Streaming de vídeos (Fase 2)
- ❌ Comunidade/Fórum (Fase 3)

---

## 🎯 Objetivos de Negócio (6 meses)

| Métrica | Meta Mínima | Meta Aspiracional |
|---------|-------------|-------------------|
| **Visitantes/mês** | 3.000 | 7.000 |
| **Leads qualificados** | 300 | 600 |
| **Taxa de conversão** | 3% | 5% |
| **Inscritos newsletter** | 500 | 1.000 |
| **Keywords top 10** | 10 | 20 |

---

## 🏗️ Stack Tecnológico

### Frontend
- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Forms:** React Hook Form + Zod
- **Hosting:** Vercel

### Backend/CMS
- **CMS:** Payload CMS 2.0 (self-hosted)
- **Database:** PostgreSQL (Supabase)
- **Storage:** Cloudinary
- **Hosting:** VPS Hostinger

### Integrações
- **Email Marketing:** Brevo (CRM + Email)
- **Analytics:** Google Analytics 4
- **Monitoring:** Sentry + UptimeRobot

---

## 📁 Estrutura do Projeto

```
nutrindo-juntos/
├── apps/
│   ├── web/              # Next.js Frontend
│   └── cms/              # Payload CMS
├── docs/                 # Documentação técnica
├── .github/              # CI/CD workflows
├── CLAUDE.md             # Guia SuperClaude
├── PRD Plataforma NUTRINDO JUNTOS.txt
└── README.md             # Este arquivo
```

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+ instalado
- pnpm instalado (`npm install -g pnpm`)
- Contas criadas em: Vercel, Supabase, Brevo, Cloudinary

### Instalação

```bash
# 1. Clone o repositório
git clone [URL_DO_REPO]
cd nutrindo-juntos

# 2. Instale as dependências
pnpm install

# 3. Configure as variáveis de ambiente
cp apps/web/.env.local.example apps/web/.env.local
cp apps/cms/.env.example apps/cms/.env

# 4. Edite os arquivos .env com suas credenciais

# 5. Inicie o ambiente de desenvolvimento
pnpm dev
```

Acesse:
- **Frontend:** http://localhost:3000
- **CMS Admin:** http://localhost:3001/admin

### Guia Completo de Setup

Para instruções detalhadas, consulte:
- 📖 **[docs/SETUP.md](docs/SETUP.md)** - Guia passo a passo completo
- 🏗️ **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Decisões arquiteturais
- 🚀 **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deploy em produção

---

## 📚 Documentação

### Para Desenvolvedores
- **[CLAUDE.md](CLAUDE.md)** - Guia completo do projeto (SuperClaude)
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Arquitetura técnica
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deploy e CI/CD
- **[docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Solução de problemas

### Para Equipe de Marketing/Conteúdo
- **[docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)** - Guia de criação de conteúdo
- **CMS Admin:** Acesse `/admin` para gerenciar posts, cursos, equipe

### PRD (Product Requirements Document)
- **[PRD Plataforma NUTRINDO JUNTOS.txt](PRD%20Plataforma%20NUTRINDO%20JUNTOS.txt)**

---

## 🧪 Testes

```bash
# Testes unitários
pnpm test

# Testes E2E
pnpm test:e2e

# Verificação de tipos
pnpm type-check

# Linting
pnpm lint
```

---

## 📊 Métricas de Qualidade

### Targets (Lighthouse)
- ✅ **Performance:** > 90
- ✅ **SEO:** 100
- ✅ **Accessibility:** > 95
- ✅ **Best Practices:** > 90

### Core Web Vitals
- ✅ **LCP:** < 2.5s
- ✅ **FID:** < 100ms
- ✅ **CLS:** < 0.1

---

## 🗓️ Cronograma de Desenvolvimento

| Fase | Duração | Status | Descrição |
|------|---------|--------|-----------|
| **Fase 0** | 3 semanas | 🟡 Em Andamento | Planejamento & Design |
| **Fase 1** | 1 semana | ⚪ Pendente | Setup & Infraestrutura |
| **Fase 2** | 2 semanas | ⚪ Pendente | Core (Layout & Componentes) |
| **Fase 3** | 2 semanas | ⚪ Pendente | Páginas Principais |
| **Fase 4** | 1 semana | ⚪ Pendente | Blog & Conteúdo |
| **Fase 5** | 1 semana | ⚪ Pendente | Formulários & Leads |
| **Fase 6** | 1 semana | ⚪ Pendente | SEO & Otimização |
| **Fase 7** | 1 semana | ⚪ Pendente | Testes & Deploy |

**Total:** 12 semanas (3 meses)

---

## 👥 Equipe

- **Product Owner:** [Nome]
- **Tech Lead:** [Nome]
- **Developer:** Diego (você)
- **Designer:** [Nome]
- **Content Creator:** [Nome]

---

## 🔒 Segurança & Compliance

- ✅ HTTPS obrigatório em produção
- ✅ Security headers configurados
- ✅ LGPD compliance (consent forms)
- ✅ Rate limiting em formulários
- ✅ Validação server-side (Zod)

---

## 🚀 Deploy

### Ambientes

- **Desenvolvimento:** http://localhost:3000
- **Staging:** https://staging.nutrindojuntos.com.br
- **Produção:** https://nutrindojuntos.com.br

### CI/CD

Deploy automático via GitHub Actions:
- Push para `develop` → Deploy staging (Vercel preview)
- Push para `main` → Deploy produção (Vercel production)

---

## 📝 Changelog

### v0.1.0 - Em Desenvolvimento (Nov 2025)
- ✅ Estrutura inicial do projeto
- ✅ Documentação técnica completa
- 🟡 Design system em criação
- ⚪ Implementação pendente

---

## 🤝 Contribuindo

Este é um projeto privado da NUTRINDO JUNTOS. Contribuições são restritas à equipe interna.

Para desenvolvedores da equipe:
1. Leia o **[CLAUDE.md](CLAUDE.md)** completamente
2. Consulte **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** para decisões técnicas
3. Siga os padrões de código definidos
4. Crie branches para features: `feature/nome-da-feature`
5. Faça Pull Requests para `develop`

---

## 📞 Contato

**NUTRINDO JUNTOS**
- Website: https://nutrindojuntos.com.br (em breve)
- Email: contato@nutrindojuntos.com.br
- Instagram: [@nutrindojuntos](https://instagram.com/nutrindojuntos)

---

## 📄 Licença

Copyright © 2025 NUTRINDO JUNTOS. Todos os direitos reservados.

Este projeto é privado e proprietário. Uso não autorizado é estritamente proibido.

---

**Desenvolvido com ❤️ para nutricionistas brasileiros**
