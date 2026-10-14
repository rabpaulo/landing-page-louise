import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5174'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: process.env.BASE_URL ? undefined : { command: 'npm run dev -- --hostname 127.0.0.1 --port 5174', url: 'http://127.0.0.1:5174', reuseExistingServer: true },
})
