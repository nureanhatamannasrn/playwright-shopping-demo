
import { test, expect } from '@playwright/test';

test('products page displays products', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory.html/);

  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Sauce Labs Backpack')
  ).toBeVisible();
});



test('user can add a backpack to the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('1');
});



test('cart page displays the added backpack', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await page.locator('.shopping_cart_link').click();

  await expect(
    page.getByText('Sauce Labs Backpack')
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Remove' })
  ).toBeVisible();
});

