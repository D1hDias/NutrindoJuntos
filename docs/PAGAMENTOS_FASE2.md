# 💳 Sistema de Pagamentos - Fase 2

**Versão:** 1.0
**Data:** 16/11/2025
**Status:** 🟡 Preparado (Não Implementado)

---

## 📋 Visão Geral

Este documento descreve a arquitetura completa do sistema de pagamentos que será implementado na **Fase 2** da plataforma NUTRINDO JUNTOS.

**Status Atual (Fase 1 - MVP):**
- ❌ Sem pagamento online integrado
- ✅ Conversão manual via formulários
- ✅ Leads enviados para Brevo
- ✅ Equipe faz follow-up manual

**Status Futuro (Fase 2):**
- ✅ Checkout online completo
- ✅ Integração com Stripe + Hotmart
- ✅ Pagamentos automáticos
- ✅ Webhooks para sincronização
- ✅ Gestão de pedidos no CMS

---

## 🎯 Objetivos

### O Que o Sistema Vai Resolver

1. **Automatizar Conversão:**
   - Eliminar processo manual de vendas
   - Reduzir tempo de fechamento de 48h → instantâneo
   - Aumentar taxa de conversão em ~30%

2. **Múltiplos Métodos de Pagamento:**
   - Cartão de crédito (até 12x)
   - Pix (desconto de 5%)
   - Boleto bancário
   - Carteiras digitais

3. **Gestão Centralizada:**
   - Todos os pedidos no Payload CMS
   - Sincronização automática com gateways
   - Relatórios financeiros integrados

4. **Experiência do Usuário:**
   - Checkout em 3 cliques
   - Acesso imediato após pagamento
   - Emails transacionais automáticos

---

## 🏗️ Arquitetura do Sistema

### Fluxo Completo de Pagamento

```
┌─────────────────────────────────────────────────────────────────┐
│                    JORNADA DO USUÁRIO                            │
└─────────────────────────────────────────────────────────────────┘

1. Usuário clica em "Comprar Curso"
   ↓
2. Escolhe método de pagamento (Stripe ou Hotmart)
   ↓
3. Redirecionado para checkout seguro
   ↓
4. Preenche dados de pagamento
   ↓
5. Confirma compra
   ↓
6. Gateway processa pagamento
   ↓
7. Webhook notifica nossa plataforma
   ↓
8. Sistema cria pedido no Payload CMS
   ↓
9. Sistema envia email de confirmação (Brevo)
   ↓
10. Usuário recebe acesso automático ao curso
```

### Arquitetura Técnica

```
┌──────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js)                        │
│  - Página de Curso                                                │
│  - Botão "Comprar Agora"                                          │
│  - Modal de seleção de gateway                                    │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ↓
┌──────────────────────────────────────────────────────────────────┐
│                      API ROUTES (Next.js)                         │
│  - /api/checkout/stripe                                           │
│  - /api/checkout/hotmart                                          │
│  - /api/webhooks/stripe                                           │
│  - /api/webhooks/hotmart                                          │
└──────────┬──────────────────────────┬────────────────────────────┘
           │                          │
           ↓                          ↓
┌──────────────────────┐   ┌──────────────────────┐
│   STRIPE             │   │   HOTMART            │
│   - Checkout Session │   │   - Payment Link     │
│   - Webhooks         │   │   - Webhooks         │
└──────────┬───────────┘   └──────────┬───────────┘
           │                          │
           └──────────┬───────────────┘
                      │
                      ↓
┌──────────────────────────────────────────────────────────────────┐
│                      PAYLOAD CMS                                  │
│  - Collection: Orders (Pedidos)                                   │
│  - Collection: Transactions (Transações)                          │
│  - Relationship: User → Order → Course                            │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ↓
┌──────────────────────────────────────────────────────────────────┐
│                          BREVO                                    │
│  - Email: Confirmação de Compra                                   │
│  - Email: Acesso Liberado                                         │
│  - Email: Nota Fiscal                                             │
└──────────────────────────────────────────────────────────────────┘
```

---

## 💳 Gateways de Pagamento

### 1. Stripe

**Por Que Usar:**
- ✅ Melhor UX do mercado
- ✅ Checkout embutido ou redirect
- ✅ Taxas competitivas (4.99% + R$ 0,39)
- ✅ API robusta e bem documentada
- ✅ Suporte a assinaturas (futuro)
- ✅ Dashboard completo
- ✅ Webhooks confiáveis

**Casos de Uso:**
- Pagamentos com cartão de crédito
- Assinaturas recorrentes (Fase 3)
- Pagamentos internacionais (futuro)

