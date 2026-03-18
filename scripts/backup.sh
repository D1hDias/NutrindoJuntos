#!/bin/bash

# backup.sh - Database and Files Backup Script
# Usage: ./scripts/backup.sh [manual|auto]

set -e

# Configuration
BACKUP_TYPE=${1:-manual}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
DB_BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sql"
FILES_BACKUP_FILE="$BACKUP_DIR/files_backup_$TIMESTAMP.tar.gz"
RETENTION_DAYS=30

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

# Create backup directory
mkdir -p $BACKUP_DIR

log "📦 Starting backup process ($BACKUP_TYPE)..."

# Database backup
log "💾 Creating database backup..."
if docker-compose -f docker-compose.production.yml exec -T postgres pg_dump -U nutrindo_user nutrindo_juntos_prod > $DB_BACKUP_FILE; then
    log "✅ Database backup created: $DB_BACKUP_FILE"
    
    # Compress database backup
    gzip $DB_BACKUP_FILE
    log "✅ Database backup compressed: ${DB_BACKUP_FILE}.gz"
else
    echo "❌ Database backup failed"
    exit 1
fi

# Files backup (uploads, logs, etc.)
log "📁 Creating files backup..."
tar -czf $FILES_BACKUP_FILE \
    --exclude='./backups' \
    --exclude='./node_modules' \
    --exclude='./.next' \
    --exclude='./.git' \
    ./logs ./nginx/ssl 2>/dev/null || true

if [ -f $FILES_BACKUP_FILE ]; then
    log "✅ Files backup created: $FILES_BACKUP_FILE"
else
    log "⚠️ Files backup skipped (no files to backup)"
fi

# Cleanup old backups
log "🧹 Cleaning up old backups (keeping last $RETENTION_DAYS days)..."
find $BACKUP_DIR -type f -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete 2>/dev/null || true
find $BACKUP_DIR -type f -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete 2>/dev/null || true

# Backup summary
log "📊 Backup Summary:"
info "Database backup size: $(ls -lh ${DB_BACKUP_FILE}.gz 2>/dev/null | awk '{print $5}' || echo 'N/A')"
info "Files backup size: $(ls -lh $FILES_BACKUP_FILE 2>/dev/null | awk '{print $5}' || echo 'N/A')"
info "Total backups in directory: $(ls -1 $BACKUP_DIR | wc -l)"

log "✅ Backup process completed successfully!"

# If this is an automated backup, also upload to cloud storage (optional)
if [ "$BACKUP_TYPE" = "auto" ]; then
    log "☁️ Automated backup - consider uploading to cloud storage"
    # Add your cloud upload logic here (AWS S3, Google Cloud, etc.)
    # Example: aws s3 cp $BACKUP_DIR s3://your-backup-bucket/ --recursive
fi