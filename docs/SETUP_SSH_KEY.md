# 🔑 Configurar SSH sem Senha

## Por Que Fazer Isso?

Atualmente, o script de deploy usa `sshpass` que inclui a senha no script.
Configurar chave SSH é **mais seguro** e **mais prático**.

## Passo a Passo

### **1. Gerar Chave SSH (Se não tiver)**

```bash
ssh-keygen -t ed25519 -C "seu-email@example.com"
# Pressione Enter 3x (aceitar padrões)
```

### **2. Copiar Chave para VPS**

```bash
ssh-copy-id root@31.97.245.82
# Digite a senha: 148919713@Vante
# (última vez que precisa digitar!)
```

### **3. Testar Conexão sem Senha**

```bash
ssh root@31.97.245.82 "echo Funcionou!"
# Deve conectar SEM pedir senha
```

### **4. Atualizar Script de Deploy**

Edite `/mnt/e/NutrindoJuntos/deploy-to-production.sh`:

**Linha antiga:**
```bash
ssh root@31.97.245.82 "cd /var/www/nutrindojuntos && ./deploy.sh"
```

**Não precisa mudar nada!** Vai funcionar automaticamente sem senha.

## Benefícios

- ✅ **Mais seguro** (sem senha no código)
- ✅ **Mais rápido** (não precisa digitar senha)
- ✅ **Mais prático** (deploy com 1 comando)

## Troubleshooting

### Problema: "Permission denied (publickey)"

**Solução:**
```bash
# Verificar se chave está no agent
ssh-add -l

# Se não estiver, adicionar
ssh-add ~/.ssh/id_ed25519
```

### Problema: "ssh-copy-id not found"

**Solução (WSL/Linux):**
```bash
sudo apt install openssh-client
```

---

**Nota:** Isso é **opcional** mas **fortemente recomendado** para segurança!