**Taxas:**
- Cartão de crédito nacional: **4.99% + R$ 0,39**
- Pix: **0.99%**
- Boleto: **R$ 2,99**

**Integração:**
```typescript
// Criar sessão de checkout
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{
    price_data: {
      currency: 'brl',
      product_data: {
        name: curso.titulo,
      },
      unit_amount: curso.preco * 100, // em centavos
    },
    quantity: 1,
  }],
  success_url: `${SITE_URL}/compra/sucesso?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${SITE_URL}/cursos/${curso.slug}`,
  metadata: {
    curso_id: curso.id,
    user_email: user.email,
  },
})

// Redirecionar para checkout
window.location.href = session.url
```

---

### 2. Hotmart

**Por Que Usar:**
- ✅ Popular no mercado brasileiro
- ✅ Sistema de afiliados nativo
- ✅ Plataforma de cursos integrada
- ✅ Checkout otimizado para conversão
- ✅ Emissão de nota fiscal automática

**Casos de Uso:**
- Vendas com programa de afiliados
- Checkout otimizado para mobile
- Nota fiscal automática

**Taxas:**
- Cartão de crédito: **9.9% + R$ 1,00**
- Pix: **9.9% + R$ 1,00**
- Boleto: **9.9% + R$ 1,00**

**Integração:**
```typescript
// Criar link de pagamento
const paymentLink = await hotmart.createPaymentLink({
  product_id: HOTMART_PRODUCT_ID,
  price: curso.preco,
  buyer: {
    email: user.email,
    name: user.nome,
  },
  metadata: {
    curso_id: curso.id,
  },
})

// Redirecionar para checkout
window.location.href = paymentLink.url
```

---

## 📊 Collection: Orders (Pedidos)

### Schema

