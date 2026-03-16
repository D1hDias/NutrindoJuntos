# ✅ CHECKLIST DE ATIVAÇÃO - SISTEMA DE CHECKOUT

**🎯 OBJETIVO:** Sair do "funcional" para "vendendo" em 15 minutos
**📅 DATA DE CRIAÇÃO:** 26/01/2025
**⏱️ TEMPO ESTIMADO:** 15 minutos

---

## 🔧 **1. CONTAS EXTERNAS**

### ☐ **Asaas (Gateway PIX)**
```bash
1. Criar conta: https://asaas.com (ou sandbox.asaas.com para testes)
2. Dashboard → Configurações → Integrações → API
3. Copiar: access_token (formato: Bearer xyz123...)
4. Webhooks → Novo Webhook → URL: https://cms.nutrindojuntos.com.br/webhooks/asaas
5. Eventos para ativar:
   ✅ PAYMENT_RECEIVED 
   ✅ PAYMENT_CONFIRMED 
   ✅ PAYMENT_APPROVED
```

### ☐ **Vimeo (Player de Vídeos)**
```bash
1. Upgrade conta: https://vimeo.com/upgrade (Pro+ necessário para API)
2. Developer portal: https://developer.vimeo.com/apps
3. Create New App → Generate Personal Access Token
4. Scopes necessários:
   ✅ public 
   ✅ private 
   ✅ video_files 
   ✅ upload
5. Copiar token completo (formato: abc123def...)
```

### ☐ **Payload API Key**
```bash
1. Acessar: http://localhost:3001/admin
2. Navegar: Users → Seu usuário → API Keys
3. Generate API Key → Permissions: ✅ All Collections
4. Copiar key completa (formato: users API-Key xyz...)
```

---

## 🔐 **2. VARIÁVEIS DE AMBIENTE**

### ☐ **Frontend - apps/web/.env.local**
```bash
# ⚠️ SUBSTITUIR PELOS VALORES REAIS OBTIDOS ACIMA
ASAAS_KEY=seu_token_asaas_completo_aqui
PAYLOAD_URL=http://localhost:3001
PAYLOAD_API_KEY=sua_api_key_payload_completa_aqui
JWT_SECRET=nj_jwt_ultra_secreto_2025_minimo_32_caracteres
VIMEO_TOKEN=seu_token_vimeo_completo_aqui
```

### ☐ **Backend - apps/cms/.env**  
```bash
# ⚠️ SUBSTITUIR PELOS VALORES REAIS (MESMO ASAAS_KEY E JWT_SECRET)
ASAAS_KEY=seu_token_asaas_completo_aqui
JWT_SECRET=nj_jwt_ultra_secreto_2025_minimo_32_caracteres
```

**⚠️ IMPORTANTE:** Mantenha o JWT_SECRET idêntico nos dois arquivos!

---

## 📹 **3. CONFIGURAR CURSO NO CMS**

### ☐ **Criar/Editar curso no Payload CMS**
```bash
1. Acessar: http://localhost:3001/admin/collections/cursos
2. Criar novo curso ou editar existente
3. Campos obrigatórios:
   - ✅ Título do curso
   - ✅ Descrição/resumo
   - ✅ Preço em centavos (ex: 9900 = R$ 99,00)
   - ✅ Slug único (ex: nutricao-esportiva)
   - ✅ Status: Ativo
4. Adicionar vídeos Vimeo:
   - IDs dos vídeos do Vimeo
   - Títulos das aulas
   - Ordem de exibição
5. Salvar e publicar ✅
```

---

## 🚀 **4. TESTE DE FUMAÇA (5 MINUTOS)**

### ☐ **Iniciar serviços locais**
```bash
# Terminal 1: Backend (CMS)
cd apps/cms
npm run dev

# Terminal 2: Frontend (Next.js)  
cd apps/web
npm run dev

# Aguardar ambos subirem completamente
```

