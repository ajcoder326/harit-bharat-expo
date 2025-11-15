import { test, expect } from '@playwright/test';

const API_URL = 'http://localhost:5000/api';

test.describe('Backend API', () => {
  test('should get API status from root', async ({ request }) => {
    const response = await request.get('http://localhost:5000/');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.message).toBe('Harit Bharat Expo API Server');
    expect(data.status).toBe('running');
    expect(data.endpoints).toBeDefined();
  });

  test('should get registrations list', async ({ request }) => {
    const response = await request.get(`${API_URL}/registrations`);
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test('should create a new registration', async ({ request }) => {
    const testData = {
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '+91 9999999999'
    };
    
    const response = await request.post(`${API_URL}/registrations`, {
      data: testData
    });
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.success).toBeTruthy();
    expect(data.registration).toBeDefined();
    expect(data.registration.fullName).toBe(testData.fullName);
  });

  test('should get SMTP config', async ({ request }) => {
    const response = await request.get(`${API_URL}/smtp-config`);
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.host).toBeDefined();
    expect(data.port).toBeDefined();
    expect(data.authConfigured).toBeDefined();
  });

  test('should reject registration with missing fields', async ({ request }) => {
    const testData = {
      fullName: 'Test User',
      // Missing email and phone
    };
    
    const response = await request.post(`${API_URL}/registrations`, {
      data: testData
    });
    
    expect(response.status()).toBe(400);
  });
});
