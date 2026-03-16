#!/usr/bin/env node

/**
 * Script para criar o curso NCA via API autenticada do Payload CMS
 * Executa: node scripts/create-nca-authenticated.js
 */

const PAYLOAD_API_URL = 'http://localhost:3001/api'

// Dados de login do admin
const adminCredentials = {
  email: 'admin@nutrindojuntos.com.br',
  password: 'admin123'
}

// Dados completos do curso NCA
const ncaCourseData = {
  title: 'NCA - Nutrição Clínica Aplicada',
  slug: 'nca-nutricao-clinica-aplicada',
  description: 'Aprenda a aplicar a nutrição clínica de forma prática e baseada em evidências científicas, desenvolvendo a confiança necessária para atuar com excelência no consultório.',
  headline: 'Transforme teoria em prática com confiança',
  content: [
    {
      children: [
        {
          text: 'O curso NCA - Nutrição Clínica Aplicada é um programa 100% prático desenvolvido especialmente para estudantes de nutrição, recém-formados e profissionais que desejam fazer a transição para a prática clínica com confiança e segurança.'
        }
      ]
    },
    {
      children: [
        {
          text: ''
        }
      ]
    },
    {
      children: [
        {
          text: 'Este curso vai além da teoria tradicional, oferecendo ferramentas práticas, protocolos validados e metodologias comprovadas que você pode implementar imediatamente em sua prática profissional.'
        }
      ]
    },
    {
      children: [
        {
          text: ''
        }
      ]
    },
    {
      children: [
        {
          text: '💡 O que você vai aprender:',
          bold: true
        }
      ]
    },
    {
      children: [
        {
          text: ''
        }
      ]
    },
    {
      children: [
        {
          text: '• Metodologia completa de consulta nutricional'
        }
      ]
    },
    {
      children: [
        {
          text: '• Protocolos de avaliação nutricional validados'
        }
      ]
    },
    {
      children: [
        {
          text: '• Estratégias de prescrição personalizada'
        }
      ]
    },
    {
      children: [
        {
          text: '• Técnicas de comunicação e adesão do paciente'
        }
      ]
    },
    {
      children: [
        {
          text: '• Estudos de caso reais com resolução prática'
        }
      ]
    },
    {
      children: [
        {
          text: '• Kit de ferramentas para consultório'
        }
      ]
    },
    {
      children: [
        {
          text: '• Templates e protocolos prontos para usar'
        }
      ]
    },
    {
      children: [
        {
          text: '• Mentoria prática com especialistas'
        }
      ]
    }
  ],
  level: 'intermediate',
  duration: '12 semanas',
  modules: 8,
  price: 497.00,
  practicalFocus: true,
  targetAudience: 'Estudantes de nutrição, recém-formados e profissionais em transição para a prática clínica',
  status: 'published',
  isFeatured: true,
  isLive: false,
  paymentLink: 'https://pay.hotmart.com/exemplo-nca-curso'
}

async function loginAndCreateCourse() {
  try {
    console.log('🔐 Fazendo login na API do Payload CMS...')
    
    // 1. Fazer login para obter token
    const loginResponse = await fetch(`${PAYLOAD_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminCredentials),
    })

    if (!loginResponse.ok) {
      const loginError = await loginResponse.text()
      throw new Error(`Erro no login: ${loginResponse.status} - ${loginError}`)
    }

    const loginResult = await loginResponse.json()
    const token = loginResult.token
    
    console.log('✅ Login realizado com sucesso!')
    console.log('👤 Usuário:', loginResult.user.email)
    console.log('🎯 Role:', loginResult.user.role)

    // 2. Criar curso usando o token
    console.log('\n📚 Criando curso NCA...')
    
    const courseResponse = await fetch(`${PAYLOAD_API_URL}/cursos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`, // Usar token JWT para autenticação
      },
      body: JSON.stringify(ncaCourseData),
    })

    if (!courseResponse.ok) {
      const courseError = await courseResponse.text()
      throw new Error(`Erro ao criar curso: ${courseResponse.status} - ${courseError}`)
    }

    const courseResult = await courseResponse.json()
    
    console.log('✅ Curso NCA criado com sucesso!')
    console.log('🆔 ID:', courseResult.id)
    console.log('📝 Título:', courseResult.title)
    console.log('🔗 Slug:', courseResult.slug)
    console.log('📊 Status:', courseResult.status)
    console.log('💰 Preço: R$', courseResult.price?.toFixed(2))
    console.log('🎯 Prático:', courseResult.practicalFocus ? '✅ Sim' : '❌ Não')
    console.log('⭐ Destaque:', courseResult.isFeatured ? '✅ Sim' : '❌ Não')

    // 3. Verificar se aparece na listagem
    console.log('\n🔍 Verificando listagem de cursos...')
    
    const listResponse = await fetch(`${PAYLOAD_API_URL}/cursos?status=published`)
    const listResult = await listResponse.json()
    
    console.log(`📊 Total de cursos publicados: ${listResult.totalDocs}`)
    
    if (listResult.docs && listResult.docs.length > 0) {
      console.log('\n📋 Cursos encontrados:')
      listResult.docs.forEach((curso, index) => {
        console.log(`${index + 1}. ${curso.title}`)
        console.log(`   - Slug: ${curso.slug}`)
        console.log(`   - Status: ${curso.status}`)
        console.log(`   - Preço: R$ ${curso.price?.toFixed(2) || 'N/A'}`)
        console.log(`   - Prático: ${curso.practicalFocus ? 'Sim' : 'Não'}`)
        console.log('')
      })
    }

    console.log('🎉 Curso NCA criado e disponível!')
    console.log('\n🌐 URLs para testar:')
    console.log('📋 Lista de cursos: http://localhost:3002/cursos')
    console.log('📄 Página do curso: http://localhost:3002/cursos/nca-nutricao-clinica-aplicada')

    return courseResult

  } catch (error) {
    console.error('❌ Erro:', error.message)
    
    // Debugging adicional
    if (error.message.includes('401') || error.message.includes('unauthorized')) {
      console.log('\n💡 Dica: Verifique se as credenciais estão corretas.')
    }
    
    if (error.message.includes('validation') || error.message.includes('required')) {
      console.log('\n💡 Dica: Alguns campos obrigatórios podem estar faltando.')
    }
    
    process.exit(1)
  }
}

// Executar o script
loginAndCreateCourse()