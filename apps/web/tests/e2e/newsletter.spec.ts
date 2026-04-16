import { test, expect } from '@playwright/test'

/**
 * Testes E2E - Newsletter
 *
 * Validar fluxo de inscrição na newsletter
 */

test.describe('Newsletter Signup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should submit newsletter form successfully', async ({ page }) => {
    // Localizar formulário de newsletter
    const emailInput = page.locator('input[name="email"]').first()
    const submitButton = page.locator('button[type="submit"]').first()

    // Preencher email
    await emailInput.fill('teste@example.com')

    // Submeter formulário
    await submitButton.click()

    // Verificar mensagem de sucesso
    await expect(page.getByText(/cadastro realizado|sucesso|obrigado/i)).toBeVisible({ timeout: 5000 })
  })

  test('should validate email format', async ({ page }) => {
    // Localizar formulário
    const emailInput = page.locator('input[name="email"]').first()
    const submitButton = page.locator('button[type="submit"]').first()

    // Tentar submeter com email inválido
    await emailInput.fill('email-invalido')
    await submitButton.click()

    // Verificar mensagem de erro ou validação HTML5
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBeTruthy()
  })

  test('should not submit empty email', async ({ page }) => {
    // Localizar formulário
    const submitButton = page.locator('button[type="submit"]').first()

    // Tentar submeter vazio
    await submitButton.click()

    // Verificar que não navegou/não mostrou sucesso
    await expect(page.getByText(/cadastro realizado|sucesso/i)).not.toBeVisible()
  })
})
