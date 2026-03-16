import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright Configuration - Nutrindo Juntos
 *
 * Testes E2E para validar fluxos críticos do usuário
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Diretório dos testes E2E
  testDir: './tests/e2e',

  // Timeout para cada teste
  timeout: 30 * 1000,

  // Configuração de tentativas em caso de falha
  retries: process.env.CI ? 2 : 0,

  // Workers (testes em paralelo)
  workers: process.env.CI ? 1 : undefined,

  // Reporter (relatórios de testes)
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],

  // Configurações compartilhadas entre testes
  use: {
    // Base URL do site
    baseURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

    // Trace apenas em caso de falha
    trace: 'on-first-retry',

    // Screenshot apenas em falha
    screenshot: 'only-on-failure',

    // Vídeo apenas em falha
    video: 'retain-on-failure',
  },

  // Projetos (browsers para testar)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Testes Mobile
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Servidor de desenvolvimento local (opcional)
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
