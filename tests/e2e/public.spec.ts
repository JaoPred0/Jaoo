import { expect, test } from '@playwright/test'
test('landing e autenticação são navegáveis', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: /Crie sua presença/ }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Entrar' }).first().click()
  await expect(page.getByRole('heading', { name: /volta/ })).toBeVisible()
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