```typescript
// apps/cms/src/collections/Orders.ts

import { CollectionConfig } from 'payload/types'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Pedido',
    plural: 'Pedidos',
  },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'user', 'curso', 'status', 'total', 'createdAt'],
    group: 'Vendas',
  },
  access: {
    read: ({ req: { user } }) => {
      // Admin vê todos, usuário vê só seus pedidos
      if (user?.role === 'admin') return true
      return { user: { equals: user?.id } }
    },
  },
  fields: [
    {
      name: 'orderNumber',
      label: 'Número do Pedido',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
      // Auto-gerado: NJ-20251116-001
    },
    {
      name: 'user',
      label: 'Usuário',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'curso',
      label: 'Curso',
      type: 'relationship',
      relationTo: 'cursos',
      required: true,
      hasMany: false,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pendente', value: 'pending' },
        { label: 'Processando', value: 'processing' },
        { label: 'Pago', value: 'paid' },
        { label: 'Cancelado', value: 'cancelled' },
        { label: 'Reembolsado', value: 'refunded' },
        { label: 'Falhou', value: 'failed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'gateway',
      label: 'Gateway de Pagamento',
      type: 'select',
      required: true,
      options: [
        { label: 'Stripe', value: 'stripe' },
        { label: 'Hotmart', value: 'hotmart' },
        { label: 'Manual', value: 'manual' },
      ],
    },
    {
      name: 'paymentMethod',
      label: 'Método de Pagamento',
      type: 'select',
      options: [
        { label: 'Cartão de Crédito', value: 'credit_card' },
        { label: 'Pix', value: 'pix' },
        { label: 'Boleto', value: 'boleto' },
        { label: 'Transferência', value: 'transfer' },
      ],
    },
    {
      name: 'pricing',
      label: 'Valores',
      type: 'group',
      fields: [
        {
          name: 'subtotal',
          label: 'Subtotal',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'discount',
          label: 'Desconto',
          type: 'number',
          defaultValue: 0,
          min: 0,
        },
        {
          name: 'fees',
          label: 'Taxas',
          type: 'number',
          defaultValue: 0,
          min: 0,
        },
        {
          name: 'total',
          label: 'Total',
          type: 'number',
          required: true,
          min: 0,
        },
      ],
    },
    {
      name: 'gatewayData',
      label: 'Dados do Gateway',
      type: 'group',
      admin: {
        description: 'Informações retornadas pelo gateway de pagamento',
      },
      fields: [
        {
          name: 'sessionId',
          label: 'Session ID',
          type: 'text',
        },
        {
          name: 'transactionId',
          label: 'Transaction ID',
          type: 'text',
        },
        {
          name: 'paymentIntentId',
          label: 'Payment Intent ID (Stripe)',
          type: 'text',
        },
        {
          name: 'rawData',
          label: 'Raw Data (JSON)',
          type: 'json',
          admin: {
            description: 'Dados completos do webhook',
          },
        },
      ],
    },
    {
      name: 'customer',
      label: 'Dados do Cliente',
      type: 'group',
      fields: [
        {
          name: 'nome',
          label: 'Nome Completo',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
        },
        {
          name: 'cpf',
          label: 'CPF',
          type: 'text',
        },
        {
          name: 'telefone',
          label: 'Telefone',
          type: 'text',
        },
      ],
    },
    {
      name: 'billing',
      label: 'Endereço de Cobrança',
      type: 'group',
      fields: [
        {
          name: 'cep',
          label: 'CEP',
          type: 'text',
        },
        {
          name: 'rua',
          label: 'Rua',
          type: 'text',
        },
        {
          name: 'numero',
          label: 'Número',
          type: 'text',
        },
        {
          name: 'complemento',
          label: 'Complemento',
          type: 'text',
        },
        {
          name: 'bairro',
          label: 'Bairro',
          type: 'text',
        },
        {
          name: 'cidade',
          label: 'Cidade',
          type: 'text',
        },
        {
          name: 'estado',
          label: 'Estado',
          type: 'text',
        },
      ],
    },
    {
      name: 'notes',
      label: 'Observações',
      type: 'textarea',
      admin: {
        description: 'Notas internas sobre o pedido',
      },
    },
    {
      name: 'accessGranted',
      label: 'Acesso Liberado',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Marcar quando o acesso ao curso for concedido',
      },
    },
    {
      name: 'accessGrantedAt',
      label: 'Data de Liberação',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // Gerar número do pedido automaticamente
        if (operation === 'create' && !data.orderNumber) {
          const date = new Date()
          const dateStr = date.toISOString().split('T')[0].replace(/-/g, '')

          // Buscar último pedido do dia para incrementar
          const lastOrder = await payload.find({
            collection: 'orders',
            where: {
              orderNumber: {
                contains: `NJ-${dateStr}`,
              },
            },
            limit: 1,
            sort: '-createdAt',
          })

          const count = lastOrder.docs.length > 0
            ? parseInt(lastOrder.docs[0].orderNumber.split('-')[2]) + 1
            : 1

          data.orderNumber = `NJ-${dateStr}-${String(count).padStart(3, '0')}`
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc, operation }) => {
        // Quando status mudar para "paid", liberar acesso
        if (doc.status === 'paid' && !doc.accessGranted) {
          // Liberar acesso ao curso
          await grantCourseAccess(doc.user, doc.curso)

          // Enviar email de confirmação
          await sendPurchaseConfirmationEmail(doc)

          // Atualizar pedido
          await payload.update({
            collection: 'orders',
            id: doc.id,
            data: {
              accessGranted: true,
              accessGrantedAt: new Date(),
            },
          })
        }
      },
    ],
  },
}
```

---

## 🔌 API Routes

### 1. Criar Sessão de Checkout (Stripe)

