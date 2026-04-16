#!/usr/bin/env node

/**
 * Script para pré-aquecer páginas principais do Next.js
 * Reduz tempo de primeira compilação durante desenvolvimento
 */

const http = require('http')

const BASE_URL = 'http://localhost:3000'

// Páginas principais para pré-aquecer
const PAGES_TO_WARM = [
  '/',
  '/sobre',
  '/cursos', 
  '/blog',
  '/contato',
  '/equipe',
  '/mentoria'
]

async function warmPage(path) {
  return new Promise((resolve) => {
    const startTime = Date.now()
    
    const req = http.get(`${BASE_URL}${path}`, (res) => {
      const duration = Date.now() - startTime
      
      if (res.statusCode === 200) {
        console.log(`✅ ${path} - ${duration}ms`)
      } else {
        console.log(`⚠️  ${path} - ${res.statusCode} - ${duration}ms`)
      }
      
      resolve()
    })
    
    req.on('error', (err) => {
      const duration = Date.now() - startTime
      console.log(`❌ ${path} - Error: ${err.code} - ${duration}ms`)
      resolve()
    })
    
    req.setTimeout(10000, () => {
      console.log(`⏱️  ${path} - Timeout (10s)`)
      req.destroy()
      resolve()
    })
  })
}

async function warmAllPages() {
  console.log('🔥 Iniciando aquecimento de páginas...\n')
  
  // Aguardar servidor iniciar
  await new Promise(resolve => {
    const check = () => {
      http.get(BASE_URL, (res) => {
        if (res.statusCode === 200) {
          console.log('✅ Servidor Next.js detectado, aquecendo páginas...\n')
          resolve()
        } else {
          setTimeout(check, 1000)
        }
      }).on('error', () => {
        setTimeout(check, 1000)
      })
    }
    check()
  })
  
  // Aquecer páginas sequencialmente
  for (const page of PAGES_TO_WARM) {
    await warmPage(page)
  }
  
  console.log('\n🎉 Aquecimento concluído! Todas as páginas compiladas.')
  console.log('   Navegação agora será mais rápida durante desenvolvimento.\n')
}

if (require.main === module) {
  warmAllPages().catch(console.error)
}

module.exports = { warmAllPages, warmPage }