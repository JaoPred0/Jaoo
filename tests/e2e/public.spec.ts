import { expect, test } from '@playwright/test'

test('navegação e pesquisa funcionam com conteúdo vazio', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const path of ['/', '/aplicativos', '/login', '/dashboard']) {
    await page.goto(path)
    await expect(page.locator('#root')).toBeAttached()
    if (path !== '/') await expect(page.locator('main')).toBeEmpty()
    await expect(page.getByRole('searchbox')).toBeVisible()
  }
  await page.getByRole('searchbox').fill('aplicativos')
  await page
    .getByRole('search')
    .getByRole('link', { name: 'Aplicativos' })
    .click()
  await expect(page).toHaveURL('/aplicativos')
  await expect(page.getByRole('searchbox')).toHaveValue('')
  await page.getByLabel('Notificações', { exact: true }).click()
  await expect(
    page.getByText('Nenhuma notificação por enquanto.'),
  ).toBeVisible()
  expect(errors).toEqual([])
})

test('alterna os dois anúncios sem ultrapassar a tela', async ({ page }) => {
  await page.goto('/')
  const carousel = page.getByRole('region', { name: 'Anúncios' })
  await expect(carousel.getByRole('group')).toHaveCount(2)
  await carousel.getByRole('button', { name: 'Mostrar anúncio 2' }).click()
  await expect(
    carousel.getByRole('button', { name: 'Mostrar anúncio 2' }),
  ).toHaveAttribute('aria-pressed', 'true')
  const track = carousel.locator('.ads-track')
  await track.focus()
  await page.keyboard.press('ArrowLeft')
  await expect(
    carousel.getByRole('button', { name: 'Mostrar anúncio 1' }),
  ).toHaveAttribute('aria-pressed', 'true')
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
})

test('barras permanecem fixas no celular sem ultrapassar a tela', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile)
  await page.goto('/')
  const footer = page.getByRole('navigation', { name: 'Navegação inferior' })
  await expect(footer).toBeVisible()
  const before = await footer.boundingBox()
  await page.locator('main').evaluate((element) => {
    element.style.minHeight = '200vh'
  })
  await page.evaluate(() => window.scrollTo(0, 500))
  await expect(page.locator('header')).toBeInViewport()
  expect(await footer.boundingBox()).toEqual(before)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
  await footer.getByRole('link', { name: 'Aplicativos' }).click()
  await expect(
    footer.getByRole('link', { name: 'Aplicativos' }),
  ).toHaveAttribute('aria-current', 'page')
})
