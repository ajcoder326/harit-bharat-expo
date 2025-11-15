import { test, expect } from '@playwright/test';

test.describe('Registration Form', () => {
  test('should load the registration page', async ({ page }) => {
    await page.goto('/');
    
    // Check if page title contains Harit Bharat Expo
    await expect(page.locator('h1')).toContainText('Harit Bharat Expo');
    
    // Check if form elements are visible
    await expect(page.getByPlaceholder('Enter your full name')).toBeVisible();
    await expect(page.getByPlaceholder('your.email@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('+91 98765 43210')).toBeVisible();
  });

  test('should show validation error for empty form', async ({ page }) => {
    await page.goto('/');
    
    // Click submit without filling form
    await page.getByRole('button', { name: /complete registration/i }).click();
    
    // Should show validation message
    await expect(page.getByText(/incomplete form/i)).toBeVisible({ timeout: 3000 });
  });

  test('should successfully submit registration', async ({ page }) => {
    await page.goto('/');
    
    // Fill in the form
    await page.getByPlaceholder('Enter your full name').fill('John Doe');
    await page.getByPlaceholder('your.email@example.com').fill('john@example.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+91 9876543210');
    
    // Submit the form
    await page.getByRole('button', { name: /complete registration/i }).click();
    
    // Check for success message
    await expect(page.getByText(/registration successful/i)).toBeVisible({ timeout: 5000 });
  });

  test('should display event details in header', async ({ page }) => {
    await page.goto('/');
    
    // Check event details
    await expect(page.getByText('Nov 21-23, 2024')).toBeVisible();
    await expect(page.getByText('Jodhpur, Rajasthan')).toBeVisible();
  });

  test('should display event info section below form', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to event details section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check event info cards
    await expect(page.getByText('Join India\'s Largest')).toBeVisible();
    await expect(page.getByText('Solar & Clean Energy Event')).toBeVisible();
    await expect(page.getByText('35,000+ Visitors')).toBeVisible();
  });
});
