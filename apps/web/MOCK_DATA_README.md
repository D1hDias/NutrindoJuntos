# 🎭 Sistema de Mock Data - Guia de Uso

## ⚠️ IMPORTANTE: APENAS PARA TESTES

Este sistema de dados mockados é **APENAS para desenvolvimento e testes**.

**DELETAR antes de ir para produção:**
- ❌ `lib/mock-data.ts`
- ❌ Este arquivo (`MOCK_DATA_README.md`)
- ❌ Remover flag `NEXT_PUBLIC_USE_MOCK_DATA` do `.env.local`

---

## 📋 O Que Está Incluído

### Posts de Blog (9 posts)
- **Nutrição Clínica** (2 posts)
  - Anamnese nutricional completa
  - Atendimento em diabetes

- **Nutrição Esportiva** (2 posts)
  - Guia para iniciantes
  - Suplementação esportiva

- **Nutrição Funcional** (2 posts)
  - Ciência e prática clínica
  - Microbiota intestinal

- **Gestão de Consultório** (3 posts)
  - Dicas para iniciar carreira
  - Marketing digital
  - Precificação de consultas

### Categorias (4 categorias)
- Nutrição Clínica
- Nutrição Esportiva
- Nutrição Funcional
- Gestão de Consultório

### Cursos (3 cursos)
- Nutrição Clínica na Prática - R$ 497
- Nutrição Esportiva: Da Teoria à Prática - R$ 597
- Gestão de Consultório de Nutrição - R$ 397

---

## 🚀 Como Ativar/Desativar

### Ativar Mock Data
No arquivo `apps/web/.env.local`, adicione:
```bash
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### Desativar Mock Data
No arquivo `apps/web/.env.local`, mude para:
```bash
NEXT_PUBLIC_USE_MOCK_DATA=false
```

Ou simplesmente **comente a linha**:
```bash
# NEXT_PUBLIC_USE_MOCK_DATA=true
```

---

## 🔄 Como Funciona

### Sistema de Fallback Inteligente

1. **Com Flag Ativada** (`NEXT_PUBLIC_USE_MOCK_DATA=true`):
   - Sistema usa **apenas dados mock**
   - Não tenta buscar do CMS
   - Performance máxima (sem chamadas de API)

2. **Com Flag Desativada** (`NEXT_PUBLIC_USE_MOCK_DATA=false`):
   - Sistema tenta buscar do CMS primeiro
   - Se CMS estiver vazio → usa dados mock como fallback
   - Se CMS tiver dados → usa dados reais

3. **Sem Flag** (não definida):
   - Sistema tenta buscar do CMS
   - Se CMS estiver vazio → usa dados mock como fallback
   - Comportamento padrão seguro

---

## 🧪 Funcionalidades Testáveis

Com os dados mock, você pode testar:

### ✅ Blog
- [x] Listagem de posts
- [x] Paginação (9 posts / 9 por página = 1 página)
- [x] Filtros por categoria
- [x] Busca de posts
- [x] Posts relacionados
- [x] Social sharing
- [x] Reading time
- [x] SEO Schema.org

### ✅ Categorias
- [x] Filtro de categorias no blog
- [x] Badge de categoria nos posts
- [x] Navegação por categoria

### ✅ Home
- [x] Posts em destaque
- [x] Cursos em destaque

---

## 📝 Estrutura dos Dados Mock

### Post Exemplo
```typescript
{
  id: 'post-1',
  title: '10 Dicas Essenciais para Iniciar sua Carreira como Nutricionista',
  slug: 'dicas-iniciar-carreira-nutricionista',
  excerpt: 'Descubra as estratégias fundamentais...',
  content: { /* Rich text content */ },
  featuredImage: {
    url: 'https://images.unsplash.com/...',
    alt: 'Nutricionista atendendo paciente'
  },
  categoria: { name: 'Gestão de Consultório', slug: 'gestao-consultorio' },
  publishedAt: '2025-11-12T...',
  status: 'published'
}
```

### Imagens
Todos os posts usam imagens do **Unsplash** (gratuitas e de alta qualidade):
- Imagens relacionadas ao tema de nutrição
- Resolução 800x600px
- Otimizadas para web (80% quality)

---

## 🎯 URLs de Teste

### Blog
- Lista: `http://localhost:3000/blog`
- Post: `http://localhost:3000/blog/dicas-iniciar-carreira-nutricionista`
- Categoria: `http://localhost:3000/blog?category=nutricao-clinica`

### Cursos
- Lista: `http://localhost:3000/cursos`
- Curso: `http://localhost:3000/cursos/nutricao-clinica-pratica`

### Home
- `http://localhost:3000/` - Mostra posts e cursos em destaque

---

## 🔧 Customização

Para adicionar mais dados mock, edite `lib/mock-data.ts`:

```typescript
export const MOCK_POSTS: Post[] = [
  // Seus posts aqui
  {
    id: 'post-10',
    title: 'Seu Novo Post',
    slug: 'seu-novo-post',
    // ...
  }
]
```

---

## ⚡ Performance

### Com Mock Data
- ✅ **0ms de latência** (dados em memória)
- ✅ **Sem dependência do CMS**
- ✅ **Desenvolvimento offline**
- ✅ **Testes rápidos**

### Com CMS Real
- ⏳ 100-500ms de latência (depende da rede)
- 🌐 Requer CMS rodando
- 📡 Requer conexão de rede

---

## 🚨 Checklist Antes de Produção

Antes de fazer deploy para produção:

- [ ] Deletar `lib/mock-data.ts`
- [ ] Deletar `MOCK_DATA_README.md`
- [ ] Remover `NEXT_PUBLIC_USE_MOCK_DATA` do `.env.local`
- [ ] Remover imports de mock-data dos arquivos:
  - [ ] `lib/api/posts.ts`
  - [ ] `lib/api/categorias.ts`
- [ ] Popular CMS com conteúdo real
- [ ] Testar com dados reais do CMS
- [ ] Verificar que todas as páginas funcionam sem mock data

---

## 💡 Dicas

1. **Durante Desenvolvimento:**
   - Use `NEXT_PUBLIC_USE_MOCK_DATA=true` para velocidade máxima
   - Teste todas as funcionalidades com dados mock primeiro
   - Depois teste com CMS vazio (fallback automático)

2. **Antes de Popular CMS:**
   - Use mock data como referência de estrutura
   - Copie os títulos, descrições e categorias como inspiração
   - Baixe imagens similares do Unsplash

3. **Para Resetar Dados:**
   - Se precisar resetar, basta trocar a flag
   - Não precisa deletar dados do CMS
   - Sistema funciona com ou sem dados reais

---

## 🤔 FAQ

**P: E se eu criar posts no CMS?**
R: Com flag desativada, sistema usará posts do CMS automaticamente.

**P: Posso ter alguns posts no CMS e outros mock?**
R: Não. Sistema usa OU mock OU CMS, nunca misturado.

**P: Como saber se está usando mock?**
R: Abra DevTools → Network. Se não houver chamadas para `/api/posts`, está usando mock.

**P: Mock data afeta SEO?**
R: Não, desde que você desative antes de produção. Google não indexa localhost.

**P: Preciso reiniciar o servidor ao trocar a flag?**
R: Sim, variáveis de ambiente requerem restart do Next.js.

---

**Data de Criação:** 14/11/2025
**Última Atualização:** 14/11/2025
**Status:** ✅ Ativo para desenvolvimento
