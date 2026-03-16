# Templates de Email - Brevo (NUTRINDO JUNTOS)

**Data de criação:** 15/11/2025
**Última atualização:** 15/11/2025

---

## 📋 VISÃO GERAL

Este documento descreve todos os templates de email transacional usados na integração com Brevo. Atualmente, os emails são enviados via código inline, mas este documento serve como referência para possível migração para templates visuais do Brevo.

---

## ✅ IMPORTANTE: Configuração do Sender

**AÇÃO NECESSÁRIA ANTES DO DEPLOY:**

1. Acessar Brevo Dashboard → **Settings → Senders & IP**
2. Adicionar email: `atendimento@nutrindojuntos.com.br`
3. Verificar domínio via DNS:
   - Adicionar registros SPF, DKIM e DMARC no DNS do domínio
   - Aguardar validação (pode levar até 48h)

**Variável de ambiente:**
```bash
CONTACT_EMAIL=atendimento@nutrindojuntos.com.br
```

---

## 1️⃣ NEWSLETTER - Welcome Email

### Trigger
Quando usuário se inscreve na newsletter via qualquer formulário.

### Dados
- **Subject:** `Bem-vindo(a) à Newsletter NUTRINDO JUNTOS!`
- **Sender:** `NUTRINDO JUNTOS <atendimento@nutrindojuntos.com.br>`
- **Variables:**
  - `{{name}}` - Nome do usuário (opcional)
  - `{{email}}` - Email do usuário

