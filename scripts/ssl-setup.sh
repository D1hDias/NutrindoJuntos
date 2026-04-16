#!/bin/bash

# ssl-setup.sh - SSL Certificate Setup with Let's Encrypt
# Usage: ./scripts/ssl-setup.sh [domain]

set -e

DOMAIN=${1:-nutrindojuntos.com.br}
EMAIL="contato@nutrindojuntos.com.br"
SSL_DIR="./nginx/ssl"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Create SSL directory
mkdir -p $SSL_DIR

log "🔒 Setting up SSL certificates for domain: $DOMAIN"

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    log "📦 Installing Certbot..."
    
    # Ubuntu/Debian
    if command -v apt &> /dev/null; then
        sudo apt update
        sudo apt install -y certbot python3-certbot-nginx
    # CentOS/RHEL
    elif command -v yum &> /dev/null; then
        sudo yum install -y certbot python3-certbot-nginx
    # Arch Linux
    elif command -v pacman &> /dev/null; then
        sudo pacman -S certbot certbot-nginx
    else
        warning "Unable to install Certbot automatically. Please install it manually."
        exit 1
    fi
fi

# Stop nginx container temporarily
log "⏹️ Stopping nginx container..."
docker-compose -f docker-compose.production.yml stop nginx || true

# Method 1: Standalone mode (recommended for first setup)
log "🌐 Obtaining SSL certificate using standalone mode..."

# Request certificate
certbot certonly \
    --standalone \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --cert-path $SSL_DIR/${DOMAIN}.crt \
    --key-path $SSL_DIR/${DOMAIN}.key

# Copy certificates to nginx directory
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    log "📋 Copying certificates to nginx directory..."
    
    sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem $SSL_DIR/${DOMAIN}.crt
    sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem $SSL_DIR/${DOMAIN}.key
    
    # Set correct permissions
    sudo chown $(whoami):$(whoami) $SSL_DIR/${DOMAIN}.crt $SSL_DIR/${DOMAIN}.key
    chmod 644 $SSL_DIR/${DOMAIN}.crt
    chmod 600 $SSL_DIR/${DOMAIN}.key
    
    log "✅ SSL certificates successfully installed!"
else
    warning "❌ Certificate installation failed. Check certbot output above."
    exit 1
fi

# Start nginx container
log "▶️ Starting nginx container..."
docker-compose -f docker-compose.production.yml up -d nginx

# Set up automatic renewal
log "🔄 Setting up automatic certificate renewal..."

# Create renewal script
cat > $SSL_DIR/renew-ssl.sh << 'EOF'
#!/bin/bash

# Renew certificates
certbot renew --quiet

# Copy renewed certificates
DOMAIN=nutrindojuntos.com.br
SSL_DIR="./nginx/ssl"

if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem $SSL_DIR/${DOMAIN}.crt
    cp /etc/letsencrypt/live/$DOMAIN/privkey.pem $SSL_DIR/${DOMAIN}.key
    
    # Reload nginx
    docker-compose -f docker-compose.production.yml exec nginx nginx -s reload
    
    echo "SSL certificates renewed and nginx reloaded"
fi
EOF

chmod +x $SSL_DIR/renew-ssl.sh

# Add to crontab for automatic renewal (monthly)
(crontab -l 2>/dev/null || true; echo "0 3 1 * * $PWD/$SSL_DIR/renew-ssl.sh") | crontab -

log "📅 Automatic renewal scheduled (monthly on 1st at 3 AM)"

# Verify SSL setup
log "🔍 Verifying SSL configuration..."

# Wait a moment for nginx to start
sleep 5

if curl -sSf https://$DOMAIN/health > /dev/null 2>&1; then
    log "✅ SSL certificate is working correctly!"
else
    warning "⚠️ SSL verification failed. Check nginx logs:"
    docker-compose -f docker-compose.production.yml logs nginx
fi

# Display certificate info
log "📋 Certificate Information:"
info "Domain: $DOMAIN"
info "Email: $EMAIL"
info "Certificate path: $SSL_DIR/${DOMAIN}.crt"
info "Private key path: $SSL_DIR/${DOMAIN}.key"

# Check certificate expiration
EXPIRY=$(openssl x509 -enddate -noout -in $SSL_DIR/${DOMAIN}.crt | cut -d= -f2)
info "Certificate expires: $EXPIRY"

log "🎉 SSL setup completed successfully!"
log "🔒 Your site is now secured with HTTPS"
log "🔄 Automatic renewal is configured"