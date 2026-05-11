/**
 * PM2 Ecosystem Configuration - NutrindoJuntos Production
 *
 * Uso:
 * - pm2 start ecosystem.config.js --env production
 * - pm2 reload ecosystem.config.js --env production
 * - pm2 stop ecosystem.config.js
 * - pm2 delete ecosystem.config.js
 * - pm2 logs nutrindojuntos
 */

module.exports = {
  apps: [{
    name: 'nutrindojuntos',
    script: 'apps/web/.next/standalone/apps/web/server.js',
    cwd: '/var/www/nutrindojuntos',

    // Instâncias — 1 processo é suficiente para VPS com 2 vCPUs
    instances: 1,
    exec_mode: 'fork',

    // Variáveis de ambiente
    env_production: {
      NODE_ENV: 'production',
      PORT: 3003,
      HOSTNAME: '0.0.0.0',
    },

    // Auto-restart
    autorestart: true,
    watch: false,
    max_memory_restart: '400M', // Restart se usar >400MB

    // Logs
    error_file: '/var/www/nutrindojuntos/logs/pm2-error.log',
    out_file: '/var/www/nutrindojuntos/logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,

    // Graceful shutdown
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000,

    // Health check
    min_uptime: '10s',
    max_restarts: 10,
  }]
}
