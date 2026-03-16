# 🚀 Guia Rápido de Ativação - Fases 2 e 3

**Versão:** 1.0
**Data:** 16/11/2025
**Status:** Guia de Implementação Futura

---

## 📋 Índice

1. [Quando Ativar Cada Fase](#quando-ativar-cada-fase)
2. [Fase 2: Pagamentos (Checklist)](#fase-2-pagamentos)
3. [Fase 3: Streaming (Checklist)](#fase-3-streaming)
4. [Problemas Comuns](#problemas-comuns)

---

## 🎯 Quando Ativar Cada Fase

### Fase 1 - MVP (✅ ATIVO AGORA)
**Status:** Em produção
**Quando:** Já implementado
**O que faz:**
- Site institucional
- Blog SEO
- Captação de leads
- Conversão manual

---

### Fase 2 - Pagamentos
**Status:** 🟡 Preparado (aguardando ativação)

**Quando ativar:**
✅ Quando atingir 3+ critérios:
- [ ] ≥300 leads qualificados
- [ ] ≥3.000 visitantes/mês
- [ ] Taxa de conversão manual ≥3%
- [ ] Processo manual está consumindo muito tempo da equipe
- [ ] Demanda validada por cursos

**Gatilhos claros:**
- Equipe gastando >20h/semana em follow-up manual
- Taxa de abandono alta no processo manual
- Feedback de usuários pedindo pagamento online

---

### Fase 3 - Streaming
**Status:** 🔵 Planejado

**Quando ativar:**
✅ Quando atingir TODOS os critérios:
- [ ] Fase 2 rodando estável por ≥3 meses
- [ ] ≥100 alunos pagantes ativos
- [ ] Receita recorrente (MRR) ≥R$ 15.000
- [ ] ≥5 cursos gravados e prontos
- [ ] Time de suporte estruturado

**Gatilhos claros:**
- Demanda por acesso on-demand aos cursos
- Alunos pedindo para rever aulas
- Custos de cursos ao vivo ficando altos

---

## 💳 Fase 2: Pagamentos

### 🎯 Objetivo
Automatizar o processo de vendas, eliminando conversão manual.

### ⏱️ Tempo Estimado
**4 semanas** (se seguir o checklist)

---

### ✅ Checklist de Ativação

#### Semana 1: Setup de Contas

- [ ] **1.1 Criar conta Stripe**
  - Acesse: https://dashboard.stripe.com/register
  - Ative conta empresarial (CNPJ)
  - Configure dados bancários

- [ ] **1.2 Criar conta Hotmart** (opcional)
  - Acesse: https://app.hotmart.com
  - Cadastre produtos (cursos)
  - Configure webhook

- [ ] **1.3 Configurar variáveis de ambiente**
  ```bash
  # apps/web/.env.local
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
  STRIPE_SECRET_KEY=sk_live_xxx
  STRIPE_WEBHOOK_SECRET=whsec_xxx
  ```

- [ ] **1.4 Instalar dependências**
  ```bash
  cd apps/web
  pnpm add stripe @stripe/stripe-js
  ```

---

#### Semana 2: Implementação Backend

- [ ] **2.1 Criar collection Orders**
  - Copiar de: `docs/PAGAMENTOS_FASE2.md` → "Collection: Orders"
  - Criar arquivo: `apps/cms/src/collections/Orders.ts`
  - Adicionar em `payload.config.ts`

- [ ] **2.2 Criar API routes**
  - Criar: `apps/web/app/api/checkout/stripe/route.ts`
  - Criar: `apps/web/app/api/webhooks/stripe/route.ts`
  - Copiar código de: `docs/PAGAMENTOS_FASE2.md`

- [ ] **2.3 Configurar webhooks no Stripe**
  - No Dashboard Stripe → Webhooks
  - Adicionar endpoint: `https://nutrindojuntos.com.br/api/webhooks/stripe`
  - Selecionar eventos:
    - `checkout.session.completed`
    - `payment_intent.succeeded`
    - `payment_intent.payment_failed`
    - `charge.refunded`
  - Copiar Webhook Secret

---

#### Semana 3: Implementação Frontend

- [ ] **3.1 Criar componente de checkout**
  - Criar: `apps/web/components/CheckoutButton.tsx`
  - Integrar com Stripe Checkout

- [ ] **3.2 Adicionar botão nas páginas de curso**
  - Atualizar: `apps/web/app/(main)/cursos/[slug]/page.tsx`
  - Substituir "Tenho Interesse" por "Comprar Agora"

- [ ] **3.3 Criar páginas de sucesso/cancelamento**
  - Criar: `apps/web/app/(main)/compra/sucesso/page.tsx`
  - Criar: `apps/web/app/(main)/compra/cancelado/page.tsx`

- [ ] **3.4 Configurar emails transacionais**
  - Criar templates no Brevo:
    - Confirmação de compra
    - Acesso liberado
    - Pagamento pendente

---

#### Semana 4: Testes & Deploy

- [ ] **4.1 Testar em modo sandbox**
  - Usar cartões de teste do Stripe
  - Verificar webhook recebimento
  - Confirmar criação de pedidos
  - Testar envio de emails

- [ ] **4.2 Testar fluxos de erro**
  - Pagamento falhado
  - Cartão recusado
  - Timeout de sessão

- [ ] **4.3 Deploy em produção**
  - Atualizar variáveis no Vercel
  - Atualizar webhook no Stripe (URL prod)
  - Monitorar primeiros pagamentos

- [ ] **4.4 Documentar processo**
  - Criar runbook para equipe
  - Treinar suporte em reembolsos
  - Definir SLAs de atendimento

---

## 🎬 Fase 3: Streaming

### 🎯 Objetivo
Transformar em plataforma de cursos on-demand tipo "Netflix".

### ⏱️ Tempo Estimado
**16-20 semanas** (4-5 meses)

---

### ✅ Checklist de Ativação

#### Fase 3.1: Infraestrutura (4 semanas)

- [ ] **1.1 Criar conta Mux**
  - Acesse: https://dashboard.mux.com/signup
  - Configure encoding settings
  - Obter Access Tokens

- [ ] **1.2 Configurar autenticação**
  - Instalar: `pnpm add next-auth`
  - Configurar: `apps/web/auth.ts`
  - Criar páginas de login/registro

- [ ] **1.3 Atualizar collections CMS**
  - Criar: `Lessons.ts`, `Progress.ts`, `Comments.ts`, `Certificates.ts`
  - Atualizar: `Users.ts` (adicionar campos de streaming)
  - Adicionar em `payload.config.ts`

- [ ] **1.4 Configurar variáveis**
  ```bash
  # apps/web/.env.local
  MUX_TOKEN_ID=xxx
  MUX_TOKEN_SECRET=xxx
  NEXT_PUBLIC_MUX_ENV_KEY=xxx
  NEXTAUTH_URL=https://nutrindojuntos.com.br
  NEXTAUTH_SECRET=xxx
  ```

---

#### Fase 3.2: Player de Vídeo (4 semanas)

- [ ] **2.1 Instalar dependências Mux**
  ```bash
  cd apps/web
  pnpm add @mux/mux-node @mux/mux-player-react
  ```

- [ ] **2.2 Criar componente VideoPlayer**
  - Criar: `apps/web/components/VideoPlayer.tsx`
  - Copiar de: `docs/PLATAFORMA_STREAMING_FASE3.md`

- [ ] **2.3 Implementar sistema de progresso**
  - Salvar posição assistida
  - Marcar aulas como concluídas
  - Sync com Payload CMS

- [ ] **2.4 Upload de vídeos para Mux**
  - Criar script de upload
  - Migrar vídeos existentes
  - Configurar encoding

---

#### Fase 3.3: Área do Aluno (6 semanas)

- [ ] **3.1 Criar dashboard do aluno**
  - Rota: `/aluno/dashboard`
  - Mostrar cursos em andamento
  - Exibir progresso geral

- [ ] **3.2 Criar página de curso**
  - Rota: `/aluno/cursos/[slug]`
  - Listagem de aulas por módulo
  - Navegação entre aulas

- [ ] **3.3 Criar player page**
  - Rota: `/aluno/aula/[id]`
  - Player de vídeo principal
  - Materiais complementares
  - Comentários

- [ ] **3.4 Sistema de certificados**
  - Geração automática ao completar
  - Download em PDF
  - Validação pública

---

#### Fase 3.4: Comunidade (3 semanas)

- [ ] **4.1 Sistema de comentários**
  - Comentários por aula
  - Respostas e threading
  - Curtidas

- [ ] **4.2 Moderação**
  - Aprovação de comentários
  - Sistema de denúncias
  - Banimento de usuários

---

#### Fase 3.5: Finalização (3 semanas)

- [ ] **5.1 Testes completos**
  - Testes unitários
  - Testes E2E
  - Testes de carga (100+ usuários simultâneos)

- [ ] **5.2 Deploy**
  - Deploy staging
  - Testes UAT com beta testers
  - Deploy produção

- [ ] **5.3 Monitoramento**
  - Configurar analytics
  - Alertas de erro
  - Métricas de uso

---

## 🚨 Problemas Comuns

### Fase 2 - Pagamentos

**❌ Webhook não está recebendo eventos**

**Soluções:**
1. Verificar URL no Dashboard Stripe
2. Verificar se endpoint está acessível (teste com curl)
3. Verificar logs no Vercel
4. Verificar assinatura do webhook

```bash
# Testar webhook localmente
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

**❌ Pagamento aprovado mas pedido não foi criado**

**Soluções:**
1. Verificar logs do webhook
2. Verificar se metadata foi enviada corretamente
3. Verificar connection string do Payload CMS
4. Verificar permissões de acesso

---

**❌ Email de confirmação não está sendo enviado**

**Soluções:**
1. Verificar credenciais Brevo
2. Verificar se template existe
3. Verificar logs da API Brevo
4. Verificar rate limits

---

### Fase 3 - Streaming

**❌ Vídeo não carrega**

**Soluções:**
1. Verificar playback ID correto
2. Verificar asset status no Mux (deve ser "ready")
3. Verificar CORS settings
4. Verificar network tab no DevTools

---

**❌ Progresso não está salvando**

**Soluções:**
1. Verificar autenticação do usuário
2. Verificar permissions na collection Progress
3. Verificar se interval está rodando
4. Verificar logs de erro

---

**❌ Upload de vídeo está falhando**

**Soluções:**
1. Verificar tokens Mux
2. Verificar tamanho do arquivo (limite 5GB)
3. Verificar formato do vídeo (MP4, MOV, AVI)
4. Usar Mux Direct Upload para files >500MB

---

## 📚 Recursos Úteis

### Documentação Completa
- `docs/PAGAMENTOS_FASE2.md` - Guia detalhado de pagamentos
- `docs/PLATAFORMA_STREAMING_FASE3.md` - Guia detalhado de streaming
- `docs/TRADUCAO_CMS.md` - Sistema de traduções

### Tipos TypeScript
- `apps/web/types/payments.ts` - Types de pagamentos
- `apps/web/types/streaming.ts` - Types de streaming

### Configuração
- `apps/web/.env.example` - Variáveis de ambiente (frontend)
- `apps/cms/.env.example` - Variáveis de ambiente (CMS)

### Testes
- Stripe Test Cards: https://stripe.com/docs/testing
- Mux Sandbox: https://dashboard.mux.com/test-mode

---

## 💡 Dicas Importantes

### Antes de Ativar Qualquer Fase

1. ✅ **Backup completo do banco de dados**
2. ✅ **Testar em ambiente de staging primeiro**
3. ✅ **Comunicar usuários sobre mudanças**
4. ✅ **Ter rollback plan pronto**
5. ✅ **Monitorar métricas chave**

### Durante Ativação

1. ✅ **Ir devagar** - Uma feature por vez
2. ✅ **Testar extensivamente** - Não pular testes
3. ✅ **Monitorar erros** - Sentry, logs, etc
4. ✅ **Ter suporte disponível** - Primeiras 48h críticas
5. ✅ **Documentar problemas** - Para próximas iterações

### Após Ativação

1. ✅ **Monitorar por 7 dias intensamente**
2. ✅ **Coletar feedback de usuários**
3. ✅ **Ajustar baseado em dados**
4. ✅ **Documentar lições aprendidas**
5. ✅ **Celebrar conquistas!** 🎉

---

## 📞 Suporte

Se tiver dúvidas durante a implementação:

1. **Consulte a documentação detalhada** em `docs/`
2. **Revise os types** para entender estrutura de dados
3. **Use os logs** - Vercel, Sentry, Stripe Dashboard
4. **Peça ajuda ao Claude Code** - Com contexto específico

---

**Última Atualização:** 16/11/2025
**Versão:** 1.0
**Próxima Revisão:** Antes de ativar Fase 2
