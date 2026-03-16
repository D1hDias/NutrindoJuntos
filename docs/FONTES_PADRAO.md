# 🔤 PADRÃO DE FONTES - NUTRINDO JUNTOS

**Última Atualização:** 21/11/2025
**Manual da Marca:** Aplicado ✅

---

## 📋 FONTES OFICIAIS DA MARCA

### 1️⃣ Poppins - FONTE PRINCIPAL
**Uso:** Todo o corpo de texto, UI, navegação, parágrafos, botões

**Características:**
- Peso: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- Estilo: Sans-serif moderna, clean, legível
- Propósito: Leveza, modernidade, clareza

**Aplicação no Tailwind:**
```tsx
// Classe padrão (aplicada automaticamente)
<p className="text-base">Texto em Poppins</p>

// Explícito (quando necessário)
<div className="font-sans">Conteúdo em Poppins</div>
```

---

### 2️⃣ Playfair Display - FONTE SECUNDÁRIA
**Uso:** Títulos (h1, h2, h3), destaques, chamadas principais

**Características:**
- Peso: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold), 900 (Black)
- Estilo: Serif elegante, sofisticada
- Propósito: Sofisticação, credibilidade, hierarquia visual

**Aplicação no Tailwind:**
```tsx
// Para títulos
<h1 className="font-display text-5xl font-bold">Título Principal</h1>
<h2 className="font-display text-4xl font-bold">Subtítulo</h2>
<h3 className="font-display text-3xl font-semibold">Seção</h3>

// Alias alternativo
<h1 className="font-serif text-5xl">Título em Playfair</h1>
```

---

## 🎯 HIERARQUIA TIPOGRÁFICA

### Títulos (Headings)
```tsx
// H1 - Hero/Página Principal
<h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold">
  Título Principal
</h1>

// H2 - Seções Principais
<h2 className="font-display text-3xl md:text-4xl font-bold">
  Seção Principal
</h2>

// H3 - Subseções
<h3 className="font-display text-2xl md:text-3xl font-semibold">
  Subseção
</h3>

// H4 - Cabeçalhos Menores (Poppins)
<h4 className="font-sans text-xl font-semibold">
  Cabeçalho Menor
</h4>
```

### Corpo de Texto (Body)
```tsx
// Parágrafo Grande (Destaque)
<p className="text-lg lg:text-xl font-normal">
  Texto de destaque em Poppins
</p>

// Parágrafo Normal (Base)
<p className="text-base font-normal">
  Texto padrão do corpo
</p>

// Parágrafo Pequeno
<p className="text-sm font-normal">
  Texto secundário ou notas
</p>

// Extra Pequeno (Captions)
<p className="text-xs font-normal">
  Legendas e informações adicionais
</p>
```

### Botões e CTAs
```tsx
// Botão Principal
<button className="font-sans text-base font-semibold">
  Matricule-se Agora
</button>

// Botão Secundário
<button className="font-sans text-sm font-medium">
  Saiba Mais
</button>
```

### Links e Navegação
```tsx
// Menu de Navegação
<a className="font-sans text-sm font-medium">
  Home
</a>

// Links no Texto
<a className="font-sans text-base font-medium underline">
  Leia mais
</a>
```

---

## 🎨 CONFIGURAÇÃO TÉCNICA

### Next.js Font Loading (layout.tsx)
```typescript
import { Playfair_Display, Poppins } from 'next/font/google'

// Playfair Display - Títulos
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

// Poppins - Corpo de texto
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})
```

### Tailwind Config (tailwind.config.ts)
```typescript
fontFamily: {
  // Poppins = Fonte PRINCIPAL (padrão do site)
  sans: [
    'var(--font-poppins)',
    'system-ui',
    'sans-serif'
  ],

  // Playfair Display = Fonte SECUNDÁRIA (títulos)
  display: [
    'var(--font-playfair)',
    'Georgia',
    'serif'
  ],

  // Alias para Playfair Display
  serif: [
    'var(--font-playfair)',
    'Georgia',
    'serif'
  ],
}
```

