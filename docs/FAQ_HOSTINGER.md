# FAQ - Perguntas da Hostinger

**Data de Criação:** 19/04/2026
**Contexto:** Suporte Hostinger perguntando sobre processos de segurança

---

## 🤔 PERGUNTAS COMUNS DA HOSTINGER

### 1. "Processo chkrootkit/chkproc usando CPU"

**Resposta:**
```
É o chkrootkit, ferramenta de segurança que instalei após um incidente.
- Agendamento: Diário via systemd timer (chkrootkit.timer)
- Horário: 18:09 UTC
- Duração: ~17 segundos
- Status: Normal e esperado
```

**Detalhes Técnicos:**
- Timer: `/usr/lib/systemd/system/chkrootkit.timer`
- Service: `/usr/lib/systemd/system/chkrootkit.service`
- Documentação: `docs/INCIDENTE_SEGURANCA_2026-04-19.md`

---

### 2. "Processo security-monitor.sh"

**Resposta:**
```
Script de monitoramento personalizado instalado após incidente de segurança.
- Localização: /usr/local/bin/security-monitor.sh
- Agendamento: A cada 15 minutos via cron
- Função: Detecta processos suspeitos, uso alto de CPU, containers maliciosos
- Status: Normal e esperado
```

**Detalhes Técnicos:**
- Crontab: `*/15 * * * * /usr/local/bin/security-monitor.sh`
- Log: `/var/log/security-monitor.log`
- Documentação: `docs/SCRIPTS_SEGURANCA.md`

---

### 3. "Múltiplos fail2ban-client ou iptables"

**Resposta:**
```
fail2ban está instalado e ativo para proteção SSH.
- Função: Bloqueia tentativas de brute force
- Config: /etc/fail2ban/jail.local
- Status: Normal e esperado
```

**Detalhes Técnicos:**
- Service: `fail2ban.service`
- Porta protegida: SSH (22)
- Ban time: 2 horas após 3 tentativas
- Documentação: `docs/SEGURANCA_RESPOSTA_INCIDENTES.md`

---

### 4. "Alto uso de memória por next-server"

**Resposta:**
```
next-server é a aplicação principal do projeto (site NutrindoJuntos).
- Uso normal: 3-4% CPU, 3.5-4GB RAM
- São 2 processos (PM2 em cluster mode)
- Status: Normal para aplicação Next.js em produção
```

**Detalhes Técnicos:**
- Processo: `next-server (v15.5.6)`
- Gerenciador: PM2
- Configuração: `ecosystem.config.js`
- Documentação: `CLAUDE.md`, `docs/DEPLOYMENT.md`

---

### 5. "Containers Docker ativos"

**Resposta (Atual):**
```
Nenhum container deveria estar rodando no momento.
Se houver containers:
- Verificar imagem: `docker ps`
- Containers legítimos: (nenhum no momento)
- Containers suspeitos: Seguir procedimento em SEGURANCA_RESPOSTA_INCIDENTES.md
```

**Nota:** Anteriormente havia container malicioso (negoroo/amco:123) que foi removido em 19/04/2026.

---

### 6. "Usuário desconhecido no sistema"

**Resposta:**
```
Usuários legítimos:
- root (administrador)
- ubuntu (padrão Hostinger)
- [outros usuários específicos do projeto]

Qualquer outro usuário deve ser investigado.
```

**Usuário Backdoor Removido:**
- `pakchoi` (UID=0) - Removido em 19/04/2026
- Se reaparecer: Seguir procedimento de incidente

---

## 📋 RESPOSTA PADRÃO PARA HOSTINGER

**Template de resposta rápida:**

```
Obrigado pela verificação! [PROCESSO] é uma ferramenta de segurança
instalada propositalmente após um incidente recente (19/04/2026).

Status: Normal e esperado
Documentação: docs/INCIDENTE_SEGURANCA_2026-04-19.md
Não é necessário interromper.

Sistema está seguro! ✅
```

---

## 🔍 SE A HOSTINGER PEDIR DETALHES

### Sobre o Incidente (19/04/2026):
```
Em 19/04/2026, o servidor foi comprometido por um cryptojacker.
- Malware: Container Docker malicioso (negoroo/amco:123)
- Backdoor: Usuário "pakchoi" com UID=0
- Resposta: 7 minutos (detecção → resolução completa)
- Medidas: Hardening completo, firewall, fail2ban, monitoramento
- Documentação: docs/INCIDENTE_SEGURANCA_2026-04-19.md
```

### Sobre as Ferramentas de Segurança:
```
Instaladas em 19/04/2026:
1. chkrootkit - Scan diário de rootkits
2. rkhunter - Verificação de integridade de binários
3. fail2ban - Proteção contra brute force SSH
4. UFW - Firewall com whitelist
5. security-monitor.sh - Monitoramento a cada 15min

Todas documentadas em: docs/SEGURANCA_RESPOSTA_INCIDENTES.md
```

---

## 🚨 ALERTAS LEGÍTIMOS vs FALSOS POSITIVOS

### ✅ Alertas Legítimos (Investigar):
- Processo com nome suspeito (xmr, mining, crypto)
- Container Docker não reconhecido
- Usuário novo que você não criou
- CPU > 80% por processo desconhecido
- Crontab não documentado

### ℹ️ Falsos Positivos (Normal):
- chkrootkit/chkproc usando CPU temporariamente
- security-monitor.sh executando
- fail2ban-client rodando
- next-server usando 3-4GB RAM
- Docker pull/build usando recursos

---

## 📞 CONTATO COM HOSTINGER

### Informações Úteis para Fornecer:

**Servidor:**
- IP: 31.97.245.82
- Hostname: srv891097.hstgr.cloud
- OS: Ubuntu 24.04 LTS
- Projeto: NutrindoJuntos (site Next.js)

**Ferramentas de Segurança:**
- fail2ban: Ativo (SSH proteção)
- UFW: Ativo (portas 22, 80, 443, 3000)
- chkrootkit: Scan diário às 18:09 UTC
- monarx-agent: Agente da Hostinger (mantido por eles)

**Documentação:**
- Incidente: `docs/INCIDENTE_SEGURANCA_2026-04-19.md`
- Resposta: `docs/SEGURANCA_RESPOSTA_INCIDENTES.md`
- Scripts: `docs/SCRIPTS_SEGURANCA.md`

---

## 🎯 QUANDO ENVOLVER A HOSTINGER

### ✅ Casos para Contatar Suporte:
1. Detecção de malware pelo monarx-agent
2. Problemas de conectividade ou rede
3. Questões de hardware/infraestrutura
4. Backup e restore
5. Migração ou upgrade de VPS

### ❌ Casos para NÃO Contatar (Resolver Internamente):
1. Processos de segurança instalados por você
2. Ajustes de configuração da aplicação
3. Uso normal de recursos pela aplicação
4. Deploy e gestão de containers
5. Troubleshooting de código

---

## 📚 DOCUMENTAÇÃO DE REFERÊNCIA

Para qualquer dúvida da Hostinger, apontar para:
1. **INCIDENTE_SEGURANCA_2026-04-19.md** - O que aconteceu
2. **SEGURANCA_RESPOSTA_INCIDENTES.md** - Procedimentos implementados
3. **SCRIPTS_SEGURANCA.md** - Scripts e monitoramento

---

**Última Atualização:** 19/04/2026
**Próxima Revisão:** Conforme necessário
**Status:** Documento vivo (atualizar com novas interações)
