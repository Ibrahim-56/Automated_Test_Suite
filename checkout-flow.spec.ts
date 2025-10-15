import { test, expect } from '@playwright/test';

test('Complete checkout with 3 random items', async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  const items = await page.$$('.inventory_item');
  const selected = items.sort(() => 0.5 - Math.random()).slice(0, 3);

  for (const item of selected) {
    const addButton = await item.$('button');
    await addButton?.click();
  }

  await page.click('.shopping_cart_link');
  const cartItems = await page.$$('.cart_item');
  expect(cartItems.length).toBe(3);

  await page.click('#checkout');
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');
  await page.click('#finish');

  const successMsg = await page.locator('.complete-header');
  await expect(successMsg).toHaveText('Thank you for your order!');
});
