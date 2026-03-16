# 🎨 DESIGN TOKENS - NUTRINDO JUNTOS

**Fonte:** Manual da Marca NUTRINDO JUNTOS
**Data:** 15/11/2025
**Versão:** 1.0

---

## 📊 PALETA DE CORES

### Cores Principais

#### Verde Água (Teal) - Primary
**Significado:** Renovação, clareza, vitalidade
**Uso:** Cor principal da marca, CTAs, links, highlights

```css
--primary-50:  #e6f9fa
--primary-100: #ccf3f5
--primary-200: #99e7eb
--primary-300: #66dbe0
--primary-400: #33cfd6
--primary-500: #19c5ca  /* Main brand color */
--primary-600: #149ea2
--primary-700: #0f767a
--primary-800: #0a4f51
--primary-900: #052729
```

**Tailwind:**
```tsx
<div className="bg-primary-500 text-primary-50">
  <Button className="bg-primary-500 hover:bg-primary-600">
    Explorar Cursos
  </Button>
</div>
```

---

#### Roxo Lavanda (Lavender Purple) - Secondary
**Significado:** Sabedoria, intuição, espiritualidade
**Uso:** Cor secundária, accents, badges, destaques alternativos

```css
--secondary-50:  #f3f0f7
--secondary-100: #e7e1ef
--secondary-200: #cfc3df
--secondary-300: #b7a5cf
--secondary-400: #9f87bf
--secondary-500: #6d4d88  /* Main secondary color */
--secondary-600: #573d6d
--secondary-700: #412e52
--secondary-800: #2b1e37
--secondary-900: #160f1b
```

**Tailwind:**
```tsx
<Badge className="bg-secondary-100 text-secondary-700">
  Educação em Nutrição
</Badge>
```

---

### Cores de Suporte

#### Grafite Suave
**Significado:** Profissionalismo, solidez
**Uso:** Textos principais, títulos, navegação

```css
--graphite: #4A4A4A
```

**Tailwind:**
```tsx
<h1 className="text-graphite">Título Principal</h1>
<p className="text-graphite/80">Parágrafo com 80% de opacidade</p>
```

---

#### Lavanda Suave
**Significado:** Sutileza com elegância
**Uso:** Backgrounds suaves, bordas, separadores

```css
--lavender: #E3DFEE
```

**Tailwind:**
```tsx
<Card className="border-lavender">
  <div className="bg-lavender/30">Fundo suave</div>
</Card>
```

---

#### Branco
**Significado:** Respiro visual, limpeza
**Uso:** Backgrounds principais, cards, espaçamento

```css
--white: #FFFFFF
```

---

## ✍️ TIPOGRAFIA

### Fontes da Marca

#### Playfair Display (Display/Serif)
**Significado:** Sofisticação, credibilidade
**Uso:** Títulos principais, headings (h1, h2, h3)

```tsx
// Next.js font loading (layout.tsx)
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

// Uso
<h1 className="font-display text-4xl font-bold">
  Transforme sua Carreira em Nutrição
</h1>
```

**Tailwind:**
```tsx
className="font-display"
```

---

#### Poppins (Sans-serif)
**Significado:** Leveza, modernidade, clareza
**Uso:** Corpo de texto, parágrafos, navegação, subtítulos (h4, h5, h6)

```tsx
// Next.js font loading (layout.tsx)
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Uso
<p className="font-sans text-base">
  Conteúdo do parágrafo com Poppins
</p>
```

**Tailwind:**
```tsx
className="font-sans"  // Default
```

---

#### Sloop Script Pro (Script)
**Significado:** Sensibilidade, elegância, toque humano
**Uso:** Destaques especiais, aspas, elementos decorativos (use com moderação)

```tsx
// Fallback para cursive (fonte paga não incluída)
const sloop = localFont({
  src: '../public/fonts/SloopScriptPro.woff2',
  variable: '--font-sloop',
  display: 'swap',
  fallback: ['cursive'],
})

// Uso (quando disponível)
<span className="font-script text-2xl">
  "Nutrição com ciência e humanidade"
</span>
```

