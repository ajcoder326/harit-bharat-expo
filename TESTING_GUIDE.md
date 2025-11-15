# 🧪 Playwright Testing Guide

## Test Files Created

```
tests/
├── registration.spec.ts   - Tests for registration form
├── admin.spec.ts          - Tests for admin panel
└── api.spec.ts            - Tests for backend API
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests with UI Mode (Recommended)
```bash
npm run test:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

### View Test Report
```bash
npm run test:report
```

### Run Specific Test File
```bash
npx playwright test tests/registration.spec.ts
```

## Test Coverage

### Registration Form Tests (`registration.spec.ts`)
✅ Load registration page
✅ Show validation error for empty form
✅ Successfully submit registration
✅ Display event details in header
✅ Display event info section

### Admin Panel Tests (`admin.spec.ts`)
✅ Show login page
✅ Reject invalid password
✅ Login with correct password
✅ Display registrations tab after login
✅ Display SMTP settings tab
✅ Logout successfully

### Backend API Tests (`api.spec.ts`)
✅ Get API status from root
✅ Get registrations list
✅ Create a new registration
✅ Get SMTP config
✅ Reject registration with missing fields

## Prerequisites

Before running tests, make sure:
1. **Backend server is running**: `node server-simple.js`
2. **Frontend is running**: `npm run dev` (or test will start it automatically)

## Test Configuration

Tests are configured in `playwright.config.ts`:
- Base URL: http://localhost:8080
- Browser: Chromium
- Screenshots: On failure
- Trace: On first retry
- Reporter: HTML

## Quick Test

To quickly test everything:

```bash
# Terminal 1: Start backend
node server-simple.js

# Terminal 2: Run tests
npm test
```

## Test Results

After running tests, open the HTML report:
```bash
npm run test:report
```

This will open a browser with detailed test results, screenshots, and traces.

## Writing New Tests

Example test structure:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Something')).toBeVisible();
  });
});
```

## Troubleshooting

### Tests failing?
- Check backend is running on port 5000
- Check frontend is running on port 8080
- Clear browser cache: `npx playwright clean`

### Slow tests?
- Run in headless mode (default)
- Run specific test files instead of all tests

### Need to debug?
- Use `npm run test:ui` for interactive debugging
- Add `await page.pause()` in test to pause execution

---

**Happy Testing! 🎯**
