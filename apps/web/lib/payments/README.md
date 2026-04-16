# 💳 Sistema de Pagamentos - NUTRINDO JUNTOS

## Visão Geral

Sistema de pagamentos integrado com **ASAAS** (gateway principal) e **Hotmart** (alternativa para produtos digitais).

## Arquitetura

```
┌─────────────────────────────────────────┐
│  Frontend (Checkout)                    │
│  ├─ PaymentButton.tsx                   │
│  ├─ CheckoutForm.tsx                    │
│  └─ PaymentStatus.tsx                   │
└─────────────────────────────────────────┘
                ↓
┌─────────────────────────────────────────┐
│  API Routes (/api/payments)             │
│  ├─ /create-payment                     │
│  ├─ /webhooks/asaas                     │
│  └─ /webhooks/hotmart                   │
└─────────────────────────────────────────┘
                ↓
┌────────────────────┬────────────────────┐
│  ASAAS Gateway     │  Hotmart Platform  │
│  (Cursos/Mentoria) │  (Produtos)        │
└────────────────────┴────────────────────┘
                ↓
┌─────────────────────────────────────────┐
│  Supabase (Registros)                   │
│  ├─ orders                              │
│  ├─ payments                            │
│  └─ customers                           │
└─────────────────────────────────────────┘
```

## Gateways de Pagamento

### 1. ASAAS (Principal) ✅ **RECOMENDADO**

**Usado para:**
- Cursos online
- Mentorias individuais
- Assinaturas recorrentes

**Métodos de pagamento:**
- Cartão de crédito (até 12x)
- PIX (instantâneo)
- Boleto bancário (3 dias úteis)

**Vantagens:**
- ✅ API brasileira completa
- ✅ Taxas competitivas (2,99% + R$0,49)
- ✅ Split de pagamento (para comissões)
- ✅ Gestão de assinaturas
- ✅ Webhooks robustos

**Taxas:**
```
Cartão de crédito: 2,99% + R$0,49 por transação
PIX: R$0,99 por transação
Boleto: R$1,99 por transação
```

### 2. Hotmart (Alternativa)

**Usado para:**
- Produtos digitais (e-books, templates)
- Lançamentos especiais
- Programas de afiliados

**Vantagens:**
- ✅ Plataforma completa de produtos digitais
- ✅ Sistema de afiliados nativo
- ✅ Área de membros incluída
- ✅ Gestão de comissões automática

**Taxas:**
```
9,9% + R$1,00 por transação
+ 2% se usar Hotmart Club (área de membros)
```

## Estrutura de Arquivos

```
lib/payments/
├── README.md                 # Este arquivo
├── asaas/
│   ├── client.ts            # Cliente ASAAS
│   ├── types.ts             # TypeScript types
│   ├── webhooks.ts          # Handlers de webhooks
│   └── utils.ts             # Helpers
├── hotmart/
│   ├── client.ts            # Cliente Hotmart
│   ├── types.ts             # TypeScript types
│   ├── webhooks.ts          # Handlers de webhooks
│   └── utils.ts             # Helpers
└── common/
    ├── types.ts             # Types compartilhados
    ├── validators.ts        # Validações Zod
    └── formatters.ts        # Formatação de valores
```

## Fluxo de Compra

### 1. Usuário seleciona curso/mentoria

```tsx
<PaymentButton
  productId="curso-nca"
  productType="course"
  gateway="asaas"
  price={497.00}
/>
```

### 2. Checkout (Modal ou página dedicada)

```tsx
<CheckoutForm
  product={curso}
  onSuccess={handleSuccess}
  onError={handleError}
/>
```

### 3. Processamento do pagamento

```typescript
// API Route: /api/payments/create-payment
POST /api/payments/create-payment
{
  "gateway": "asaas",
  "productId": "curso-nca",
  "customerId": "uuid",
  "paymentMethod": "credit_card",
  "installments": 3
}
```

### 4. Webhook confirma pagamento

```typescript
// API Route: /api/payments/webhooks/asaas
POST /api/payments/webhooks/asaas
{
  "event": "PAYMENT_CONFIRMED",
  "payment": { ... }
}
```

### 5. Liberação de acesso

```typescript
// Atualizar Supabase
await supabase
  .from('orders')
  .update({
    status: 'paid',
    paid_at: new Date()
  })
  .eq('id', orderId)

// Enviar email de confirmação (Brevo)
await sendEmail({
  template: 'payment_confirmed',
  to: customer.email
})
```

## Variáveis de Ambiente

### ASAAS

```env
# ASAAS API (Production)
ASAAS_API_KEY=your_asaas_api_key_here
ASAAS_WALLET_ID=your_wallet_id_here

# ASAAS Webhooks
ASAAS_WEBHOOK_SECRET=your_webhook_secret_here
```

