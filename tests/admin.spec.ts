import { test, expect } from '@playwright/test';

test.describe('Admin Panel', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/admin');
    
    // Check for login elements
    await expect(page.getByText('Admin Login')).toBeVisible();
    await expect(page.getByPlaceholder('Enter admin password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should reject invalid password', async ({ page }) => {
    await page.goto('/admin');
    
    // Enter wrong password
    await page.getByPlaceholder('Enter admin password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Should show error
    await expect(page.getByText(/invalid password/i)).toBeVisible({ timeout: 3000 });
  });

  test('should login with correct password', async ({ page }) => {
    await page.goto('/admin');
    
    // Enter correct password
    await page.getByPlaceholder('Enter admin password').fill('admin@2024');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Should see admin dashboard
    await expect(page.getByText('Harit Bharat Expo - Admin')).toBeVisible({ timeout: 3000 });
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
  });

  test('should display registrations tab after login', async ({ page }) => {
    await page.goto('/admin');
    
    // Login
    await page.getByPlaceholder('Enter admin password').fill('admin@2024');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for dashboard
    await page.waitForTimeout(1000);
    
    // Check for tabs
    await expect(page.getByRole('tab', { name: /registrations/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /smtp/i })).toBeVisible();
  });

  test('should display SMTP settings tab', async ({ page }) => {
    await page.goto('/admin');
    
    // Login
    await page.getByPlaceholder('Enter admin password').fill('admin@2024');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.waitForTimeout(1000);
    
    // Click SMTP Settings tab
    await page.getByRole('tab', { name: /smtp/i }).click();
    
    // Check for SMTP configuration elements
    await expect(page.getByText('SMTP Configuration')).toBeVisible();
    await expect(page.getByLabel(/smtp host/i)).toBeVisible();
    await expect(page.getByLabel(/smtp port/i)).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await page.goto('/admin');
    
    // Login
    await page.getByPlaceholder('Enter admin password').fill('admin@2024');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.waitForTimeout(1000);
    
    // Click logout
    await page.getByRole('button', { name: /logout/i }).click();
    
    // Should return to login page
    await expect(page.getByText('Admin Login')).toBeVisible();
  });
});
