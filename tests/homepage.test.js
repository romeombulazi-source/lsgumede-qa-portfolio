const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('LS Gumede Attorneys - Homepage Tests', () => {

  test('Homepage loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    const loaded = await homePage.isLoaded();
    expect(loaded).toBe(true);
  });

  test('Page title is correct', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    const title = await homePage.getTitle();
    expect(title).toContain(homePage.pageTitle);
  });

  test('Navigation menu is visible on desktop', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    const isMobile = page.viewportSize()?.width < 768;
    if (!isMobile) {
      await expect(homePage.navMenu).toBeVisible();
    } else {
      const hamburger = page.locator('button').filter({ has: page.locator('svg') }).first();
      await expect(hamburger).toBeVisible();
    }
  });

});