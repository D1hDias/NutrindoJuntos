#!/bin/bash
# Remove screenshots do Playwright MCP com mais de 2 dias
# Executado automaticamente via cron

PLAYWRIGHT_DIR="$(dirname "$0")/../.playwright-mcp"

if [ ! -d "$PLAYWRIGHT_DIR" ]; then
  exit 0
fi

find "$PLAYWRIGHT_DIR" -maxdepth 1 \
  \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" \) \
  -mtime +2 \
  -delete

exit 0
