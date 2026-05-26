# GUIA DE RESPOSTA A INCIDENTES DE SEGURANÇA

**Documento:** Procedimentos de Resposta a Incidentes
**Versão:** 1.0
**Data:** 19/04/2026
**Projeto:** NutrindoJuntos
**Status:** Ativo

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Classificação de Incidentes](#classificação-de-incidentes)
3. [Procedimentos de Resposta](#procedimentos-de-resposta)
4. [Ferramentas de Diagnóstico](#ferramentas-de-diagnóstico)
5. [Checklist de Segurança](#checklist-de-segurança)
6. [Contatos de Emergência](#contatos-de-emergência)
7. [Histórico de Incidentes](#histórico-de-incidentes)

---

## 🎯 VISÃO GERAL

Este documento define os procedimentos padrão para detecção, resposta e recuperação de incidentes de segurança no servidor VPS da plataforma NutrindoJuntos.

### Objetivos
- Minimizar tempo de resposta a incidentes
- Reduzir impacto de ataques
- Documentar todos os incidentes
- Aprender e melhorar continuamente
- Manter conformidade com boas práticas

---

## 🚨 CLASSIFICAÇÃO DE INCIDENTES

### Severidade Crítica (P0)
**Tempo de Resposta: IMEDIATO**

Indicadores:
- Uso de CPU > 90% por processo desconhecido
- Processos com nomes suspeitos (mining, xmr, crypto)
- Containers Docker não autorizados
- Usuários não reconhecidos no sistema
- Backdoors detectados (portas abertas não autorizadas)
- Crontabs maliciosos

**Ação Imediata:**
1. Isolar o servidor (se possível)
2. Matar processos maliciosos
3. Remover containers/imagens suspeitas
4. Executar procedimento de contenção

### Severidade Alta (P1)
**Tempo de Resposta: < 1 hora**

Indicadores:
- Múltiplas tentativas de login SSH falhadas
- Tráfego de rede suspeito
- Modificações não autorizadas em arquivos
- Alertas do fail2ban
- Uso anormal de recursos

**Ação:**
1. Investigar logs
2. Bloquear IPs suspeitos
3. Reforçar autenticação
4. Monitorar atividade

### Severidade Média (P2)
**Tempo de Resposta: < 4 horas**

Indicadores:
- Vulnerabilidades detectadas em scan
- Pacotes desatualizados com CVEs conhecidas
- Configurações de segurança subótimas
- Logs suspeitos mas não conclusivos

### Severidade Baixa (P3)
**Tempo de Resposta: < 24 horas**

Indicadores:
- Recomendações de hardening
- Melhorias de configuração
- Atualizações não críticas

---

## 🛡️ PROCEDIMENTOS DE RESPOSTA

### Fase 1: DETECÇÃO (0-2 min)

#### 1.1 Verificação Inicial
```bash
# Conectar ao servidor
ssh root@31.97.245.82

# Verificar processos suspeitos
ps aux --sort=-%cpu | head -20
ps aux | grep -E "xmr|mining|crypto|miner" | grep -v grep

# Verificar uso de recursos
top -bn1 | head -20
free -h

# Verificar containers Docker
docker ps -a
docker images

# Verificar usuários
cat /etc/passwd | grep -v nologin | grep -v false
who
```

#### 1.2 Identificar Anomalias
- CPU > 80% sem causa conhecida
- Processos com nomes estranhos
- Containers não reconhecidos
- Usuários desconhecidos
- Conexões de rede suspeitas

### Fase 2: CONTENÇÃO (2-10 min)

#### 2.1 Parar Processos Maliciosos
```bash
# Identificar PID do processo suspeito
ps aux | grep [nome-processo]

# Matar processo
kill -9 [PID]

# Verificar se foi encerrado
ps aux | grep [PID]
```

#### 2.2 Remover Containers Maliciosos
```bash
# Listar containers
docker ps -a

# Parar container
docker stop [CONTAINER_ID]

# Remover container
docker rm [CONTAINER_ID]

# Remover imagem
docker rmi [IMAGE_NAME]

# Verificar
docker ps -a
docker images
```

#### 2.3 Remover Usuários Backdoor
```bash
# Verificar usuários suspeitos
cat /etc/passwd | grep -v nologin

# Remover usuário do sistema
sed -i '/^[USUARIO]:/d' /etc/passwd
sed -i '/^[USUARIO]:/d' /etc/shadow
sed -i '/^[USUARIO]:/d' /etc/group

# Remover referências em grupos
sed -i 's/:[USUARIO]$//' /etc/group
sed -i 's/,[USUARIO]//' /etc/group

# Remover sudoers
rm -f /etc/sudoers.d/*[USUARIO]*

# Remover diretório home
rm -rf /home/[USUARIO]

# Verificar
grep [USUARIO] /etc/passwd /etc/shadow /etc/group
```

#### 2.4 Limpar Persistência
```bash
# Verificar crontab
crontab -l

# Remover crontab malicioso
crontab -r

# Verificar crons do sistema
cat /etc/crontab
ls -la /etc/cron.d/
ls -la /etc/cron.hourly/
ls -la /etc/cron.daily/

# Remover arquivos suspeitos
rm -f /etc/cron.d/[ARQUIVO_SUSPEITO]

# Verificar systemd services
systemctl list-units --type=service | grep -iE "mining|xmr|crypto"
systemctl disable [SERVICO_SUSPEITO]
systemctl stop [SERVICO_SUSPEITO]
```

### Fase 3: ERRADICAÇÃO (10-20 min)

#### 3.1 Scan de Rootkits
```bash
# Executar chkrootkit
chkrootkit

# Executar rkhunter
rkhunter --check

# Verificar binários do sistema
which ps top netstat ls grep
```

#### 3.2 Limpeza Completa
```bash
# Limpar Docker completamente
docker system prune -af --volumes

# Atualizar sistema
apt update && apt upgrade -y

# Remover pacotes órfãos
apt autoremove -y
apt autoclean
```

### Fase 4: RECUPERAÇÃO (20-40 min)

#### 4.1 Hardening SSH
```bash
# Editar configuração SSH
nano /etc/ssh/sshd_config

# Aplicar configurações seguras:
PermitRootLogin prohibit-password
PasswordAuthentication no
PubkeyAuthentication yes
Port 22  # Considere mudar para porta alta

# Reiniciar SSH
systemctl restart ssh

# Verificar
cat /etc/ssh/sshd_config | grep -E "^PermitRootLogin|^PasswordAuthentication"
```

#### 4.2 Configurar Firewall
```bash
# Resetar UFW
ufw --force reset

# Configurar regras padrão
ufw default deny incoming
ufw default allow outgoing

# Liberar portas necessárias
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 3000/tcp  # Next.js

# Ativar firewall
ufw --force enable

# Verificar
ufw status numbered
```

#### 4.3 Configurar fail2ban
```bash
# Instalar fail2ban
apt install -y fail2ban

# Criar configuração
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3
bantime = 7200
EOF

# Habilitar e iniciar
systemctl enable fail2ban
systemctl restart fail2ban

# Verificar
fail2ban-client status sshd
```

#### 4.4 Implementar Monitoramento
```bash
# Criar script de monitoramento
cat > /usr/local/bin/security-monitor.sh << 'EOF'
#!/bin/bash
LOG="/var/log/security-monitor.log"
DATE=$(date "+%Y-%m-%d %H:%M:%S")

# Verificar processos suspeitos
SUSPICIOUS=$(ps aux | grep -E "xmr|mining|crypto|miner" | grep -v grep)
if [ -n "$SUSPICIOUS" ]; then
    echo "[$DATE] ALERTA: Processo suspeito!" >> $LOG
    echo "$SUSPICIOUS" >> $LOG
fi

# Verificar uso de CPU
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
if (( $(echo "$CPU_USAGE > 80" | bc -l) )); then
    echo "[$DATE] ALERTA: CPU >80%: $CPU_USAGE%" >> $LOG
fi

# Verificar crontab
CRON_CHECK=$(crontab -l 2>/dev/null | grep -E "amco|pakchoi|xmr|mining")
if [ -n "$CRON_CHECK" ]; then
    echo "[$DATE] ALERTA CRÍTICO: Crontab suspeito!" >> $LOG
fi

# Verificar Docker
DOCKER_CHECK=$(docker ps --format "{{.Image}}" | grep -E "negoroo|amco|xmr|mining")
if [ -n "$DOCKER_CHECK" ]; then
    echo "[$DATE] ALERTA: Container suspeito!" >> $LOG
    docker stop $(docker ps -q) >> $LOG 2>&1
fi

echo "[$DATE] Scan OK" >> $LOG
EOF

# Dar permissão de execução
chmod +x /usr/local/bin/security-monitor.sh

# Agendar no cron (a cada 15 minutos)
echo "*/15 * * * * /usr/local/bin/security-monitor.sh" | crontab -

# Testar
/usr/local/bin/security-monitor.sh
tail -5 /var/log/security-monitor.log
```

### Fase 5: DOCUMENTAÇÃO (40-60 min)

#### 5.1 Criar Relatório de Incidente
```bash
# Template do relatório
cat > /root/incidente-$(date +%Y%m%d).md << EOF
# RELATÓRIO DE INCIDENTE - $(date +%Y-%m-%d)

## RESUMO
- Data: $(date)
- Severidade: [CRÍTICA/ALTA/MÉDIA/BAIXA]
- Tipo: [Cryptojacker/Backdoor/Brute Force/etc]
- Status: [CONTIDO/EM ANDAMENTO/RESOLVIDO]

## DETECÇÃO
- Como foi detectado:
- Indicadores:
- Timestamp:

## ANÁLISE
- Vetor de ataque:
- Malware identificado:
- Dados comprometidos:
- Impacto:

## RESPOSTA
- Ações tomadas:
- Ferramentas utilizadas:
- Tempo de resposta:

## REMEDIAÇÃO
- Hardening aplicado:
- Monitoramento implementado:
- Lições aprendidas:

## RECOMENDAÇÕES
- Curto prazo:
- Médio prazo:
- Longo prazo:
EOF
```

#### 5.2 Atualizar Documentação
- Adicionar incidente ao histórico
- Atualizar procedimentos se necessário
- Documentar novas vulnerabilidades descobertas
- Atualizar checklist de segurança

---

## 🔧 FERRAMENTAS DE DIAGNÓSTICO

### Scripts de Verificação

#### Verificação Rápida de Segurança
```bash
#!/bin/bash
# /root/security-check.sh

echo "=== VERIFICAÇÃO RÁPIDA DE SEGURANÇA ==="
echo ""

echo "1. Processos com >50% CPU:"
ps aux --sort=-%cpu | head -6 | tail -5

echo ""
echo "2. Containers Docker:"
docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Status}}"

echo ""
echo "3. Usuários com shell:"
cat /etc/passwd | grep -E "bash|sh$"

echo ""
echo "4. Últimos logins:"
last -5

echo ""
echo "5. Crontabs ativos:"
crontab -l 2>/dev/null || echo "Nenhum crontab"

echo ""
echo "6. Portas abertas:"
netstat -tulpn | grep LISTEN

echo ""
echo "7. fail2ban status:"
fail2ban-client status sshd | grep "Currently banned"

echo ""
echo "8. Firewall:"
ufw status | head -3
```

#### Verificação Completa de Segurança
```bash
#!/bin/bash
# /root/security-audit.sh

REPORT="/root/security-audit-$(date +%Y%m%d-%H%M%S).txt"

{
echo "========================================="
echo "AUDITORIA DE SEGURANÇA"
echo "Data: $(date)"
echo "========================================="
echo ""

echo "### SISTEMA ###"
uname -a
echo ""

echo "### PROCESSOS SUSPEITOS ###"
ps aux | grep -E "xmr|mining|crypto|miner|pakchoi|amco" | grep -v grep
echo ""

echo "### USO DE RECURSOS ###"
top -bn1 | head -20
echo ""
free -h
echo ""

echo "### CONTAINERS DOCKER ###"
docker ps -a
echo ""
docker images
echo ""

echo "### USUÁRIOS ###"
cat /etc/passwd
echo ""

echo "### CRONTABS ###"
crontab -l 2>/dev/null
echo ""
cat /etc/crontab
echo ""

echo "### PORTAS ABERTAS ###"
netstat -tulpn
echo ""

echo "### ÚLTIMOS LOGINS ###"
last -20
echo ""

echo "### LOGS SSH ###"
grep -i "accepted\|failed" /var/log/auth.log | tail -50
echo ""

echo "### FIREWALL ###"
ufw status verbose
echo ""

echo "### FAIL2BAN ###"
fail2ban-client status
echo ""

echo "### SCAN ROOTKIT (rápido) ###"
chkrootkit | grep -i "infected\|suspect"
echo ""

} > "$REPORT"

echo "Relatório salvo em: $REPORT"
cat "$REPORT"
```

---

## ✅ CHECKLIST DE SEGURANÇA

### Pré-Incidente (Prevenção)
```
☐ SSH configurado com key-only
☐ PasswordAuthentication desabilitado
☐ PermitRootLogin = prohibit-password
☐ Firewall UFW ativo
☐ fail2ban configurado e ativo
☐ Monitoramento automático rodando
☐ Backups automáticos configurados
☐ Logs sendo coletados
☐ Atualizações automáticas habilitadas
☐ Docker em versão atualizada
☐ Porta SSH alterada (opcional)
☐ IDS/IPS configurado (opcional)
```

### Durante Incidente (Resposta)
```
☐ Incidente classificado (P0/P1/P2/P3)
☐ Timestamp de detecção registrado
☐ Processos maliciosos identificados
☐ Processos maliciosos encerrados
☐ Containers suspeitos removidos
☐ Usuários backdoor removidos
☐ Persistência eliminada (cron/systemd)
☐ Scan de rootkits executado
☐ Sistema limpo confirmado
```

### Pós-Incidente (Recuperação)
```
☐ SSH hardened
☐ Firewall reconfigurado
☐ fail2ban verificado
☐ Monitoramento restaurado/melhorado
☐ Senhas alteradas (se comprometidas)
☐ Chaves SSH regeneradas (se necessário)
☐ Backups validados
☐ Relatório de incidente criado
☐ Lições aprendidas documentadas
☐ Melhorias de segurança implementadas
☐ Equipe notificada
☐ Cliente informado (se aplicável)
```

---

## 📞 CONTATOS DE EMERGÊNCIA

### Interno
- **Admin do Sistema:** Diego
- **DevOps:** [A definir]
- **Segurança:** [A definir]

### Externo
- **Hostinger Suporte:** https://www.hostinger.com.br/suporte
- **Supabase Status:** https://status.supabase.com
- **Vercel Status:** https://www.vercel-status.com

### Ferramentas de Comunicação
- **Slack/Discord:** [Canal de emergência]
- **Email:** [Email de emergência]
- **Telefone:** [Número de emergência]

---

## 📚 HISTÓRICO DE INCIDENTES

### Incidente #001 - Cryptojacker via Docker
**Data:** 19/04/2026
**Severidade:** P0 (CRÍTICA)
**Status:** RESOLVIDO

**Resumo:**
Container Docker malicioso (negoroo/amco:123) instalado via SSH comprometido, minerando Monero e consumindo 98% de CPU.

**Vetor de Ataque:**
- SSH com PasswordAuthentication habilitado
- PermitRootLogin yes
- Sem fail2ban
- Sem firewall

**Impacto:**
- Alto uso de CPU (98.2%)
- Alto uso de RAM (59.8%)
- Backdoor com UID=0 criado
- Persistência via crontab

**Tempo de Resposta:**
7 minutos (detecção → contenção completa)

**Ações Tomadas:**
1. Processo malicioso encerrado
2. Container e imagem removidos
3. Backdoor "pakchoi" eliminado
4. Crontabs maliciosos removidos
5. SSH hardened (key-only)
6. Firewall UFW configurado
7. fail2ban implementado
8. Monitoramento automático a cada 15min

**Documentação:**
- `docs/INCIDENTE_SEGURANCA_2026-04-19.md` (relatório completo)
- `docs/SEGURANCA_RESPOSTA_INCIDENTES.md` (este documento)

**Lições Aprendidas:**
- Nunca deixar SSH com senha habilitada
- Firewall é essencial desde o primeiro dia
- fail2ban previne brute force
- Monitoramento automático detecta anomalias rapidamente

**Status Final:** ✅ RESOLVIDO - Sistema seguro e hardened

---

### Incidente #002 - Cryptojacker via RCE em Next.js
**Data:** 24/04/2026
**Severidade:** P0 (CRÍTICA)
**Status:** ✅ RESOLVIDO

**Resumo:**
XMRig (`syslog-ng-5cb6f54a`) instalado via RCE na aplicação Next.js (POST /). PM2 rodava como root, permitindo instalação em diretórios do sistema.

**Vetor de Ataque:**
- POST / à aplicação Next.js (IPs: 42.3.41.33, 45.196.236.79)
- PM2 rodando como root → acesso irrestrito ao sistema
- Hardening SSH e firewall NÃO foram bypassados

**Malware:**
- Binário: `syslog-ng-5cb6f54a` (XMRig disfarçado)
- Daemon: `grep00.sh` (reiniciava minerador a cada 5s, anti-forense)
- Locais: `/usr/share/man/man3/.syslog-7a27ab51/` e `/var/lib/syslog/.syslog-private-7a27ab51/`
- Pool: `xmr.kryptex.network:7029`

**Ações Tomadas:**
1. `chattr -i` + remoção de ambos os diretórios maliciosos
2. IPs atacantes bloqueados no UFW
3. PM2 migrado de root → usuário `nutriapp` (sem privilégios)
4. Systemd reconfigurado: `pm2-nutriapp.service`
5. Script de monitoramento atualizado com novos padrões

**Lições Aprendidas:**
- PM2 nunca deve rodar como root
- RCE com processo root = comprometimento total do sistema
- Monitorar padrões `.syslog-*` em diretórios do sistema

**Status Final:** ✅ RESOLVIDO - PM2 como nutriapp, blast radius reduzido

---

### Manutenção #001 - Patch Kernel CVE-2026-31431 ("Copy Fail")
**Data:** 30/04/2026
**Tipo:** Patch de segurança preventivo
**Status:** ✅ APLICADO

**Resumo:**
Vulnerabilidade no kernel Linux (2017–hoje) permitindo escalonamento de privilégios por usuário local. Afeta Ubuntu, Debian, RHEL e demais distros. Notificação recebida da Hostinger.

**Correção:**
```bash
apt update && apt upgrade -y
reboot
# Verificar: uname -r (versão do kernel deve ser nova)
```

**Mitigação temporária (se reboot não for possível):**
```bash
echo "install algif_aead /bin/false" > /etc/modprobe.d/disable-algif.conf
rmmod algif_aead 2>/dev/null || true
```

**Impacto:** Nenhum (downtime de reboot ~2 min). Não afeta SSH, TLS, LUKS ou OpenSSL.

---

## 🔄 MANUTENÇÃO DESTE DOCUMENTO

Este documento deve ser revisado e atualizado:
- **Após cada incidente:** Adicionar ao histórico
- **Mensalmente:** Revisar procedimentos
- **Trimestralmente:** Atualizar ferramentas e contatos
- **Anualmente:** Revisão completa e auditoria

**Última Atualização:** 30/04/2026
**Próxima Revisão:** 30/05/2026
**Responsável:** Diego / Claude AI

---

## 📖 REFERÊNCIAS

- [NIST Incident Response Guide](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf)
- [SANS Incident Handler's Handbook](https://www.sans.org/reading-room/whitepapers/incident/incident-handlers-handbook-33901)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [SSH Hardening Guide](https://www.ssh.com/academy/ssh/hardening)
- [fail2ban Documentation](https://www.fail2ban.org/)
- [UFW Firewall Tutorial](https://help.ubuntu.com/community/UFW)

---

**IMPORTANTE:** Mantenha este documento acessível mas protegido. Não compartilhe informações sensíveis (senhas, IPs internos) em documentos públicos.
