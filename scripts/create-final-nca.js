#!/usr/bin/env node

/**
 * Script final para criar curso NCA (sem campos opcionais)
 */

const PAYLOAD_API_URL = 'http://localhost:3001/api'

const adminCredentials = {
  email: 'admin@nutrindojuntos.com.br',
  password: 'admin123'
}

const courseData = {
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
          text: '✓ Metodologia completa de consulta nutricional'
        }
      ]
    },
    {
      children: [
        {
          text: '✓ Protocolos de avaliação nutricional validados'
        }
      ]
    },
    {
      children: [
        {
          text: '✓ Estratégias de prescrição personalizada'
        }
      ]
    },
    {
      children: [
        {
          text: '✓ Técnicas de comunicação e adesão do paciente'
        }
      ]
    },
    {
      children: [
        {
          text: '✓ Estudos de caso reais com resolução prática'
        }
      ]
    },
    {
      children: [
        {
          text: '✓ Kit de ferramentas para consultório'
        }
      ]
    },
    {
      children: [
        {
          text: '✓ Templates e protocolos prontos para usar'
        }
      ]
    }
  ],
  category: 'clinica',
  level: 'intermediate',
  duration: '12 semanas',
  modules: 8,
  price: 497.00,
  practicalFocus: true,
  targetAudience: 'Estudantes de nutrição, recém-formados e profissionais em transição para a prática clínica',
  status: 'published',
  isLive: true,
  paymentLink: 'https://pay.hotmart.com/exemplo-nca-curso'
}

async function createFinalNCA() {
  try {
    console.log('🔐 Fazendo login...')
    
    const loginResponse = await fetch(`${PAYLOAD_API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminCredentials),
    })

    if (!loginResponse.ok) {
      throw new Error(`Login falhou: ${loginResponse.status}`)
    }

    const loginResult = await loginResponse.json()
    const token = loginResult.token
    console.log('✅ Login realizado!')

    console.log('\n📚 Criando curso NCA...')
    
    const courseResponse = await fetch(`${PAYLOAD_API_URL}/cursos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(courseData),
    })

    if (!courseResponse.ok) {
      const courseError = await courseResponse.text()
      throw new Error(`Erro ao criar curso: ${courseResponse.status} - ${courseError}`)
    }

    const courseResult = await courseResponse.json()
    
    console.log('✅ CURSO NCA CRIADO COM SUCESSO!')
    console.log('🆔 ID:', courseResult.id)
    console.log('📝 Título:', courseResult.title)
    console.log('🔗 Slug:', courseResult.slug)
    console.log('💰 Preço: R$', courseResult.price)
    console.log('📊 Status:', courseResult.status)
    console.log('🎯 Prático:', courseResult.practicalFocus ? '✅ SIM' : '❌ NÃO')
    console.log('🛒 Disponível:', courseResult.isLive ? '✅ SIM' : '❌ NÃO')

    // Verificar se aparece na listagem
    console.log('\n🔍 Verificando listagem...')
    
    const listResponse = await fetch(`${PAYLOAD_API_URL}/cursos?status=published`)
    const listResult = await listResponse.json()
    
    console.log(`📊 CURSOS PUBLICADOS: ${listResult.totalDocs}`)
    
    if (listResult.docs && listResult.docs.length > 0) {
      console.log('\n📋 LISTA DE CURSOS:')
      listResult.docs.forEach((curso, index) => {
        console.log(`${index + 1}. 📚 ${curso.title}`)
        console.log(`   🔗 ${curso.slug}`)
        console.log(`   💰 R$ ${curso.price}`)
        console.log(`   📊 ${curso.status}`)
        console.log('')
      })
    }

    console.log('🎉 SUCESSO TOTAL! O curso NCA está criado e publicado!')
    console.log('\n🌐 TESTE AS URLS:')
    console.log('📋 Lista de cursos: http://localhost:3002/cursos')
    console.log('📄 Página do NCA: http://localhost:3002/cursos/nca-nutricao-clinica-aplicada')
    console.log('\n💡 Agora o curso deve aparecer na listagem do frontend!')

    return courseResult

  } catch (error) {
    console.error('❌ ERRO:', error.message)
    process.exit(1)
  }
}

createFinalNCA()