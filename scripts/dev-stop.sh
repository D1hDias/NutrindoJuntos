#!/bin/bash

# Script para parar todos os serviços de desenvolvimento

echo "🛑 Parando serviços de desenvolvimento..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Parar processos por PID se existirem
if [ -f logs/frontend.pid ]; then
  FRONTEND_PID=$(cat logs/frontend.pid)
  if kill -0 $FRONTEND_PID 2>/dev/null; then
    echo -e "${YELLOW}Parando Frontend (PID: $FRONTEND_PID)...${NC}"
    kill $FRONTEND_PID 2>/dev/null
  fi
  rm -f logs/frontend.pid
fi

if [ -f logs/cms.pid ]; then
  CMS_PID=$(cat logs/cms.pid)
  if kill -0 $CMS_PID 2>/dev/null; then
    echo -e "${YELLOW}Parando CMS (PID: $CMS_PID)...${NC}"
    kill $CMS_PID 2>/dev/null
  fi
  rm -f logs/cms.pid
fi

# Parar processos por nome (backup)
pkill -f "next dev" 2>/dev/null || true
pkill -f "tsx src/server.ts" 2>/dev/null || true

# Parar PostgreSQL se desejado
read -p "Parar PostgreSQL também? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}Parando PostgreSQL...${NC}"
  docker compose -f docker-compose.dev.yml down
  echo -e "${GREEN}✅ PostgreSQL parado${NC}"
fi

echo -e "${GREEN}✅ Todos os serviços foram parados${NC}"