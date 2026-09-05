import { expect, test } from '@playwright/test'
test('landing e autenticação são navegáveis', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: /Crie sua presença/ }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Entrar' }).first().click()
  await expect(page.getByRole('heading', { name: /volta/ })).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Continuar com Google' }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Criar conta' }).click()
  await expect(
    page.getByRole('button', { name: 'Continuar com Google' }),
  ).toBeVisible()
})
test('dashboard permanece protegido quando Supabase está configurado', async ({
  page,
}) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/(dashboard|login)/)
})

test('navega entre início e aplicativos como páginas', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Aplicativos' }).last().click()
  await expect(page).toHaveURL('/aplicativos')
  await expect(
    page.getByRole('heading', { name: 'Sua criação acompanha você.' }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Início' }).last().click()
  await expect(page).toHaveURL('/')
})

test('mantém as navegações fixas durante a rolagem mobile', async ({
  page,
}) => {
  test.skip((page.viewportSize()?.width ?? 1280) >= 640)
  await page.goto('/')
  const header = page.locator('header')
  const footer = page.getByRole('navigation', {
    name: 'Navegação principal móvel',
  })
  const before = await footer.evaluate((element) => ({
    bottom: element.getBoundingClientRect().bottom,
    viewport: window.innerHeight,
  }))
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await expect(header).toBeInViewport()
  await expect(footer).toBeInViewport()
  const after = await footer.evaluate((element) => ({
    bottom: element.getBoundingClientRect().bottom,
    viewport: window.innerHeight,
  }))
  expect(Math.abs(before.bottom - before.viewport)).toBeLessThanOrEqual(1)
  expect(Math.abs(after.bottom - after.viewport)).toBeLessThanOrEqual(1)
})
