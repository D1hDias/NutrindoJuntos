#!/usr/bin/env node

/**
 * Script para criar o curso NCA no Payload CMS
 * Executa: node scripts/create-nca-course.js
 */

const PAYLOAD_API_URL = 'http://localhost:3001/api'

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
          text: 'Este curso vai além da teoria tradicional, oferecendo ferramentas práticas, protocolos validados e metodologias comprovadas que você pode implementar imediatamente em sua prática profissional.'
        }
      ]
    },
    {
      children: [
        {
          text: '💡 O que você vai aprender:'
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
  paymentLink: 'https://pay.hotmart.com/exemplo-nca-curso',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

async function createCourse() {
  try {
    console.log('Criando curso NCA...')
    
    const response = await fetch(`${PAYLOAD_API_URL}/cursos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ncaCourseData),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Erro na API: ${response.status} - ${error}`)
    }

    const result = await response.json()
    console.log('✅ Curso NCA criado com sucesso!')
    console.log('ID:', result.id)
    console.log('Slug:', result.slug)
    console.log('Status:', result.status)

    // Verificar se o curso aparece na listagem
    console.log('\nVerificando listagem de cursos...')
    const listResponse = await fetch(`${PAYLOAD_API_URL}/cursos`)
    const listResult = await listResponse.json()
    
    console.log(`📊 Total de cursos: ${listResult.totalDocs}`)
    if (listResult.docs && listResult.docs.length > 0) {
      listResult.docs.forEach((curso, index) => {
        console.log(`${index + 1}. ${curso.title} (${curso.status})`)
      })
    }

  } catch (error) {
    console.error('❌ Erro ao criar curso:', error.message)
    process.exit(1)
  }
}

// Executar o script
createCourse()