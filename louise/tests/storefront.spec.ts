import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const storageKey = 'louise-demo.cart.v1'

async function openHela(page: import('@playwright/test').Page) {
  const trigger = page.getByRole('button', { name: 'Ver exemplo de Conjunto Hela' })
  await trigger.click()
  return page.getByRole('dialog', { name: 'Conjunto Hela' })
}

async function addHela(page: import('@playwright/test').Page, size = 'M') {
  const dialog = await openHela(page)
  await dialog.getByRole('radio', { name: size, exact: true }).check()
  await dialog.getByRole('button', { name: 'Adicionar à sacola' }).click()
  await expect(dialog).not.toBeVisible()
}

test('filters the catalogue without losing products', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('product-card')).toHaveCount(11)
  for (const category of ['Conjuntos', 'Bodys', 'Roupas de Dormir']) {
    await page.getByRole('button', { name: category, exact: true }).click()
    await expect(page.getByTestId('product-card')).toHaveCount(2)
  }
  for (const category of ['Croppeds', 'Calcinhas', 'Modeladores', 'Sutiãs | Tops', 'Moda Fitness']) {
    await page.getByRole('button', { name: category, exact: true }).click()
    await expect(page.getByTestId('product-card')).toHaveCount(1)
  }
  await page.getByRole('button', { name: 'Todos', exact: true }).click()
  await expect(page.getByTestId('product-card')).toHaveCount(11)
})

test('category tiles select and scroll to the matching sample products', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Sutiãs & tops' }).click()
  await expect(page).toHaveURL(/#colecao$/)
  await expect(page.getByRole('button', { name: 'Sutiãs | Tops', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByTestId('product-card')).toHaveCount(1)
})

test('requires a size and returns focus when details close', async ({ page }) => {
  await page.goto('/')
  const dialog = await openHela(page)
  await expect(dialog.getByRole('button', { name: 'Adicionar à sacola' })).toBeDisabled()
  await dialog.getByRole('radio', { name: 'M', exact: true }).check()
  await expect(dialog.getByRole('button', { name: 'Adicionar à sacola' })).toBeEnabled()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'Ver exemplo de Conjunto Hela' })).toBeFocused()
})

test('groups matching variants, separates sizes, updates totals and persists', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()) })
  await page.goto('/')
  await addHela(page)
  await addHela(page)
  await addHela(page, 'G')
  await page.getByRole('button', { name: /Abrir sacola/ }).click()
  const bag = page.getByRole('dialog', { name: 'Sua sacola' })
  await expect(bag.getByTestId('cart-item')).toHaveCount(2)
  await expect(bag.getByTestId('cart-subtotal')).toHaveText(/89,70/)
  await bag.getByRole('button', { name: 'Aumentar quantidade de Conjunto Hela, M' }).click()
  await expect(bag.getByTestId('cart-subtotal')).toHaveText(/119,60/)
  await bag.getByRole('button', { name: 'Diminuir quantidade de Conjunto Hela, M' }).click()
  await expect(bag.getByTestId('cart-subtotal')).toHaveText(/89,70/)
  await bag.getByRole('button', { name: 'Remover Conjunto Hela, G' }).click()
  await expect(bag.getByTestId('cart-item')).toHaveCount(1)
  await expect(bag.getByTestId('cart-subtotal')).toHaveText(/59,80/)
  await page.reload()
  await page.getByRole('button', { name: /Abrir sacola/ }).click()
  await expect(bag.getByTestId('cart-subtotal')).toHaveText(/59,80/)
  await bag.getByRole('button', { name: 'Remover Conjunto Hela, M' }).click()
  await expect(bag.getByText('Sua sacola está esperando por você.')).toBeVisible()
  expect(consoleErrors).toEqual([])
})

test('restores a saved sample bag without hydration errors', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()) })
  await page.addInitScript(([key, value]) => localStorage.setItem(key, value), [
    storageKey,
    JSON.stringify([{ productId: 'hela', size: 'M', quantity: 2 }]),
  ])
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Abrir sacola, 2 itens' })).toBeVisible()
  expect(consoleErrors).toEqual([])
})

test('checkout clearly identifies the demo and submits no order', async ({ page }) => {
  await page.goto('/')
  await addHela(page)
  await page.getByRole('button', { name: /Abrir sacola/ }).click()
  const bag = page.getByRole('dialog', { name: 'Sua sacola' })
  await bag.getByRole('button', { name: 'Testar finalização' }).click()
  await expect(bag.getByRole('status')).toContainText('Nenhum pedido foi enviado')
  await expect(bag.getByTestId('cart-item')).toHaveCount(1)
})

test('invalid stored data is discarded', async ({ page }) => {
  await page.addInitScript(([key]) => localStorage.setItem(key, '{"not":"a cart"}'), [storageKey])
  await page.goto('/')
  await page.getByRole('button', { name: /Abrir sacola/ }).click()
  await expect(page.getByText('Sua sacola está esperando por você.')).toBeVisible()
})

test('catalogue validation rejects unknown products, sizes and invalid quantities', async ({ page }) => {
  await page.addInitScript(([key]) => localStorage.setItem(key, JSON.stringify([
    { productId: 'missing', size: 'M', quantity: 1 },
    { productId: 'hela', size: 'XL', quantity: 1 },
    { productId: 'hela', size: 'M', quantity: -1 },
  ])), [storageKey])
  await page.goto('/')
  await page.getByRole('button', { name: /Abrir sacola/ }).click()
  await expect(page.getByText('Sua sacola está esperando por você.')).toBeVisible()
})

test('works when browser storage is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError') } })
  })
  await page.goto('/')
  await addHela(page)
  await page.getByRole('button', { name: /Abrir sacola/ }).click()
  await expect(page.getByTestId('cart-subtotal')).toHaveText(/29,90/)
})

test('mobile menu closes on navigation and Escape returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Abrir menu' })
  await menu.click()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await menu.click()
  await page.getByRole('dialog', { name: 'Louise Lingerie' }).getByRole('link', { name: 'Vitrine' }).click()
  await expect(page.getByRole('dialog', { name: 'Louise Lingerie' })).not.toBeVisible()
  await expect(page).toHaveURL(/#colecao$/)
})

for (const colorScheme of ['light', 'dark'] as const) {
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    test(`responsive ${width}px, ${colorScheme}, reduced motion`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
      await page.goto('/')
      await page.evaluate(() => document.fonts.ready)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
      await page.locator('#duvidas').scrollIntoViewIfNeeded()
      await page.getByText('As peças e os preços desta vitrine são oficiais?', { exact: true }).click()
      await expect(page.getByText(/valores são referências por categoria pesquisadas no catálogo público/)).toBeVisible()
      await page.locator('#colecao').scrollIntoViewIfNeeded()
      const images = page.locator('.product-image img')
      for (let index = 0; index < await images.count(); index += 1) {
        const image = images.nth(index)
        await image.scrollIntoViewIfNeeded()
        await expect.poll(() => image.evaluate(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true)
      }
      await page.screenshot({ path: 'reports/louise-' + width + '-' + colorScheme + '.png', fullPage: true })
    })
  }

  test(`accessible page and product dialog in ${colorScheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
    await page.goto('/')
    let result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(result.violations).toEqual([])
    await openHela(page)
    result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(result.violations).toEqual([])
  })
}