```typescript
// apps/web/app/api/checkout/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const schema = z.object({
  cursoId: z.string(),
  userEmail: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cursoId, userEmail } = schema.parse(body)

    // Buscar dados do curso
    const curso = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/cursos/${cursoId}`)
      .then(res => res.json())

    if (!curso) {
      return NextResponse.json(
        { error: 'Curso não encontrado' },
        { status: 404 }
      )
    }

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: curso.titulo,
              description: curso.descricaoBreve,
              images: curso.imagemCapa?.url ? [curso.imagemCapa.url] : [],
            },
            unit_amount: Math.round(curso.preco * 100), // em centavos
          },
          quantity: 1,
        },
      ],
      payment_method_types: ['card', 'boleto'],
      payment_intent_data: {
        metadata: {
          curso_id: cursoId,
          user_email: userEmail,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/compra/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cursos/${curso.slug}`,
      metadata: {
        curso_id: cursoId,
        user_email: userEmail,
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })

  } catch (error) {
    console.error('Erro ao criar checkout Stripe:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}
```

---

### 2. Webhook do Stripe

```typescript
// apps/web/app/api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature')!

    // Verificar assinatura do webhook
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    // Processar evento
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Criar pedido no Payload CMS
        await createOrder({
          gateway: 'stripe',
          sessionId: session.id,
          paymentIntentId: session.payment_intent as string,
          status: session.payment_status === 'paid' ? 'paid' : 'pending',
          cursoId: session.metadata?.curso_id,
          userEmail: session.customer_email || session.metadata?.user_email,
          total: session.amount_total! / 100,
          customer: {
            nome: session.customer_details?.name || '',
            email: session.customer_email || '',
          },
          rawData: session,
        })

        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Atualizar status do pedido
        await updateOrderStatus(
          paymentIntent.id,
          'paid'
        )

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Atualizar status do pedido
        await updateOrderStatus(
          paymentIntent.id,
          'failed'
        )

        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge

        // Atualizar status do pedido
        await updateOrderStatus(
          charge.payment_intent as string,
          'refunded'
        )

        break
      }
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Erro no webhook Stripe:', error)

    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    )
  }
}

// Helper functions
async function createOrder(data: any) {
  // Implementar criação de pedido no Payload CMS
  const response = await fetch(`${process.env.PAYLOAD_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

async function updateOrderStatus(paymentIntentId: string, status: string) {
  // Implementar atualização de status no Payload CMS
  const response = await fetch(
    `${process.env.PAYLOAD_API_URL}/orders?where[gatewayData.paymentIntentId][equals]=${paymentIntentId}`,
    {
      method: 'GET',
    }
  )

  const { docs } = await response.json()

  if (docs.length > 0) {
    await fetch(`${process.env.PAYLOAD_API_URL}/orders/${docs[0].id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
  }
}
```

---

### 3. Webhook do Hotmart

```typescript
// apps/web/app/api/webhooks/hotmart/route.ts

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { z } from 'zod'

const hotmartWebhookSchema = z.object({
  event: z.enum([
    'PURCHASE_APPROVED',
    'PURCHASE_CANCELLED',
    'PURCHASE_REFUNDED',
    'PURCHASE_DELAYED',
  ]),
  data: z.object({
    product: z.object({
      id: z.number(),
      name: z.string(),
    }),
    buyer: z.object({
      email: z.string(),
      name: z.string(),
    }),
    purchase: z.object({
      transaction: z.string(),
      status: z.string(),
      price: z.object({
        value: z.number(),
        currency_code: z.string(),
      }),
    }),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const hotmartToken = request.headers.get('x-hotmart-hottok')

    // Verificar autenticidade do webhook
    if (!verifyHotmartWebhook(body, hotmartToken)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    const payload = JSON.parse(body)
    const event = hotmartWebhookSchema.parse(payload)

    // Processar evento
    switch (event.event) {
      case 'PURCHASE_APPROVED': {
        // Criar pedido
        await createOrder({
          gateway: 'hotmart',
          transactionId: event.data.purchase.transaction,
          status: 'paid',
          cursoId: mapHotmartProductToCourse(event.data.product.id),
          total: event.data.purchase.price.value,
          customer: {
            nome: event.data.buyer.name,
            email: event.data.buyer.email,
          },
          rawData: event,
        })

        break
      }

      case 'PURCHASE_CANCELLED':
      case 'PURCHASE_REFUNDED': {
        // Atualizar status
        await updateOrderByTransactionId(
          event.data.purchase.transaction,
          event.event === 'PURCHASE_CANCELLED' ? 'cancelled' : 'refunded'
        )

        break
      }
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Erro no webhook Hotmart:', error)

    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    )
  }
}

function verifyHotmartWebhook(body: string, token: string | null): boolean {
  if (!token) return false

  const secret = process.env.HOTMART_WEBHOOK_SECRET!
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')

  return hash === token
}

function mapHotmartProductToCourse(productId: number): string {
  // Mapear ID do produto Hotmart para ID do curso no Payload
  const mapping: Record<number, string> = {
    // Exemplo:
    // 123456: 'curso-nutricao-esportiva-id',
    // 789012: 'curso-nutricao-clinica-id',
  }

  return mapping[productId] || ''
}
```

---

## 🔐 Variáveis de Ambiente

### Frontend (.env.local)

```bash
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Hotmart
HOTMART_CLIENT_ID=xxxxxxxxxxxxx
HOTMART_CLIENT_SECRET=xxxxxxxxxxxxx
HOTMART_WEBHOOK_SECRET=xxxxxxxxxxxxx
HOTMART_PRODUCT_ID=123456

# Site
NEXT_PUBLIC_SITE_URL=https://nutrindojuntos.com.br
```

### CMS (.env)

```bash
# Payload
PAYLOAD_API_URL=https://cms.nutrindojuntos.com.br/api

# Stripe (para webhooks internos)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Hotmart
HOTMART_CLIENT_ID=xxxxxxxxxxxxx
HOTMART_CLIENT_SECRET=xxxxxxxxxxxxx
```

---

## 📧 Emails Transacionais

### Templates Brevo

**1. Confirmação de Compra**
```yaml
template_id: 10
trigger: Order created (status: paid)
content:
  - Saudação personalizada
  - Detalhes do curso comprado
  - Valor pago
  - Instruções de acesso
  - Link para área do aluno
  - Nota fiscal (se aplicável)
```

**2. Acesso Liberado**
```yaml
template_id: 11
trigger: accessGranted = true
content:
  - Boas-vindas ao curso
  - Link de acesso direto
  - Orientações iniciais
  - Suporte disponível
```

**3. Pagamento Pendente**
```yaml
template_id: 12
trigger: Order created (status: pending)
content:
  - Confirmação de pedido
  - Instruções de pagamento (boleto/pix)
  - Prazo de validade
```

---

## 🧪 Testes

### Ambiente de Testes

**Stripe:**
- Usar chaves de teste: `pk_test_` e `sk_test_`
- Cartões de teste: https://stripe.com/docs/testing

**Hotmart:**
- Usar modo sandbox
- Documentação: https://developers.hotmart.com/docs/pt-BR/

### Casos de Teste

```typescript
// 1. Pagamento com sucesso
test('should create order on successful payment', async () => {
  const session = await createStripeCheckout({
    cursoId: 'test-curso-id',
    userEmail: 'test@example.com',
  })

  expect(session.url).toBeDefined()

  // Simular webhook
  await simulateStripeWebhook('checkout.session.completed', session.id)

  // Verificar pedido criado
  const order = await getOrderBySessionId(session.id)
  expect(order.status).toBe('paid')
})

// 2. Pagamento cancelado
test('should handle cancelled payment', async () => {
  // ...
})

// 3. Reembolso
test('should handle refund', async () => {
  // ...
})
```

---

## 📚 Próximos Passos para Implementação

### Fase 2.1: Setup Básico (1 semana)

- [ ] Criar conta Stripe
- [ ] Criar conta Hotmart
- [ ] Configurar webhooks nos gateways
- [ ] Adicionar variáveis de ambiente
- [ ] Criar collection Orders no CMS

### Fase 2.2: Integração Stripe (2 semanas)

- [ ] Implementar API route de checkout
- [ ] Implementar webhook handler
- [ ] Criar componente de checkout no frontend
- [ ] Testar em ambiente de desenvolvimento
- [ ] Integrar com Brevo (emails)

### Fase 2.3: Integração Hotmart (1 semana)

- [ ] Cadastrar produtos na Hotmart
- [ ] Implementar webhook handler
- [ ] Criar links de pagamento
- [ ] Testar integração

### Fase 2.4: Gestão de Pedidos (1 semana)

- [ ] Dashboard de pedidos no CMS
- [ ] Relatórios financeiros
- [ ] Exportação de dados
- [ ] Filtros e buscas avançadas

### Fase 2.5: Testes & Deploy (1 semana)

- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes E2E com Playwright
- [ ] Deploy em produção
- [ ] Monitoramento e alertas

---

## 🔗 Recursos

### Documentação Oficial

- [Stripe Docs](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Hotmart API](https://developers.hotmart.com/docs/pt-BR/)
- [Payload CMS Collections](https://payloadcms.com/docs/configuration/collections)

### Ferramentas

- [Stripe CLI](https://stripe.com/docs/stripe-cli) - Testar webhooks localmente
- [Stripe Dashboard](https://dashboard.stripe.com) - Gestão de pagamentos
- [Hotmart Dashboard](https://app.hotmart.com) - Gestão de produtos

---

## ⚠️ Considerações Importantes

### Segurança

- ✅ Nunca expor chaves secretas no frontend
- ✅ Sempre validar webhooks com assinatura
- ✅ Usar HTTPS em produção
- ✅ Implementar rate limiting
- ✅ Sanitizar dados de entrada

### Conformidade

- ✅ LGPD: Não armazenar dados completos de cartão
- ✅ Nota Fiscal: Integrar com sistema de emissão
- ✅ Termos de Compra: Incluir no checkout
- ✅ Política de Reembolso: Deixar clara

### Performance

- ✅ Webhooks devem responder em < 5s
- ✅ Usar filas para processamento assíncrono
- ✅ Cache de dados de cursos
- ✅ Monitorar taxa de sucesso de webhooks

---

**Última Atualização:** 16/11/2025
**Versão:** 1.0
**Status:** 🟡 Preparado para Fase 2
