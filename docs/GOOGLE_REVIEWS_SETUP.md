# Google Meu Negocio - Integracao com Depoimentos

Guia para conectar as avaliacoes do Google Meu Negocio a secao de depoimentos do site.

---

## Arquitetura

```
Google Business Profile API
        |
        v
lib/google-reviews.ts (cache 1h + fallback mock)
        |
        v
app/page.tsx (Server Component - fetch no servidor)
        |
        v
TestimonialSection.tsx (renderiza com layout existente)
```

**Arquivos envolvidos:**

| Arquivo | Funcao |
|---------|--------|
| `lib/google-reviews.ts` | Cliente da API, cache em memoria, fallback mock |
| `app/api/google-reviews/route.ts` | Endpoint GET para debug/teste |
| `components/sections/TestimonialSection.tsx` | Componente visual com icone Google |
| `next.config.mjs` | Dominio `lh3.googleusercontent.com` liberado |
| `.env.local` | Credenciais (nao comitar!) |

---

## Passo a Passo

### 1. Criar projeto no Google Cloud Console

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um novo projeto (ex: "Nutrindo Juntos Website")
3. Menu lateral > **APIs & Services > Library**
4. Busque e ative: **"Google My Business Account Management API"**

### 2. Criar credenciais OAuth 2.0

1. **APIs & Services > Credentials > Create Credentials > OAuth 2.0 Client ID**
2. Configure a tela de consentimento OAuth se solicitado
3. Tipo: **Web Application**
4. URI de redirecionamento: `http://localhost`
5. Anote o **Client ID** e **Client Secret**

### 3. Obter o Access Token

Use o [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/):

1. Engrenagem (canto superior direito) > marque **"Use your own OAuth credentials"**
2. Cole Client ID e Client Secret
3. Step 1: busque **"Google My Business Account Management API v4"**
4. Selecione o escopo: `https://www.googleapis.com/auth/business.manage`
5. Clique **"Authorize APIs"** > login com a conta dona do negocio
6. Step 2: clique **"Exchange authorization code for tokens"**
7. Copie o **Access Token**

### 4. Obter Account ID e Location ID

```bash
# Listar contas
curl -s "https://mybusinessaccountmanagement.googleapis.com/v1/accounts" \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" | jq .

# Listar locations (substitua o ID da conta)
curl -s "https://mybusiness.googleapis.com/v4/accounts/SEU_ACCOUNT_ID/locations" \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN" | jq .
```

Anote:
- **Account ID**: numero apos `accounts/`
- **Location ID**: numero apos `locations/`

### 5. Configurar .env.local

```bash
GOOGLE_BUSINESS_ACCESS_TOKEN=ya29.seu-access-token-aqui
GOOGLE_BUSINESS_ACCOUNT_ID=123456789
GOOGLE_BUSINESS_LOCATION_ID=987654321
```

### 6. Testar

Reinicie o servidor e acesse:

```
http://localhost:3000/api/google-reviews
```

- `"source": "google"` = conectado com sucesso
- `"source": "mock"` = usando dados de exemplo (credenciais ausentes ou invalidas)

---

## Observacoes Importantes

### Access Token expira em ~1 hora

Para producao, ha duas opcoes:

1. **Refresh Token automatico**: implementar fluxo OAuth completo com refresh token no servidor
2. **Cron job**: renovar o token periodicamente e atualizar a variavel de ambiente

O cache interno ja tem duracao de 1 hora, entao o site nao faz chamadas excessivas a API.

### Fallback automatico

Se a API falhar ou as credenciais nao estiverem configuradas, o site exibe 3 depoimentos mock automaticamente. O usuario nunca ve uma secao vazia.

### Dados exibidos do Google

- **Nome** do avaliador
- **Foto de perfil** (dominio `lh3.googleusercontent.com`)
- **Texto** da avaliacao
- **Nota** (estrelas de 1 a 5)
- Apenas avaliacoes **com comentario** sao exibidas

### Limites da API

- Maximo de 50 reviews por requisicao (configuravel no codigo)
- Rate limiting do Google se aplica (raramente um problema com cache de 1h)

---

## Troubleshooting

| Problema | Solucao |
|----------|---------|
| `source: "mock"` mesmo com credenciais | Verifique se as 3 variaveis estao no `.env.local` e reinicie o servidor |
| Erro 401 na API | Access token expirado. Gere um novo no OAuth Playground |
| Erro 403 na API | A API nao esta ativada no projeto ou a conta nao tem permissao |
| Fotos nao carregam | Verifique se `lh3.googleusercontent.com` esta no `next.config.mjs` |
| Nenhum review aparece | Verifique se as avaliacoes tem texto (reviews sem comentario sao filtrados) |