### ☐ **Executar fluxo completo de compra**
```bash
PASSO 1: 🛒 Acessar página do curso
→ URL: http://localhost:3000/cursos/[slug-do-curso]

PASSO 2: 💳 Iniciar checkout
→ Clicar: "Comprar Curso" ou botão similar

PASSO 3: 📝 Preencher dados
→ Email: usar email real (receberá confirmações)
→ CPF: usar CPF válido ou gerador online

PASSO 4: 📱 Gerar PIX
→ Clicar: "Gerar PIX"
→ Aguardar QR Code aparecer

PASSO 5: 💰 Pagar PIX
→ Escanear QR Code OU copiar código PIX
→ Valor: R$ 1,00 (sandbox aceita qualquer valor)
→ Confirmar pagamento no app do banco

PASSO 6: ⏱️ Aguardar confirmação automática
→ Tela fará polling automático a cada 3s
→ Em 10-30s deve redirecionar automaticamente

PASSO 7: 🎓 Fazer login na área do aluno
→ Email: o mesmo usado no checkout
→ Senha: a accessKey mostrada na tela de sucesso

PASSO 8: 📺 Testar player de vídeo
→ Clicar: "Assistir aula"
→ Vídeo deve carregar protegido por JWT
→ Verificar se player funciona normalmente

PASSO 9: ✅ Confirmar dados no admin
→ Verificar no CMS admin se tudo foi criado
```

---

## 📊 **5. VERIFICAÇÕES FINAIS**

### ☐ **Logs do sistema funcionando**
```bash
# No terminal do CMS deve aparecer:
🔔 Webhook Asaas recebido: PAYMENT_CONFIRMED
✅ Pedido atualizado: [ID do pedido]
👤 Usuário criado: [ID do usuário] 
🔑 Chave de acesso criada: [ID da chave]
🎉 Webhook processado com sucesso

# Se não aparecer, há problema na configuração
```

### ☐ **Dados no admin dashboard**
```bash
# Acessar: http://localhost:3001/admin

1. Orders (Pedidos):
   ✅ 1 pedido com status "paid"
   ✅ Email correto do cliente
   ✅ Valor correto em centavos

2. Users (Usuários):
   ✅ 1 usuário novo criado
   ✅ Email igual ao do pedido
   ✅ Role: student ou similar

3. Course Keys (Acessos):
   ✅ 1 acesso liberado
   ✅ Usuário correto linkado
   ✅ Curso correto linkado
   ✅ Status: ativo
```

### ☐ **Player de vídeo protegido**
```bash
# No DevTools do navegador (F12 → Network):
- Request para: /api/player/[video-id]
- Header Authorization: Bearer [JWT token] 
- Response status: 200 ✅
- Response body: videoUrl com URL assinada ✅

# Se erro 401/403, problema na autenticação JWT
```

---

## ⚙️ **AJUSTES RÁPIDOS DE PRODUÇÃO**

### ☐ **PIX Expiração (30min em vez de 24h)**
```typescript
// Arquivo: apps/web/app/api/checkout/asaas/route.ts
// Encontrar linha ~85 e alterar:

const dueDate = new Date()
dueDate.setMinutes(dueDate.getMinutes() + 30) // ✅ 30 minutos
// Trocar por: dueDate.setDate(dueDate.getDate() + 1) // ❌ 24 horas
```

### ☐ **Email de boas-vindas automático**
```typescript
// Arquivo: apps/cms/src/webhooks/asaas.ts
// Adicionar após criar usuário (linha ~120):

await sendWelcomeEmail({
  to: order.email,
  subject: 'Acesso liberado ao curso!',
  accessKey: order.accessKey,
  courseTitle: course.title,
  loginUrl: 'https://nutrindojuntos.com.br/area-aluno'
})
```

### ☐ **Dashboard financeiro simples**
```bash
# Adicionar à home do admin CMS:
- 📊 Total vendas hoje: R$ X,XX
- 📈 Taxa conversão: XX%  
- ⏳ PIX pendentes: X pedidos
- 👥 Novos alunos: X usuários
- 🎯 Curso mais vendido: Nome do curso
```

---

