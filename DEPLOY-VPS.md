# 🚀 DEPLOY VPS - NUTRINDO JUNTOS

**Guia Completo para Deploy em Servidor VPS**

---

## 📋 PRÉ-REQUISITOS

### **Hardware Mínimo (VPS)**
- **CPU**: 2 vCPUs
- **RAM**: 4GB (recomendado 8GB)
- **Storage**: 40GB SSD
- **Bandwidth**: 2TB/mês

### **Software Necessário no VPS**
- Ubuntu 22.04 LTS (recomendado)
- Docker & Docker Compose
- Nginx (será instalado via Docker)
- Certbot (para SSL)
- Git

---

## ⚙️ CONFIGURAÇÃO INICIAL DO VPS

### **1. Conectar ao VPS**
```bash
# SSH para o servidor
ssh root@SEU_IP_VPS

# Ou com usuário específico
ssh diego@SEU_IP_VPS
```

### **2. Atualizar Sistema**
```bash
# Atualizar pacotes
sudo apt update && sudo apt upgrade -y

# Instalar dependências básicas
sudo apt install -y curl wget git unzip
```

### **3. Instalar Docker**
```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalação
docker --version
docker-compose --version
```

### **4. Configurar Firewall**
```bash
# Habilitar UFW
sudo ufw enable

# Liberar portas essenciais
sudo ufw allow ssh
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 22/tcp    # SSH

# Verificar status
sudo ufw status
```

---

## 📁 PREPARAÇÃO DO PROJETO

### **1. Clonar Repositório**
```bash
# No VPS
cd /var/www
sudo git clone https://github.com/SEU_USUARIO/nutrindo-juntos.git
sudo chown -R $USER:$USER nutrindo-juntos
cd nutrindo-juntos
```

### **2. Configurar Variáveis de Ambiente**
```bash
# Copiar template
cp .env.production.template .env.production

# Editar com suas configurações
nano .env.production
```

**Variáveis Obrigatórias:**
```bash
# Database
POSTGRES_DB=nutrindo_juntos_prod
POSTGRES_USER=nutrindo_user  
POSTGRES_PASSWORD=SUA_SENHA_SEGURA_AQUI

# Brevo
BREVO_API_KEY=SUA_CHAVE_BREVO

# Site
NEXT_PUBLIC_SITE_URL=https://nutrindojuntos.com.br
CONTACT_EMAIL=contato@nutrindojuntos.com.br
```

### **3. Configurar DNS**
No painel do seu provedor de domínio:
```
Tipo: A
Nome: @
Valor: SEU_IP_VPS
TTL: 300

Tipo: A  
Nome: www
Valor: SEU_IP_VPS
TTL: 300
```

---

## 🐳 DEPLOY COM DOCKER

### **1. Build e Start (Primeira Vez)**
```bash
# Dar permissões aos scripts
chmod +x scripts/*.sh

# Executar deploy
./scripts/deploy.sh production
```

### **2. Configurar SSL (Let's Encrypt)**
```bash
# Após DNS propagado (aguarde 5-10 min)
./scripts/ssl-setup.sh nutrindojuntos.com.br
```

### **3. Verificar Status**
```bash
# Status dos containers
docker-compose -f docker-compose.production.yml ps

# Logs em tempo real
docker-compose -f docker-compose.production.yml logs -f

# Logs específicos
docker-compose -f docker-compose.production.yml logs web
docker-compose -f docker-compose.production.yml logs postgres
docker-compose -f docker-compose.production.yml logs nginx
```

---

## 🔧 COMANDOS DE GERENCIAMENTO

### **Controle de Containers**
```bash
# Parar tudo
docker-compose -f docker-compose.production.yml down

# Iniciar
docker-compose -f docker-compose.production.yml up -d

# Reiniciar serviço específico
docker-compose -f docker-compose.production.yml restart web

# Rebuildar e reiniciar
docker-compose -f docker-compose.production.yml up --build -d
```

### **Backup e Restore**
```bash
# Fazer backup
./scripts/backup.sh

# Restaurar backup (substitua pela data correta)
docker-compose -f docker-compose.production.yml exec postgres psql -U nutrindo_user -d nutrindo_juntos_prod < backups/db_backup_20241117_140000.sql
```

### **Monitoramento**
```bash
# Uso de recursos
docker stats

# Espaço em disco
df -h

# Logs do sistema
journalctl -f

# Logs nginx
docker-compose -f docker-compose.production.yml logs nginx | tail -100
```

---

## 📊 HEALTH CHECKS

### **URLs para Teste**
- **Site Principal**: `https://nutrindojuntos.com.br`
- **Health Check**: `https://nutrindojuntos.com.br/health`  
- **API Test**: `https://nutrindojuntos.com.br/api/health`

### **Comandos de Verificação**
```bash
# Teste HTTP
curl -I https://nutrindojuntos.com.br

# Teste API
curl https://nutrindojuntos.com.br/api/health

# Teste banco de dados
docker-compose -f docker-compose.production.yml exec postgres pg_isready -U nutrindo_user

# Teste certificado SSL
openssl s_client -connect nutrindojuntos.com.br:443 -servername nutrindojuntos.com.br < /dev/null
```

