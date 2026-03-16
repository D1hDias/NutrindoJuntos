# Configuração da Fonte Principal - Poppins

**Data:** 16/11/2025
**Status:** ✅ CONFIGURADO

---

## 📋 Resumo

Poppins configurada como **fonte principal padrão** para todo o site NUTRINDO JUNTOS.

---

## ⚙️ Configuração Aplicada

### **globals.css**

```css
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }

  /* Poppins como fonte principal padrão */
  html {
    font-family: var(--font-poppins), system-ui, sans-serif;
  }
}
```

### **tailwind.config.ts**

```typescript
fontFamily: {
  sans: [
    'var(--font-poppins)',  // ← Poppins como fonte principal
    'system-ui',
    'sans-serif'
  ],
  display: [
    'var(--font-playfair)',  // Para títulos especiais
    'Georgia',
    'serif'
  ],
  outfit: [
    'var(--font-outfit)',  // Para Hero section
    'system-ui',
    'sans-serif'
  ],
}
```

### **layout.tsx**

```typescript
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Aplicado globalmente:
<body className={cn(
  'min-h-screen bg-background font-sans antialiased',
  poppins.variable,  // ← CSS variable --font-poppins
  playfair.variable,
  outfit.variable
)}>
```

---

## 🎯 Hierarquia de Fontes

### **1. Poppins (Fonte Principal - `font-sans`)**
**Uso:** Todo o corpo de texto, parágrafos, links, botões, formulários

**Aplicação:**
- ✅ Automático para todo o site (via `html` e `body`)
- ✅ Classe: `font-sans` (quando preciso explicitar)
- ✅ Pesos disponíveis: 300, 400, 500, 600, 700

**Exemplos:**
```tsx
<p>Texto com Poppins automático</p>
<p className="font-sans">Texto com Poppins explícito</p>
<Button>Botão com Poppins</Button>
```

### **2. Playfair Display (`font-display`)**
**Uso:** Títulos especiais, headings de destaque

**Aplicação:**
- ✅ Classe: `font-display`
- ✅ Pesos disponíveis: 400, 500, 600, 700, 800, 900

**Exemplos:**
```tsx
<h1 className="font-display text-4xl">Título Especial</h1>
<h2 className="font-display">Subtítulo Elegante</h2>
```

### **3. Outfit (`font-outfit`)**
**Uso:** Hero section, headings modernos

**Aplicação:**
- ✅ Classe: `font-outfit`
- ✅ Pesos disponíveis: 400, 500, 600, 700, 800, 900

**Exemplos:**
```tsx
<h1 className="font-outfit text-7xl">Transforme sua Carreira</h1>
```

---

## 📝 Guia de Uso

### **Quando usar cada fonte:**

| Elemento | Fonte | Classe | Exemplo |
|----------|-------|--------|---------|
| Parágrafos | Poppins | _(automático)_ | `<p>Texto</p>` |
| Links | Poppins | _(automático)_ | `<a>Link</a>` |
| Botões | Poppins | _(automático)_ | `<Button>CTA</Button>` |
| Formulários | Poppins | _(automático)_ | `<input />` |
| Headings normais | Poppins | _(automático)_ | `<h3>Título</h3>` |
| Headings especiais | Playfair | `font-display` | `<h1 className="font-display">` |
| Hero headings | Outfit | `font-outfit` | `<h1 className="font-outfit">` |
| Cards | Poppins | _(automático)_ | `<CardTitle>Título</CardTitle>` |
| Footer | Poppins | _(automático)_ | `<footer>Conteúdo</footer>` |

---

## ✅ Checklist de Verificação

### **Configuração:**
- ✅ `globals.css` atualizado com `font-family: var(--font-poppins)`
- ✅ `tailwind.config.ts` com `sans: ['var(--font-poppins)', ...]`
- ✅ `layout.tsx` com Poppins carregado e aplicado
- ✅ Pesos corretos (300, 400, 500, 600, 700)

### **Aplicação:**
- ✅ Todo o site usa Poppins por padrão
- ✅ `font-display` disponível para títulos especiais
- ✅ `font-outfit` disponível para Hero
- ✅ Fallbacks configurados (`system-ui`, `sans-serif`)

### **Performance:**
- ✅ `display: 'swap'` configurado (evita FOIT)
- ✅ Fontes carregadas via `next/font/google` (otimizado)
- ✅ CSS variables (`--font-poppins`) para reutilização

---

## 🎨 Exemplos Práticos

### **Antes:**
```tsx
// Sem fonte definida explicitamente
<p>Texto genérico</p>
```

### **Depois:**
```tsx
// Poppins aplicado automaticamente
<p>Texto com Poppins</p>  // ✅ Poppins automático

// Playfair para títulos especiais
<h1 className="font-display">Título Elegante</h1>  // ✅ Playfair

// Outfit para Hero
<h1 className="font-outfit text-7xl">Hero Moderno</h1>  // ✅ Outfit
```

---

## 📊 Impacto

### **Performance:**
- ✅ Fonte otimizada via next/font/google
- ✅ Preload automático
- ✅ Subset 'latin' apenas (reduz peso)
- ✅ Display swap (melhor UX)

### **Consistência:**
- ✅ Fonte única em todo o site
- ✅ Hierarquia clara (Poppins → Playfair → Outfit)
- ✅ Alinhado com Manual da Marca

### **Manutenibilidade:**
- ✅ Configuração centralizada
- ✅ CSS variables reutilizáveis
- ✅ Fácil de alterar no futuro

---

## 🔄 Arquivos Modificados

### **Modificados:**
- `apps/web/app/globals.css` (+7 linhas)

### **Verificados (já corretos):**
- `apps/web/tailwind.config.ts` ✅
- `apps/web/app/layout.tsx` ✅

---

**Documentação criada por:** Claude (SuperClaude Framework)
**Projeto:** NUTRINDO JUNTOS
**Mudança:** Poppins como fonte principal padrão ✅
