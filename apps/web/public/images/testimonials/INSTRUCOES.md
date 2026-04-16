# 📱 Como Adicionar Depoimentos em Imagens

## 🎯 Objetivo
Esta seção exibe prints autênticos de conversas com clientes (WhatsApp, Instagram, DM, etc), mostrando a transformação real que a Nutrindo Juntos proporciona.

## 📁 Estrutura de Pastas SIMPLIFICADA

```
public/images/testimonials/
├── images/             # TODAS as imagens de depoimentos (WhatsApp, Instagram, etc)
│   ├── depoimento-1.png
│   ├── depoimento-2.jpg
│   └── ...
└── videos/            # Vídeos de depoimentos + thumbnails
    ├── depoimento-1.mp4
    ├── depoimento-1-thumb.jpg
    └── ...
```

**IMPORTANTE:** Não precisa separar por WhatsApp/Instagram! Todas as imagens vão na pasta `images/`

## ✅ Checklist de Preparação de Imagens

### Para Prints de Conversas

1. **Tire o print da conversa completa**
   - Inclua o nome/foto do cliente (se autorizado)
   - Mostre a data da conversa
   - Capture mensagens relevantes e impactantes

2. **Proteja a privacidade**
   - Peça autorização por escrito do cliente
   - Censure dados sensíveis (CPF, endereços, telefones)
   - Você pode borrar/ocultar o número de telefone

3. **Recorte e ajuste**
   - Recorte apenas a parte relevante da conversa
   - Mantenha a proporção natural (vertical para celular)
   - Não precisa ser exato - o layout se adapta a QUALQUER proporção!

4. **Otimize o arquivo**
   - Use ferramentas: [TinyPNG](https://tinypng.com) ou [Squoosh](https://squoosh.app)
   - Formato: WEBP (melhor) ou PNG/JPG
   - Tamanho: máximo 1200px na largura
   - Peso: ideal < 500KB por imagem

### Para Vídeos de Depoimentos

1. **Grave ou receba o vídeo**
   - Duração ideal: 30-60 segundos
   - Formato: MP4 (H.264)
   - Qualidade: 720p ou 1080p

2. **Crie uma thumbnail atraente**
   - Extraia um frame do vídeo com boa expressão
   - Ou crie uma thumb customizada
   - Dimensões: 1280x720px (16:9)
   - **IMPORTANTE:** Nome igual ao vídeo + `-thumb`

3. **Otimize o vídeo**
   - Use [HandBrake](https://handbrake.fr/) ou similar
   - Codec: H.264
   - Bitrate: 2-4 Mbps
   - Tamanho final: máximo 50MB

## 📝 Nomenclatura de Arquivos

Use nomes descritivos para facilitar organização:

### Exemplos para Imagens:
```
depoimento-ana-resultado-emagrecimento.png
depoimento-joao-aprovacao-concurso.jpg
depoimento-maria-clinica-funcional.webp
```

### Exemplos para Vídeos:
```
Video:
video-depoimento-ana-transformacao.mp4
video-resultado-joao-6meses.mp4

Thumbnails (MESMO NOME + -thumb):
video-depoimento-ana-transformacao-thumb.jpg
video-resultado-joao-6meses-thumb.jpg
```

## 🚀 Como Adicionar ao Site

### Método Manual (Atual)

1. Acesse a pasta do projeto:
   ```bash
   cd /mnt/e/NutrindoJuntos/apps/web/public/images/testimonials
   ```

2. Copie suas imagens para as pastas:
   ```bash
   # Para imagens (TODAS na mesma pasta!)
   cp ~/Downloads/depoimento-1.png images/
   cp ~/Downloads/depoimento-2.jpg images/

   # Para Vídeos (não esqueça da thumbnail!)
   cp ~/Downloads/video-1.mp4 videos/
   cp ~/Downloads/video-1-thumb.jpg videos/
   ```

3. O componente detectará automaticamente as novas imagens!

## 🎨 Layout Atual

O layout utiliza um **carrossel em grid** que:
- Exibe 2-4 imagens por slide (responsivo)
- Adapta-se a QUALQUER proporção automaticamente
- Permite visualização ampliada (lightbox)
- Tem navegação por setas e bullets
- Auto-play suave com pausa ao passar o mouse

**Grid Responsivo:**
- **Mobile:** 2 imagens × 2 linhas = 4 visíveis
- **Tablet:** 3 imagens × 2 linhas = 6 visíveis
- **Desktop:** 4 imagens × 2 linhas = 8 visíveis

## 💡 Dicas de Boas Práticas

### Qualidade do Conteúdo
- ✅ Escolha mensagens impactantes e emocionantes
- ✅ Priorize resultados tangíveis (aprovação, transformação)
- ✅ Varie os tipos de depoimento (curso, mentoria, suporte)
- ❌ Evite mensagens genéricas ou curtas demais

### Diversidade
- ✅ Misture origens (WhatsApp, Instagram, DM)
- ✅ Mostre diferentes perfis (estudantes, recém-formados, profissionais)
- ✅ Varie os cursos/serviços mencionados
- ✅ Inclua depoimentos de diferentes períodos

### Autenticidade
- ✅ Mantenha formatação original das conversas
- ✅ Não edite ou altere mensagens
- ✅ Preserve emojis e expressões naturais
- ✅ Mostre datas quando possível

## 📊 Quantidade Recomendada

- **Mínimo inicial:** 12-15 imagens
- **Ideal:** 20-30 imagens
- **Máximo recomendado:** 50 imagens (para não sobrecarregar)
- **Vídeos:** 3-6 vídeos em destaque

## 🔄 Atualização

Recomenda-se atualizar os depoimentos:
- **Mensalmente:** Adicionar 3-5 novos depoimentos
- **Trimestralmente:** Revisar e remover depoimentos desatualizados
- **Anualmente:** Renovar completamente a galeria

## 🆘 Precisa de Ajuda?

Problemas comuns e soluções:

**Imagem não aparece no site:**
- Verifique se o arquivo está na pasta `images/`
- Confirme que o nome não tem caracteres especiais
- Reinicie o servidor de desenvolvimento

**Imagem fica distorcida:**
- Não se preocupe! O layout se adapta automaticamente
- Qualquer aspect ratio funciona

**Site fica lento:**
- Otimize as imagens (comprima!)
- Reduza a quantidade de imagens (máximo 50)
- Considere usar formato WEBP

**Vídeo não carrega:**
- Verifique o formato (MP4 H.264)
- Reduza o tamanho do arquivo
- Confirme que a thumbnail existe com o nome correto

---

**Criado em:** 2025-04-15
**Última atualização:** 2025-04-15
