#!/bin/bash

# Script para desenvolvimento mais rápido
# 1. Inicia PostgreSQL
# 2. Inicia servidores
# 3. Aquece páginas principais

set -e

echo "🚀 Iniciando desenvolvimento RÁPIDO..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Verificar e iniciar PostgreSQL
echo -e "\n${BLUE}📦 1. Verificando PostgreSQL...${NC}"
if ! docker ps | grep -q nutrindo-postgres-dev; then
  echo -e "${YELLOW}   Iniciando PostgreSQL via Docker...${NC}"
  docker compose -f docker-compose.dev.yml up -d
  echo -e "${GREEN}   ✅ PostgreSQL iniciado${NC}"
else
  echo -e "${GREEN}   ✅ PostgreSQL já está rodando${NC}"
fi

# 2. Aguardar PostgreSQL estar pronto
echo -e "\n${BLUE}⏳ 2. Aguardando PostgreSQL...${NC}"
while ! docker exec nutrindo-postgres-dev pg_isready -U nutrindo -d nutrindo_juntos >/dev/null 2>&1; do
  echo -e "${YELLOW}   Aguardando banco de dados...${NC}"
  sleep 1
done
echo -e "${GREEN}   ✅ PostgreSQL pronto${NC}"

# 3. Iniciar servidores em background
echo -e "\n${BLUE}🖥️  3. Iniciando servidores...${NC}"

# Cleanup anterior se existir
pkill -f "next dev" 2>/dev/null || true
pkill -f "tsx src/server.ts" 2>/dev/null || true

# Iniciar em background e capturar PIDs
echo -e "${YELLOW}   Iniciando Next.js frontend...${NC}"
cd apps/web && npm run dev > ../../logs/frontend.log 2>&1 &
FRONTEND_PID=$!

echo -e "${YELLOW}   Iniciando Payload CMS...${NC}" 
cd ../cms && npm run dev > ../../logs/cms.log 2>&1 &
CMS_PID=$!

# Voltar para raiz
cd ../..

# Criar diretório de logs se não existir
mkdir -p logs

echo -e "${GREEN}   ✅ Servidores iniciados (PIDs: Frontend=$FRONTEND_PID, CMS=$CMS_PID)${NC}"

# 4. Aguardar servidores estarem prontos
echo -e "\n${BLUE}⏳ 4. Aguardando servidores...${NC}"

# Aguardar frontend (max 30s)
for i in {1..30}; do
  if curl -s http://localhost:3000 >/dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Frontend pronto (${i}s)${NC}"
    break
  fi
  sleep 1
done

# Aguardar CMS (max 30s)
for i in {1..30}; do
  if curl -s http://localhost:3001/admin >/dev/null 2>&1; then
    echo -e "${GREEN}   ✅ CMS pronto (${i}s)${NC}"
    break
  fi
  sleep 1
done

# 5. Aquecer páginas principais
echo -e "\n${BLUE}🔥 5. Aquecendo páginas principais...${NC}"
cd apps/web && node scripts/warm-pages.js
cd ../..

# 6. Status final
echo -e "\n${GREEN}🎉 DESENVOLVIMENTO RÁPIDO ATIVO!${NC}"
echo -e "   ${GREEN}✅ Frontend:${NC} http://localhost:3000"
echo -e "   ${GREEN}✅ CMS Admin:${NC} http://localhost:3001/admin"
echo -e "   ${GREEN}✅ Páginas aquecidas e prontas${NC}"
echo -e "\n${YELLOW}📋 Comandos úteis:${NC}"
echo -e "   ${BLUE}Logs frontend:${NC} tail -f logs/frontend.log"
echo -e "   ${BLUE}Logs CMS:${NC} tail -f logs/cms.log"
echo -e "   ${BLUE}Parar tudo:${NC} ./scripts/dev-stop.sh"

# Salvar PIDs para cleanup posterior
echo $FRONTEND_PID > logs/frontend.pid
echo $CMS_PID > logs/cms.pid

echo -e "\n${GREEN}Pressione Ctrl+C para parar todos os serviços${NC}"

# Aguardar sinal de parada
trap 'echo -e "\n${RED}Parando serviços...${NC}"; kill $FRONTEND_PID $CMS_PID 2>/dev/null; exit 0' INT

# Manter script rodando
wait