#!/bin/bash

# deploy.sh - Deploy Automation Script for VPS
# Usage: ./scripts/deploy.sh [production|staging]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-production}
PROJECT_NAME="nutrindo-juntos"
BACKUP_DIR="./backups"
LOG_FILE="./logs/deploy-$(date +%Y%m%d_%H%M%S).log"

# Functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a ${LOG_FILE}
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" | tee -a ${LOG_FILE}
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}" | tee -a ${LOG_FILE}
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}" | tee -a ${LOG_FILE}
}

# Create log directory
mkdir -p logs

log "🚀 Starting deployment for environment: $ENVIRONMENT"

# Pre-deployment checks
log "🔍 Running pre-deployment checks..."

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    error "Docker is not running. Please start Docker and try again."
fi

# Check if environment file exists
if [ ! -f ".env.$ENVIRONMENT" ]; then
    error "Environment file .env.$ENVIRONMENT not found. Please create it from .env.$ENVIRONMENT.template"
fi

# Check if required directories exist
mkdir -p logs backups nginx/ssl

# Backup current data (if containers exist)
log "💾 Creating backup..."
if docker ps -a --format 'table {{.Names}}' | grep -q nutrindo-db; then
    ./scripts/backup.sh
fi

# Stop existing containers
log "⏹️ Stopping existing containers..."
docker-compose -f docker-compose.production.yml down || true

# Clean up old images (optional)
read -p "Do you want to clean up old Docker images? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log "🧹 Cleaning up old Docker images..."
    docker image prune -f
fi

# Build and start new containers
log "🔨 Building and starting containers..."
docker-compose -f docker-compose.production.yml up --build -d

# Wait for services to be healthy
log "⏳ Waiting for services to be ready..."
sleep 30

# Health checks
log "🔍 Running health checks..."

# Check web service
if docker-compose -f docker-compose.production.yml exec -T web curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    log "✅ Web service is healthy"
else
    warning "⚠️ Web service health check failed"
fi

# Check database
if docker-compose -f docker-compose.production.yml exec -T postgres pg_isready -U nutrindo_user > /dev/null 2>&1; then
    log "✅ Database is healthy"
else
    warning "⚠️ Database health check failed"
fi

# Check nginx
if docker-compose -f docker-compose.production.yml exec -T nginx nginx -t > /dev/null 2>&1; then
    log "✅ Nginx configuration is valid"
else
    warning "⚠️ Nginx configuration check failed"
fi

# Run database migrations (if needed)
log "📊 Running database setup..."
# Uncomment when Payload CMS is integrated
# docker-compose -f docker-compose.production.yml exec web npm run payload:migrate

# Final status
log "📈 Deployment Status:"
docker-compose -f docker-compose.production.yml ps

# Show logs
log "📋 Recent logs:"
docker-compose -f docker-compose.production.yml logs --tail=20

# SSL Certificate check/setup
log "🔒 SSL Certificate status:"
if [ -f "nginx/ssl/nutrindojuntos.com.br.crt" ]; then
    log "✅ SSL certificate found"
    # Check expiration
    EXPIRY=$(openssl x509 -enddate -noout -in nginx/ssl/nutrindojuntos.com.br.crt | cut -d= -f2)
    log "Certificate expires: $EXPIRY"
else
    warning "⚠️ SSL certificate not found. Run: ./scripts/ssl-setup.sh"
fi

log "🎉 Deployment completed successfully!"
log "🌐 Site should be available at: https://nutrindojuntos.com.br"
log "📊 Monitor with: docker-compose -f docker-compose.production.yml logs -f"
log "🔧 Manage with: docker-compose -f docker-compose.production.yml [start|stop|restart]"

# Save deployment info
cat > deployment-info.json << EOF
{
  "deploymentDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "environment": "$ENVIRONMENT",
  "gitCommit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "dockerImages": {
    "web": "$(docker images --format 'table {{.Repository}}:{{.Tag}}' | grep nutrindo-juntos | head -1)",
    "postgres": "postgres:15-alpine",
    "redis": "redis:7-alpine",
    "nginx": "nginx:alpine"
  }
}
EOF

log "💾 Deployment info saved to deployment-info.json"