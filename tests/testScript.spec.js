import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://storefront-wheat-kappa.vercel.app/');
  await page.getByRole('img', { name: 'Vintage White Crew' }).click();
  await page.getByRole('img', { name: 'Vintage White Crew' }).click();
  await page.locator('div:nth-child(2) > .product-info > .product-actions > .btn.btn-primary').click();
  await expect(page.getByRole('main')).toContainText('Color: White');
});

