import { test, expect } from '@playwright/test'

/**
 * Testes E2E - Homepage
 *
 * Validar elementos e funcionalidades da página inicial
 */

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a homepage antes de cada teste
    await page.goto('/')
  })

  test('should load homepage successfully', async ({ page }) => {
    // Verificar título da página
    await expect(page).toHaveTitle(/Nutrindo Juntos/)

    // Verificar que o header está visível
    const header = page.locator('header')
    await expect(header).toBeVisible()
  })

  test('should display navigation menu', async ({ page }) => {
    // Verificar que os links principais estão visíveis
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /sobre/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /cursos/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /blog/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /contato/i })).toBeVisible()
  })

  test('should display hero section', async ({ page }) => {
    // Verificar que a seção hero existe
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()

    // Verificar CTAs
    await expect(page.getByRole('button', { name: /matricule/i }).or(page.getByRole('link', { name: /matricule/i }))).toBeVisible()
  })

  test('should navigate to courses page', async ({ page }) => {
    // Clicar no link de cursos
    await page.getByRole('link', { name: /cursos/i }).click()

    // Verificar que navegou para a página de cursos
    await expect(page).toHaveURL(/.*cursos/)
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Testar viewport mobile
    await page.setViewportSize({ width: 375, height: 667 })

    // Verificar que o header ainda está visível
    const header = page.locator('header')
    await expect(header).toBeVisible()
  })
})
