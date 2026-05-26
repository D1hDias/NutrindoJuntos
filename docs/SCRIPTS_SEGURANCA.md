# Scripts de Segurança - Guia de Uso

**Localização:** Servidor VPS (root@31.97.245.82)
**Data de Criação:** 19/04/2026
**Status:** Ativos e Monitorando

---

## 📋 Scripts Disponíveis

### 1. Security Monitor (Monitoramento Automático)
**Localização:** `/usr/local/bin/security-monitor.sh`
**Execução:** Automática a cada 15 minutos via cron
**Log:** `/var/log/security-monitor.log`

#### O que monitora:
- ✅ Processos suspeitos (xmr, mining, crypto, miner)
- ✅ Uso de CPU (alerta se >80%)
- ✅ Crontabs maliciosos
- ✅ Containers Docker suspeitos
- ✅ Auto-stop de containers maliciosos

#### Como usar:
```bash
# Ver últimos 20 logs
tail -20 /var/log/security-monitor.log

# Ver logs em tempo real
tail -f /var/log/security-monitor.log

# Executar manualmente
/usr/local/bin/security-monitor.sh

# Ver crontab
crontab -l
```

#### Exemplo de log:
```
[2026-04-19 18:01:38] Scan OK - Sistema seguro
[2026-04-19 18:15:00] Scan OK - Sistema seguro
[2026-04-19 18:30:00] Scan OK - Sistema seguro
```

---

### 2. Security Quick Check (Verificação Rápida)
**Localização:** `/root/security-quick-check.sh`
**Execução:** Manual
**Output:** Colorido e formatado no terminal

#### O que verifica:
1. ✅ Processos suspeitos
2. ✅ Uso de CPU e Memória
3. ✅ Containers Docker
4. ✅ Crontabs ativos
5. ✅ Configuração SSH
6. ✅ Status do Firewall (UFW)
7. ✅ Status do fail2ban
8. ✅ Últimos 5 logins
9. ✅ Resumo com contagem de problemas

#### Como usar:
```bash
# Executar verificação
/root/security-quick-check.sh

# Ou simplesmente (se estiver em /root)
./security-quick-check.sh
```

#### Exemplo de output:
```
╔════════════════════════════════════════╗
║  VERIFICAÇÃO RÁPIDA DE SEGURANÇA      ║
╔════════════════════════════════════════╗

[1] Processos Suspeitos:
✅ Nenhum processo suspeito

[2] Uso de CPU:
✅ CPU: 0.0% (Normal)

[3] Uso de Memória:
✅ Memória: 18% (Normal)

[4] Docker:
✅ Nenhum container rodando

[5] Crontabs:
ℹ️  Crontabs ativos:
*/15 * * * * /usr/local/bin/security-monitor.sh

[6] Configuração SSH:
✅ PasswordAuthentication: NO
✅ PermitRootLogin: prohibit-password

[7] Firewall (UFW):
✅ UFW: Ativo

[8] fail2ban:
✅ fail2ban: Ativo
   IPs banidos: 0

[9] Últimos 5 Logins:
[lista de logins]

╔════════════════════════════════════════╗
║  RESUMO                                ║
╚════════════════════════════════════════╝
✅ Sistema Seguro - Nenhum problema detectado

Última verificação: Sun Apr 19 18:08:27 UTC 2026
```

---

### 3. Security Status (Status Completo)
**Localização:** `/root/security-status.sh`
**Execução:** Manual
**Output:** Relatório completo de segurança

#### O que mostra:
- Status de todos os serviços (SSH, fail2ban, UFW)
- Configuração SSH detalhada
- Status fail2ban com IPs banidos
- Uso de recursos (CPU, Memória)
- Status Docker (containers e imagens)
- Processos suspeitos

#### Como usar:
```bash
# Executar status completo
/root/security-status.sh
```

---

## 🚨 Alertas e Notificações

### Quando o Security Monitor Detecta Problema:

