import { test, expect } from '@playwright/test';

test('Complete checkout with 3 random items', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveTitle(/Swag Labs/);

  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL(/inventory.html/);

  const items = page.locator('.inventory_item');
  await expect(items.first()).toBeVisible();
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

  await page.click('[data-test="checkout"]');
  await expect(page).toHaveURL(/checkout-step-one.html/);
  await page.fill('[data-test="firstName"]', 'Test');
  await page.fill('[data-test="lastName"]', 'User');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');

  await expect(page).toHaveURL(/checkout-step-two.html/);
  await page.click('[data-test="finish"]');
  await expect(page).toHaveURL(/checkout-complete.html/);
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
