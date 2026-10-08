import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const storageKey = 'valenne.cart.v1'

async function openAurora(page: import('@playwright/test').Page) {
  const trigger = page.getByRole('button', { name: 'Ver detalhes de Conjunto Aurora' })
  await trigger.click()
  return page.getByRole('dialog', { name: 'Conjunto Aurora' })
}

async function addAurora(page: import('@playwright/test').Page, size = 'M') {
  const dialog = await openAurora(page)
  await dialog.getByRole('radio', { name: size, exact: true }).check()
  await dialog.getByRole('button', { name: 'Adicionar à sacola' }).click()
  await expect(dialog).not.toBeVisible()
}

test('filters the catalogue without losing products', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('product-card')).toHaveCount(6)
  for (const category of ['Conjuntos', 'Bodys', 'Linha dormir']) {
    await page.getByRole('button', { name: category, exact: true }).click()
    await expect(page.getByTestId('product-card')).toHaveCount(2)
  }
  await page.getByRole('button', { name: 'Todos', exact: true }).click()
  await expect(page.getByTestId('product-card')).toHaveCount(6)
})

test('requires a size and returns focus when details close', async ({ page }) => {
  await page.goto('/')
  const dialog = await openAurora(page)
  await expect(dialog.getByRole('button', { name: 'Adicionar à sacola' })).toBeDisabled()
  await dialog.getByRole('radio', { name: 'M', exact: true }).check()
  await expect(dialog.getByRole('button', { name: 'Adicionar à sacola' })).toBeEnabled()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'Ver detalhes de Conjunto Aurora' })).toBeFocused()
})

test('groups matching variants, separates sizes, updates totals and persists', async ({ page }) => {
  await page.goto('/')
  await addAurora(page)
  await addAurora(page)
  await addAurora(page, 'G')
  await page.getByRole('button', { name: /Abrir sacola/ }).click()
  const bag = page.getByRole('dialog', { name: 'Sua sacola' })
  await expect(bag.getByTestId('cart-item')).toHaveCount(2)
  await expect(bag.getByTestId('cart-subtotal')).toHaveText(/389,70/)
  await bag.getByRole('button', { name: 'Aumentar quantidade de Conjunto Aurora, M' }).click()
  await expect(bag.getByTestId('cart-subtotal')).toHaveText(/519,60/)
  await bag.getByRole('button', { name: 'Diminuir quantidade de Conjunto Aurora, M' }).click()
  await expect(bag.getByTestId('cart-subtotal')).toHaveText(/389,70/)
  await bag.getByRole('button', { name: 'Remover Conjunto Aurora, G' }).click()
  await expect(bag.getByTestId('cart-item')).toHaveCount(1)
  await expect(bag.getByTestId('cart-subtotal')).toHaveText(/259,80/)
  await page.reload()
  await page.getByRole('button', { name: /Abrir sacola/ }).click()
  await expect(bag.getByTestId('cart-subtotal')).toHaveText(/259,80/)
  await bag.getByRole('button', { name: 'Remover Conjunto Aurora, M' }).click()
  await expect(bag.getByText('Sua sacola está esperando por você.')).toBeVisible()
})

test('checkout clearly identifies the demo and submits no order', async ({ page }) => {
  await page.goto('/')
  await addAurora(page)
  await page.getByRole('button', { name: /Abrir sacola/ }).click()
  const bag = page.getByRole('dialog', { name: 'Sua sacola' })
  await bag.getByRole('button', { name: 'Finalizar demonstração' }).click()
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
    { productId: 'aurora', size: 'XL', quantity: 1 },
    { productId: 'aurora', size: 'M', quantity: -1 },
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
  await addAurora(page)
  await page.getByRole('button', { name: /Abrir sacola/ }).click()
  await expect(page.getByTestId('cart-subtotal')).toHaveText(/129,90/)
})

test('mobile menu closes on navigation and Escape returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Abrir menu' })
  await menu.click()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await menu.click()
  await page.getByRole('dialog', { name: 'Menu Valenne' }).getByRole('link', { name: 'A coleção' }).click()
  await expect(page.getByRole('dialog', { name: 'Menu Valenne' })).not.toBeVisible()
  await expect(page).toHaveURL(/#colecao$/)
})

for (const colorScheme of ['light', 'dark'] as const) {
  for (const width of [375, 768, 1440]) {
    test(`responsive ${width}px, ${colorScheme}, reduced motion`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
      await page.goto('/')
      await page.evaluate(() => document.fonts.ready)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
      await page.locator('#duvidas').scrollIntoViewIfNeeded()
      await page.getByText('Como escolher meu tamanho?', { exact: true }).click()
      await expect(page.getByText('Compare suas medidas')).toBeVisible()
      await page.locator('#colecao').scrollIntoViewIfNeeded()
      const images = await page.locator('.product-image img').evaluateAll(elements => elements.every(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0))
      expect(images).toBeTruthy()
      await page.screenshot({ path: `reports/valenne-${width}-${colorScheme}.png`, fullPage: true })
    })
  }

  test(`accessible page and product dialog in ${colorScheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
    await page.goto('/')
    let result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(result.violations).toEqual([])
    await openAurora(page)
    result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(result.violations).toEqual([])
  })
}