---

## 🔄 ATUALIZAÇÕES E REDEPLOY

### **Processo de Atualização**
```bash
# 1. Fazer backup
./scripts/backup.sh

# 2. Baixar atualizações
git pull origin main

# 3. Redeploy
./scripts/deploy.sh production
```

### **Rollback (se necessário)**
```bash
# Voltar commit anterior
git reset --hard HEAD~1

# Redeploy versão anterior
./scripts/deploy.sh production

# Ou restaurar backup de banco
docker-compose -f docker-compose.production.yml exec postgres psql -U nutrindo_user -d nutrindo_juntos_prod < backups/BACKUP_ANTERIOR.sql
```

---

## 🚨 TROUBLESHOOTING

### **Problemas Comuns**

**1. Container não inicia**
```bash
# Ver logs detalhados
docker-compose -f docker-compose.production.yml logs NOME_CONTAINER

# Verificar recursos
free -h
df -h
```

**2. SSL não funciona**
```bash
# Verificar certificados
ls -la nginx/ssl/

# Recriar certificados
./scripts/ssl-setup.sh nutrindojuntos.com.br
```

**3. Database connection error**
```bash
# Verificar se postgres está rodando
docker-compose -f docker-compose.production.yml ps postgres

# Testar conexão
docker-compose -f docker-compose.production.yml exec postgres psql -U nutrindo_user -d nutrindo_juntos_prod -c "SELECT 1;"
```

**4. Out of Memory**
```bash
# Verificar uso de memória
free -h

# Adicionar swap (se necessário)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### **Logs Importantes**
```bash
# Logs do sistema
sudo journalctl -u docker

# Logs aplicação
docker-compose -f docker-compose.production.yml logs -f web

# Logs nginx
docker-compose -f docker-compose.production.yml logs nginx

# Logs banco
docker-compose -f docker-compose.production.yml logs postgres
```

---

## 📈 MONITORAMENTO E MANUTENÇÃO

### **Backups Automáticos**
O backup está configurado para rodar automaticamente. Para verificar:

```bash
# Ver agendamento
crontab -l

# Testar backup manual
./scripts/backup.sh manual

# Verificar backups existentes
ls -la backups/
```

### **Renovação SSL Automática**
```bash
# Verificar agendamento
crontab -l

# Testar renovação
./nginx/ssl/renew-ssl.sh
```

### **Limpeza Periódica**
```bash
# Limpar containers antigos
docker system prune -a

# Limpar logs antigos
sudo journalctl --vacuum-time=30d

# Limpar backups antigos (já automático nos scripts)
find backups/ -type f -mtime +30 -delete
```

---

## 🎯 CHECKLIST DE DEPLOY

**Antes do Deploy:**
- [ ] VPS configurado com Docker
- [ ] DNS apontado para o IP do VPS
- [ ] Arquivo `.env.production` configurado
- [ ] Firewall configurado (portas 80, 443, 22)

**Durante o Deploy:**
- [ ] `./scripts/deploy.sh production` executado com sucesso
- [ ] Containers rodando: `docker-compose ps`
- [ ] SSL configurado: `./scripts/ssl-setup.sh`
- [ ] Health checks passando

**Após o Deploy:**
- [ ] Site acessível via HTTPS
- [ ] Formulários funcionais
- [ ] API respondendo
- [ ] Backup configurado
- [ ] Monitoramento ativo

---

## 📞 SUPORTE

**Em caso de problemas:**

1. **Verificar logs**: `docker-compose -f docker-compose.production.yml logs`
2. **Verificar recursos**: `htop` ou `free -h`
3. **Consultar este documento**
4. **Fazer rollback se necessário**

**Contatos:**
- **Email**: contato@nutrindojuntos.com.br
- **Documentação**: Este arquivo
- **Logs**: Sempre verifique os logs primeiro

---

## 📝 INFORMAÇÕES ADICIONAIS

### **Estrutura de Arquivos no VPS**
```
/var/www/nutrindo-juntos/
├── docker-compose.production.yml
├── Dockerfile.production  
├── .env.production
├── nginx/
│   ├── nginx.conf
│   └── ssl/
├── scripts/
│   ├── deploy.sh
│   ├── backup.sh
│   └── ssl-setup.sh
├── backups/
├── logs/
└── apps/web/
```

### **Portas Utilizadas**
- **80**: HTTP (redirect para HTTPS)
- **443**: HTTPS (Nginx)
- **3000**: Next.js (interno)
- **5432**: PostgreSQL (interno)
- **6379**: Redis (interno)

### **Recursos de Sistema**
- **RAM**: ~2-3GB em uso normal
- **CPU**: ~10-30% em uso normal
- **Disk**: ~15-20GB projeto + logs/backups

**🎉 Pronto! Seu site NUTRINDO JUNTOS estará rodando em produção com HTTPS, backups automáticos e monitoramento completo.**