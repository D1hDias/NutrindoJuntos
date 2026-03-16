#!/usr/bin/env node

/**
 * Script para criar curso NCA com dados mínimos para os campos obrigatórios
 */

const PAYLOAD_API_URL = 'http://localhost:3001/api'

const adminCredentials = {
  email: 'admin@nutrindojuntos.com.br',
  password: 'admin123'
}

async function createNCAWithMinimalData() {
  try {
    console.log('🔐 Login...')
    
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
    console.log('✅ Login OK!')

    // 1. Criar imagem mínima
    console.log('\n🖼️ Criando imagem...')
    
    const imageData = {
      filename: 'nca-curso.jpg',
      alt: 'NCA - Nutrição Clínica Aplicada',
      text: 'Imagem temporária do curso NCA',
      mimeType: 'image/jpeg'
    }

    const imageResponse = await fetch(`${PAYLOAD_API_URL}/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(imageData),
    })

    let imageId = 1 // Fallback se não conseguir criar
    if (imageResponse.ok) {
      const imageResult = await imageResponse.json()
      imageId = imageResult.id
      console.log('✅ Imagem criada ID:', imageId)
    } else {
      console.log('⚠️ Usando ID de imagem padrão')
    }

    // 2. Criar instrutor mínimo
    console.log('\n👩‍🏫 Criando instrutor...')
    
    const instructorData = {
      name: 'Dra. Ana Paula Silva',
      slug: 'ana-paula-silva',
      role: 'Nutricionista Clínica',
      photo: imageId, // Usar a mesma imagem
      bio: 'Especialista em nutrição clínica com experiência prática.'
    }

    const instructorResponse = await fetch(`${PAYLOAD_API_URL}/equipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(instructorData),
    })

    let instructorId = 1 // Fallback
    if (instructorResponse.ok) {
      const instructorResult = await instructorResponse.json()
      instructorId = instructorResult.id
      console.log('✅ Instrutor criado ID:', instructorId)
    } else {
      const error = await instructorResponse.text()
      console.log('⚠️ Erro instrutor:', error)
      console.log('⚠️ Usando ID de instrutor padrão')
    }

    // 3. Criar curso completo
    console.log('\n📚 Criando curso NCA...')
    
    const courseData = {
      title: 'NCA - Nutrição Clínica Aplicada',
      slug: 'nca-nutricao-clinica-aplicada',
      description: 'Aprenda a aplicar a nutrição clínica de forma prática e baseada em evidências científicas, desenvolvendo a confiança necessária para atuar com excelência no consultório.',
      headline: 'Transforme teoria em prática com confiança',
      featuredImage: imageId,
      content: [
        {
          children: [
            {
              text: 'O curso NCA - Nutrição Clínica Aplicada é um programa 100% prático desenvolvido especialmente para estudantes de nutrição, recém-formados e profissionais que desejam fazer a transição para a prática clínica com confiança e segurança.'
            }
          ]
        }
      ],
      instructor: instructorId,
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
      console.log('❌ Erro detalhado:', courseError)
      throw new Error(`Erro ao criar curso: ${courseResponse.status}`)
    }

    const courseResult = await courseResponse.json()
    
    console.log('\n🎉 CURSO NCA CRIADO!')
    console.log('🆔 ID:', courseResult.id)
    console.log('📝 Título:', courseResult.title)
    console.log('🔗 Slug:', courseResult.slug)
    console.log('💰 Preço: R$', courseResult.price)
    console.log('📊 Status:', courseResult.status)

    // Verificar listagem
    console.log('\n🔍 Verificando...')
    const listResponse = await fetch(`${PAYLOAD_API_URL}/cursos?status=published`)
    const listResult = await listResponse.json()
    
    console.log(`📊 Total: ${listResult.totalDocs} curso(s)`)
    
    if (listResult.docs && listResult.docs.length > 0) {
      listResult.docs.forEach((curso) => {
        console.log(`📚 ${curso.title} (R$ ${curso.price})`)
      })
    }

    console.log('\n🌐 TESTE:')
    console.log('📋 http://localhost:3002/cursos')
    console.log('📄 http://localhost:3002/cursos/nca-nutricao-clinica-aplicada')

    return courseResult

  } catch (error) {
    console.error('❌ ERRO:', error.message)
    process.exit(1)
  }
}

createNCAWithMinimalData()