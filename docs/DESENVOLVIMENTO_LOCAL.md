# Guia de Desenvolvimento Local - NUTRINDO JUNTOS

Este guia contém as instruções completas para configurar e executar o projeto localmente.

## 🔧 Configuração Inicial

### Pré-requisitos
- Node.js 18+ 
- pnpm
- Docker e Docker Compose

### Banco de Dados PostgreSQL via Docker

O projeto utiliza PostgreSQL via Docker para desenvolvimento, evitando conflitos com instalações locais.

**Arquivo de configuração**: `docker-compose.dev.yml`
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: nutrindo-postgres-dev
    environment:
      POSTGRES_DB: nutrindo_juntos
      POSTGRES_USER: nutrindo
      POSTGRES_PASSWORD: nutrindo_dev_2025
    ports:
      - "5433:5432"  # Porta diferente para evitar conflitos
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U nutrindo -d nutrindo_juntos"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

## 🚀 Execução do Projeto

### Passo 1: Iniciar o Banco de Dados
```bash
# Navegar para a raiz do projeto
cd /home/diego/projects/nutrindo-juntos

# Iniciar PostgreSQL via Docker
docker compose -f docker-compose.dev.yml up -d

# Verificar se está rodando
docker ps | grep nutrindo-postgres
```

### Passo 2: Executar os Servidores
```bash
# Em um novo terminal, execute:
npm run dev
```

**Resultado esperado:**
```
✓ Frontend: http://localhost:3000
✓ CMS Admin: http://localhost:3001/admin
✓ Payload Admin URL: http://localhost:3001/admin
✓ Server listening on port 3001
✓ Ready in 10.6s
```

### Passo 3: Acessar as Aplicações
- **Frontend**: http://localhost:3000
- **CMS Admin**: http://localhost:3001/admin

## 📂 Configuração de Ambiente

### Variáveis de Ambiente - CMS (`apps/cms/.env`)
```bash
# PostgreSQL LOCAL (Desenvolvimento via Docker)
DATABASE_URI=postgresql://nutrindo:nutrindo_dev_2025@localhost:5433/nutrindo_juntos

# Payload CMS
PORT=3001
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
PAYLOAD_SECRET=a4270f20dea119ac927bdd39b8c6ec56ac42b61a2d411adec3f3ba58fa2a802a

# Cloudinary
CLOUDINARY_CLOUD_NAME=dzwr6atgf
CLOUDINARY_API_KEY=527945141614927
CLOUDINARY_API_SECRET=yYUdz9mo0QYeCRnuLwjABqf_scE

# CORS
PAYLOAD_PUBLIC_CORS=http://localhost:3000
```

### Variáveis de Ambiente - Frontend (`apps/web/.env.local`)
```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Payload CMS API
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3001/api
PAYLOAD_URL=http://localhost:3001

# Brevo (Email Marketing)
BREVO_API_KEY=sua-chave-brevo-aqui
BREVO_LIST_NEWSLETTER=3
BREVO_LIST_LEADS_CURSOS=4

# Feature Flags
NEXT_PUBLIC_ENABLE_BLOG=true
NEXT_PUBLIC_USE_MOCK_DATA=true
```

## 🐳 Gerenciamento do Banco de Dados

### Comandos Úteis
```bash
# Parar o PostgreSQL
docker compose -f docker-compose.dev.yml down

# Reiniciar o PostgreSQL
docker compose -f docker-compose.dev.yml up -d

# Ver logs do banco
docker logs nutrindo-postgres-dev

# Conectar diretamente ao banco (opcional)
docker exec -it nutrindo-postgres-dev psql -U nutrindo -d nutrindo_juntos

# Ver status de saúde
docker inspect nutrindo-postgres-dev --format='{{.State.Health.Status}}'
```

### Backup e Restore (Opcional)
```bash
# Backup
docker exec nutrindo-postgres-dev pg_dump -U nutrindo nutrindo_juntos > backup.sql

# Restore
docker exec -i nutrindo-postgres-dev psql -U nutrindo nutrindo_juntos < backup.sql
```

## 🔄 Fluxo de Trabalho Diário

### Iniciar Desenvolvimento
```bash
# 1. Iniciar banco de dados
docker compose -f docker-compose.dev.yml up -d

# 2. Aguardar inicialização (verificar logs)
docker logs nutrindo-postgres-dev

# 3. Executar projeto
npm run dev

# 4. Acessar http://localhost:3000
```

### Finalizar Desenvolvimento
```bash
# 1. Parar servidores (Ctrl+C no terminal do npm run dev)

# 2. Manter banco rodando (recomendado) OU parar:
docker compose -f docker-compose.dev.yml down
```

## 🐛 Troubleshooting

### Erro: "cannot connect to Postgres"
```bash
# Verificar se o container está rodando
docker ps | grep nutrindo-postgres

# Se não estiver rodando:
docker compose -f docker-compose.dev.yml up -d

# Aguardar health check (10-15 segundos)
docker logs nutrindo-postgres-dev --tail 10
```

### Erro: "Port 5433 already in use"
```bash
# Verificar o que está usando a porta
sudo lsof -i :5433

# Parar container anterior
docker stop nutrindo-postgres-dev
docker rm nutrindo-postgres-dev

# Recriar
docker compose -f docker-compose.dev.yml up -d
```

### Erro: "password authentication failed"
```bash
# Recriar volume do banco (APAGA TODOS OS DADOS!)
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d
```

### Frontend não carrega
```bash
# Verificar se as variáveis de ambiente estão corretas
cat apps/web/.env.local

# Verificar se o CMS está respondendo
curl http://localhost:3001/api/health
```

### CMS Admin não carrega
```bash
# Verificar logs do CMS
# No terminal onde rodou npm run dev, verificar mensagens de erro

# Verificar conexão com banco
docker logs nutrindo-postgres-dev
```

## 📊 Monitoramento

### Verificação de Saúde
```bash
# Status do banco
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Testar endpoints
curl -I http://localhost:3000      # Frontend
curl -I http://localhost:3001/admin # CMS Admin
```

### Logs em Tempo Real
```bash
# Logs do PostgreSQL
docker logs -f nutrindo-postgres-dev

# Logs do projeto (executar npm run dev em modo verboso se necessário)
```

## 🎯 Próximos Passos

Depois que o ambiente estiver funcionando:

1. **Acessar CMS Admin**: http://localhost:3001/admin
2. **Criar primeiro usuário admin**
3. **Adicionar conteúdo de teste**
4. **Testar formulários de contato**
5. **Verificar integração com Brevo**

## 📝 Notas Importantes

- **Sempre iniciar o banco primeiro** antes de executar `npm run dev`
- **Porta 5433** é usada para evitar conflitos com PostgreSQL local
- **Dados persistem** entre reinicializações do container
- **Configuração pronta** para produção com Supabase (comentada no `.env`)

---

**Última Atualização**: 12/03/2026
**Próxima Revisão**: Após deploy em produção