### Conteúdo HTML
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #16a34a;">Bem-vindo(a) à nossa comunidade!</h2>
  <p>Olá{{#if name}} {{name}}{{/if}}!</p>
  <p>Obrigado por se inscrever na newsletter do <strong>NUTRINDO JUNTOS</strong>.</p>
  <p>Agora você receberá:</p>
  <ul>
    <li>📚 Conteúdos exclusivos sobre nutrição</li>
    <li>💡 Dicas práticas para sua carreira</li>
    <li>🎯 Novidades sobre cursos e mentorias</li>
    <li>📰 Artigos do nosso blog</li>
  </ul>
  <p>Estamos felizes em tê-lo(a) conosco!</p>
  <br>
  <p><strong>Equipe NUTRINDO JUNTOS</strong></p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
  <p style="font-size: 12px; color: #666;">
    Você está recebendo este email porque se inscreveu na nossa newsletter.
    <br>
    Caso queira cancelar a inscrição, clique aqui.
  </p>
</div>
```

### Lista Brevo
- **ID:** `BREVO_LIST_NEWSLETTER` (default: 3)
- **Nome:** Newsletter Subscribers

---

## 2️⃣ CONTATO - Confirmação para Usuário

### Trigger
Quando usuário envia mensagem pelo formulário de contato.

### Dados
- **Subject:** `Recebemos sua mensagem - NUTRINDO JUNTOS`
- **Sender:** `NUTRINDO JUNTOS <atendimento@nutrindojuntos.com.br>`
- **Variables:**
  - `{{name}}` - Nome do usuário
  - `{{message}}` - Mensagem enviada

### Conteúdo HTML
```html
<h2>Olá, {{name}}!</h2>
<p>Recebemos sua mensagem e entraremos em contato em breve.</p>
<p><strong>Sua mensagem:</strong></p>
<p><em>"{{message}}"</em></p>
<br>
<p>Obrigado pelo contato!</p>
<p><strong>Equipe NUTRINDO JUNTOS</strong></p>
```

### Lista Brevo
- **ID:** `BREVO_LIST_CONTATO` (default: 6)
- **Nome:** Contact Form Submissions

---

## 3️⃣ CONTATO - Notificação para Admin

### Trigger
Quando usuário envia mensagem pelo formulário de contato.

### Dados
- **Subject:** `[Contato] {{subject}}`
- **Sender:** `{{name}} <{{email}}>` (email do usuário)
- **Reply-To:** `{{email}}`
- **To:** `atendimento@nutrindojuntos.com.br`
- **Variables:**
  - `{{name}}` - Nome do usuário
  - `{{email}}` - Email do usuário
  - `{{subject}}` - Assunto da mensagem
  - `{{message}}` - Mensagem completa

### Conteúdo HTML
```html
<h2>Nova mensagem de contato</h2>
<p><strong>Nome:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Assunto:</strong> {{subject}}</p>
<p><strong>Mensagem:</strong></p>
<p>{{message}}</p>
```

---

## 4️⃣ CURSO - Confirmação para Usuário

### Trigger
Quando usuário manifesta interesse em um curso.

### Dados
- **Subject:** `Interesse em Curso - NUTRINDO JUNTOS`
- **Sender:** `NUTRINDO JUNTOS <atendimento@nutrindojuntos.com.br>`
- **Variables:**
  - `{{name}}` - Nome do usuário
  - `{{curso}}` - Nome do curso (opcional)
  - `{{message}}` - Mensagem adicional (opcional)
  - `{{SITE_URL}}` - URL do site

### Conteúdo HTML
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #16a34a;">Obrigado pelo seu interesse!</h2>
  <p>Olá {{name}}!</p>
  <p>Recebemos sua manifestação de interesse em nossos cursos{{#if curso}} ({{curso}}){{/if}}.</p>
  <p>Em breve entraremos em contato com mais informações sobre:</p>
  <ul>
    <li>📚 Conteúdo programático completo</li>
    <li>🎯 Datas e horários disponíveis</li>
    <li>💰 Valores e formas de pagamento</li>
    <li>🎓 Certificação e materiais inclusos</li>
  </ul>
  {{#if message}}
  <p><strong>Sua mensagem:</strong><br><em>"{{message}}"</em></p>
  {{/if}}
  <p>Enquanto isso, que tal conhecer nosso blog com conteúdos gratuitos?</p>
  <p><a href="{{SITE_URL}}/blog" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 12px;">Acessar Blog</a></p>
  <br>
  <p><strong>Equipe NUTRINDO JUNTOS</strong></p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
  <p style="font-size: 12px; color: #666;">
    Este email foi enviado porque você manifestou interesse em nossos cursos.
  </p>
</div>
```

### Lista Brevo
- **ID:** `BREVO_LIST_LEADS_CURSOS` (default: 4)
- **Nome:** Course Leads

---

## 5️⃣ CURSO - Notificação para Admin

### Trigger
Quando usuário manifesta interesse em um curso.

### Dados
- **Subject:** `[Novo Lead - Curso] {{name}}`
- **Sender:** `{{name}} <{{email}}>` (email do usuário)
- **Reply-To:** `{{email}}`
- **To:** `atendimento@nutrindojuntos.com.br`
- **Variables:**
  - `{{name}}` - Nome do usuário
  - `{{email}}` - Email do usuário
  - `{{phone}}` - Telefone (opcional)
  - `{{curso}}` - Curso de interesse (opcional)
  - `{{message}}` - Mensagem adicional (opcional)

### Conteúdo HTML
```html
<h2>Novo interesse em curso</h2>
<p><strong>Nome:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
{{#if phone}}
<p><strong>Telefone:</strong> {{phone}}</p>
{{/if}}
{{#if curso}}
<p><strong>Curso de interesse:</strong> {{curso}}</p>
{{/if}}
{{#if message}}
<p><strong>Mensagem:</strong><br>{{message}}</p>
{{/if}}
```

---

## 6️⃣ MENTORIA - Confirmação para Usuário

### Trigger
Quando usuário solicita mentoria personalizada.

### Dados
- **Subject:** `Interesse em Mentoria - NUTRINDO JUNTOS`
- **Sender:** `NUTRINDO JUNTOS <atendimento@nutrindojuntos.com.br>`
- **Variables:**
  - `{{name}}` - Nome do usuário
  - `{{objetivos}}` - Objetivos da mentoria (opcional)

### Conteúdo HTML
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #16a34a;">Obrigado pelo seu interesse em mentoria!</h2>
  <p>Olá {{name}}!</p>
  <p>Recebemos sua solicitação de mentoria personalizada.</p>
  <p>Nossa equipe irá analisar seu perfil e objetivos para criar um plano personalizado que inclui:</p>
  <ul>
    <li>🎯 Definição de objetivos e metas claras</li>
    <li>📋 Plano de desenvolvimento personalizado</li>
    <li>💬 Sessões individuais com mentor especializado</li>
    <li>📚 Materiais e recursos exclusivos</li>
    <li>🔄 Acompanhamento contínuo do progresso</li>
  </ul>
  {{#if objetivos}}
  <p><strong>Seus objetivos:</strong><br><em>"{{objetivos}}"</em></p>
  {{/if}}
  <p>Entraremos em contato em até 48 horas para agendar uma conversa inicial.</p>
  <p><strong>Equipe NUTRINDO JUNTOS</strong></p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
  <p style="font-size: 12px; color: #666;">
    Este email foi enviado porque você manifestou interesse em mentoria.
  </p>
</div>
```

### Lista Brevo
- **ID:** `BREVO_LIST_LEADS_MENTORIA` (default: 5)
- **Nome:** Mentoring Leads

---

## 7️⃣ MENTORIA - Notificação para Admin

### Trigger
Quando usuário solicita mentoria personalizada.

### Dados
- **Subject:** `[Novo Lead - Mentoria] {{name}}`
- **Sender:** `{{name}} <{{email}}>` (email do usuário)
- **Reply-To:** `{{email}}`
- **To:** `atendimento@nutrindojuntos.com.br`
- **Variables:**
  - `{{name}}` - Nome do usuário
  - `{{email}}` - Email do usuário
  - `{{phone}}` - Telefone (opcional)
  - `{{experiencia}}` - Nível de experiência (opcional)
  - `{{objetivos}}` - Objetivos da mentoria (opcional)

### Conteúdo HTML
```html
<h2>Novo interesse em mentoria</h2>
<p><strong>Nome:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
{{#if phone}}
<p><strong>Telefone:</strong> {{phone}}</p>
{{/if}}
{{#if experiencia}}
<p><strong>Nível de experiência:</strong> {{experiencia}}</p>
{{/if}}
{{#if objetivos}}
<p><strong>Objetivos:</strong><br>{{objetivos}}</p>
{{/if}}
```

---

## 📊 RESUMO DAS LISTAS BREVO

| Lista ID | Nome | Variável de Ambiente | Default |
|----------|------|----------------------|---------|
| 3 | Newsletter Subscribers | `BREVO_LIST_NEWSLETTER` | 3 |
| 4 | Course Leads | `BREVO_LIST_LEADS_CURSOS` | 4 |
| 5 | Mentoring Leads | `BREVO_LIST_LEADS_MENTORIA` | 5 |
| 6 | Contact Form Submissions | `BREVO_LIST_CONTATO` | 6 |

---

## 🔐 SEGURANÇA & ANTI-SPAM

### Rate Limiting
Todas as APIs implementam rate limiting:

- **Newsletter:** 5 requisições por minuto por IP
- **Contato:** 3 requisições por minuto por IP
- **Leads (Cursos):** 3 requisições por minuto por IP
- **Leads (Mentoria):** 3 requisições por minuto por IP

### Honeypot Anti-Spam
Todos os formulários incluem campo honeypot `_honeypot` que deve permanecer vazio.

**Comportamento:**
- Se preenchido → retorna sucesso falso (não envia email, não adiciona ao CRM)
- Log de tentativa de spam com IP e email

### Validação Zod Server-Side
Todos os campos são validados com Zod schemas em `lib/validations.ts`:

- Email: formato válido + domínios permitidos
- Nome: mínimo 3 caracteres, apenas letras e espaços
- Telefone: 10 ou 11 dígitos (opcional)
- Campos de texto: comprimento mínimo/máximo

---

## 🚀 MIGRAÇÃO PARA TEMPLATES VISUAIS DO BREVO (FUTURO)

**Quando migrar:**
- Quando precisar de emails mais elaborados com design responsivo
- Quando time de marketing precisar editar templates sem dev
- Quando precisar de A/B testing de emails

**Como migrar:**
1. Criar templates no Brevo Dashboard
2. Obter template IDs
3. Substituir `htmlContent` inline por chamadas com template ID:

```typescript
const email = new brevo.SendSmtpEmail()
email.templateId = 1 // ID do template no Brevo
email.params = {
  name: data.name,
  curso: data.curso,
  // ... outras variáveis
}
```

---

## 📝 NOTAS IMPORTANTES

1. **Antes do deploy em produção:**
   - Configurar sender email `atendimento@nutrindojuntos.com.br` no Brevo
   - Adicionar registros DNS (SPF, DKIM, DMARC)
   - Testar envio de emails em staging primeiro

2. **Monitoramento:**
   - Verificar métricas de entrega no Brevo Dashboard
   - Acompanhar bounce rate e spam reports
   - Revisar logs de spam bot detection

3. **LGPD Compliance:**
   - Todos os emails incluem informação de por que o usuário está recebendo
   - Newsletter inclui link de descadastramento (quando migrar para templates Brevo)
   - Dados armazenados apenas com consentimento explícito

---

**Última atualização:** 15/11/2025
**Responsável:** Diego (NUTRINDO JUNTOS)