### CSS Variables (globals.css)
```css
:root {
  --font-poppins: 'Poppins', system-ui, sans-serif;
  --font-playfair: 'Playfair Display', Georgia, serif;
}

body {
  font-family: var(--font-poppins); /* Poppins como padrão */
}
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Em TODO novo componente:

**Título Principal (h1):**
```tsx
✅ className="font-display text-5xl font-bold"
❌ className="font-outfit" (remover)
❌ className="font-serif" (usar font-display ao invés)
```

**Subtítulos (h2, h3):**
```tsx
✅ className="font-display text-3xl font-bold"
```

**Texto Corpo (p, div, span):**
```tsx
✅ className="text-base" (Poppins automático)
✅ className="font-sans text-base" (explícito se necessário)
❌ NÃO usar font-display em texto de parágrafo
```

**Botões:**
```tsx
✅ className="font-sans text-base font-semibold"
```

---

## 📐 ESCALA DE TAMANHOS

### Desktop (lg:)
| Elemento | Classe | Tamanho |
|----------|--------|---------|
| H1 Hero | `text-6xl lg:text-7xl` | 60px → 72px |
| H2 Seção | `text-4xl lg:text-5xl` | 36px → 48px |
| H3 Subseção | `text-2xl lg:text-3xl` | 24px → 30px |
| H4 Cabeçalho | `text-xl lg:text-2xl` | 20px → 24px |
| Parágrafo Destaque | `text-lg lg:text-xl` | 18px → 20px |
| Parágrafo Base | `text-base` | 16px |
| Texto Pequeno | `text-sm` | 14px |
| Caption | `text-xs` | 12px |

---

## 🚫 O QUE NÃO FAZER

❌ **Não misturar fontes no mesmo elemento:**
```tsx
// ERRADO
<h1 className="font-display">
  Título em <span className="font-sans">Poppins</span>
</h1>
```

❌ **Não usar Playfair em parágrafos longos:**
```tsx
// ERRADO - Playfair é só para títulos
<p className="font-display">
  Texto longo de parágrafo...
</p>
```

❌ **Não usar Outfit (está deprecated):**
```tsx
// ERRADO - Outfit será removido
<h1 className="font-outfit">Título</h1>

// CORRETO - Usar Playfair Display
<h1 className="font-display">Título</h1>
```

---

## 🔄 MIGRAÇÃO DE COMPONENTES ANTIGOS

### Substituir Outfit por Playfair Display:
```bash
# Buscar todos os usos de font-outfit
grep -r "font-outfit" apps/web/components/

# Substituir por font-display
# Fazer manualmente para revisar cada caso
```

### Buscar e corrigir:
1. ❌ `font-outfit` → ✅ `font-display` (em títulos)
2. ❌ `font-serif` → ✅ `font-display` (padronizar)
3. ❌ Poppins em títulos → ✅ Playfair Display

---

## 📱 RESPONSIVIDADE

### Mobile First:
```tsx
// Tamanhos crescem de mobile para desktop
<h1 className="
  text-4xl        // Mobile (base)
  md:text-5xl     // Tablet
  lg:text-6xl     // Desktop
  xl:text-7xl     // Large Desktop
  font-display
  font-bold
">
  Título Responsivo
</h1>
```

---

## 🎨 EXEMPLOS PRÁTICOS

### Hero Section:
```tsx
<section>
  <h1 className="font-display text-5xl lg:text-7xl font-bold">
    Nossa Plataforma Online
  </h1>
  <p className="text-lg lg:text-xl font-normal">
    Descrição em Poppins, legível e clara.
  </p>
  <button className="font-sans text-base font-semibold">
    Matricule-se Agora
  </button>
</section>
```

### Card de Curso:
```tsx
<div className="card">
  <h3 className="font-display text-2xl font-bold">
    Nutrição Esportiva
  </h3>
  <p className="text-base font-normal">
    Aprenda técnicas avançadas de nutrição para atletas.
  </p>
  <span className="text-sm font-medium">
    50+ aulas
  </span>
</div>
```

### Blog Post:
```tsx
<article>
  <h1 className="font-display text-4xl lg:text-5xl font-bold">
    Como Melhorar sua Alimentação
  </h1>
  <div className="prose">
    <p className="text-base">
      Conteúdo do post em Poppins...
    </p>
    <h2 className="font-display text-3xl font-bold">
      Subtítulo da Seção
    </h2>
  </div>
</article>
```

---

## 📚 RECURSOS

### Google Fonts:
- [Poppins](https://fonts.google.com/specimen/Poppins)
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)

### Tailwind Docs:
- [Font Family](https://tailwindcss.com/docs/font-family)
- [Font Size](https://tailwindcss.com/docs/font-size)
- [Font Weight](https://tailwindcss.com/docs/font-weight)

### Next.js Docs:
- [Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

---

**Status:** ✅ Implementado
**Última Verificação:** 21/11/2025