### Hotmart

```env
# Hotmart API
HOTMART_CLIENT_ID=your_hotmart_client_id_here
HOTMART_CLIENT_SECRET=your_hotmart_client_secret_here
HOTMART_BASIC_TOKEN=your_hotmart_basic_token_here

# Hotmart Webhooks
HOTMART_WEBHOOK_SECRET=your_webhook_secret_here
```

## Schema Supabase

```sql
-- Tabela: customers
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  cpf_cnpj VARCHAR(14),
  phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela: orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  product_id VARCHAR(255) NOT NULL,
  product_type VARCHAR(50) NOT NULL, -- 'course', 'mentoring', 'ebook'
  gateway VARCHAR(50) NOT NULL, -- 'asaas', 'hotmart'
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, paid, cancelled, refunded
  payment_method VARCHAR(50), -- credit_card, pix, boleto
  installments INTEGER DEFAULT 1,
  external_id VARCHAR(255), -- ID do gateway
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela: payments (histórico de tentativas)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  gateway VARCHAR(50) NOT NULL,
  external_id VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Webhooks

### ASAAS Webhooks

**Eventos importantes:**
- `PAYMENT_CREATED` - Pagamento criado
- `PAYMENT_CONFIRMED` - Pagamento confirmado ✅
- `PAYMENT_RECEIVED` - Pagamento recebido
- `PAYMENT_OVERDUE` - Pagamento atrasado
- `PAYMENT_REFUNDED` - Pagamento reembolsado

**URL do webhook:**
```
https://nutrindojuntos.com.br/api/payments/webhooks/asaas
```

### Hotmart Webhooks

**Eventos importantes:**
- `PURCHASE_COMPLETE` - Compra confirmada ✅
- `PURCHASE_REFUNDED` - Compra reembolsada
- `PURCHASE_DELAYED` - Pagamento atrasado
- `SUBSCRIPTION_CANCELLATION` - Assinatura cancelada

**URL do webhook:**
```
https://nutrindojuntos.com.br/api/payments/webhooks/hotmart
```

## Segurança

### Validação de Webhooks

```typescript
// ASAAS - Validar assinatura
function validateAsaasWebhook(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return hash === signature
}

// Hotmart - Validar token
function validateHotmartWebhook(
  headers: Record<string, string>
): boolean {
  return headers['x-hotmart-hottok'] === process.env.HOTMART_WEBHOOK_SECRET
}
```

### Rate Limiting

```typescript
// Usar Upstash Redis para rate limiting
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  analytics: true,
})

// Aplicar em rotas de pagamento
const { success } = await ratelimit.limit(userIp)
if (!success) {
  return new Response('Too many requests', { status: 429 })
}
```

## Testes

### ASAAS Sandbox

```env
# Usar credenciais de teste
ASAAS_API_KEY=$aact_homologacao_xxx

# URLs de teste
https://sandbox.asaas.com/api/v3/payments
```

### Cartões de teste:

```
Aprovado:   5162 3060 0000 0000 0001
Negado:     5162 3060 0000 0000 0002
CVV:        123
Validade:   12/2030
```

## Monitoramento

### Logs importantes

```typescript
// Sempre logar:
- IDs de transação
- Status de pagamento
- Erros de API
- Webhooks recebidos

// NUNCA logar:
- Números de cartão
- CVV
- Senhas
- Tokens de API
```

### Métricas (Analytics)

```typescript
// Eventos importantes
trackEvent('payment_initiated', {
  gateway: 'asaas',
  product_type: 'course',
  amount: 497.00
})

trackEvent('payment_completed', {
  gateway: 'asaas',
  product_id: 'curso-nca',
  amount: 497.00,
  installments: 3
})
```

## Roadmap

### Fase 1 (MVP) - Implementado ✅
- [x] Estrutura de pastas
- [x] Tipos TypeScript
- [x] Variáveis de ambiente
- [x] Schema Supabase

### Fase 2 (Em desenvolvimento) 🚧
- [ ] Cliente ASAAS
- [ ] API Routes
- [ ] Webhooks ASAAS
- [ ] Formulário de checkout
- [ ] Confirmação de pagamento

### Fase 3 (Futuro) 📋
- [ ] Cliente Hotmart
- [ ] Webhooks Hotmart
- [ ] Dashboard de vendas
- [ ] Relatórios financeiros
- [ ] Integração com certificados

## Suporte

**ASAAS:**
- Docs: https://docs.asaas.com
- Suporte: suporte@asaas.com

**Hotmart:**
- Docs: https://developers.hotmart.com
- Suporte: developers@hotmart.com
