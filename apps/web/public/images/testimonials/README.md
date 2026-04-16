# Pasta de Depoimentos

Esta pasta contém imagens e vídeos de depoimentos reais de clientes.

## Estrutura de Pastas

```
testimonials/
├── images/            # Prints de conversas (WhatsApp, Instagram, etc)
└── videos/            # Vídeos de depoimentos (mp4, webm)
```

## Como Adicionar Imagens

### Imagens de Conversas
Coloque os prints de conversas na pasta `images/`
- Formato: PNG, JPG, WEBP
- Nome sugerido: `depoimento-1.png`, `depoimento-2.jpg`, etc.
- Aspect ratio: Qualquer (o layout se adapta automaticamente)
- Origem: WhatsApp, Instagram, DM, etc. (não precisa separar por tipo)

### Vídeos
Coloque os vídeos de depoimentos na pasta `videos/`
- Formato: MP4 (recomendado), WEBM
- Nome sugerido: `video-depoimento-1.mp4`, `video-depoimento-2.mp4`, etc.
- Thumbnail: `video-depoimento-1-thumb.jpg` (mesma pasta, mesmo nome + `-thumb`)
- Tamanho máximo recomendado: 50MB por vídeo
- Duração recomendada: 30-60 segundos

## Otimização de Imagens

Para melhor performance:
1. Use formato WEBP quando possível
2. Comprima as imagens antes de adicionar (use https://tinypng.com ou https://squoosh.app)
3. Dimensão máxima recomendada: 1200px na maior dimensão

## Nomenclatura

Use nomes descritivos para facilitar organização:
- `depoimento-ana-curso-nutricao.png`
- `depoimento-joao-mentoria.jpg`
- `video-depoimento-maria-resultado.mp4`
- `video-depoimento-maria-resultado-thumb.jpg`

## Após Adicionar

Após adicionar novas imagens/vídeos:
1. As imagens serão detectadas automaticamente pelo componente
2. Não é necessário alterar código
3. Reinicie o servidor de desenvolvimento (`pnpm dev`) se as imagens não aparecerem imediatamente
