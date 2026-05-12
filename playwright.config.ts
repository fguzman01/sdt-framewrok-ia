import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['allure-playwright'],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: process.env.HEADED !== 'true',
    launchOptions: {
      slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'web-chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/tests/web/**/*.spec.ts',
    },
    {
      name: 'api',
      use: { baseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com' },
      testMatch: '**/tests/api/**/*.spec.ts',
    },
  ],
});
