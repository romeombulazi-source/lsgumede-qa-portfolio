const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../pages/ContactPage');

test.describe('LS Gumede Attorneys - Contact Form Tests', () => {

  test('Contact form is visible on the page', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.navigate();
    const visible = await contactPage.isFormVisible();
    expect(visible).toBe(true);
  });

  test('All form fields are present', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.navigate();
    await expect(contactPage.fullNameField).toBeVisible();
    await expect(contactPage.emailField).toBeVisible();
    await expect(contactPage.phoneField).toBeVisible();
    await expect(contactPage.messageField).toBeVisible();
    await expect(contactPage.serviceDropdownButton).toBeVisible();
  });

  test('Form fields accept valid input', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.navigate();
    await contactPage.fillForm(
      'Test User',
      'testuser@example.com',
      '0821234567',
      'This is a test message for portfolio purposes.'
    );
    await expect(contactPage.fullNameField).toHaveValue('Test User');
    await expect(contactPage.emailField).toHaveValue('testuser@example.com');
    await expect(contactPage.phoneField).toHaveValue('0821234567');
    await expect(contactPage.messageField).toHaveValue('This is a test message for portfolio purposes.');
  });

  test('Service dropdown button is interactive', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.navigate();
    await expect(contactPage.serviceDropdownButton).toBeVisible();
    await expect(contactPage.serviceDropdownButton).toBeEnabled();
    await contactPage.openServiceDropdown();
    await expect(contactPage.serviceDropdownButton).toBeVisible();
  });

  test('Submit button is enabled', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.navigate();
    await expect(contactPage.submitButton).toBeEnabled();
  });

});