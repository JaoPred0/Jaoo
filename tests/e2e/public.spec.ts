import { expect, test } from '@playwright/test'

test('base vazia carrega sem as interfaces anteriores', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const path of ['/', '/aplicativos', '/login', '/dashboard']) {
    await page.goto(path)
    await expect(page.locator('#root')).toBeAttached()
    await expect(page.locator('#root')).toBeEmpty()
  }
  expect(errors).toEqual([])
})
