# Checklist de Deploy - NUTRINDO JUNTOS

## 📋 Pré-requisitos

### Informações Necessárias

#### 🔐 Credenciais de Acesso
- [ ] **VPS Hostinger**: SSH key ou senha de acesso root
- [ ] **IP do Servidor**: Endereço IP da VPS
- [ ] **Domínio**: nutrindojuntos.com.br (configuração DNS)
- [ ] **Subdomínio CMS**: cms.nutrindojuntos.com.br

#### 🌐 Contas de Serviço
- [ ] **Supabase**: Projeto criado + connection string
- [ ] **Cloudinary**: Account + API keys
- [ ] **Brevo**: Account + API key + listas criadas
- [ ] **Vercel**: Account conectado ao GitHub
- [ ] **GitHub**: Repositório criado

#### 📧 Configurações de Email
- [ ] **DMARC/SPF**: Configuração no DNS
- [ ] **Subdomínio Brevo**: mail.nutrindojuntos.com.br

### Acessos VPS Hostinger

**Informações que preciso:**
1. **Endereço IP da VPS**
2. **Usuário SSH** (geralmente `root`)
3. **Senha ou SSH key**
4. **Painel de controle** (URL + credenciais)

## 📊 Status Atual do Projeto

### ✅ Completado
- [x] Estrutura do projeto criada
- [x] Git inicializado e primeiro commit
- [x] Configuração Docker preparada
- [x] MCP Hostinger configurado localmente
- [x] Documentação técnica completa

### 🔄 Próximos Passos
- [ ] Configurar acesso SSH à VPS
- [ ] Setup inicial do servidor (Docker, Nginx)
- [ ] Deploy do banco PostgreSQL
- [ ] Deploy do Payload CMS
- [ ] Configuração de domínios
- [ ] Deploy do frontend no Vercel

## 🚀 Estratégia de Deploy

### Fase 1: Setup da Infraestrutura
```bash
# 1. Conectar à VPS
ssh root@IP_DA_VPS

# 2. Instalar dependências
apt update && apt upgrade -y
apt install docker.io docker-compose nginx certbot -y

# 3. Configurar firewall
ufw allow 22,80,443,3001/tcp
```

### Fase 2: Deploy do Backend (CMS)
```yaml
Localização: /home/nutrindojuntos/
Serviços:
  - PostgreSQL (Docker)
  - Payload CMS (Docker)
  - Nginx (Reverse Proxy)
  - Certbot (SSL)
```

### Fase 3: Deploy do Frontend
```yaml
Plataforma: Vercel
Domínio: nutrindojuntos.com.br
Build: Automático via GitHub
Environment: Production
```

## 🔧 Configurações de Ambiente

### VPS (Backend)
```bash
# /home/nutrindojuntos/.env
DATABASE_URL=postgresql://user:pass@localhost:5432/nutrindo_juntos
PAYLOAD_SECRET=sua-chave-secreta-aqui
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
PAYLOAD_PUBLIC_SERVER_URL=https://cms.nutrindojuntos.com.br
```

### Vercel (Frontend)
```bash
NEXT_PUBLIC_SITE_URL=https://nutrindojuntos.com.br
NEXT_PUBLIC_PAYLOAD_API_URL=https://cms.nutrindojuntos.com.br/api
BREVO_API_KEY=sua-brevo-api-key
BREVO_LIST_NEWSLETTER=1
BREVO_LIST_LEADS_CURSOS=2
BREVO_LIST_LEADS_MENTORIA=3
BREVO_LIST_CONTATO=4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=sua-sentry-dsn
```

## 📡 Configuração DNS

### Registros A
```
nutrindojuntos.com.br     → IP_DA_VPS
www.nutrindojuntos.com.br → IP_DA_VPS
cms.nutrindojuntos.com.br → IP_DA_VPS
```

### Registros CNAME (se usar CDN)
```
mail.nutrindojuntos.com.br → Brevo SMTP
```

## 📋 Checklist de Execução

### Pré-Deploy
- [ ] Informações de acesso coletadas
- [ ] Credenciais de serviços configuradas
- [ ] DNS configurado
- [ ] Backup strategy definida

### Deploy Backend
- [ ] VPS preparada (Docker, Nginx)
- [ ] PostgreSQL rodando
- [ ] Payload CMS deployado
- [ ] SSL configurado
- [ ] Health check funcionando

### Deploy Frontend
- [ ] Repositório GitHub configurado
- [ ] Vercel conectado
- [ ] Environment variables configuradas
- [ ] Build e deploy automático funcionando
- [ ] Domínio principal funcionando

### Pós-Deploy
- [ ] Testes de funcionamento
- [ ] Monitoramento configurado
- [ ] Backups agendados
- [ ] Performance otimizada

## 🚨 Troubleshooting

### Problemas Comuns
1. **Erro de conexão SSH**: Verificar IP, porta 22 e credenciais
2. **Docker não inicia**: Verificar se serviço está ativo
3. **SSL não funciona**: Verificar DNS e Certbot
4. **CMS não carrega**: Verificar logs do container
5. **Frontend não acessa API**: Verificar CORS e URLs

### Logs Importantes
```bash
# Logs do CMS
docker logs nutrindojuntos_cms

# Logs do Nginx
tail -f /var/log/nginx/error.log

# Logs do sistema
journalctl -fu docker
```

---

**Preparado em:** 16/03/2026
**Status:** ⏳ Aguardando informações de acesso