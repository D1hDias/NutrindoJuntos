# 🧪 CHECKLIST DE TESTES DE USABILIDADE - NUTRINDO JUNTOS

**Data:** 02/12/2025
**Ambiente:** Desenvolvimento (http://localhost:3000)
**Status:** Pronto para testes

---

## 🎯 OBJETIVO DOS TESTES

Validar a experiência do usuário em todos os fluxos críticos do site antes do deploy em produção.

---

## ✅ CHECKLIST DE TESTES

### 1. 🏠 NAVEGAÇÃO GERAL

#### Header
- [ ] Logo clicável (leva para home)
- [ ] Menu de navegação visível e funcional
- [ ] Links funcionam: Home, Sobre, Equipe, Cursos, Mentoria, Blog, Contato
- [ ] Menu mobile (hamburger) funciona em telas pequenas
- [ ] Transições suaves entre páginas

#### Footer
- [ ] Links de navegação funcionam
- [ ] Links de redes sociais funcionam (ou indicam "Em breve")
- [ ] Formulário de newsletter funcional
- [ ] Links de políticas (Privacidade, Termos) funcionam
- [ ] Copyright e informações visíveis

#### Responsividade
- [ ] Mobile (375px - 767px): Layout se adapta corretamente
- [ ] Tablet (768px - 1023px): Layout se adapta corretamente
- [ ] Desktop (1024px+): Layout se adapta corretamente
- [ ] Nenhum elemento quebra ou fica cortado
- [ ] Textos são legíveis em todos os tamanhos

---

### 2. 🏡 PÁGINA HOME

#### Hero Section
- [ ] Título e subtítulo visíveis e legíveis
- [ ] CTA principal funcional (leva para cursos ou formulário)
- [ ] Imagem/ilustração carrega corretamente
- [ ] Animações suaves (se houver)

#### Seções de Conteúdo
- [ ] Todas as seções carregam corretamente
- [ ] Cards/elementos interativos respondem a hover
- [ ] CTAs secundários funcionam
- [ ] Depoimentos/estatísticas visíveis
- [ ] Links para cursos/blog funcionam

#### Performance
- [ ] Página carrega em menos de 3 segundos
- [ ] Imagens carregam progressivamente (lazy loading)
- [ ] Não há layout shift perceptível (CLS)

---

### 3. 📚 SISTEMA DE CURSOS

#### Página de Listagem (/cursos)
- [ ] Todos os cursos aparecem em cards
- [ ] Filtros funcionam (se implementados)
- [ ] Cards mostram informações corretas:
  - [ ] Título
  - [ ] Descrição resumida
  - [ ] Carga horária
  - [ ] Preço (ou "Consulte")
  - [ ] CTA "Ver Detalhes" ou "Tenho Interesse"
- [ ] Hover nos cards funciona
- [ ] Mobile: cards empilham corretamente

#### Página Individual do Curso (/cursos/[slug])
- [ ] Título e descrição completa visíveis
- [ ] Informações detalhadas:
  - [ ] Público-alvo
  - [ ] Pré-requisitos
  - [ ] Programa/Módulos
  - [ ] Carga horária
  - [ ] Investimento
  - [ ] Formas de pagamento
- [ ] Formulário "Tenho Interesse" visível
- [ ] Breadcrumbs funcionam
- [ ] Botão "Voltar" ou navegação para lista de cursos

#### Formulário de Interesse
- [ ] Campos obrigatórios marcados
- [ ] Validação funciona:
  - [ ] Nome (mínimo 3 caracteres)
  - [ ] Email (formato válido)
  - [ ] Telefone (formato brasileiro)
  - [ ] Checkbox de consentimento LGPD
- [ ] Mensagens de erro claras
- [ ] Envio funcional (testar com dados reais)
- [ ] Feedback visual após envio (sucesso/erro)
- [ ] Email de confirmação recebido (verificar inbox)

---

### 4. 🤝 PÁGINA DE MENTORIA

#### Conteúdo
- [ ] Título e descrição clara
- [ ] Benefícios da mentoria listados
- [ ] Como funciona o processo
- [ ] Perfis dos mentores visíveis
- [ ] Investimento/preços claros
- [ ] FAQs (se houver)

#### Formulário de Interesse
- [ ] Mesmas validações do formulário de cursos
- [ ] Campos adicionais (se houver):
  - [ ] Área de interesse
  - [ ] Experiência atual
  - [ ] Objetivos
- [ ] Envio funcional
- [ ] Feedback visual
- [ ] Email de confirmação

---

### 5. 📝 SISTEMA DE BLOG

#### Página de Listagem (/blog)
- [ ] Posts aparecem em grid/lista
- [ ] Cada post mostra:
  - [ ] Imagem de destaque
  - [ ] Título
  - [ ] Excerpt/resumo
  - [ ] Data de publicação
  - [ ] Autor
  - [ ] Categorias/tags
  - [ ] Tempo de leitura
- [ ] Hover nos cards funciona
- [ ] Paginação funciona (se houver múltiplas páginas)
- [ ] Link "Ler mais" leva para post completo

#### Filtros e Busca
- [ ] Filtro por categoria funciona
- [ ] Campo de busca funcional
- [ ] Resultados corretos aparecem
- [ ] Mensagem "Nenhum resultado" se não houver posts
- [ ] Botão "Limpar filtros" funciona

#### Página Individual do Post (/blog/[slug])
- [ ] Título do post visível
- [ ] Imagem de destaque carrega
- [ ] Metadados corretos:
  - [ ] Autor
  - [ ] Data de publicação
  - [ ] Tempo de leitura
  - [ ] Categorias/tags
- [ ] Conteúdo formatado corretamente:
  - [ ] Headings (H2, H3)
  - [ ] Parágrafos
  - [ ] Listas
  - [ ] Imagens inline
  - [ ] Links (se houver)
- [ ] Botões de compartilhamento social funcionam:
  - [ ] Facebook
  - [ ] Twitter/X
  - [ ] LinkedIn
  - [ ] WhatsApp
- [ ] CTA para newsletter inline
- [ ] Posts relacionados aparecem
- [ ] Breadcrumbs funcionam
- [ ] Comentários (se implementado)

#### SEO
- [ ] Meta title e description corretos (ver source)
- [ ] Open Graph tags presentes (testar com debugger do Facebook)
- [ ] Schema markup de Article (testar com Google Rich Results)
- [ ] URL amigável (slug correto)

---

### 6. 💌 SISTEMA DE NEWSLETTER

#### Formulário (Footer e Inline)
- [ ] Campo de nome funcional
- [ ] Campo de email funcional
- [ ] Validação de email
- [ ] Checkbox de consentimento LGPD
- [ ] Botão de envio funcional
- [ ] Feedback visual após envio
- [ ] Email de boas-vindas recebido

#### Email de Boas-Vindas
- [ ] Email chega em até 5 minutos
- [ ] Remetente correto (Nutrindo Juntos)
- [ ] Assunto relevante
- [ ] Conteúdo personalizado (nome do inscrito)
- [ ] Links funcionam
- [ ] Footer com link de descadastro
- [ ] Design responsivo no email

---

### 7. 📞 PÁGINA DE CONTATO

#### Formulário
- [ ] Campos obrigatórios:
  - [ ] Nome
  - [ ] Email
  - [ ] Telefone (opcional)
  - [ ] Assunto
  - [ ] Mensagem
- [ ] Validações funcionam
- [ ] Checkbox de consentimento LGPD
- [ ] Envio funcional
- [ ] Feedback visual
- [ ] Email de confirmação recebido

#### Informações de Contato
- [ ] Email de contato visível
- [ ] Telefone/WhatsApp visível
- [ ] Redes sociais linkadas
- [ ] Horário de atendimento (se houver)
- [ ] Mapa/endereço (se houver)

---

### 8. 👥 PÁGINA "SOBRE" E "EQUIPE"

#### Sobre (/sobre)
- [ ] História da empresa clara
- [ ] Missão e valores visíveis
- [ ] Diferenciais destacados
- [ ] CTAs relevantes (cursos, contato)
- [ ] Imagens/ilustrações carregam

#### Equipe (/equipe)
- [ ] Cards de membros da equipe
- [ ] Foto de cada membro
- [ ] Nome e cargo
- [ ] Bio resumida
- [ ] Links para redes sociais profissionais (LinkedIn)
- [ ] Modal ou página expandida funciona (se houver)

---

### 9. 🔒 SEGURANÇA E PRIVACIDADE

#### LGPD Compliance
- [ ] Todos os formulários têm checkbox de consentimento
- [ ] Textos explicam uso dos dados
- [ ] Links para Política de Privacidade funcionam
- [ ] Política de Privacidade está completa e atualizada
- [ ] Termos de Uso estão completos e atualizados

#### Security Headers (DevTools > Network)
- [ ] Content-Security-Policy presente
- [ ] Strict-Transport-Security presente
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer-Policy presente

#### security.txt
- [ ] Acessível em `/.well-known/security.txt`
- [ ] Acessível em `/security.txt`
- [ ] Informações corretas (email, política)

---

### 10. ⚡ PERFORMANCE

#### Lighthouse Scores (Chrome DevTools)
- [ ] Performance: ≥ 90
- [ ] Accessibility: ≥ 95
- [ ] Best Practices: ≥ 90
- [ ] SEO: 100

#### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

#### Loading
- [ ] Imagens otimizadas (WebP)
- [ ] Lazy loading funciona
- [ ] Fonts carregam sem flash (FOUT/FOIT)
- [ ] Sem recursos bloqueantes críticos

---

### 11. ♿ ACESSIBILIDADE

#### Navegação por Teclado
- [ ] Tab navega entre elementos interativos
- [ ] Focus visível em todos os elementos
- [ ] Enter/Space ativam botões e links
- [ ] Escape fecha modais/dropdowns
- [ ] Skip to content funciona (se houver)

#### Screen Readers
- [ ] Alt text em todas as imagens
- [ ] Labels em todos os inputs
- [ ] Headings em ordem correta (H1 → H2 → H3)
- [ ] Landmarks ARIA (nav, main, footer)
- [ ] Mensagens de erro anunciadas
- [ ] Loading states anunciados

#### Contraste e Legibilidade
- [ ] Contraste texto/fundo ≥ 4.5:1 (AA)
- [ ] Textos legíveis sem zoom
- [ ] Touch targets ≥ 44x44px
- [ ] Sem uso exclusivo de cor para informação

---

### 12. 🌐 SEO TÉCNICO

#### Meta Tags (View Source)
- [ ] Title único por página
- [ ] Meta description única por página
- [ ] Open Graph tags completas
- [ ] Twitter Card tags
- [ ] Canonical URLs corretas
- [ ] Viewport meta tag presente

#### Estrutura
- [ ] Sitemap.xml acessível (`/sitemap.xml`)
- [ ] Robots.txt acessível (`/robots.txt`)
- [ ] URLs amigáveis (sem query strings desnecessárias)
- [ ] Breadcrumbs com schema markup
- [ ] Schema.org markup (Organization, Article)

#### Conteúdo
- [ ] Headings em ordem lógica
- [ ] Conteúdo único por página
- [ ] Links internos relevantes
- [ ] Alt text descritivo em imagens
- [ ] Texto âncora descritivo em links

---

### 13. 📱 CROSS-BROWSER TESTING

#### Desktop
- [ ] Chrome (última versão)
- [ ] Firefox (última versão)
- [ ] Safari (macOS)
- [ ] Edge (última versão)

#### Mobile
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet
- [ ] Firefox Mobile

#### Funcionalidades
- [ ] Formulários funcionam
- [ ] Navegação funciona
- [ ] Modais/overlays funcionam
- [ ] Animações suaves
- [ ] Touch gestures funcionam

---

### 14. 🔗 INTEGRAÇÕES EXTERNAS

#### Brevo (Email Marketing)
- [ ] Newsletter signup funciona
- [ ] Leads de cursos salvos corretamente
- [ ] Leads de mentoria salvos corretamente
- [ ] Contato geral salvo corretamente
- [ ] Tags aplicadas corretamente
- [ ] Emails automáticos enviados

#### Google Analytics
- [ ] GA4 carregando (verificar Network tab)
- [ ] Pageviews sendo registradas
- [ ] Eventos personalizados funcionando (se houver)

#### Cloudinary
- [ ] Imagens carregam corretamente
- [ ] Transformações funcionam (resize, crop)
- [ ] Fallback para imagens quebradas

---

## 🐛 REGISTRO DE BUGS

**Encontrou algum problema? Anote aqui:**

| Página | Problema | Severidade | Status |
|--------|----------|------------|--------|
| Exemplo: /blog | Busca não retorna resultados | Alta | ⏳ Pendente |
|        |          |            |        |
|        |          |            |        |

**Severidades:**
- 🔴 **Crítica:** Impede uso principal do site
- 🟡 **Alta:** Prejudica experiência, mas tem workaround
- 🟢 **Média:** Bug visual ou de UX menor
- 🔵 **Baixa:** Melhoria ou ajuste fino

---

## ✅ APROVAÇÃO FINAL

Após completar todos os testes acima:

- [ ] Todos os fluxos críticos funcionam
- [ ] Performance está dentro dos targets
- [ ] Acessibilidade atende WCAG 2.1 AA
- [ ] SEO está otimizado
- [ ] Segurança implementada
- [ ] Bugs críticos resolvidos
- [ ] Aprovado para deploy em produção

---

**Testador:** _________________
**Data:** _________________
**Assinatura:** _________________

---

## 📊 FERRAMENTAS ÚTEIS PARA TESTES

### Performance
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

### SEO
- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Ahrefs SEO Toolbar](https://ahrefs.com/seo-toolbar)

### Acessibilidade
- [WAVE](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Segurança
- [SecurityHeaders.com](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

### Cross-Browser
- [BrowserStack](https://www.browserstack.com/)
- [LambdaTest](https://www.lambdatest.com/)

### Responsividade
- Chrome DevTools (Device Mode)
- [Responsively App](https://responsively.app/)
- [Blisk Browser](https://blisk.io/)

---

**Boa sorte com os testes! 🚀**
