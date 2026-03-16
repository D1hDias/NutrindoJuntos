# Multi-stage Dockerfile para Payload CMS
# Otimizado para desenvolvimento e produção

# ================================
# Stage 1: Dependencies
# ================================
FROM node:18-alpine AS deps

# Instalar pnpm
RUN npm install -g pnpm@8.15.0

WORKDIR /app

# Copiar apenas package files para cache eficiente
COPY package.json pnpm-lock.yaml* ./

# Instalar dependências
RUN pnpm install --no-frozen-lockfile

# ================================
# Stage 2: Builder
# ================================
FROM node:18-alpine AS builder

RUN npm install -g pnpm@8.15.0

WORKDIR /app

# Copiar dependências do stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Build da aplicação
RUN pnpm build

# ================================
# Stage 3: Development
# ================================
FROM node:18-alpine AS development

RUN npm install -g pnpm@8.15.0

WORKDIR /app

# Copiar dependências
COPY --from=deps /app/node_modules ./node_modules

# Copiar package.json
COPY package.json ./

# Expor porta
EXPOSE 3001

# Comando de desenvolvimento (com hot-reload)
CMD ["pnpm", "dev"]

# ================================
# Stage 4: Production
# ================================
FROM node:18-alpine AS production

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Instalar apenas dependências de produção necessárias
RUN apk add --no-cache curl

WORKDIR /app

# Copiar node_modules de produção
COPY --from=deps /app/node_modules ./node_modules

# Copiar build
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./

# Mudar para usuário não-root
USER nodejs

# Expor porta
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# Comando de produção
CMD ["node", "dist/server.js"]
