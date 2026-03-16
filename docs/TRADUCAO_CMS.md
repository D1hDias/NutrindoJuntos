# 🌐 Sistema de Tradução - Payload CMS

Documentação completa do sistema de traduções em português para o Payload CMS da plataforma NUTRINDO JUNTOS.

---

## 📋 Visão Geral

O Payload CMS foi completamente traduzido para português brasileiro, incluindo:

- ✅ Interface administrativa (menus, botões, ações)
- ✅ Nomes de coleções e globais
- ✅ Mensagens de validação e erro
- ✅ Sistema de autenticação
- ✅ Controle de versões
- ✅ Upload de mídia
- ✅ Filtros e operadores

---

## 📁 Arquivos Envolvidos

### 1. **`apps/cms/src/i18n/pt.ts`**

Arquivo principal de traduções contendo todas as strings em português.

**Categorias incluídas:**

```typescript
translations: {
  // Geral - Botões, ações comuns
  'general:dashboard': 'Painel',
  'general:save': 'Salvar',
  'general:delete': 'Excluir',
  // ... 100+ traduções

  // Autenticação
  'authentication:login': 'Entrar',
  'authentication:password': 'Senha',
  // ... 50+ traduções

  // Coleções
  'collections:users': 'Usuários',
  'collections:posts': 'Posts',
  // ... 7 coleções

  // Campos
  'fields:required': 'Obrigatório',
  'fields:addNew': 'Adicionar novo',
  // ... 40+ traduções

  // Validação
  'validation:required': 'Este campo é obrigatório',
  'validation:emailAddress': 'Insira um endereço de email válido',
  // ... 20+ traduções

  // Erros
  'error:savingTitle': 'Erro ao salvar {{title}}',
  'error:unknown': 'Ocorreu um erro desconhecido',
  // ... 15+ traduções

  // Versões
  'version:publish': 'Publicar',
  'version:draft': 'Rascunho',
  // ... 40+ traduções

  // Upload
  'upload:dragAndDrop': 'Arraste e solte um arquivo',
  'upload:selectFile': 'Selecionar arquivo',
  // ... 15+ traduções

  // Operadores
  'operators:equals': 'é igual a',
  'operators:contains': 'contém',
  // ... 12+ traduções
}
```

---

### 2. **`apps/cms/src/payload.config.ts`**

Configuração do i18n e localização.

**Configurações adicionadas:**

```typescript
// i18n configuration
i18n: {
  supportedLanguages: {
    pt,  // Importado de './i18n/pt'
  },
  fallbackLanguage: 'pt',
},

// Localization
localization: {
  locales: [
    {
      label: 'Português',
      code: 'pt',
    },
    {
      label: 'English',
      code: 'en',
    },
  ],
  defaultLocale: 'pt',
  fallback: true,
},
```

---

### 3. **`apps/cms/src/styles/admin.css`**

Traduções via CSS para elementos específicos (sidebar e dashboard).

**Traduções CSS implementadas:**

```css
/* ============ SIDEBAR ============ */

/* "Collections" → "Coleções" */
.nav-group#nav-group-Collections .nav-group__label::after {
  content: 'Coleções' !important;
}

/* "Globals" → "Globais" */
.nav-group#nav-group-Globals .nav-group__label::after {
  content: 'Globais' !important;
}

/* ============ DASHBOARD - MODO LIGHT ============ */

/* Título "Collections" → "Coleções" */
.dashboard__group:first-child .dashboard__label::after {
  content: 'Coleções' !important;
  color: var(--secondary-600) !important;
}

/* Título "Globals" → "Globais" */
.dashboard__group:last-child .dashboard__label::after {
  content: 'Globais' !important;
  color: var(--secondary-600) !important;
}

/* ============ DASHBOARD - MODO DARK ============ */

[data-theme="dark"] .dashboard__label::after {
  color: #e5e5e5 !important;
}
```

**Por que CSS para alguns elementos?**

Alguns elementos do Payload CMS são gerados dinamicamente via JavaScript e não podem ser traduzidos através do sistema de i18n. Nesses casos, usamos CSS para sobrescrever o texto.

---

## 🎯 O Que Foi Traduzido

### ✅ Interface Completa

| Área | Status | Exemplos |
|------|--------|----------|
| **Menu/Navegação** | ✅ | Dashboard, Usuários, Posts, Mídia |
| **Botões** | ✅ | Salvar, Excluir, Criar, Cancelar, Voltar |
| **Autenticação** | ✅ | Entrar, Sair, Senha, Email, Esqueceu a senha |
| **Formulários** | ✅ | Obrigatório, Adicionar novo, Remover, Enviar |
| **Validação** | ✅ | Este campo é obrigatório, Email inválido |
| **Erros** | ✅ | Erro ao salvar, Erro ao carregar documento |
| **Versões** | ✅ | Publicar, Rascunho, Restaurar versão |
| **Upload** | ✅ | Arrastar e soltar, Selecionar arquivo, Cortar |
| **Filtros** | ✅ | Contém, É igual a, É maior que |
| **Títulos Sidebar** | ✅ | Coleções, Globais |
| **Títulos Dashboard** | ✅ | Coleções, Globais (ambos os modos) |

---

### ✅ Coleções Traduzidas

```typescript
'collections:users': 'Usuários',
'collections:posts': 'Posts',
'collections:categorias': 'Categorias',
'collections:tags': 'Tags',
'collections:cursos': 'Cursos',
'collections:equipe': 'Equipe',
'collections:media': 'Mídia',
```

**Resultado:**
- **"Users"** → **"Usuários"**
- **"Media"** → **"Mídia"**
- Outras coleções permanecem igual (já estão em português)

---

