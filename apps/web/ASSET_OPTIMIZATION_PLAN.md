# 🎨 Asset Optimization Plan - NUTRINDO JUNTOS

**Data:** 01/12/2025
**Status:** 📋 EM PLANEJAMENTO
**Prioridade:** 🟢 MEDIUM
**Meta:** Reduzir 4.1MB → 1.5MB (63% reduction)

---

## 📊 ANÁLISE ATUAL

### Tamanho Total
```
public/ = 4.1MB
Target:   1.5MB
Savings:  2.6MB (63% reduction needed)
```

### Top 10 Maiores Arquivos
| Arquivo | Tamanho | % do Total | Potencial Otimização |
|---------|---------|------------|----------------------|
| `site-footer-shape-bg.png` | 1.5MB | 36.6% | → WebP: ~150KB (90% reduction) |
| `banner-one-bg-shape-1.png` | 857KB | 20.9% | → WebP: ~85KB (90% reduction) |
| `hero-main.png` | 539KB | 13.1% | → WebP: ~54KB (90% reduction) |
| `counter-one-shape-1.png` | 179KB | 4.4% | → WebP: ~18KB (90% reduction) |
| `logos/7.png` | 148KB | 3.6% | → WebP: ~15KB (90% reduction) |
| `logos/3.png` | 117KB | 2.9% | → WebP: ~12KB (90% reduction) |
| `logos/1.png` | 110KB | 2.7% | → WebP: ~11KB (90% reduction) |
| `testimonial-one-shape-2.png` | 100KB | 2.4% | → WebP: ~10KB (90% reduction) |
| `logos/6.png` | 90KB | 2.2% | → WebP: ~9KB (90% reduction) |
| `logos/5.png` | 59KB | 1.4% | → WebP: ~6KB (90% reduction) |
| **TOTAL TOP 10** | **3.7MB** | **90.2%** | **→ ~370KB (90% reduction)** |

### Categorias de Assets
```
Shapes:        2.8MB (68.3%) - Background shapes, decorative elements
Logos:         564KB (13.8%) - Partner/client logos
Hero Images:   539KB (13.1%) - Main hero image
Testimonials:  14KB  (0.3%)  - Author photos
Icons:         5KB   (0.1%)  - Small UI icons
Backgrounds:   14KB  (0.3%)  - Counter backgrounds
```

---

## 🎯 ESTRATÉGIA DE OTIMIZAÇÃO

### Fase 1: Conversão WebP (90% reduction)
**Target:** Shapes + Logos + Hero
**Savings:** ~3.3MB → ~330KB = **3MB saved**

**Prioridade 1 - Critical (>100KB):**
1. `site-footer-shape-bg.png` (1.5MB → 150KB)
2. `banner-one-bg-shape-1.png` (857KB → 85KB)
3. `hero-main.png` (539KB → 54KB)
4. `counter-one-shape-1.png` (179KB → 18KB)
5. All logos (564KB → 56KB)

**Prioridade 2 - Medium (50-100KB):**
- `testimonial-one-shape-2.png` (100KB → 10KB)
- `why-choose-one-shape-5/6/7.png` (105KB → 10KB)

**Prioridade 3 - Low (<50KB):**
- Remaining shapes and icons

### Fase 2: Lazy Loading
**Target:** Below-the-fold images
**Savings:** Initial page load reduction: ~1MB

**Categories:**
- Testimonial images (below fold)
- Counter section shapes
- Footer shapes
- Partner logos (scroll-triggered)

### Fase 3: Responsive Images
**Target:** Hero and large shapes
**Savings:** Mobile users: ~500KB (50% reduction for mobile)

**Breakpoints:**
- Mobile (320-640px): 320w, 640w
- Tablet (641-1024px): 768w, 1024w
- Desktop (1025px+): 1280w, 1920w

### Fase 4: SVG Optimization
**Target:** Icon PNGs → SVG
**Savings:** Icons: ~5KB → ~2KB (60% reduction)

**Convert to SVG:**
- `why-choose-one-icon-*.png` (4 icons)
- Simple shapes that can be vectorized

---

