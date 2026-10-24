import { test, expect } from '@playwright/test';

test('Complete checkout with 3 random items', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);

  const items = page.locator('.inventory_item');
  const itemCount = await items.count();
  expect(itemCount).toBeGreaterThanOrEqual(3);

  const indices = Array.from({ length: itemCount }, (_, index) => index)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  for (const index of indices) {
    await items.nth(index).locator('button').click();
  }

  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart.html/);
  await expect(page.locator('.cart_item')).toHaveCount(3);

  await page.click('#checkout');
  await expect(page).toHaveURL(/checkout-step-one.html/);
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  await expect(page).toHaveURL(/checkout-step-two.html/);
  await page.click('#finish');
  await expect(page).toHaveURL(/checkout-complete.html/);
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
