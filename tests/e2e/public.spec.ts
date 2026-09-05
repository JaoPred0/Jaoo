import { expect, test } from '@playwright/test'

test('navegação e pesquisa funcionam na interface principal', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const path of ['/', '/aplicativos']) {
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

test('visitante abre o login pelo ícone e acessa o cadastro', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Perfil', exact: true }).click()
  await expect(page).toHaveURL('/login')
  await expect(
    page.getByRole('heading', { name: 'Bem-vindo de volta.' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Continuar com Google' }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Cadastre-se' }).click()
  await expect(page).toHaveURL('/cadastro')
  await expect(
    page.getByRole('heading', { name: 'Crie seu espaço.' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Continuar com Google' }),
  ).toBeVisible()
  await expect(page.locator('header')).toHaveCount(0)
  await expect(
    page.getByRole('navigation', { name: 'Navegação inferior' }),
  ).toHaveCount(0)
  await page.getByRole('link', { name: 'Voltar ao início' }).click()
  await expect(page).toHaveURL('/')
})

test('registra acessos reais aos aplicativos e preserva o histórico', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.getByText('Nenhuma atividade por enquanto')).toBeVisible()
  await page.getByRole('button', { name: 'Jaoo Link', exact: true }).click()
  await expect(page).toHaveURL('/link')
  await page.goto('/')
  await expect(page.getByText('Consultou o aplicativo')).toBeVisible()
  await page.reload()
  await expect(page.getByText('Consultou o aplicativo')).toBeVisible()
})

test('edita e salva uma página no Jaoo Link', async ({ page }) => {
  await page.goto('/link')
  await expect(page.getByRole('heading', { name: 'Jaoo Link' })).toBeVisible()
  await page.getByLabel('Nome').fill('João')
  await page.getByLabel('Título do link 1').fill('Meu site')
  await page.getByLabel('URL do link 1').fill('jaoo.com.br')
  await page.getByRole('button', { name: 'Salvar' }).click()
  await expect(
    page.getByText('Alterações salvas neste dispositivo.'),
  ).toBeVisible()
  await page.reload()
  await expect(page.getByLabel('Nome')).toHaveValue('João')
  await expect(page.getByLabel('URL do link 1')).toHaveValue(
    'https://jaoo.com.br/',
  )
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