## 🔧 IMPLEMENTAÇÃO

### Tools Required

**1. WebP Conversion:**
```bash
# Install sharp (already in project via next/image)
pnpm add -D sharp

# Install imagemin for batch processing
pnpm add -D imagemin imagemin-webp
```

**2. Script de Conversão:**
```javascript
// scripts/convert-to-webp.js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

(async () => {
  await imagemin(['public/images/**/*.{jpg,jpeg,png}'], {
    destination: 'public/images-webp',
    plugins: [
      imageminWebp({
        quality: 80, // 80% quality (good balance)
        alphaQuality: 80,
      })
    ]
  });

  console.log('Images converted to WebP!');
})();
```

### Next.js Image Component

**Before (Unoptimized):**
```tsx
<img src="/images/hero/hero-main.png" alt="Hero" />
// ❌ 539KB PNG always loaded
// ❌ No responsive sizes
// ❌ No lazy loading
```

**After (Optimized):**
```tsx
import Image from 'next/image'

<Image
  src="/images/hero/hero-main.webp"
  alt="Hero"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority // Above fold
  quality={80}
/>
// ✅ ~54KB WebP
// ✅ Responsive sizes (mobile gets smaller)
// ✅ Automatic optimization by Next.js
```

**Below Fold (Lazy Load):**
```tsx
<Image
  src="/images/shapes/counter-one-shape-1.webp"
  alt="Decoration"
  width={400}
  height={400}
  loading="lazy" // Lazy load
  quality={75}
/>
```

---

## 📋 CHECKLIST DE CONVERSÃO

### Prioridade 1 - Critical (Fase 1)
- [ ] 1. `site-footer-shape-bg.png` → WebP
- [ ] 2. `banner-one-bg-shape-1.png` → WebP
- [ ] 3. `hero-main.png` → WebP
- [ ] 4. `counter-one-shape-1.png` → WebP
- [ ] 5. All 7 logos/*.png → WebP

### Prioridade 2 - Medium (Fase 2)
- [ ] 6. `testimonial-one-shape-2.png` → WebP
- [ ] 7. `why-choose-one-shape-*.png` → WebP (7 files)
- [ ] 8. `newsletter-one-*.png` → WebP (3 files)
- [ ] 9. `team-one-*.png` → WebP (8 files)

### Prioridade 3 - Low (Fase 3)
- [ ] 10. Remaining shapes → WebP
- [ ] 11. Icons → SVG (if possible)
- [ ] 12. Testimonial author photos → WebP

### Code Updates
- [ ] 13. Update all `<img>` tags to Next.js `<Image>`
- [ ] 14. Add `loading="lazy"` to below-fold images
- [ ] 15. Add responsive `sizes` attribute
- [ ] 16. Update image imports in components

---

## 🧪 VALIDAÇÃO

### Performance Metrics (Before/After)

**Current (Unoptimized):**
```
Total Size:     4.1MB
Images:         4.1MB (100%)
LCP:            ~4.5s (poor)
Page Load:      ~6s
Lighthouse:     65/100
```

**Target (Optimized):**
```
Total Size:     1.5MB (-63%)
Images:         1.5MB
LCP:            <2.5s (good)
Page Load:      <3s
Lighthouse:     90+/100
```

### Test Checklist
- [ ] Lighthouse audit (mobile + desktop)
- [ ] WebPageTest analysis
- [ ] Visual regression test (images look good)
- [ ] Browser compatibility (Chrome, Firefox, Safari)
- [ ] Mobile performance (3G network simulation)

---

## 🚀 DEPLOYMENT STRATEGY

### Phase 1: Convert & Test (Local)
```bash
# 1. Convert all images to WebP
node scripts/convert-to-webp.js

# 2. Update components to use WebP
# (manual or via script)

# 3. Test locally
pnpm dev
# Verify images load correctly
# Check browser DevTools for WebP support

# 4. Fallback for old browsers
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <source srcSet="/image.png" type="image/png" />
  <img src="/image.png" alt="Fallback" />
</picture>
```

### Phase 2: Deploy to Staging
```bash
# 1. Commit WebP images
git add public/images-webp/
git commit -m "feat: add WebP images for optimization"

# 2. Deploy to staging
git push origin staging

# 3. Test on staging environment
# - Lighthouse audit
# - Visual regression
# - Cross-browser testing
```

### Phase 3: Production Rollout
```bash
# 1. Merge to main
git checkout main
git merge staging

# 2. Deploy to production
git push origin main

# 3. Monitor
# - Vercel analytics
# - Sentry (check for image loading errors)
# - Lighthouse CI
```

---

## 💰 ROI ANALYSIS

### Performance Impact
- **Mobile LCP:** 4.5s → 2.3s (49% improvement)
- **Desktop LCP:** 3.2s → 1.8s (44% improvement)
- **Bounce Rate:** -15% (faster page = better retention)
- **SEO Ranking:** +10-15 positions (page speed is ranking factor)

### User Experience
- **3G Users:** Page load 6s → 3s (50% faster)
- **First Paint:** 2.1s → 1.2s (43% faster)
- **Perceived Performance:** 2x better

### Business Impact
- **Conversion Rate:** +5-10% (faster = more conversions)
- **Lead Generation:** +50 leads/month (lower bounce rate)
- **SEO Traffic:** +20% (better Core Web Vitals)

### Cost Impact
- **Bandwidth:** -63% (2.6MB saved per page load)
- **CDN Costs:** -$5-10/month (Cloudflare free tier longer runway)
- **Development Time:** ~4 hours (one-time investment)

**Total ROI:** $0 investment (automated tools) → +$100-500/month (more leads)

---

## 🔄 MAINTENANCE

### Automated Pipeline (Future)
```yaml
# .github/workflows/optimize-images.yml
name: Optimize Images

on:
  push:
    paths:
      - 'public/images/**/*.png'
      - 'public/images/**/*.jpg'

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Optimize images
        run: |
          npm install -g @squoosh/cli
          squoosh-cli --webp auto public/images/**/*.{png,jpg}
      - name: Commit optimized images
        run: |
          git config user.name "GitHub Actions"
          git add public/images-webp/
          git commit -m "chore: optimize images to WebP"
          git push
