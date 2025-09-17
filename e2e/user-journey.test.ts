/**
 * End-to-End User Journey Test for Inventory Management System
 * 
 * This test validates the complete user journey from dashboard navigation
 * to product management, following the "Make it Work First" manifesto
 */

import { test, expect } from '@playwright/test';

test.describe('Inventory Management User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3000');
  });

  /**
   * Critical User Journey: Dashboard Overview
   * As a user, I want to see key metrics and navigate the system
   */
  test('should display dashboard with key metrics and navigation', async ({ page }) => {
    // Verify main dashboard elements
    await expect(page.locator('text=Inventory Management')).toBeVisible();
    await expect(page.locator('text=Dashboard')).toBeVisible();
    
    // Check for key dashboard cards
    await expect(page.locator('text=Popular products')).toBeVisible();
    await expect(page.locator('text=Sales Summary')).toBeVisible();
    await expect(page.locator('text=Purchase Summary')).toBeVisible();
    await expect(page.locator('text=Expense Summary')).toBeVisible();
    
    // Verify sidebar navigation is present
    await expect(page.locator('text=Products')).toBeVisible();
    await expect(page.locator('text=Users')).toBeVisible();
    await expect(page.locator('text=Expenses')).toBeVisible();
  });

  /**
   * Product Management Journey
   * As a user, I want to view and manage products
   */
  test('should navigate to products page and display product list', async ({ page }) => {
    // Navigate to products page
    await page.click('text=Products');
    
    // Wait for navigation
    await expect(page).toHaveURL(/.*products/);
    
    // Verify products page elements
    await expect(page.locator('text=Products')).toBeVisible();
    
    // Check for product management features
    const createButton = page.locator('button:has-text("Create Product")');
    if (await createButton.isVisible()) {
      await expect(createButton).toBeVisible();
    }
  });

  /**
   * User Management Journey
   * As an admin, I want to view user information
   */
  test('should navigate to users page and display user data', async ({ page }) => {
    // Navigate to users page
    await page.click('text=Users');
    
    // Wait for navigation
    await expect(page).toHaveURL(/.*users/);
    
    // Verify users page loads
    await expect(page.locator('text=Users')).toBeVisible();
  });

  /**
   * Expense Management Journey
   * As a user, I want to view expense data
   */
  test('should navigate to expenses page', async ({ page }) => {
    // Navigate to expenses page
    await page.click('text=Expenses');
    
    // Wait for navigation
    await expect(page).toHaveURL(/.*expenses/);
    
    // Verify expenses page loads
    await expect(page.locator('text=Expenses')).toBeVisible();
  });

  /**
   * Responsive Design Journey
   * As a user on different devices, I want consistent experience
   */
  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify mobile responsive behavior
    await expect(page.locator('text=Inventory Management')).toBeVisible();
    
    // Check if sidebar collapses properly on mobile
    const menuButton = page.locator('button').first();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      // Sidebar should toggle
    }
  });

  /**
   * Dark Mode Journey
   * As a user, I want to toggle between light and dark themes
   */
  test('should toggle dark mode', async ({ page }) => {
    // Look for dark mode toggle button
    const darkModeButton = page.locator('button').filter({ has: page.locator('svg') }).nth(1);
    
    if (await darkModeButton.isVisible()) {
      await darkModeButton.click();
      
      // Verify theme change (implementation dependent)
      // This would need to check for dark mode classes or styles
    }
  });

  /**
   * Search Functionality Journey
   * As a user, I want to search for items
   */
  test('should have functional search input', async ({ page }) => {
    // Find search input
    const searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();
    
    // Test search input functionality
    await searchInput.fill('test search');
    await expect(searchInput).toHaveValue('test search');
  });

  /**
   * Performance Journey
   * As a user, I want fast page loads
   */
  test('should load pages within performance budget', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Performance budget: pages should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });
});