#### 1. Processo Suspeito
```log
[2026-04-19 18:30:00] ALERTA: Processo suspeito detectado!
root  1234  98.0  50.0  ./mining
```

**Ação Recomendada:**
```bash
# 1. Verificar processo
ps aux | grep 1234

# 2. Matar processo
kill -9 1234

# 3. Investigar origem
lsof -p 1234

# 4. Executar verificação completa
/root/security-quick-check.sh
```

#### 2. Uso de CPU Alto (>80%)
```log
[2026-04-19 18:30:00] ALERTA: Uso de CPU acima de 80%: 92.5%
```

**Ação Recomendada:**
```bash
# 1. Ver processos com mais CPU
ps aux --sort=-%cpu | head -10

# 2. Investigar causa
top -bn1 | head -20

# 3. Verificar se é malware
/root/security-quick-check.sh
```

#### 3. Crontab Suspeito
```log
[2026-04-19 18:30:00] ALERTA CRÍTICO: Crontab suspeito detectado!
*/30 * * * * docker start amco_d5901263
```

**Ação Recomendada:**
```bash
# 1. Ver crontabs
crontab -l

# 2. Remover crontab malicioso
crontab -e
# OU remover tudo:
crontab -r

# 3. Recriar apenas monitoramento
echo "*/15 * * * * /usr/local/bin/security-monitor.sh" | crontab -
```

#### 4. Container Docker Suspeito
```log
[2026-04-19 18:30:00] ALERTA: Container Docker suspeito!
negoroo/amco:123
[2026-04-19 18:30:01] Container parado automaticamente
```

**Ação Recomendada:**
```bash
# 1. Verificar containers
docker ps -a

# 2. Remover container e imagem
docker stop [CONTAINER_ID]
docker rm [CONTAINER_ID]
docker rmi [IMAGE_NAME]

# 3. Limpar Docker
docker system prune -af --volumes
```

---

## 📅 Rotina de Segurança Recomendada

### Diariamente (Manhã)
```bash
# 1. Verificação rápida
/root/security-quick-check.sh

# 2. Ver logs do monitor
tail -20 /var/log/security-monitor.log
```

### Semanalmente (Segunda-feira)
```bash
# 1. Verificação completa
/root/security-status.sh

# 2. Ver IPs banidos pelo fail2ban
fail2ban-client status sshd

# 3. Limpar logs antigos (>30 dias)
find /var/log -name "*.log" -mtime +30 -delete

# 4. Atualizar sistema
apt update && apt upgrade -y
```

### Mensalmente (1º dia do mês)
```bash
# 1. Scan completo de rootkits
chkrootkit

# 2. Verificar atualizações de segurança
apt list --upgradable | grep -i security

# 3. Revisar configurações de segurança
cat /etc/ssh/sshd_config | grep -E "^PermitRootLogin|^PasswordAuthentication"
ufw status verbose
fail2ban-client status

# 4. Backup de configurações
tar -czf /root/backup-configs-$(date +%Y%m%d).tar.gz \
  /etc/ssh/sshd_config \
  /etc/fail2ban/jail.local \
  /etc/ufw/ \
  /root/*.sh
```

---

## 🔧 Customização dos Scripts

### Adicionar Novo Processo Suspeito ao Monitor

Editar `/usr/local/bin/security-monitor.sh`:
```bash
nano /usr/local/bin/security-monitor.sh

# Localizar linha:
SUSPICIOUS=$(ps aux | grep -E "xmr|mining|crypto|miner" | grep -v grep)

# Adicionar novo termo (ex: "backdoor"):
SUSPICIOUS=$(ps aux | grep -E "xmr|mining|crypto|miner|backdoor" | grep -v grep)

# Salvar e testar:
/usr/local/bin/security-monitor.sh
```

### Alterar Frequência de Monitoramento

