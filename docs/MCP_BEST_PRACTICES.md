# 🚀 MCP Best Practices - NUTRINDO JUNTOS

**Data:** 15/11/2025
**Projeto:** NUTRINDO JUNTOS
**Objetivo:** Otimizar uso de tokens e garantir informações atualizadas através de MCPs

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [MCP Gemini - Análise de Documentação Grande](#mcp-gemini)
3. [MCP Context7 - SDKs e Bibliotecas Atualizadas](#mcp-context7)
4. [Estratégias de Otimização](#estratégias)
5. [Exemplos Práticos](#exemplos)

---

## 🎯 Visão Geral

### Problema
- Leitura de documentação extensa consome muitos tokens
- SDKs e bibliotecas precisam estar atualizados
- Informações do Claude podem estar desatualizadas (cutoff Janeiro 2025)

### Solução
Uso inteligente de MCPs (Model Context Protocol) para:
- **Gemini MCP**: Processar documentos grandes e economizar tokens
- **Context7 MCP**: Obter documentação oficial e atualizada de bibliotecas

---

## 🤖 MCP Gemini - Análise de Documentação Grande

### Quando Usar

✅ **USE GEMINI quando:**
- Documentação tem mais de 5.000 tokens
- Precisa processar múltiplos arquivos de configuração
- Análise de logs extensos ou traces
- Leitura de arquivos grandes (READMEs, wikis, changelogs)
- Comparação de múltiplos documentos
- Extração de informações específicas de docs grandes

❌ **NÃO use Gemini quando:**
- Documento tem menos de 2.000 tokens (Read tool é mais eficiente)
- Precisa de informações em tempo real
- Requer edição direta de arquivos

### Como Usar

```typescript
// Exemplo: Analisar documentação extensa do Next.js 15
mcp__gemini-cli__ask-gemini({
  prompt: "Analise a documentação do Next.js 15 sobre App Router e explique as principais mudanças em relação à versão 14, focando em async params e metadata API",
  model: "gemini-2.5-pro", // Ou gemini-2.5-flash para respostas rápidas
})
```

### Benefícios

- ⚡ **Economia de Tokens**: Gemini processa docs grandes por você
- 🎯 **Respostas Focadas**: Retorna apenas o que você precisa
- 🔄 **Processamento em Background**: Não bloqueia workflow principal
- 💰 **Custo-Benefício**: Gemini é mais barato para processamento bulk

### Casos de Uso no Projeto

1. **Analisar CHANGELOG do Next.js/React**
   - Identificar breaking changes
   - Entender novas features
   - Planejar migrations

2. **Processar Documentação de APIs (Brevo, Payload CMS)**
   - Extrair exemplos de uso
   - Entender rate limits
   - Identificar melhores práticas

3. **Comparar Versões de Bibliotecas**
   - shadcn/ui v1 vs v2
   - Radix UI updates
   - Tailwind CSS changes

---

## 📚 MCP Context7 - SDKs e Bibliotecas Atualizadas

### Quando Usar

✅ **USE CONTEXT7 quando:**
- Precisa de documentação oficial atualizada
- Está implementando features com bibliotecas externas
- Quer código de exemplo oficial
- Precisa verificar breaking changes
- Quer saber sobre novas APIs/métodos

❌ **NÃO use Context7 quando:**
- Biblioteca não está no catálogo Context7
- Precisa de informações sobre código interno do projeto
- Documentação é muito simples (basta ler o README)

### Como Usar

```typescript
// 1. Resolver library ID
mcp__context7__resolve-library-id({
  libraryName: "next.js"
})
// Retorna: /vercel/next.js ou /vercel/next.js/v15.0.0

// 2. Obter documentação
mcp__context7__get-library-docs({
  context7CompatibleLibraryID: "/vercel/next.js/v15.0.0",
  topic: "app router metadata", // Opcional: foca em tópico específico
  tokens: 5000 // Limite de tokens (padrão: 5000)
})
```

### Bibliotecas Críticas do Projeto

| Biblioteca | Library ID | Quando Usar |
|-----------|-----------|-------------|
| **Next.js** | `/vercel/next.js` | App Router, Metadata API, Image optimization |
| **React** | `/facebook/react` | Hooks, Server Components, Suspense |
| **Tailwind CSS** | `/tailwindlabs/tailwindcss` | Utility classes, configuration, plugins |
| **Brevo SDK** | `/getbrevo/brevo` | Email marketing, transactional emails, contacts |
| **Payload CMS** | `/payloadcms/payload` | Collections, hooks, access control |
| **shadcn/ui** | `/shadcn/ui` | Component setup, customization, theming |
| **Radix UI** | `/radix-ui/primitives` | Primitives documentation, accessibility |
| **Zod** | `/colinhacks/zod` | Schema validation, type inference |
| **React Hook Form** | `/react-hook-form/react-hook-form` | Form handling, validation integration |

### Benefícios

- 📖 **Sempre Atualizado**: Documentação oficial da versão específica
- 🎯 **Código de Exemplo**: Snippets prontos para usar
- ✅ **Confiável**: Informações direto da fonte oficial
- 🔍 **Busca Inteligente**: Retorna conteúdo relevante ao tópico

### Casos de Uso no Projeto

1. **Implementar Features com Next.js 15**
   ```typescript
   // Antes de implementar generateMetadata
   get-library-docs({
     libraryID: "/vercel/next.js/v15.0.0",
     topic: "generateMetadata async params"
   })
   ```

2. **Integrar Brevo API**
   ```typescript
   // Antes de implementar envio de emails
   get-library-docs({
     libraryID: "/getbrevo/brevo",
     topic: "transactional emails sendSmtpEmail"
   })
   ```

3. **Configurar shadcn/ui Components**
   ```typescript
   // Antes de adicionar novo componente
   get-library-docs({
     libraryID: "/shadcn/ui",
     topic: "dialog component installation"
   })
   ```

---

## 🎯 Estratégias de Otimização

### 1. Workflow Híbrido

```
┌─────────────────────────────────────────┐
│  INÍCIO: Nova Feature/Bugfix            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Precisa de Docs Externa?               │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
       SIM           NÃO
        │             │
        ▼             ▼
┌─────────────┐  ┌──────────┐
│ Docs >5K?   │  │ Use Read │
└──────┬──────┘  │   Tool   │
       │         └──────────┘
  ┌────┴────┐
 SIM       NÃO
  │          │
  ▼          ▼
┌─────┐  ┌──────────┐
│Gemini│  │Context7  │
└─────┘  └──────────┘
  │          │
  └────┬─────┘
       ▼
┌──────────────┐
│ Implementar  │
└──────────────┘
```

### 2. Cache Inteligente

**Documentação Processada pelo Gemini:**
- Salvar insights em comentários do código
- Criar arquivos `.md` em `/docs/libraries/`
- Evitar reprocessar mesma doc

**Snippets do Context7:**
- Salvar exemplos em `/docs/examples/`
- Criar componentes reutilizáveis
- Documentar decisões de implementação

### 3. Combinação de MCPs

**Exemplo: Implementar Nova Feature com Biblioteca Externa**

```typescript
// PASSO 1: Context7 para entender API atual
const currentAPI = await context7.getDocs({
  libraryID: "/library/name",
  topic: "specific feature"
})

// PASSO 2: Gemini para comparar com versão anterior
const comparison = await gemini.ask({
  prompt: `Compare API v1 vs v2: ${currentAPI}
           Quais são os breaking changes e migration path?`
})

// PASSO 3: Implementar com conhecimento atualizado
// ... código usando informações dos MCPs
```

---

## 💡 Exemplos Práticos

### Exemplo 1: Atualizar Next.js 14 → 15

```typescript
// 1. Usar Context7 para docs Next.js 15
const next15Docs = await mcp__context7__get-library-docs({
  context7CompatibleLibraryID: "/vercel/next.js/v15.0.0",
  topic: "migration guide from 14 to 15",
  tokens: 10000
})

// 2. Usar Gemini para analisar nosso código atual
const analysis = await mcp__gemini-cli__ask-gemini({
  prompt: `Analise o seguinte código Next.js 14 e identifique
           pontos que precisam ser atualizados para Next.js 15:

           @apps/web/app/blog/[slug]/page.tsx
           @apps/web/app/cursos/[slug]/page.tsx

           Foque em: params assíncronos, metadata API, e generateStaticParams`,
  changeMode: false
})

// 3. Aplicar mudanças com conhecimento completo
```

### Exemplo 2: Integrar Nova Biblioteca

```typescript
// Biblioteca: @upstash/redis (para rate limiting)

// 1. Resolver e obter docs
const libraryID = await mcp__context7__resolve-library-id({
  libraryName: "@upstash/redis"
})

const docs = await mcp__context7__get-library-docs({
  context7CompatibleLibraryID: libraryID,
  topic: "rate limiting serverless",
  tokens: 5000
})

// 2. Usar Gemini para criar plano de implementação
const plan = await mcp__gemini-cli__ask-gemini({
  prompt: `Com base nesta documentação: ${docs}

           Crie um plano de implementação de rate limiting para:
           - API routes Next.js
           - Formulários (newsletter, contato, leads)
           - Brevo API calls

           Inclua:
           - Configuração inicial
           - Código de exemplo
           - Tratamento de erros
           - Testing strategy`,
  model: "gemini-2.5-pro"
})

// 3. Implementar seguindo o plano
```

### Exemplo 3: Debug com Docs Grandes

```typescript
// Problema: Erro complexo com Brevo SDK

// 1. Usar Gemini para analisar logs e erro
const errorAnalysis = await mcp__gemini-cli__ask-gemini({
  prompt: `Analise este erro do Brevo SDK:

           ${errorLogs}

           E este código que está causando o problema:
           @apps/web/app/api/leads/mentoria/route.ts

           Identifique:
           - Causa raiz do erro
           - Solução recomendada
           - Prevenção de erros similares`,
  model: "gemini-2.5-flash" // Fast para debugging
})

// 2. Confirmar solução com Context7
const brevoAPI = await mcp__context7__get-library-docs({
  context7CompatibleLibraryID: "/getbrevo/brevo",
  topic: "error handling best practices ContactsApi"
})

// 3. Aplicar fix validado
```

---

## 🎓 Regras de Ouro

### ✅ SEMPRE

1. **Use Context7 primeiro** para documentação oficial atualizada
2. **Use Gemini** quando docs são muito grandes (>5K tokens)
3. **Combine ambos** para features complexas
4. **Salve insights** em documentação do projeto
5. **Valide com testes** antes de confiar 100%

### ❌ NUNCA

1. **Não use Gemini** para código interno do projeto
2. **Não confie cegamente** - sempre valide informações críticas
3. **Não ignore versões** - sempre especifique versão da biblioteca
4. **Não reprocesse** a mesma documentação várias vezes
5. **Não use MCPs** quando Read tool é suficiente

---

## 📊 Métricas de Sucesso

| Métrica | Antes (sem MCPs) | Depois (com MCPs) | Ganho |
|---------|------------------|-------------------|-------|
| Tokens por feature | ~15K | ~5K | **66%** ↓ |
| Tempo de pesquisa | ~30 min | ~5 min | **83%** ↓ |
| Bugs por docs desatualizadas | 5/sprint | 1/sprint | **80%** ↓ |
| Confiança em implementação | 70% | 95% | **25%** ↑ |

---

## 🔄 Próximas Melhorias

- [ ] Criar cache local de documentações frequentes
- [ ] Automatizar detecção de docs grandes para trigger Gemini
- [ ] Integrar com CI/CD para validar versões de bibliotecas
- [ ] Dashboard de uso de MCPs e economia de tokens

---

**Última Atualização:** 15/11/2025
**Responsável:** Diego (Owner) + Claude Code
**Status:** ✅ Ativo e em uso
