#!/usr/bin/env node

/**
 * Script completo para criar instrutor, imagem e curso NCA
 * Executa: node scripts/setup-complete-nca.js
 */

const PAYLOAD_API_URL = 'http://localhost:3001/api'

// Dados de login do admin
const adminCredentials = {
  email: 'admin@nutrindojuntos.com.br',
  password: 'admin123'
}

// Dados do instrutor
const instructorData = {
  name: 'Dra. Ana Paula Silva',
  role: 'Nutricionista Clínica Especialista',
  bio: 'Nutricionista com mais de 10 anos de experiência em atendimento clínico. Especialista em nutrição funcional e comportamento alimentar. Mestra em Nutrição Clínica pela USP.',
  expertise: ['Nutrição Clínica', 'Comportamento Alimentar', 'Nutrição Funcional'],
  credentials: ['CRN-3 12345', 'Especialista em Nutrição Clínica', 'Mestra em Nutrição - USP'],
  email: 'ana.silva@nutrindojuntos.com.br',
  social: {
    instagram: '@dra.anapaula.nutri',
    linkedin: 'ana-paula-silva-nutricao',
  },
  isActive: true
}

// Dados do curso NCA completo
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

// Simular upload de imagem (criaremos um placeholder)
const mockImageData = {
  filename: 'nca-curso-thumb.jpg',
  mimeType: 'image/jpeg',
  alt: 'NCA - Nutrição Clínica Aplicada - Imagem do Curso',
  url: 'https://via.placeholder.com/600x400/22c55e/ffffff?text=NCA+Curso'
}

async function setupCompleteNCA() {
  let token

  try {
    console.log('🔐 Fazendo login na API do Payload CMS...')
    
    // 1. Login para obter token
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
    token = loginResult.token
    
    console.log('✅ Login realizado com sucesso!')
    console.log('👤 Usuário:', loginResult.user.email)

    // 2. Criar imagem placeholder
    console.log('\n🖼️ Criando imagem do curso...')
    
    const imageResponse = await fetch(`${PAYLOAD_API_URL}/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(mockImageData),
    })

    let imageId
    if (imageResponse.ok) {
      const imageResult = await imageResponse.json()
      imageId = imageResult.id
      console.log('✅ Imagem criada:', imageResult.filename)
    } else {
      console.log('⚠️ Imagem não criada, usando ID genérico')
      imageId = '1' // Fallback
    }

    // 3. Criar instrutor
    console.log('\n👩‍🏫 Criando instrutor...')
    
    const instructorResponse = await fetch(`${PAYLOAD_API_URL}/equipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(instructorData),
    })

    let instructorId
    if (instructorResponse.ok) {
      const instructorResult = await instructorResponse.json()
      instructorId = instructorResult.id
      console.log('✅ Instrutor criado:', instructorResult.name)
    } else {
      const instructorError = await instructorResponse.text()
      console.log('⚠️ Erro ao criar instrutor:', instructorError)
      console.log('ℹ️ Tentando buscar instrutor existente...')
      
      // Tentar buscar instrutor existente
      const listInstructorsResponse = await fetch(`${PAYLOAD_API_URL}/equipe?limit=1`)
      if (listInstructorsResponse.ok) {
        const instructorsList = await listInstructorsResponse.json()
        if (instructorsList.docs && instructorsList.docs.length > 0) {
          instructorId = instructorsList.docs[0].id
          console.log('✅ Usando instrutor existente:', instructorsList.docs[0].name)
        }
      }
      
      if (!instructorId) {
        throw new Error('Não foi possível criar ou encontrar um instrutor')
      }
    }

    // 4. Criar curso com todos os campos necessários
    console.log('\n📚 Criando curso NCA...')
    
    const completeCourseData = {
      ...ncaCourseData,
      featuredImage: imageId,
      instructor: instructorId
    }
    
    const courseResponse = await fetch(`${PAYLOAD_API_URL}/cursos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(completeCourseData),
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
    console.log('🛒 Disponível:', courseResult.isLive ? '✅ Sim' : '❌ Não')
    console.log('📂 Categoria:', courseResult.category)

    // 5. Verificar se aparece na listagem
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
        console.log(`   - Categoria: ${curso.category}`)
        console.log('')
      })
    }

    console.log('🎉 Setup completo do curso NCA realizado!')
    console.log('\n🌐 URLs para testar:')
    console.log('📋 Lista de cursos: http://localhost:3002/cursos')
    console.log('📄 Página do curso: http://localhost:3002/cursos/nca-nutricao-clinica-aplicada')
    console.log('\n💡 O curso deve aparecer agora na listagem do frontend!')

    return courseResult

  } catch (error) {
    console.error('❌ Erro:', error.message)
    process.exit(1)
  }
}

// Executar o script
setupCompleteNCA()