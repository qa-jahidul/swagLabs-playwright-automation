import { test, expect } from '@playwright/test';

test('User logs in, adds product to cart, verifies and logs out', async ({ page }) => {
  // Navigate to Saucedemo
  await page.goto('https://www.saucedemo.com/');

  // Login with valid credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Verify successful login
  await expect(page.locator('.title')).toHaveText('Products');

  // Add first product to cart
  const firstProductName = await page.locator('.inventory_item_name').first().textContent();
  await page.click('.inventory_item:first-child .btn_inventory');

  // Navigate to cart
  await page.click('.shopping_cart_link');

  // Verify product name in cart
  const cartProductName = await page.locator('.inventory_item_name').textContent();
  expect(cartProductName).toBe(firstProductName);

  // Verify cart badge shows 1 item
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Logout
  await page.click('#react-burger-menu-btn');
  await page.waitForSelector('#logout_sidebar_link', { state: 'visible' });
  await page.click('#logout_sidebar_link');

  // Verify returned to login page
  await expect(page.locator('#login-button')).toBeVisible();
});