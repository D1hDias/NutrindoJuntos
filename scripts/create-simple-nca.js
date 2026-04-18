#!/usr/bin/env node

/**
 * Script simplificado para criar curso NCA com campos mínimos
 */

const PAYLOAD_API_URL = 'http://localhost:3001/api'

const adminCredentials = {
  email: 'admin@nutrindojuntos.com.br',
  password: 'admin123'
}

async function createSimpleNCA() {
  let token

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
    token = loginResult.token
    console.log('✅ Login OK!')

    // Primeiro, criar uma imagem simples
    console.log('\n🖼️ Criando imagem placeholder...')
    
    const imageData = {
      filename: 'nca-curso.jpg',
      alt: 'NCA - Nutrição Clínica Aplicada',
      url: '/images/placeholder-course.jpg', // Usando uma imagem local
      mimeType: 'image/jpeg',
      width: 600,
      height: 400,
      filesize: 50000
    }

    const imageResponse = await fetch(`${PAYLOAD_API_URL}/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(imageData),
    })

    let imageId = null
    if (imageResponse.ok) {
      const imageResult = await imageResponse.json()
      imageId = imageResult.id
      console.log('✅ Imagem criada:', imageResult.filename)
    } else {
      console.log('⚠️ Imagem não criada, tentando sem imagem...')
    }

    // Criar instrutor simples
    console.log('\n👩‍🏫 Criando instrutor...')
    
    const instructorData = {
      name: 'Dra. Ana Paula Silva',
      slug: 'ana-paula-silva',
      role: 'Nutricionista Clínica',
      bio: 'Nutricionista especialista em atendimento clínico com mais de 10 anos de experiência.',
      email: 'ana.silva@nutrindojuntos.com.br'
    }

    // Se temos imagem, usar para o instrutor também
    if (imageId) {
      instructorData.photo = imageId
    }

    const instructorResponse = await fetch(`${PAYLOAD_API_URL}/equipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(instructorData),
    })

    let instructorId = null
    if (instructorResponse.ok) {
      const instructorResult = await instructorResponse.json()
      instructorId = instructorResult.id
      console.log('✅ Instrutor criado:', instructorResult.name)
    } else {
      const instructorError = await instructorResponse.text()
      console.log('⚠️ Erro instrutor:', instructorError)
      
      // Tentar buscar instrutor existente
      const listResponse = await fetch(`${PAYLOAD_API_URL}/equipe?limit=1`)
      if (listResponse.ok) {
        const list = await listResponse.json()
        if (list.docs && list.docs.length > 0) {
          instructorId = list.docs[0].id
          console.log('✅ Usando instrutor existente:', list.docs[0].name)
        }
      }
    }

    // Curso mínimo (sem instrutor e imagem se não conseguir criar)
    console.log('\n📚 Criando curso NCA...')
    
    const courseData = {
      title: 'NCA - Nutrição Clínica Aplicada',
      slug: 'nca-nutricao-clinica-aplicada',
      description: 'Aprenda a aplicar a nutrição clínica de forma prática e baseada em evidências científicas, desenvolvendo a confiança necessária para atuar com excelência.',
      headline: 'Transforme teoria em prática com confiança',
      content: [
        {
          children: [
            {
              text: 'O curso NCA - Nutrição Clínica Aplicada é um programa 100% prático desenvolvido especialmente para estudantes de nutrição, recém-formados e profissionais que desejam fazer a transição para a prática clínica com confiança e segurança.'
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

    // Adicionar campos opcionais se criados com sucesso
    if (imageId) {
      courseData.featuredImage = imageId
    }
    
    if (instructorId) {
      courseData.instructor = instructorId
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
      console.log('❌ Erro detalhado curso:', courseError)
      throw new Error(`Erro ao criar curso: ${courseResponse.status}`)
    }

    const courseResult = await courseResponse.json()
    console.log('✅ Curso NCA criado!')
    console.log('🆔 ID:', courseResult.id)
    console.log('📝 Título:', courseResult.title)
    console.log('🔗 Slug:', courseResult.slug)
    console.log('💰 Preço: R$', courseResult.price)
    console.log('📊 Status:', courseResult.status)

    // Verificar listagem final
    console.log('\n🔍 Verificando resultado...')
    const listResponse = await fetch(`${PAYLOAD_API_URL}/cursos?status=published`)
    const listResult = await listResponse.json()
    
    console.log(`📊 Total de cursos: ${listResult.totalDocs}`)
    listResult.docs?.forEach((curso, i) => {
      console.log(`${i + 1}. ${curso.title} (${curso.slug})`)
    })

    console.log('\n🎉 Sucesso! URLs para testar:')
    console.log('📋 Lista: http://localhost:3002/cursos')
    console.log('📄 Curso: http://localhost:3002/cursos/nca-nutricao-clinica-aplicada')

    return courseResult

  } catch (error) {
    console.error('❌ Erro:', error.message)
    process.exit(1)
  }
}

createSimpleNCA()