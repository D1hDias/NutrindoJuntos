#!/usr/bin/env bash
# Converte as fotos de _fotos-entrada/ em .webp otimizado e gera o manifesto da galeria.
#
# Uso (na raiz do projeto):  ./scripts/galeria-processar.sh
#
# Estrutura esperada:
#   _fotos-entrada/aulas/        _fotos-entrada/eventos/        _fotos-entrada/bastidores/
#   _fotos-entrada/cursos/<slug-do-curso>/   (ex.: cursos/nca, cursos/nce, cursos/nutri-ceo)
#
# O site usa next/image com "unoptimized", entao esta conversao e a unica otimizacao das fotos.
# A saida e recriada do zero a cada execucao, a partir dos originais.

set -euo pipefail

RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
ENTRADA="$RAIZ/_fotos-entrada"
SAIDA="$RAIZ/apps/web/public/images/galeria"
MANIFESTO="$RAIZ/apps/web/lib/galeria-manifest.json"
LADO_MAX=1600
QUALIDADE=82
LADO_MINI=800
QUALIDADE_MINI=76

for bin in convert cwebp identify iconv; do
  command -v "$bin" >/dev/null || { echo "Erro: '$bin' nao encontrado."; exit 1; }
done
[ -d "$ENTRADA" ] || { echo "Erro: pasta $ENTRADA nao existe."; exit 1; }

# Nome seguro para URL: minusculas, sem acento, sem espaco.
slug() {
  echo "$1" | iconv -f utf8 -t ascii//TRANSLIT 2>/dev/null \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g'
}

soltas=$(find "$ENTRADA" -maxdepth 1 -type f | wc -l)
if [ "$soltas" -gt 0 ]; then
  echo "Aviso: $soltas arquivo(s) solto(s) na raiz de _fotos-entrada foram ignorados."
  echo "       Mova-os para aulas/, eventos/, bastidores/ ou cursos/<curso>/."
fi

rm -rf "$SAIDA"
mkdir -p "$SAIDA"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

entradas=()
total=0

# Cada subpasta com fotos vira um grupo: "aulas", "eventos", "cursos/nca"...
while IFS= read -r -d '' dir; do
  grupo="${dir#"$ENTRADA"/}"
  usados=""
  while IFS= read -r -d '' arq; do
    base="$(basename "$arq")"
    nome="$(slug "${base%.*}")"
    # evita colisao de nomes dentro do mesmo grupo
    final="$nome"; n=2
    while [[ " $usados " == *" $final "* ]]; do final="$nome-$n"; n=$((n + 1)); done
    usados="$usados $final"

    mkdir -p "$SAIDA/$grupo"
    destino="$SAIDA/$grupo/$final.webp"
    # auto-orient corrige foto de celular deitada; '>' so reduz, nunca amplia
    convert "$arq" -auto-orient -resize "${LADO_MAX}x${LADO_MAX}>" -strip "$TMP/x.png"
    cwebp -quiet -q "$QUALIDADE" "$TMP/x.png" -o "$destino"

    # miniatura para o mural e o carrossel; a versao cheia fica so para o lightbox
    convert "$TMP/x.png" -resize "${LADO_MINI}x${LADO_MINI}>" "$TMP/m.png"
    cwebp -quiet -q "$QUALIDADE_MINI" "$TMP/m.png" -o "$SAIDA/$grupo/$final.thumb.webp"

    read -r w h < <(identify -format "%w %h\n" "$destino")
    entradas+=("  { \"src\": \"/images/galeria/$grupo/$final.webp\", \"thumb\": \"/images/galeria/$grupo/$final.thumb.webp\", \"group\": \"$grupo\", \"width\": $w, \"height\": $h }")
    total=$((total + 1))
  done < <(find "$dir" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.heic' \) -print0 | sort -z)
done < <(find "$ENTRADA" -mindepth 1 -type d -print0 | sort -z)

{
  echo "["
  for i in "${!entradas[@]}"; do
    if [ "$i" -lt $((${#entradas[@]} - 1)) ]; then echo "${entradas[$i]},"; else echo "${entradas[$i]}"; fi
  done
  echo "]"
} > "$MANIFESTO"

peso=$(du -sh "$SAIDA" | cut -f1)
echo "Pronto: $total foto(s) convertida(s) para $SAIDA ($peso)"
echo "Manifesto: $MANIFESTO"