## 🌓 Suporte a Modo Dark/Light

### Modo Light (Padrão)
- Títulos "Coleções" e "Globais" aparecem em **roxo escuro** (`var(--secondary-600)`)
- Contraste perfeito sobre fundo branco
- Fonte display elegante (`Playfair Display`)

### Modo Dark
- Títulos "Coleções" e "Globais" aparecem em **branco** (`#e5e5e5`)
- Contraste perfeito sobre fundo escuro
- Consistência visual mantida

---

## 🔧 Como Funciona

### 1. **Sistema de i18n Nativo do Payload**

O Payload CMS possui um sistema de internacionalização (i18n) nativo que permite sobrescrever strings.

**Fluxo:**

```
Usuário acessa CMS
    ↓
Payload verifica idioma (pt)
    ↓
Carrega traduções de i18n/pt.ts
    ↓
Substitui strings automáticas
    ↓
Interface em português
```

### 2. **Traduções via CSS (Casos Especiais)**

Para elementos gerados dinamicamente que o i18n não alcança:

```
Elemento renderizado (ex: "Collections")
    ↓
CSS oculta texto original (text-indent: -9999px)
    ↓
CSS adiciona texto traduzido (::after { content: 'Coleções' })
    ↓
Usuário vê "Coleções"
```

---

## 📝 Personalização

### Adicionar Nova Tradução

**1. Edite `apps/cms/src/i18n/pt.ts`:**

```typescript
export const pt: Language = {
  translations: {
    // ... traduções existentes

    // Adicionar nova categoria
    'minhacategoria:minhatradução': 'Meu Texto Traduzido',
  },
}
```

**2. Use no Payload:**

```typescript
// Automaticamente aplicado se seguir convenção do Payload
// Ex: 'general:save' → Botão "Salvar"
```

### Adicionar Novo Idioma

**1. Crie arquivo `apps/cms/src/i18n/es.ts`:**

```typescript
import type { Language } from 'payload/config'

export const es: Language = {
  translations: {
    'general:dashboard': 'Panel',
    'general:save': 'Guardar',
    // ... mais traduções
  },
}
```

**2. Atualize `payload.config.ts`:**

```typescript
import { pt } from './i18n/pt'
import { es } from './i18n/es'

export default buildConfig({
  i18n: {
    supportedLanguages: {
      pt,
      es,
    },
    fallbackLanguage: 'pt',
  },

  localization: {
    locales: [
      { label: 'Português', code: 'pt' },
      { label: 'Español', code: 'es' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'pt',
  },
})
```

---

## 🧪 Testes

### Verificar Traduções

**1. Modo Light:**
```bash
# Iniciar CMS
cd apps/cms
pnpm dev

# Acessar http://localhost:3001/admin
# Verificar:
# - Sidebar: "Coleções" e "Globais" estão visíveis?
# - Dashboard: Títulos "Coleções" e "Globais" aparecem?
# - Botões: "Salvar", "Excluir", etc em português?
```

**2. Modo Dark:**
```bash
# Clicar no botão de modo dark (lua/sol)
# Verificar:
# - Títulos "Coleções" e "Globais" aparecem em branco?
# - Contraste adequado?
# - Botões e menus traduzidos?
```

**3. Seletor de Idioma:**
```bash
# Ir em: Perfil → Idioma
# Selecionar "Português"
# Verificar:
# - "Users" → "Usuários"
# - "Media" → "Mídia"
# - Todas as mensagens em português
```

---

## 🐛 Troubleshooting

### Problema: Traduções não aparecem

**Causa:** Arquivo `i18n/pt.ts` não importado corretamente.

**Solução:**

```typescript
// payload.config.ts
import { pt } from './i18n/pt' // ✅ Importar

export default buildConfig({
  i18n: {
    supportedLanguages: {
      pt, // ✅ Incluir
    },
  },
})
```

---

### Problema: "Coleções" e "Globais" não aparecem no dashboard

**Causa:** CSS pode estar sendo sobrescrito.

**Solução:**

1. **Verificar `admin.css` está sendo carregado:**

```typescript
// payload.config.ts
admin: {
  css: path.resolve(__dirname, 'styles/admin.css'), // ✅
}
```

2. **Inspecionar elemento no navegador:**
   - Botão direito → Inspecionar
   - Verificar se `.dashboard__label::after` tem `content: 'Coleções'`
   - Se não, pode haver conflito de especificidade CSS

3. **Aumentar especificidade (se necessário):**

```css
/* Adicionar !important se necessário */
.dashboard__group:first-child .dashboard__label::after {
  content: 'Coleções' !important;
  display: block !important;
}
```

---

### Problema: Modo dark não traduz corretamente

**Causa:** Cores CSS podem estar incorretas.

**Solução:**

```css
/* Verificar em admin.css */
[data-theme="dark"] .dashboard__label::after {
  color: #e5e5e5 !important; /* ✅ Branco visível */
}
```

---

## 📚 Referências

- [Payload CMS i18n Docs](https://payloadcms.com/docs/configuration/i18n)
- [Payload CMS Localization](https://payloadcms.com/docs/configuration/localization)
- [CSS ::after Pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::after)

---

## 🎯 Checklist de Implementação

- [x] Criar arquivo `i18n/pt.ts` com traduções completas
- [x] Configurar `payload.config.ts` com i18n e localization
- [x] Adicionar traduções CSS para "Coleções" e "Globais"
- [x] Traduzir sidebar (modo light e dark)
- [x] Traduzir dashboard (modo light e dark)
- [x] Testar todas as áreas traduzidas
- [x] Documentar sistema de tradução

---

**Data da última atualização:** 16/11/2025
**Versão:** 1.0
**Status:** ✅ Completo
