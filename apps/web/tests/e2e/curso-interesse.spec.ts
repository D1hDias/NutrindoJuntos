import { test, expect } from '@playwright/test'

/**
 * Testes E2E - Interesse em Curso
 *
 * Validar fluxo de demonstração de interesse em cursos
 */

test.describe('Course Interest Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cursos')
  })

  test('should display courses list', async ({ page }) => {
    // Verificar que a página de cursos carregou
    await expect(page.locator('h1')).toContainText(/cursos/i)

    // Verificar que há pelo menos 1 curso
    const courseCards = page.locator('[data-testid="course-card"]').or(page.locator('article'))
    await expect(courseCards.first()).toBeVisible({ timeout: 10000 })
  })

  test('should navigate to course details', async ({ page }) => {
    // Clicar no primeiro curso
    const firstCourse = page.locator('[data-testid="course-card"]').or(page.locator('article')).first()
    await firstCourse.click()

    // Verificar que navegou para detalhes
    await expect(page).toHaveURL(/.*cursos\/.*/)
  })

  test('should submit interest form', async ({ page }) => {
    // Navegar para detalhes de um curso
    const firstCourse = page.locator('[data-testid="course-card"]').or(page.locator('article')).first()
    await firstCourse.click()

    // Localizar formulário de interesse
    const nameInput = page.locator('input[name="name"]')
    const emailInput = page.locator('input[name="email"]')
    const submitButton = page.getByRole('button', { name: /matricule|interesse|enviar/i })

    // Verificar que o formulário existe
    await expect(nameInput).toBeVisible()
    await expect(emailInput).toBeVisible()

    // Preencher formulário
    await nameInput.fill('João Silva')
    await emailInput.fill('joao@example.com')

    // Submeter
    await submitButton.click()

    // Verificar mensagem de sucesso
    await expect(page.getByText(/enviado|sucesso|obrigado/i)).toBeVisible({ timeout: 5000 })
  })
})
