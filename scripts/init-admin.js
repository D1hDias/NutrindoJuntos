#!/usr/bin/env node

/**
 * Script para criar usuário admin inicial no Payload CMS
 * Executa: node scripts/init-admin.js
 */

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const PAYLOAD_API_URL = 'http://localhost:3001/api'

async function createAdminUser() {
  try {
    console.log('🚀 Inicializando usuário admin do CMS...\n')
    
    // Dados do admin padrão
    const adminData = {
      email: 'admin@nutrindojuntos.com.br',
      password: 'admin123',
      name: 'Admin NUTRINDO JUNTOS',
      role: 'admin'
    }

    console.log('📝 Criando usuário admin:')
    console.log(`Email: ${adminData.email}`)
    console.log(`Senha: ${adminData.password}`)
    console.log(`Nome: ${adminData.name}`)
    console.log(`Role: ${adminData.role}\n`)

    const response = await fetch(`${PAYLOAD_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
    })

    if (!response.ok) {
      const error = await response.text()
      
      // Se o erro é sobre criar primeiro usuário, vamos usar a rota special
      if (error.includes('first-register') || response.status === 403) {
        console.log('⚠️  Tentando criar primeiro usuário via rota especial...')
        
        const firstUserResponse = await fetch(`${PAYLOAD_API_URL}/users/first-register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(adminData),
        })
        
        if (!firstUserResponse.ok) {
          const firstUserError = await firstUserResponse.text()
          throw new Error(`Erro ao criar primeiro usuário: ${firstUserResponse.status} - ${firstUserError}`)
        }
        
        const firstUserResult = await firstUserResponse.json()
        console.log('✅ Primeiro usuário admin criado com sucesso!')
        console.log('ID:', firstUserResult.user.id)
        console.log('Email:', firstUserResult.user.email)
        
        return firstUserResult
      } else {
        throw new Error(`Erro na API: ${response.status} - ${error}`)
      }
    }

    const result = await response.json()
    console.log('✅ Usuário admin criado com sucesso!')
    console.log('ID:', result.id)
    console.log('Email:', result.email)

    return result

  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error.message)
    
    if (error.message.includes('already exists') || error.message.includes('duplicate')) {
      console.log('\n💡 Parece que o usuário já existe. Tente fazer login no CMS com:')
      console.log('📧 Email: admin@nutrindojuntos.com.br')
      console.log('🔐 Senha: admin123')
      return true
    }
    
    return false
  }
}

async function main() {
  const success = await createAdminUser()
  
  if (success) {
    console.log('\n🎉 Agora você pode:')
    console.log('1. Acessar o CMS em: http://localhost:3001/admin')
    console.log('2. Fazer login com: admin@nutrindojuntos.com.br / admin123')
    console.log('3. Ir em "Cursos" no menu lateral')
    console.log('4. Clicar em "Create New" para criar o curso NCA')
    console.log('\n📋 Dados do curso NCA para copiar/colar:')
    console.log('Título: NCA - Nutrição Clínica Aplicada')
    console.log('Slug: nca-nutricao-clinica-aplicada')
    console.log('Headline: Transforme teoria em prática com confiança')
    console.log('Nível: Intermediate')
    console.log('Duração: 12 semanas')
    console.log('Preço: R$ 497,00')
    console.log('Status: Published')
    console.log('Foco Prático: ✓ Sim')
    console.log('Público-alvo: Estudantes de nutrição, recém-formados e profissionais em transição para a prática clínica')
  }
  
  rl.close()
}

main()