# 🎨 TEMPLATE FISTUDY - REFERÊNCIA COMPLETA

**Data:** 21/11/2025
**Versão do Template:** v1.0
**Fonte:** NJ_temp/media/Fistudy Template/fistudy-pack/

---

## 📋 **ÍNDICE**

1. [Visão Geral](#visão-geral)
2. [Paleta de Cores Completa](#paleta-de-cores-completa)
3. [Tipografia](#tipografia)
4. [Estrutura de Arquivos](#estrutura-de-arquivos)
5. [Páginas Disponíveis](#páginas-disponíveis)
6. [Componentes e Módulos](#componentes-e-módulos)
7. [Assets Disponíveis](#assets-disponíveis)
8. [Sistema CSS](#sistema-css)
9. [JavaScript e Plugins](#javascript-e-plugins)
10. [Adaptação para Nutrindo Juntos](#adaptação-para-nutrindo-juntos)

---

## 🎯 **VISÃO GERAL**

### **Descrição do Template**
- **Nome:** Fistudy
- **Tipo:** Educational LMS HTML5 Template
- **Páginas:** 34+ páginas HTML
- **Responsivo:** Mobile, Tablet, Desktop
- **Framework:** Bootstrap 5
- **Browsers:** Chrome, Firefox, Safari, Edge

### **Recursos Principais**
- ✅ Design moderno e clean
- ✅ Totalmente responsivo
- ✅ 34+ páginas HTML prontas
- ✅ CSS modular (por componente)
- ✅ Animações suaves
- ✅ Carrosséis/Sliders
- ✅ Formulários funcionais
- ✅ SEO otimizado

---

## 🎨 **PALETA DE CORES COMPLETA**

### **Variáveis CSS (`:root`)**

```css
:root {
  /* Fontes */
  --fistudy-font: "Outfit", sans-serif;
  --fistudy-font-two: "Roboto Serif", serif;

  /* Cores Principais */
  --fistudy-gray: #6B778B;          /* Cinza texto */
  --fistudy-gray-rgb: 107, 119, 139;

  --fistudy-base: #687EFF;           /* Azul principal */
  --fistudy-base-rgb: 104, 126, 255;

  --fistudy-black: #052143;          /* Preto/Azul escuro */
  --fistudy-black-rgb: 5, 33, 67;

  --fistudy-primary: #F87A53;        /* Laranja/Coral */
  --fistudy-primary-rgb: 248, 122, 83;

  --fistudy-white: #ffffff;          /* Branco */
  --fistudy-white-rgb: 255, 255, 255;

  --fistudy-bdr-color: #D1E3FB;     /* Azul claro (bordas) */
  --fistudy-bdr-color-rgb: 209, 227, 251;

  /* Grid System */
  --bs-gutter-x: 24px;
  --bs-gutter-y: 24px;
}
```

### **Paleta Visual**

| Variável | Cor | Uso Principal |
|----------|-----|---------------|
| `--fistudy-base` | ![#687EFF](https://via.placeholder.com/50x20/687EFF/687EFF) #687EFF | Links, botões primários, destaques |
| `--fistudy-primary` | ![#F87A53](https://via.placeholder.com/50x20/F87A53/F87A53) #F87A53 | Botões secundários, CTAs |
| `--fistudy-black` | ![#052143](https://via.placeholder.com/50x20/052143/052143) #052143 | Títulos, textos destacados |
| `--fistudy-gray` | ![#6B778B](https://via.placeholder.com/50x20/6B778B/6B778B) #6B778B | Textos corpo, parágrafos |
| `--fistudy-bdr-color` | ![#D1E3FB](https://via.placeholder.com/50x20/D1E3FB/D1E3FB) #D1E3FB | Bordas, divisores |
| `--fistudy-white` | ![#FFFFFF](https://via.placeholder.com/50x20/FFFFFF/000000) #FFFFFF | Fundos, texto em fundos escuros |

### **🔄 Adaptação para Nutrindo Juntos**

```css
:root {
  /* Substituir cores do Fistudy pelas cores NJ */

  /* Base Azul → Teal/Turquesa */
  --nj-base: #19c5ca;              /* Era #687EFF */
  --nj-base-rgb: 25, 197, 202;

  /* Primary Laranja → Roxo */
  --nj-primary: #6d4d88;           /* Era #F87A53 */
  --nj-primary-rgb: 109, 77, 136;

  /* Black: Manter ou ajustar para tom mais quente */
  --nj-black: #1a1a2e;             /* Era #052143 */
  --nj-black-rgb: 26, 26, 46;

  /* Gray: Manter */
  --nj-gray: #6B778B;              /* Manter */
  --nj-gray-rgb: 107, 119, 139;

  /* Border: Ajustar para Teal claro */
  --nj-bdr-color: #b8f2f4;         /* Era #D1E3FB */
  --nj-bdr-color-rgb: 184, 242, 244;

  /* White: Manter */
  --nj-white: #ffffff;
  --nj-white-rgb: 255, 255, 255;
}
```

---

## 📝 **TIPOGRAFIA**

### **Fontes Principais**

```css
/* Sans-Serif (Corpo, UI) */
--fistudy-font: "Outfit", sans-serif;

/* Serif (Títulos, Destaque) */
--fistudy-font-two: "Roboto Serif", serif;
```

### **Google Fonts Links**

```html
<!-- Outfit (100-900) -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">

<!-- Roboto Serif (100-900, Italic) -->
<link href="https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap" rel="stylesheet">
```

### **Tipografia Body**

```css
body {
  font-family: var(--fistudy-font);  /* Outfit */
  color: var(--fistudy-gray);        /* #6B778B */
  font-size: 18px;
  line-height: 27px;                 /* 1.5 */
  font-weight: 400;
}
```

### **Hierarquia de Títulos**

| Elemento | Font | Size | Weight | Line Height |
|----------|------|------|--------|-------------|
| `h1` | Outfit | 48-72px | 700 | 1.2 |
| `h2` | Outfit | 36-56px | 700 | 1.25 |
| `h3` | Outfit | 28-40px | 600 | 1.3 |
| `h4` | Outfit | 24-32px | 600 | 1.35 |
| `h5` | Outfit | 20-24px | 600 | 1.4 |
| `h6` | Outfit | 16-18px | 600 | 1.5 |
| `body` | Outfit | 18px | 400 | 1.5 |

### **🔄 Adaptação para Nutrindo Juntos**

```css
/* Manter Outfit como sans-serif */
--nj-font: "Outfit", sans-serif;      /* ✅ Manter */

/* Trocar Roboto Serif por Lora (já configurado no projeto) */
--nj-font-two: "Lora", serif;         /* Era Roboto Serif */
```

---

## 📁 **ESTRUTURA DE ARQUIVOS**

### **Diretório Completo**

```
fistudy-pack/
├── 01-html-file/                    # Template HTML
│   ├── assets/
│   │   ├── css/                     # Estilos
│   │   │   ├── style.css           # CSS principal
│   │   │   ├── responsive.css      # Media queries
│   │   │   ├── module-css/         # CSS por módulo
│   │   │   │   ├── banner.css
│   │   │   │   ├── category.css
│   │   │   │   ├── about.css
│   │   │   │   ├── courses.css
│   │   │   │   ├── why-choose.css
│   │   │   │   ├── team.css
│   │   │   │   ├── newsletter.css
│   │   │   │   ├── testimonial.css
│   │   │   │   ├── blog.css
│   │   │   │   ├── footer.css
│   │   │   │   └── ...
│   │   │   └── (bibliotecas...)
│   │   │
│   │   ├── fonts/                   # Fontes
│   │   │   ├── fa-*.woff2          # Font Awesome
│   │   │   └── icomoon.*           # Ícones custom
│   │   │
│   │   ├── images/                  # Imagens
│   │   │   ├── resources/          # Imagens principais
│   │   │   ├── icon/               # Ícones
│   │   │   ├── shapes/             # Shapes decorativos
│   │   │   ├── blog/               # Imagens de blog
│   │   │   ├── team/               # Fotos de equipe
│   │   │   ├── testimonial/        # Fotos testimonials
│   │   │   ├── backgrounds/        # Backgrounds
│   │   │   └── ...
│   │   │
│   │   ├── js/                      # JavaScript
│   │   │   ├── custom.js           # JS customizado
│   │   │   └── (bibliotecas...)
│   │   │
│   │   └── inc/                     # Includes PHP
│   │
│   ├── index.html                   # Home principal
│   ├── index2.html                  # Home variação 2
│   ├── index3.html                  # Home variação 3
│   ├── index-dark.html              # Home modo escuro
│   ├── about.html
│   ├── course.html
│   ├── course-details.html
│   ├── blog.html
│   ├── blog-details.html
│   ├── contact.html
│   └── (30+ páginas...)
│
└── 02-documentation-file/           # Documentação
    ├── index.html                   # Doc principal
    └── assets/
```

---

## 📄 **PÁGINAS DISPONÍVEIS (34+)**

### **Home Pages (4 variações)**
1. `index.html` - Home One (Principal)
2. `index2.html` - Home Two
3. `index3.html` - Home Three
4. `index-dark.html` - Dark Mode Home

### **Páginas Institucionais**
5. `about.html` - Sobre nós
6. `faq.html` - Perguntas frequentes
7. `contact.html` - Contato
8. `gallery.html` - Galeria
9. `pricing.html` - Preços

### **Páginas de Cursos**
10. `course.html` - Lista de cursos (grid)
11. `course-carousel.html` - Cursos em carrossel
12. `course-list.html` - Cursos em lista
13. `course-details.html` - Detalhes do curso

### **Páginas de Instrutores**
14. `instructor.html` - Lista de instrutores
15. `instructor-carousel.html` - Instrutores carrossel
16. `instructor-details.html` - Detalhes instrutor

### **Páginas de Eventos**
17. `events.html` - Lista de eventos
18. `events-carousel.html` - Eventos carrossel
19. `event-details.html` - Detalhes evento

### **Páginas de Blog**
20. `blog.html` - Blog grid
21. `blog-carousel.html` - Blog carrossel
22. `blog-list.html` - Blog lista
23. `blog-details.html` - Post individual

### **Páginas de Loja (E-commerce)**
24. `products.html` - Produtos
25. `product-details.html` - Detalhes produto
26. `cart.html` - Carrinho
27. `checkout.html` - Checkout
28. `wishlist.html` - Lista de desejos

### **Páginas de Autenticação**
29. `login.html` - Login
30. `sign-up.html` - Cadastro

### **Páginas de Depoimentos**
31. `testimonials.html` - Depoimentos grid
32. `testimonials-carousel.html` - Depoimentos carrossel

### **Páginas Especiais**
33. `become-a-teacher.html` - Seja um instrutor
34. `coming-soon.html` - Em breve
35. `404.html` - Erro 404

---

## 🧩 **COMPONENTES E MÓDULOS**

### **CSS Modular (module-css/)**

Cada seção tem seu próprio CSS:

```
module-css/
├── banner.css          # Hero sections
├── slider.css          # Sliders/Carrosséis
├── category.css        # Categorias
├── about.css           # Sobre
├── courses.css         # Cursos
├── why-choose.css      # Por que escolher
├── counter.css         # Contadores
├── team.css            # Equipe
├── newsletter.css      # Newsletter
├── testimonial.css     # Depoimentos
├── live-class.css      # Aulas ao vivo
├── video-one.css       # Vídeos
├── blog.css            # Blog
├── footer.css          # Rodapé
├── contact.css         # Contato
└── sliding-text.css    # Texto deslizante
```

### **Estrutura HTML Típica de um Componente**

#### **Exemplo: Course Card**

```html
<div class="courses-one__single">
    <div class="courses-one__img-box">
        <div class="courses-one__img">
            <img src="assets/images/resources/courses-1-1.jpg" alt="">
        </div>
        <div class="courses-one__category-list">
            <a href="#" class="courses-one__category">Art & Design</a>
        </div>
    </div>
    <div class="courses-one__content">
        <ul class="courses-one__meta list-unstyled">
            <li>
                <span class="icon-book"></span>
                12 Lesson
            </li>
            <li>
                <span class="icon-clock"></span>
                120h 45min
            </li>
        </ul>
        <h3 class="courses-one__title">
            <a href="course-details.html">Graphic Design Essentials...</a>
        </h3>
        <div class="courses-one__review">
            <div class="courses-one__stars-box">
                <!-- Stars -->
            </div>
            <p class="courses-one__review-text">250 Reviews</p>
        </div>
        <div class="courses-one__bottom">
            <div class="courses-one__price-box">
                <p class="courses-one__price">$260.00</p>
            </div>
            <div class="courses-one__btn-box">
                <a href="course-details.html" class="courses-one__btn">Enroll Now</a>
            </div>
        </div>
    </div>
</div>
```

---

## 📦 **ASSETS DISPONÍVEIS**

### **Imagens** (`assets/images/`)

#### **Categorias de Imagens**

| Diretório | Conteúdo | Quantidade Aprox. |
|-----------|----------|-------------------|
| `resources/` | Banners, hero images, fotos gerais | 50+ |
| `icon/` | Ícones PNG (categorias, features) | 30+ |
| `shapes/` | Shapes decorativos SVG | 20+ |
| `blog/` | Thumbnails de posts | 15+ |
| `team/` | Fotos de instrutores | 10+ |
| `testimonial/` | Fotos de depoimentos | 8+ |
| `backgrounds/` | Backgrounds de seções | 10+ |
| `shop/` | Imagens de produtos | 12+ |
| `gallery/` | Galeria de fotos | 12+ |

#### **Ícones Disponíveis** (`assets/images/icon/`)

```
3d-alarm.png
about-one-experience-icon.png
banner-two-book-icon.png
banner-two-edu-icon.png
category-one-hover-icon-1-1.png
categoyr-two-icon-1.png  (Tech & Programming)
categoyr-two-icon-2.png  (Creative Art)
categoyr-two-icon-3.png  (Business & Finance)
categoyr-two-icon-4.png  (Health & Wellness)
... (30+ ícones)
```

### **Fontes** (`assets/fonts/`)

```
Font Awesome (Pro):
- fa-brands-400.woff2
- fa-regular-400.woff2
- fa-solid-900.woff2

Icomoon (Custom Icons):
- icomoon.eot
- icomoon.svg
- icomoon.ttf
- icomoon.woff
```

### **JavaScript** (`assets/js/`)

```javascript
// Principais bibliotecas incluídas:
- jQuery 3.6.0
- Bootstrap 5.x
- Swiper (Slider/Carousel)
- Owl Carousel
- AOS (Animate On Scroll)
- Jarallax (Parallax)
- Magnific Popup (Lightbox)
- Odometer (Counter animation)
- Nice Select (Select customizado)
- jQuery UI
- Custom.js (lógica customizada)
```

---

## 💅 **SISTEMA CSS**

### **Bibliotecas CSS Incluídas**

```html
<!-- Core -->
<link rel="stylesheet" href="assets/css/bootstrap.min.css">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/responsive.css">

<!-- Animações -->
<link rel="stylesheet" href="assets/css/animate.min.css">
<link rel="stylesheet" href="assets/css/custom-animate.css">
<link rel="stylesheet" href="assets/css/aos.css">

<!-- Plugins -->
<link rel="stylesheet" href="assets/css/swiper.min.css">
<link rel="stylesheet" href="assets/css/owl.carousel.min.css">
<link rel="stylesheet" href="assets/css/jquery.magnific-popup.css">
<link rel="stylesheet" href="assets/css/odometer.min.css">
<link rel="stylesheet" href="assets/css/nice-select.css">
<link rel="stylesheet" href="assets/css/jquery-ui.css">

<!-- Ícones -->
<link rel="stylesheet" href="assets/css/font-awesome-all.css">
<link rel="stylesheet" href="assets/css/flaticon.css">

<!-- Módulos (por componente) -->
<link rel="stylesheet" href="assets/css/module-css/banner.css">
<link rel="stylesheet" href="assets/css/module-css/category.css">
<link rel="stylesheet" href="assets/css/module-css/about.css">
<!-- ... (15+ módulos) -->
```

### **Classes Utilitárias Comuns**

```css
/* Espaçamento */
.section-title                /* Títulos de seção */
.container                    /* Container Bootstrap */
.gutter-y-24                 /* Gutter vertical */

/* Animações */
.wow                         /* WOW.js animation */
.fadeInUp, .fadeInLeft       /* Animate.css */

/* Cursor customizado */
.custom-cursor               /* Cursor personalizado */

/* Componentes */
.btn-primary                 /* Botão primário */
.courses-one__single         /* Card de curso */
.team-one__single            /* Card de instrutor */
.blog-one__single            /* Card de blog */
```

---

## 🔧 **JAVASCRIPT E PLUGINS**

### **Plugins Principais**

1. **Swiper.js** - Carrosséis modernos
2. **Owl Carousel** - Carrosséis alternativos
3. **AOS** - Animate On Scroll
4. **Jarallax** - Efeito parallax
5. **Magnific Popup** - Lightbox/Modal
6. **Odometer** - Animação de contadores
7. **Nice Select** - Select estilizado
8. **jQuery UI** - Datepicker, tooltips

### **Custom JavaScript** (`assets/js/custom.js`)

Funcionalidades principais:
- Menu mobile hamburger
- Sticky header no scroll
- Back to top button
- Counter animation
- Parallax effects
- Form validation
- Modal/Popup handling
- Slider/Carousel initialization

---

## 🔄 **ADAPTAÇÃO PARA NUTRINDO JUNTOS**

### **Mapeamento de Seções**

| Seção Fistudy | Adaptar para NJ | Status |
|---------------|-----------------|--------|
| **Header** | Manter estrutura, trocar logo | 🔄 Adaptar |
| **Hero** | Título + 2 CTAs + imagem nutrição | 🔄 Adaptar |
| **Categories** | 8 áreas de nutrição | 🔄 Recriar |
| **About** | História Nutrindo Juntos | 🔄 Adaptar |
| **Courses** | Cursos de nutrição | ✅ Manter |
| **Why Choose** | 4 diferenciais NJ | 🔄 Adaptar |
| **Counter** | Estatísticas NJ | 🔄 Adaptar |
| **Team** | Nutricionistas | ✅ Manter |
| **Newsletter** | Captura de leads | ✅ Manter |
| **Testimonials** | Depoimentos alunos | ✅ Manter |
| **Live Class** | ❌ REMOVER (Fase 3) | ❌ Remover |
| **Blog** | Posts nutrição | ✅ Manter |
| **Footer** | 5 colunas NJ | 🔄 Adaptar |

### **Componentes a Criar (React/Next.js)**

```typescript
// 1. Layout
components/layout/Header.tsx
components/layout/Footer.tsx

// 2. Home Sections
components/home/HeroSection.tsx
components/home/CategorySection.tsx
components/home/AboutSection.tsx
components/home/CoursesSection.tsx
components/home/WhyChooseSection.tsx
components/home/CounterSection.tsx
components/home/TeamSection.tsx
components/home/NewsletterSection.tsx
components/home/TestimonialSection.tsx
components/home/BlogSection.tsx

// 3. Cards
components/cards/CourseCard.tsx
components/cards/InstructorCard.tsx
components/cards/BlogCard.tsx
components/cards/TestimonialCard.tsx
components/cards/CategoryCard.tsx

// 4. Shared
components/shared/Button.tsx
components/shared/SectionTitle.tsx
components/shared/Carousel.tsx
components/shared/Counter.tsx
```

### **Mapeamento de Cores**

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Fistudy → Nutrindo Juntos
        base: {
          DEFAULT: '#19c5ca',  // Era #687EFF
          50: '#e6f9fa',
          100: '#b3f0f2',
          500: '#19c5ca',
          600: '#16a8ad',
          700: '#138b8f',
        },
        primary: {
          DEFAULT: '#6d4d88',  // Era #F87A53
          50: '#f4eef8',
          100: '#e3d4ec',
          500: '#6d4d88',
          600: '#5a3f6f',
          700: '#483256',
        },
        // Manter gray e outras
      }
    }
  }
}
```

---

## ✅ **CHECKLIST DE IMPLEMENTAÇÃO**

### **Fase 1: Estrutura Base** ✅
- [x] Configuração do projeto Next.js
- [x] Tailwind CSS configurado
- [x] shadcn/ui instalado
- [ ] Cores do Fistudy mapeadas para Tailwind
- [ ] Fontes configuradas (Outfit + Lora)

### **Fase 2: Componentes Core** 🔄
- [ ] Header com navegação
- [ ] Footer 5 colunas
- [ ] Button variants (primary, base)
- [ ] SectionTitle component
- [ ] Cards base (Course, Blog, Team, Testimonial)

### **Fase 3: Home Sections** ⏳
- [ ] HeroSection
- [ ] CategorySection (8 áreas nutrição)
- [ ] AboutSection
- [ ] CoursesSection (grid 3×3)
- [ ] WhyChooseSection
- [ ] CounterSection
- [ ] TeamSection
- [ ] NewsletterSection
- [ ] TestimonialSection
- [ ] BlogSection

### **Fase 4: Assets** ⏳
- [ ] Extrair ícones do template
- [ ] Converter SVGs shapes
- [ ] Preparar imagens de placeholder
- [ ] Criar estrutura de assets no projeto

### **Fase 5: Integração** ⏳
- [ ] Payload CMS (cursos, blog, equipe)
- [ ] Brevo (newsletter)
- [ ] Cloudinary (imagens)

---

## 📚 **RECURSOS ADICIONAIS**

### **Documentação Original**
📖 `02-documentation-file/index.html`

### **Fontes**
1. **Template Local:** `NJ_temp/media/Fistudy Template/fistudy-pack/01-html-file/`
2. **Figma MCP:** Design visual completo
3. **WebFetch Scrape:** Estrutura do site online

### **Links Úteis**
- Google Fonts Outfit: https://fonts.google.com/specimen/Outfit
- Google Fonts Lora: https://fonts.google.com/specimen/Lora
- Bootstrap 5 Docs: https://getbootstrap.com/docs/5.0/
- Swiper.js: https://swiperjs.com/

---

## 🎉 **PRÓXIMOS PASSOS**

1. ✅ **Template local acessado e analisado**
2. 🔄 **Extrair e mapear cores/fontes** (em andamento)
3. ⏳ **Converter componentes HTML → React/TypeScript**
4. ⏳ **Adaptar conteúdo para Nutrindo Juntos**
5. ⏳ **Integrar com Payload CMS**

---

**Data de Criação:** 21/11/2025
**Última Atualização:** 21/11/2025
**Status:** ✅ Template Completo Mapeado e Pronto para Uso!
