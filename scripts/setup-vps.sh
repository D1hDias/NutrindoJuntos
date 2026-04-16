#!/bin/bash

# setup-vps.sh - VPS Initial Setup Script
# Usage: curl -fsSL https://raw.githubusercontent.com/USER/REPO/main/scripts/setup-vps.sh | bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    error "Don't run this script as root. Create a regular user first."
fi

log "🚀 NUTRINDO JUNTOS - VPS Setup Script"
log "====================================="

# Update system
log "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install essential packages
log "🔧 Installing essential packages..."
sudo apt install -y \
    curl \
    wget \
    git \
    unzip \
    htop \
    nano \
    ufw \
    fail2ban \
    logrotate \
    certbot \
    python3-certbot-nginx

# Install Docker
log "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    log "✅ Docker installed successfully"
else
    log "✅ Docker already installed"
fi

# Install Docker Compose
log "🔧 Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    log "✅ Docker Compose installed successfully"
else
    log "✅ Docker Compose already installed"
fi

# Configure firewall
log "🔥 Configuring firewall..."
sudo ufw --force enable
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw default deny incoming
sudo ufw default allow outgoing
log "✅ Firewall configured"

# Configure fail2ban
log "🛡️ Configuring fail2ban..."
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
log "✅ Fail2ban configured"

# Create project directory
log "📁 Creating project structure..."
sudo mkdir -p /var/www
sudo chown $USER:$USER /var/www

# Clone project (if git repository is provided)
read -p "Enter Git repository URL (or press Enter to skip): " GIT_REPO
if [ ! -z "$GIT_REPO" ]; then
    log "📥 Cloning repository..."
    cd /var/www
    git clone $GIT_REPO nutrindo-juntos
    cd nutrindo-juntos
    log "✅ Repository cloned"
else
    log "⏭️ Git repository clone skipped"
fi

# Configure swap (if needed)
if [ $(free | awk '/^Mem:/{print $2}') -lt 4000000 ]; then
    log "💾 Creating swap file (low memory detected)..."
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    log "✅ Swap file created"
fi

# Install Node.js (for development/debugging)
log "📦 Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    # Install pnpm
    sudo npm install -g pnpm
    log "✅ Node.js and pnpm installed"
else
    log "✅ Node.js already installed"
fi

# Create directories for the project
log "📁 Creating project directories..."
mkdir -p ~/nutrindo-juntos/{logs,backups,nginx/ssl}

# Set up log rotation
log "📝 Configuring log rotation..."
sudo tee /etc/logrotate.d/nutrindo-juntos > /dev/null << EOF
/var/www/nutrindo-juntos/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
}
EOF

# Configure system limits
log "⚙️ Configuring system limits..."
sudo tee -a /etc/security/limits.conf > /dev/null << EOF

# NUTRINDO JUNTOS - Production limits
$USER soft nofile 65536
$USER hard nofile 65536
$USER soft nproc 4096
$USER hard nproc 4096
EOF

# Setup environment template
log "📝 Creating environment template..."
cat > ~/.env.production.example << 'EOF'
# Copy this to .env.production and fill with your values

# Database
POSTGRES_DB=nutrindo_juntos_prod
POSTGRES_USER=nutrindo_user
POSTGRES_PASSWORD=CHANGE_THIS_PASSWORD
DATABASE_URL=postgresql://nutrindo_user:CHANGE_THIS_PASSWORD@postgres:5432/nutrindo_juntos_prod

# Application
NEXT_PUBLIC_SITE_URL=https://nutrindojuntos.com.br
CONTACT_EMAIL=contato@nutrindojuntos.com.br

# Brevo
BREVO_API_KEY=YOUR_BREVO_API_KEY

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn

# Redis
REDIS_URL=redis://redis:6379
EOF

# Create helpful aliases
log "🔧 Creating helpful aliases..."
cat >> ~/.bashrc << 'EOF'

# NUTRINDO JUNTOS - Helpful aliases
alias nj-logs='docker-compose -f docker-compose.production.yml logs'
alias nj-status='docker-compose -f docker-compose.production.yml ps'
alias nj-restart='docker-compose -f docker-compose.production.yml restart'
alias nj-deploy='cd /var/www/nutrindo-juntos && ./scripts/deploy.sh production'
alias nj-backup='cd /var/www/nutrindo-juntos && ./scripts/backup.sh'
alias nj-ssl='cd /var/www/nutrindo-juntos && ./scripts/ssl-setup.sh nutrindojuntos.com.br'
EOF

# Setup monitoring script
log "📊 Creating monitoring script..."
cat > ~/monitor-nutrindo.sh << 'EOF'
#!/bin/bash

# Simple monitoring script for NUTRINDO JUNTOS
echo "=== NUTRINDO JUNTOS - System Status ==="
echo "Time: $(date)"
echo ""

echo "=== Docker Containers ==="
docker-compose -f /var/www/nutrindo-juntos/docker-compose.production.yml ps
echo ""

echo "=== System Resources ==="
echo "Memory Usage:"
free -h
echo ""
echo "Disk Usage:"
df -h
echo ""

echo "=== Service Health ==="
echo "HTTP Status:"
curl -I -s https://nutrindojuntos.com.br | head -1 || echo "Site unreachable"
echo ""

echo "API Health:"
curl -s https://nutrindojuntos.com.br/api/health | jq .status || echo "API unreachable"
echo ""

echo "=== Recent Logs ==="
echo "Last 5 lines from application logs:"
docker-compose -f /var/www/nutrindo-juntos/docker-compose.production.yml logs --tail=5 web
EOF

chmod +x ~/monitor-nutrindo.sh

# System information
log "📋 System Information:"
info "OS: $(lsb_release -d | cut -f2)"
info "Kernel: $(uname -r)"
info "CPU: $(nproc) cores"
info "Memory: $(free -h | awk '/^Mem:/{print $2}')"
info "Disk: $(df -h / | awk 'NR==2{print $2}')"
info "Docker: $(docker --version | cut -d' ' -f3 | tr -d ',')"
info "Docker Compose: $(docker-compose --version | cut -d' ' -f3 | tr -d ',')"

# Next steps
log "🎉 VPS Setup completed successfully!"
echo ""
warning "📝 NEXT STEPS:"
echo "1. Reboot the server: sudo reboot"
echo "2. Log back in and navigate to project: cd /var/www/nutrindo-juntos"
echo "3. Copy environment template: cp .env.production.template .env.production"
echo "4. Edit environment variables: nano .env.production"
echo "5. Configure DNS A record to point to this server's IP"
echo "6. Run deployment: ./scripts/deploy.sh production"
echo "7. Setup SSL: ./scripts/ssl-setup.sh nutrindojuntos.com.br"
echo ""
info "🔧 Helpful commands:"
echo "- Monitor system: ~/monitor-nutrindo.sh"
echo "- Check logs: nj-logs"
echo "- Check status: nj-status"
echo "- Deploy updates: nj-deploy"
echo ""
info "📖 Full documentation: /var/www/nutrindo-juntos/DEPLOY-VPS.md"

warning "⚠️ IMPORTANT: Reboot is required for Docker group membership to take effect!"