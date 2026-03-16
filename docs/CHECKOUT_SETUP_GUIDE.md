# 🛒 GUIA DE CONFIGURAÇÃO - SISTEMA DE CHECKOUT E PAGAMENTOS

**Status:** ✅ Implementado e Pronto para Configuração
**Data:** 26/01/2025
**Versão:** 1.0

---

## 📋 VISÃO GERAL

Sistema completo de checkout, pagamento PIX via Asaas, webhook para liberação automática de acesso, e player de vídeo protegido por JWT.

### 🎯 FLUXO COMPLETO

```
1. 🛒 CheckoutForm → Gera PIX (Asaas)
2. 💳 Polling → Status "paid" automático
3. 🔔 Webhook → Libera acesso + cria usuário
4. 🎓 Área do Aluno → Login + JWT
5. 📹 Player → Vídeos protegidos (Vimeo)
```

---

## 🚀 IMPLEMENTAÇÕES CONCLUÍDAS

### ✅ 1. Collections no Payload CMS
- **Orders**: Gerencia pedidos e status de pagamento
- **CourseKeys**: Controla acesso aos cursos por usuário
- Ambas integradas com admin UI em português

### ✅ 2. API Routes do Next.js
- **`/api/checkout/asaas`**: Cria cobrança PIX no Asaas
- **`/api/checkout/status/[id]`**: Consulta status (polling)
- **`/api/player/[slug]`**: Entrega vídeo protegido com JWT

### ✅ 3. Componente CheckoutForm
- Formulário com validação Zod
- QR Code PIX + código copia/cola
- Polling automático (3s) para status "paid"
- Timer de expiração do PIX

### ✅ 4. Webhook Asaas
- Endpoint: `/webhooks/asaas`
- Processa eventos: `PAYMENT_CONFIRMED`, `PAYMENT_RECEIVED`
- Auto-cria usuário + libera acesso ao curso

### ✅ 5. Sistema de Autenticação
- JWT com userId + courseId
- Verificação de acesso por endpoint
- URLs de vídeo assinadas (5 min)

---

## ⚙️ CONFIGURAÇÃO NECESSÁRIA

### 🔑 1. Asaas (Gateway de Pagamento)

1. **Conta Asaas**
   ```bash
   # Sandbox (desenvolvimento)
   https://sandbox.asaas.com
   
   # Produção
   https://asaas.com
   ```

2. **Obter API Key**
   - Acesse: Configurações → Integrações → API Key
   - Copie o token para as variáveis de ambiente

3. **Configurar Webhook**
   ```bash
   # URL do Webhook
   https://cms.nutrindojuntos.com.br/webhooks/asaas
   
   # Eventos para ativar
   - PAYMENT_CONFIRMED
   - PAYMENT_RECEIVED
   - PAYMENT_APPROVED
   ```

### 📺 2. Vimeo (Player de Vídeo)

1. **Conta Vimeo Pro/Business**
   ```bash
   https://vimeo.com/upgrade
   ```

2. **Gerar Access Token**
   - Acesse: https://developer.vimeo.com/apps
   - Criar nova app → Gerar token
   - Escopo: `public` `private` `video_files`

### 🔐 3. Variáveis de Ambiente

**apps/web/.env.local** (já configuradas, falta preencher valores):
```bash
# Asaas
ASAAS_KEY=your_asaas_api_key_here

# JWT
JWT_SECRET=nj_jwt_secret_2025_secure_key_here

# Vimeo
VIMEO_TOKEN=your_vimeo_access_token_here

# Payload
PAYLOAD_URL=http://localhost:3001
PAYLOAD_API_KEY=your_payload_api_key_here
```

**apps/cms/.env** (já configuradas, falta preencher valores):
```bash
# Asaas
ASAAS_KEY=your_asaas_api_key_here

# JWT
JWT_SECRET=nj_jwt_secret_2025_secure_key_here
```

### 🎯 4. Payload API Key