**Tailwind:**
```tsx
className="font-script"
```

---

### Hierarquia Tipográfica

```tsx
// Títulos - Playfair Display
<h1 className="font-display text-5xl font-bold">Hero Title</h1>
<h2 className="font-display text-4xl font-bold">Section Title</h2>
<h3 className="font-display text-3xl font-semibold">Subsection</h3>

// Subtítulos e corpo - Poppins
<h4 className="font-sans text-xl font-semibold">Card Title</h4>
<p className="font-sans text-base">Body text content</p>
<small className="font-sans text-sm">Small text</small>

// Destaques - Sloop Script Pro (quando disponível)
<blockquote className="font-script text-2xl">Quote</blockquote>
```

---

## 📐 SPACING & LAYOUT

### Border Radius (Formas Suaves)
**Princípio:** Linhas suaves e curvas (do manual da marca)

```css
border-radius: {
  'none': '0',
  'sm': '0.25rem',    // 4px
  'DEFAULT': '0.5rem', // 8px - Padrão suave
  'md': '0.75rem',    // 12px
  'lg': '1rem',       // 16px
  'xl': '1.5rem',     // 24px
  '2xl': '2rem',      // 32px
  'full': '9999px',   // Círculo
}
```

**Tailwind:**
```tsx
<Card className="rounded-lg">  {/* 16px - Cards */}
<Badge className="rounded-full">  {/* Pill shape */}
<Button className="rounded-md">  {/* 12px - Botões */}
```

---

### Container & Breakpoints

```tsx
// Container
<div className="container mx-auto px-4">
  {/* Max-width: 1400px (2xl), centralizado, padding lateral 2rem */}
</div>

// Breakpoints
sm: '640px',   // Mobile landscape
md: '768px',   // Tablet
lg: '1024px',  // Desktop
xl: '1280px',  // Large desktop
2xl: '1536px', // Extra large
```

---

## 🎯 COMPONENTES DA MARCA

### Logo System

```tsx
import { Logo } from '@/components/ui/logo'

// Variações disponíveis
<Logo variant="horizontal" />    // Logo principal (5.png) - Header
<Logo variant="vertical" />      // Logo completo vertical (6.png) - Footer
<Logo variant="icon-vertical" /> // Ícone DNA+Folha (3.png) - Favicon
<Logo variant="wordmark" />      // Só texto "JUNTOS" (1.png)
<Logo variant="icon-only" />     // Ícone horizontal (7.png)
<Logo variant="icon-circle" />   // Ícone em círculo (4.png)

// Com props
<Logo
  variant="horizontal"
  width={160}
  height={54}
  priority
  className="custom-class"
/>
```

**Uso recomendado:**
- **Header desktop:** `horizontal` (5.png)
- **Header mobile:** `icon-vertical` (3.png)
- **Footer:** `vertical` (6.png)
- **Favicon:** `icon-vertical` (3.png)

---

### Buttons

```tsx
// Primary (Teal)
<Button className="bg-primary-500 hover:bg-primary-600">
  Explorar Cursos
</Button>

// Secondary Outline (Purple)
<Button
  variant="outline"
  className="border-secondary-500 text-secondary-500 hover:bg-secondary-50"
>
  Conhecer Mentoria
</Button>

// White on colored background
<Button className="bg-white text-secondary-600 hover:bg-white/90">
  Solicitar Mentoria
</Button>
```

---

### Cards

```tsx
<Card className="border-lavender hover:shadow-lg hover:shadow-primary-100">
  <CardHeader>
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
      <Icon className="h-6 w-6 text-primary-500" />
    </div>
    <CardTitle className="font-display text-graphite">
      Título do Card
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-graphite/80">Conteúdo do card</p>
  </CardContent>
</Card>
```

---

### Badges

```tsx
// Primary
<Badge className="bg-primary-100 text-primary-700">
  Novidade
</Badge>

// Secondary
<Badge className="bg-secondary-100 text-secondary-700">
  Educação em Nutrição
</Badge>

// Lavender soft
<Badge className="bg-lavender text-secondary-600">
  Em breve
</Badge>
```