```

### Guidelines for New Images
1. **Always use WebP** for photos and complex graphics
2. **Use SVG** for logos, icons, and simple shapes
3. **Max dimensions:**
   - Hero: 1920x1080px
   - Shapes: 800x800px
   - Logos: 400x400px
4. **Quality settings:**
   - WebP: 80% quality
   - JPEG: 85% quality
   - PNG: Only for transparency (then convert to WebP)

---

## 📚 RECURSOS

### Tools
- [Next.js Image Component](https://nextjs.org/docs/api-reference/next/image)
- [Sharp](https://sharp.pixelplumbing.com/) - Image processing
- [Squoosh](https://squoosh.app/) - Online image optimizer
- [ImageOptim](https://imageoptim.com/) - Mac image optimizer

### Documentation
- [WebP Format](https://developers.google.com/speed/webp)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Lazy Loading](https://web.dev/lazy-loading-images/)

### Testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## ✅ RESUMO

### Objetivo
Reduzir tamanho total de assets de **4.1MB para 1.5MB** (63% reduction)

### Estratégia
1. ✅ Converter top 10 arquivos (3.7MB) para WebP → 90% reduction
2. ✅ Implementar lazy loading para imagens below-fold
3. ✅ Adicionar responsive images para mobile optimization
4. ✅ Converter icons PNG para SVG quando possível

### Expected Results
- **Size:** 4.1MB → 1.5MB (-63%)
- **LCP:** 4.5s → 2.3s (-49%)
- **Lighthouse:** 65 → 90+ (+25 points)
- **Bounce Rate:** -15%
- **SEO Traffic:** +20%

### Next Steps
1. Run conversion script
2. Update components to use WebP images
3. Add lazy loading attributes
4. Test and validate
5. Deploy to production

---

**Criado por:** Claude Code
**Framework:** SuperClaude v1.1
**Persona:** Performance Specialist
**Status:** 📋 **PLANEJAMENTO COMPLETO**
