#!/usr/bin/env tsx
/**
 * SCRIPT DE TESTE DA INTEGRAÇÃO BREVO
 *
 * Este script testa toda a integração com o Brevo:
 * - Valida API Key
 * - Lista todas as listas de contatos
 * - Verifica se as listas necessárias existem
 * - Testa criação de contato (opcional)
 * - Testa envio de email (opcional)
 *
 * Como executar:
 * pnpm tsx scripts/test-brevo-integration.ts
 */

import * as brevo from '@getbrevo/brevo'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables from apps/web/.env.local
dotenv.config({ path: resolve(__dirname, '../apps/web/.env.local') })

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function section(title: string) {
  console.log('\n' + '='.repeat(60))
  log(title, 'bright')
  console.log('='.repeat(60))
}

async function testBrevoIntegration() {
  section('🔍 TESTE DE INTEGRAÇÃO BREVO')

  // Step 1: Validate API Key
  section('1️⃣ Validando API Key')

  const apiKey = process.env.BREVO_API_KEY

  if (!apiKey) {
    log('❌ ERRO: BREVO_API_KEY não encontrada no .env.local', 'red')
    process.exit(1)
  }

  if (!apiKey.startsWith('xkeysib-')) {
    log('❌ ERRO: API Key em formato inválido (deve começar com xkeysib-)', 'red')
    process.exit(1)
  }

  log('✅ API Key encontrada e em formato válido', 'green')
  log(`   Key: ${apiKey.substring(0, 20)}...`, 'cyan')

  // Initialize Brevo clients
  const apiInstance = new brevo.ContactsApi()
  apiInstance.setApiKey(brevo.ContactsApiApiKeys.apiKey, apiKey)

  const accountApi = new brevo.AccountApi()
  accountApi.setApiKey(brevo.AccountApiApiKeys.apiKey, apiKey)

  // Step 2: Test API Connection
  section('2️⃣ Testando Conexão com API')

  try {
    const accountInfo = await accountApi.getAccount()
    log('✅ Conexão estabelecida com sucesso!', 'green')
    log(`   Empresa: ${accountInfo.body.companyName || 'N/A'}`, 'cyan')
    log(`   Email: ${accountInfo.body.email}`, 'cyan')
    log(`   Plan: ${accountInfo.body.plan?.[0]?.type || 'Free'}`, 'cyan')
  } catch (error: any) {
    log('❌ ERRO ao conectar com a API do Brevo', 'red')
    log(`   Detalhes: ${error.message}`, 'red')

    if (error.response?.status === 401) {
      log('\n⚠️  A API Key parece estar inválida ou expirada', 'yellow')
      log('   Verifique em: https://app.brevo.com/settings/keys/api', 'yellow')
    }

    process.exit(1)
  }

  // Step 3: List all contact lists
  section('3️⃣ Listando Listas de Contatos')

  try {
    const listsResponse = await apiInstance.getLists({ limit: 50, offset: 0 })
    const lists = listsResponse.body.lists || []

    if (lists.length === 0) {
      log('⚠️  Nenhuma lista encontrada no Brevo', 'yellow')
      log('   Você precisa criar as listas manualmente no painel:', 'yellow')
      log('   https://app.brevo.com/contacts/lists', 'cyan')
    } else {
      log(`✅ ${lists.length} lista(s) encontrada(s):`, 'green')
      lists.forEach((list: any) => {
        log(`   [ID: ${list.id}] ${list.name} (${list.totalSubscribers || 0} contatos)`, 'cyan')
      })
    }

    // Step 4: Check required lists
    section('4️⃣ Verificando Listas Obrigatórias')

    const requiredLists = [
      { id: 3, name: 'NEWSLETTER', env: 'BREVO_LIST_NEWSLETTER' },
      { id: 4, name: 'LEADS_CURSOS', env: 'BREVO_LIST_LEADS_CURSOS' },
      { id: 5, name: 'LEADS_MENTORIA', env: 'BREVO_LIST_LEADS_MENTORIA' },
      { id: 6, name: 'CONTATO', env: 'BREVO_LIST_CONTATO' },
    ]

    const existingListIds = lists.map((list: any) => list.id)
    let allListsExist = true

    for (const required of requiredLists) {
      const configuredId = parseInt(process.env[required.env] || String(required.id))
      const exists = existingListIds.includes(configuredId)

      if (exists) {
        const list = lists.find((l: any) => l.id === configuredId)
        log(`✅ ${required.name}: ID ${configuredId} (${list?.name})`, 'green')
      } else {
        log(`❌ ${required.name}: ID ${configuredId} NÃO ENCONTRADA`, 'red')
        allListsExist = false
      }
    }

    if (!allListsExist) {
      log('\n⚠️  ATENÇÃO: Algumas listas obrigatórias não existem!', 'yellow')
      log('   Crie-as manualmente em: https://app.brevo.com/contacts/lists', 'yellow')
      log('   Ou ajuste os IDs no .env.local para corresponder às listas existentes', 'yellow')
    }

  } catch (error: any) {
    log('❌ ERRO ao listar listas de contatos', 'red')
    log(`   Detalhes: ${error.message}`, 'red')
  }

  // Step 5: Test Contact Creation (Optional)
  section('5️⃣ Teste de Criação de Contato (OPCIONAL)')

  log('ℹ️  Pulando teste de criação de contato para não poluir a lista', 'blue')
  log('   Se quiser testar, descomente a seção no script', 'blue')

  /*
  // DESCOMENTE ESTE BLOCO PARA TESTAR CRIAÇÃO DE CONTATO
  try {
    const testContact = new brevo.CreateContact()
    testContact.email = `teste-${Date.now()}@example.com`
    testContact.listIds = [3] // Lista Newsletter
    testContact.attributes = {
      FIRSTNAME: 'Teste',
      LASTNAME: 'Brevo Integration',
    }

    await apiInstance.createContact(testContact)
    log('✅ Contato de teste criado com sucesso!', 'green')
    log('   IMPORTANTE: Exclua este contato manualmente do painel', 'yellow')
  } catch (error: any) {
    log('❌ ERRO ao criar contato de teste', 'red')
    log(`   Detalhes: ${error.message}`, 'red')
  }
  */

  // Step 6: Test Email Sending (Optional)
  section('6️⃣ Teste de Envio de Email (OPCIONAL)')

  log('ℹ️  Pulando teste de envio de email para não enviar emails desnecessários', 'blue')
  log('   Se quiser testar, descomente a seção no script', 'blue')

  /*
  // DESCOMENTE ESTE BLOCO PARA TESTAR ENVIO DE EMAIL
  const transactionalEmailsApi = new brevo.TransactionalEmailsApi()
  transactionalEmailsApi.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    apiKey
  )

  try {
    const testEmail = new brevo.SendSmtpEmail()
    testEmail.sender = {
      name: 'NUTRINDO JUNTOS - Teste',
      email: process.env.CONTACT_EMAIL || 'atendimento@nutrindojuntos.com.br',
    }
    testEmail.to = [
      {
        email: 'seu-email-de-teste@example.com', // MUDE PARA SEU EMAIL
        name: 'Teste',
      },
    ]
    testEmail.subject = 'Teste de Integração Brevo'
    testEmail.htmlContent = '<h1>Teste de Integração</h1><p>Este é um email de teste.</p>'

    await transactionalEmailsApi.sendTransacEmail(testEmail)
    log('✅ Email de teste enviado com sucesso!', 'green')
    log('   Verifique sua caixa de entrada', 'cyan')
  } catch (error: any) {
    log('❌ ERRO ao enviar email de teste', 'red')
    log(`   Detalhes: ${error.message}`, 'red')
  }
  */

  // Final Report
  section('📊 RESUMO DO TESTE')

  log('✅ API Key configurada e válida', 'green')
  log('✅ Conexão com API estabelecida', 'green')
  log(`${lists.length > 0 ? '✅' : '⚠️ '} ${lists.length} lista(s) de contatos encontrada(s)`,
    lists.length > 0 ? 'green' : 'yellow')

  section('🎯 PRÓXIMOS PASSOS')

  if (lists.length === 0) {
    log('1. Criar as 4 listas obrigatórias no painel do Brevo:', 'yellow')
    log('   https://app.brevo.com/contacts/lists', 'cyan')
    log('   - Newsletter (sugiro ID: 3)', 'cyan')
    log('   - Leads Cursos (sugiro ID: 4)', 'cyan')
    log('   - Leads Mentoria (sugiro ID: 5)', 'cyan')
    log('   - Contato (sugiro ID: 6)', 'cyan')
    log('\n2. Após criar, execute este script novamente para validar', 'yellow')
  } else {
    log('1. A integração está funcionando! 🎉', 'green')
    log('2. Teste os formulários do site:', 'cyan')
    log('   - Newsletter: http://localhost:3000', 'cyan')
    log('   - Cursos: http://localhost:3000/cursos', 'cyan')
    log('   - Mentoria: http://localhost:3000/mentoria', 'cyan')
    log('   - Contato: http://localhost:3000/contato', 'cyan')
    log('\n3. Verifique se os emails chegam:', 'yellow')
    log('   - Email de confirmação para o usuário', 'cyan')
    log('   - Email de notificação para admin', 'cyan')
  }

  section('✨ TESTE CONCLUÍDO')
}

// Run the test
testBrevoIntegration().catch((error) => {
  log('\n❌ ERRO CRÍTICO:', 'red')
  console.error(error)
  process.exit(1)
})