---

## 🎨 ELEMENTOS VISUAIS

### Princípios do Manual da Marca

1. **Formas Orgânicas**
   - Usar folhas e formas botânicas em ilustrações
   - Preferir curvas suaves a linhas retas

2. **Linhas Suaves e Curvas**
   - Fluidez, acolhimento, continuidade
   - Border radius generoso (lg, xl, 2xl)

3. **Elementos de DNA**
   - Ciência, precisão, personalização
   - Já presente no logo

4. **Espaços em Branco Generosos**
   - Respiro visual, clareza
   - Padding e margin espaçosos

5. **Ícones de Linha Fina**
   - Usar Lucide Icons (já integrado)
   - Minimalismo, sofisticação

---

## 📋 GUIA DE USO RÁPIDO

### Estrutura de Página Típica

```tsx
export default function Page() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container mx-auto px-4">
          <Badge className="bg-secondary-100 text-secondary-700">
            Tag
          </Badge>
          <h1 className="font-display text-5xl font-bold text-graphite">
            Título Principal com <span className="text-primary-500">Destaque</span>
          </h1>
          <p className="text-lg text-graphite/80">Subtítulo</p>
          <Button className="bg-primary-500 hover:bg-primary-600">
            CTA Principal
          </Button>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <h2 className="font-display text-4xl font-bold text-graphite">
          Seção de Conteúdo
        </h2>
        <Card className="border-lavender">
          {/* Card content */}
        </Card>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-500 py-20 text-white">
        <h2 className="font-display text-4xl font-bold">
          Call to Action
        </h2>
      </section>
    </main>
  )
}
```

---

### Cores por Contexto

| Contexto | Cor | Tailwind |
|----------|-----|----------|
| CTA Principal | Verde Água | `bg-primary-500` |
| CTA Secundário | Roxo Lavanda | `border-secondary-500 text-secondary-500` |
| Títulos | Grafite | `text-graphite` |
| Corpo de texto | Grafite 80% | `text-graphite/80` |
| Bordas suaves | Lavanda | `border-lavender` |
| Background cards | Branco | `bg-white` |
| Background suave | Lavanda 20% | `bg-lavender/20` |
| Ícones primary | Teal | `text-primary-500` |
| Ícones secondary | Purple | `text-secondary-500` |

---

### Gradientes da Marca

```tsx
// Primary gradient
<div className="bg-gradient-to-b from-primary-50 to-white">
  Hero Section
</div>

// Dual brand gradient
<div className="bg-gradient-to-br from-primary-500 to-secondary-500">
  CTA Section
</div>

// Subtle lavender
<div className="bg-gradient-to-b from-white to-lavender/20">
  Featured Content
</div>

// Footer gradient
<footer className="bg-gradient-to-b from-white to-lavender/30">
  Footer
</footer>
```

---

## 🚀 IMPLEMENTAÇÃO

### Arquivos Modificados

1. **`tailwind.config.ts`** - Design tokens completos
2. **`app/layout.tsx`** - Fontes (Playfair Display, Poppins)
3. **`components/ui/logo.tsx`** - Sistema de logos
4. **`components/layout/Header.tsx`** - Header com logo e cores
5. **`components/layout/Footer.tsx`** - Footer com logo e cores
6. **`app/page.tsx`** - Home com design system aplicado

### Assets

- **Logos:** `/public/logos/` (1.png, 3.png, 4.png, 5.png, 6.png, 7.png)
- **Fontes:** Google Fonts (Playfair Display, Poppins)
- **Sloop Script Pro:** Fallback para `cursive` (fonte paga não incluída)

---

## 📚 REFERÊNCIAS

- **Manual da Marca:** `/design/ManualdeMarca-NutrindoJuntos.pdf`
- **Logo Variações:** `/design/Logo e Variações/`
- **Tailwind Config:** `/apps/web/tailwind.config.ts`
- **Component Library:** shadcn/ui + Lucide Icons

---

**Última Atualização:** 15/11/2025
**Responsável:** Diego (NUTRINDO JUNTOS)