```bash
# Ver crontab atual
crontab -l

# Editar crontab
crontab -e

# Alterar de 15 em 15 minutos para 5 em 5:
*/5 * * * * /usr/local/bin/security-monitor.sh

# OU alterar para 30 em 30:
*/30 * * * * /usr/local/bin/security-monitor.sh
```

### Adicionar Notificação por Email (Opcional)

```bash
# 1. Instalar mail
apt install -y mailutils

# 2. Editar security-monitor.sh
nano /usr/local/bin/security-monitor.sh

# 3. Adicionar após detectar problema:
if [ -n "$SUSPICIOUS" ]; then
    echo "ALERTA: Processo suspeito" | mail -s "ALERTA DE SEGURANÇA" seu@email.com
fi
```

---

## 📊 Interpretação de Resultados

### ✅ Sistema Seguro
```
✅ Nenhum processo suspeito
✅ CPU: 0-50% (Normal)
✅ Memória: 0-70% (Normal)
✅ PasswordAuthentication: NO
✅ UFW: Ativo
✅ fail2ban: Ativo
✅ 0 problemas detectados
```

### ⚠️ Sistema com Alertas
```
⚠️  CPU: 85% (Moderado) - Investigar causa
⚠️  Memória: 88% (Alto) - Possível vazamento
ℹ️  1 problema detectado - Monitorar
```

### 🚨 Sistema Comprometido
```
🚨 Processos suspeitos detectados!
🚨 CPU: 98% (CRÍTICO!)
⚠️  PasswordAuthentication: YES (INSEGURO!)
⚠️  UFW: Inativo (CONFIGURAR!)
🚨 4+ problemas detectados - AÇÃO IMEDIATA!
```

**Ação:** Seguir procedimento completo em `SEGURANCA_RESPOSTA_INCIDENTES.md`

---

## 🔗 Links Rápidos

- **[SEGURANCA_RESPOSTA_INCIDENTES.md](SEGURANCA_RESPOSTA_INCIDENTES.md)** - Guia completo de resposta
- **[INCIDENTE_SEGURANCA_2026-04-19.md](INCIDENTE_SEGURANCA_2026-04-19.md)** - Case: Cryptojacker
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy e hardening

---

## 💡 Dicas e Boas Práticas

### 1. Nunca Ignore Alertas
Mesmo que pareça falso positivo, sempre investigue. É melhor verificar 10 falsos positivos do que ignorar 1 alerta real.

### 2. Execute Verificações Regulares
Não dependa apenas do monitoramento automático. Execute verificações manuais regularmente.

### 3. Mantenha Logs
Os logs são sua melhor evidência em caso de incidente. Não os delete sem necessidade.

### 4. Documente Tudo
Se encontrar algo suspeito, documente antes de agir. Isso ajuda na análise forense.

### 5. Atualize o Sistema
```bash
# Sempre mantenha o sistema atualizado
apt update && apt upgrade -y
```

### 6. Backup Regular
```bash
# Faça backup das configurações de segurança
tar -czf backup-security-$(date +%Y%m%d).tar.gz \
  /etc/ssh/ \
  /etc/fail2ban/ \
  /etc/ufw/ \
  /root/*.sh \
  /var/log/security-monitor.log
```

---

## 🆘 Suporte

### Em Caso de Dúvidas:
1. Consultar `SEGURANCA_RESPOSTA_INCIDENTES.md`
2. Executar `/root/security-quick-check.sh`
3. Ver logs: `tail -50 /var/log/security-monitor.log`

### Em Caso de Incidente:
1. **NÃO ENTRE EM PÂNICO**
2. Isolar o problema (matar processo, parar container)
3. Documentar o que foi visto
4. Seguir procedimento em `SEGURANCA_RESPOSTA_INCIDENTES.md`
5. Reportar o incidente

---

**Última Atualização:** 19/04/2026
**Próxima Revisão:** 19/05/2026
**Responsável:** Manter scripts atualizados e funcionais
