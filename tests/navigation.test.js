const { test, expect } = require('@playwright/test');
const { NavigationPage } = require('../pages/NavigationPage');

test.describe('LS Gumede Attorneys - Navigation Tests', () => {

  test('About page loads with correct title', async ({ page }) => {
    const navPage = new NavigationPage(page);
    await navPage.navigate();
    await navPage.clickAbout();
    const title = await navPage.getTitle();
    expect(title).toContain('About LS Gumede Attorneys');
  });

  test('Services section loads when clicking Services link', async ({ page }) => {
    const navPage = new NavigationPage(page);
    await navPage.navigate();
    await navPage.clickServices();
    await expect(navPage.servicesHeading).toBeVisible();
  });

  test('Contact page loads with correct URL', async ({ page }) => {
    const navPage = new NavigationPage(page);
    await navPage.navigate();
    await navPage.clickContact();
    const url = await navPage.getCurrentUrl();
    expect(url).toContain('contact');
  });

});