## 🔍 **TROUBLESHOOTING RÁPIDO**

### ❌ **PIX não é gerado**
```bash
SINTOMAS: Erro ao clicar "Gerar PIX", formulário não funciona

VERIFICAR:
1. ASAAS_KEY está correto no .env?
2. Console DevTools → aba Network → erro 401/403 na API?
3. Asaas dashboard → Logs → chamadas API aparecendo?
4. Conta Asaas ativa e verificada?

SOLUÇÕES:
- Verificar formato do token (com ou sem "Bearer")
- Testar token no Postman/Insomnia
- Verificar se conta não está suspensa
```

### ❌ **Webhook não funciona**  
```bash
SINTOMAS: PIX pago mas acesso não liberado automaticamente

VERIFICAR:
1. URL webhook configurada no Asaas com HTTPS?
2. Logs do CMS mostram POST /webhooks/asaas?
3. Eventos corretos ativados no dashboard Asaas?
4. CMS acessível publicamente (não só localhost)?

SOLUÇÕES:
- Usar ngrok para expor localhost: https://ngrok.com
- Testar webhook manualmente no dashboard Asaas
- Verificar logs detalhados do erro
```

### ❌ **Vídeo não carrega**
```bash
SINTOMAS: Player mostra erro, vídeo não inicia

VERIFICAR:
1. VIMEO_TOKEN tem escopo 'video_files'?
2. JWT válido salvo no localStorage/cookie?  
3. Network DevTools → /api/player → erro 401/403?
4. ID do vídeo Vimeo existe e é público/privado correto?

SOLUÇÕES:
- Regenerar token Vimeo com todos os escopos
- Verificar se usuário fez login corretamente
- Testar ID do vídeo diretamente no Vimeo
```

### ❌ **Usuário não é criado**
```bash
SINTOMAS: Pagamento confirmado mas usuário não aparece no admin

VERIFICAR:
1. Webhook foi executado com sucesso?
2. Logs CMS mostram "Usuário criado: [ID]"?
3. Collection Users tem permissões corretas?
4. Email já existe no sistema?

SOLUÇÕES:
- Verificar logs completos do webhook
- Testar criação manual de usuário no admin
- Verificar se não há duplicação de email
```

---

## 🎉 **PRÓXIMOS PASSOS APÓS ATIVAÇÃO**

### ✅ **Quando todos os checkboxes estiverem marcados:**

1. **📦 Deploy em produção**
   - Frontend: Vercel (automático via GitHub)
   - Backend: VPS Hostinger (Docker)
   - Banco: Supabase produção

2. **🌐 Configurar domínio**
   - SSL obrigatório para webhooks
   - Atualizar URLs nos .env de produção
   - Configurar DNS corretamente

3. **💰 Asaas modo produção**
   - Trocar URL sandbox por produção
   - Reconfigurar webhook com URL final
   - Ativar antifraude se necessário

4. **📊 Monitorar métricas**
   - Taxa conversão (visitantes → compra)
   - Abandono checkout (PIX gerado → pago)
   - Tempo médio pagamento
   - Reembolsos/chargebacks

5. **🚀 Marketing e vendas**
   - Divulgar curso com checkout funcional
   - Acompanhar primeiras vendas reais
   - Coletar feedback dos alunos
   - Iterar melhorias no fluxo

---

## 📞 **SUPORTE E RECURSOS**

- **Documentação Asaas:** https://docs.asaas.com
- **Documentação Vimeo:** https://developer.vimeo.com
- **Documentação Payload:** https://payloadcms.com/docs
- **Logs do sistema:** Console do navegador + terminal CMS
- **Arquivo principal:** `CHECKOUT_SETUP_GUIDE.md` (documentação técnica completa)

---

**🎯 RESULTADO ESPERADO:** Sistema 100% funcional monetizando automaticamente!

**⚠️ LEMBRETE:** Execute este checklist apenas quando estiver pronto para configurar as contas externas e testar o sistema completo. Guarde este arquivo para consulta no momento da implementação prática.