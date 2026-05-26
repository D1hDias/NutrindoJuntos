# 🐳 Guia Docker - NUTRINDO JUNTOS

Guia completo para uso do Docker no projeto NUTRINDO JUNTOS.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Abordagem Híbrida](#abordagem-híbrida)
3. [Desenvolvimento Local](#desenvolvimento-local)
4. [Produção VPS](#produção-vps)
5. [Troubleshooting](#troubleshooting)
6. [Comandos Úteis](#comandos-úteis)

---

## 🎯 Visão Geral

O projeto NUTRINDO JUNTOS utiliza uma **abordagem híbrida de Docker**:

### ✅ COM Docker
- **Payload CMS** (apps/cms)
- **PostgreSQL** (desenvolvimento local opcional)
- **Adminer** (ferramenta de DB, opcional)
- **Nginx** (produção VPS)

### ❌ SEM Docker
- **Next.js** (apps/web) - melhor performance em dev
- **Vercel** (deploy automático, não usa Docker)

---

## 🔄 Abordagem Híbrida

### Por que Híbrida?

**Payload CMS COM Docker:**
- ✅ Facilita deploy na VPS Hostinger
- ✅ Consistência entre dev e produção
- ✅ Isolamento de dependências
- ✅ Fácil rollback e escalabilidade

**Next.js SEM Docker (em dev):**
- ✅ Hot-reload mais rápido
- ✅ Melhor DX (Developer Experience)
- ✅ Vercel já otimiza o deploy
- ✅ Menos overhead em desenvolvimento

---

## 💻 Desenvolvimento Local

### Pré-requisitos

```bash
# Instalar Docker Desktop
# Windows/Mac: https://www.docker.com/products/docker-desktop
# Linux: https://docs.docker.com/engine/install/

# Verificar instalação
docker --version
docker-compose --version
```

### Opção 1: Docker Completo (Payload + PostgreSQL)

**Melhor para:** Quem quer ambiente 100% isolado sem instalar PostgreSQL local.

```bash
# 1. Subir todos os serviços
docker-compose up -d

# 2. Verificar status
docker-compose ps

# 3. Ver logs
docker-compose logs -f cms

# 4. Acessar
# - Payload CMS: http://localhost:3001
# - Adminer: http://localhost:8080 (com profile tools)
```

**Estrutura:**
```yaml
services:
  postgres:5432  → Database local
  cms:3001       → Payload CMS (Docker)
  adminer:8080   → DB Admin (opcional)
```

### Opção 2: Híbrido (Docker + Supabase)

**Melhor para:** Quem quer usar Supabase desde o início.

```bash
# 1. Subir apenas Payload CMS
docker-compose up cms -d

# 2. Configurar apps/cms/.env para usar Supabase
DATABASE_URI=postgresql://postgres:[SENHA]@db.[REF].supabase.co:5432/postgres

# 3. Payload CMS usará Supabase diretamente
```

### Opção 3: Sem Docker (desenvolvimento nativo)

**Melhor para:** Quem prefere controle total e já tem Node.js/PostgreSQL instalados.

```bash
# 1. Instalar dependências
pnpm install

# 2. Configurar .env files
cp apps/web/.env.local.example apps/web/.env.local
cp apps/cms/.env.example apps/cms/.env

# 3. Rodar nativamente
pnpm dev
```

### Comandos de Desenvolvimento

```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Reconstruir imagens (após mudanças no Dockerfile)
docker-compose build cms
docker-compose up -d cms

# Ver logs em tempo real
docker-compose logs -f cms

# Entrar no container
docker-compose exec cms sh

# Resetar tudo (cuidado: apaga volumes!)
docker-compose down -v
```

---

## 🚀 Produção VPS (Hostinger)

### Arquitetura de Produção

```
Internet
    ↓
Nginx:80/443 (SSL)
    ↓
Payload CMS:3001 (Docker)
    ↓
PostgreSQL (Supabase)
```

### Setup na VPS

#### 1. Conectar na VPS

```bash
ssh root@seu-servidor.hostinger.com
```

#### 2. Instalar Docker na VPS

```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt install docker-compose-plugin -y

# Verificar instalação
docker --version
docker compose version
```

#### 3. Preparar Projeto na VPS

```bash
# Criar diretório
mkdir -p /var/www/nutrindo-juntos
cd /var/www/nutrindo-juntos

# Clonar repositório
git clone https://github.com/seu-usuario/nutrindo-juntos.git .

# Criar arquivo .env de produção
nano apps/cms/.env
```

**apps/cms/.env (produção):**
```bash
NODE_ENV=production
PORT=3001
DATABASE_URI=postgresql://postgres:[SENHA]@db.[REF].supabase.co:5432/postgres
PAYLOAD_SECRET=[CHAVE-32-CHARS-SEGURA]
PAYLOAD_PUBLIC_SERVER_URL=https://cms.nutrindojuntos.com.br
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=seu-api-key
CLOUDINARY_API_SECRET=seu-api-secret
```

#### 4. Subir Payload CMS com Docker Compose

```bash
# Build e iniciar (produção)
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Verificar status
docker compose ps

# Ver logs
docker compose logs -f cms
```

#### 5. Configurar Nginx (SSL/HTTPS)

**Instalar Nginx:**
```bash
apt install nginx certbot python3-certbot-nginx -y
```

**Criar configuração Nginx:**
```bash
nano /etc/nginx/sites-available/nutrindo-cms
```

```nginx
# /etc/nginx/sites-available/nutrindo-cms
server {
    listen 80;
    server_name cms.nutrindojuntos.com.br;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Ativar e obter SSL:**
```bash
# Ativar configuração
ln -s /etc/nginx/sites-available/nutrindo-cms /etc/nginx/sites-enabled/

# Testar configuração
nginx -t

# Recarregar Nginx
systemctl reload nginx

# Obter certificado SSL (Let's Encrypt)
certbot --nginx -d cms.nutrindojuntos.com.br
```

#### 6. Configurar Auto-Start

```bash
# Docker Compose já reinicia automaticamente (restart: always)
# Verificar
docker compose ps
```

### Deploy de Atualizações

```bash
# 1. Conectar na VPS
ssh root@seu-servidor.hostinger.com
cd /var/www/nutrindo-juntos

# 2. Baixar atualizações
git pull origin main

# 3. Rebuild e restart
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# 4. Verificar logs
docker compose logs -f cms
```

---

## 🔧 Troubleshooting

### Problema: Container não inicia

```bash
# Ver logs detalhados
docker-compose logs cms

# Verificar se porta 3001 está em uso
lsof -i :3001  # Linux/Mac
netstat -ano | findstr :3001  # Windows

# Matar processo na porta
kill -9 [PID]
```

### Problema: Erro de conexão com PostgreSQL

```bash
# Verificar se PostgreSQL está rodando
docker-compose ps postgres

# Verificar logs do PostgreSQL
docker-compose logs postgres

# Testar conexão manual
docker-compose exec postgres psql -U nutrindo -d nutrindo_juntos
```

### Problema: Build lento

```bash
# Limpar cache do Docker
docker builder prune -a

# Rebuild sem cache
docker-compose build --no-cache cms
```

### Problema: Volume permissions na VPS

```bash
# Ajustar permissões
chown -R 1001:1001 /var/www/nutrindo-juntos/apps/cms
```

### Problema: Out of Memory na VPS

```bash
# Verificar uso de memória
docker stats

# Limitar memória do container (docker-compose.prod.yml)
services:
  cms:
    deploy:
      resources:
        limits:
          memory: 512M
```

---

## 📚 Comandos Úteis

### Docker Compose

```bash
# Iniciar todos os serviços
docker-compose up -d

# Iniciar serviço específico
docker-compose up -d cms

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (cuidado!)
docker-compose down -v

# Ver status dos containers
docker-compose ps

# Ver logs
docker-compose logs -f cms

# Rebuild e restart
docker-compose up -d --build

# Executar comando em container
docker-compose exec cms pnpm install
docker-compose exec cms pnpm build
```

### Docker

```bash
# Listar containers rodando
docker ps

# Listar todas as imagens
docker images

# Remover container
docker rm -f nutrindo-cms

# Remover imagem
docker rmi nutrindo-cms

# Limpar tudo (cuidado!)
docker system prune -a

# Ver logs de container específico
docker logs -f nutrindo-cms

# Entrar em container rodando
docker exec -it nutrindo-cms sh

# Ver uso de recursos
docker stats
```

### Produção VPS

```bash
# Ver status dos containers
docker compose ps

# Reiniciar Payload CMS
docker compose restart cms

# Ver logs das últimas 100 linhas
docker compose logs --tail=100 cms

# Seguir logs em tempo real
docker compose logs -f cms

# Atualizar e reiniciar
git pull && docker compose up -d --build

# Backup do banco (se usar PostgreSQL local)
docker compose exec postgres pg_dump -U nutrindo nutrindo_juntos > backup.sql

# Restore do banco
cat backup.sql | docker compose exec -T postgres psql -U nutrindo nutrindo_juntos
```

---

## 🎓 Recursos Adicionais

### Documentação Oficial
- [Docker Docs](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Payload CMS Docker](https://payloadcms.com/docs/production/deployment)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres)

### Vídeos e Tutoriais
- [Docker para Iniciantes](https://www.youtube.com/watch?v=pg19Z8LL06w)
- [Docker Compose Tutorial](https://www.youtube.com/watch?v=Qw9zlE3t8Ko)

### Dicas de Performance
1. **Use multi-stage builds** (já implementado no Dockerfile)
2. **Cache de dependências** (COPY package.json antes do código)
3. **Minimize camadas** (combine comandos RUN)
4. **Use .dockerignore** (já implementado)
5. **Não rode como root** (já implementado no stage production)

---

## ✅ Checklist de Deploy

### Desenvolvimento Local
- [ ] Docker Desktop instalado
- [ ] docker-compose.yml configurado
- [ ] .env files criados
- [ ] `docker-compose up -d` executado com sucesso
- [ ] Payload CMS acessível em http://localhost:3001

### Produção VPS
- [ ] Docker instalado na VPS
- [ ] Repositório clonado na VPS
- [ ] .env de produção configurado
- [ ] Docker Compose rodando em modo produção
- [ ] Nginx configurado com SSL
- [ ] DNS apontando para VPS
- [ ] Payload CMS acessível via HTTPS
- [ ] Auto-restart configurado
- [ ] Logs sendo monitorados

---

## 🚨 Segurança

### Boas Práticas

1. **Não commitar .env files** (já no .gitignore)
2. **Use secrets fortes** (PAYLOAD_SECRET com 32+ chars)
3. **Rode containers como non-root** (já implementado)
4. **Mantenha imagens atualizadas** (`docker-compose pull`)
5. **Use HTTPS em produção** (Let's Encrypt)
6. **Limite recursos** (memory, CPU limits)
7. **Monitore logs** (verificar tentativas de invasão)

### Firewall VPS

```bash
# Permitir apenas portas necessárias
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw enable
```

---

**Última atualização:** Fase 0 - Planejamento & Documentação
**Próximos passos:** Fase 1 - Setup & Infrastructure