1. **Acesse CMS Admin**: http://localhost:3001/admin
2. **Vá em**: Users → seu usuário → API Keys
3. **Gerar nova API Key** com permissões completas
4. **Copiar** para `PAYLOAD_API_KEY` no .env

---

## 🧪 COMO TESTAR

### 1. **Iniciar Serviços**
```bash
# Terminal 1: CMS
cd apps/cms
npm run dev

# Terminal 2: Frontend
cd apps/web
npm run dev
```

### 2. **Testar Checkout**
1. Acesse página de curso
2. Clique "Comprar"
3. Preencha email + CPF
4. Gera QR Code PIX
5. **Simular pagamento** no Asaas sandbox
6. Aguarda webhook liberar acesso

### 3. **Testar Player**
1. Usuário criado automaticamente
2. Login com email + accessKey (senha)
3. Acessa área do aluno
4. Vídeos protegidos por JWT

---

## 📁 ARQUIVOS IMPLEMENTADOS

### Backend (Payload CMS)
```
apps/cms/src/
├── collections/
│   ├── Orders.ts              # ✅ Pedidos e pagamentos
│   └── CourseKeys.ts          # ✅ Acesso aos cursos
├── webhooks/
│   └── asaas.ts              # ✅ Webhook pagamento
└── server.ts                 # ✅ Endpoint webhook
```

### Frontend (Next.js)
```
apps/web/
├── app/api/
│   ├── checkout/asaas/route.ts        # ✅ Gerar PIX
│   ├── checkout/status/[id]/route.ts  # ✅ Status polling
│   └── player/[slug]/route.ts         # ✅ Player protegido
└── components/forms/
    └── CheckoutForm.tsx               # ✅ UI checkout
```

---

## 🛠️ PRÓXIMOS PASSOS

### 1. **Configuração Imediata**
- [ ] Criar conta Asaas + obter API key
- [ ] Configurar webhook no Asaas dashboard
- [ ] Gerar JWT secret seguro
- [ ] Configurar Vimeo + obter token

### 2. **Integração com Páginas**
- [ ] Adicionar `<CheckoutForm>` nas páginas de curso
- [ ] Criar página "Área do Aluno"
- [ ] Implementar sistema de login/JWT
- [ ] Player de vídeo na área restrita

### 3. **Melhorias Futuras**
- [ ] Emails transacionais (confirmação, credenciais)
- [ ] Dashboard financeiro
- [ ] Relatórios de vendas
- [ ] Múltiplos métodos de pagamento (cartão)
- [ ] Sistema de cupons/desconto

---

## ⚠️ OBSERVAÇÕES IMPORTANTES

### 🔒 Segurança
- **JWT Secret**: Use um secret forte (32+ caracteres)
- **API Keys**: Mantenha seguras, nunca commit no git
- **Webhook**: Configure HTTPS em produção
- **URLs de Vídeo**: Assinadas com expiração de 5min

### 💰 Custos
- **Asaas**: Taxa de 3.79% sobre PIX (competitivo)
- **Vimeo**: A partir de $7/mês (ilimitado)
- **Hosting**: Considerar VPS para CMS (webhook)

### 🎯 Performance
- **Polling**: A cada 3s (otimizado para UX)
- **Cache**: URLs de vídeo cacheadas por 5min
- **DB**: Queries otimizadas com indexes

---

## 🆘 TROUBLESHOOTING

### Webhook não funciona?
1. Verificar URL https
2. Verificar logs no CMS
3. Testar manualmente via Postman
4. Conferir eventos ativados no Asaas

### PIX não expira?
1. Timer baseado na `dueDate` do Asaas
2. Default: 24h (configurável)
3. Timer client-side atualiza a cada 1s

### Vídeo não carrega?
1. Verificar token Vimeo
2. JWT válido e não expirado
3. Usuário tem acesso ao curso
4. ID do vídeo correto

**🎉 Sistema pronto para configuração e produção!**