class ContactPage {
  constructor(page) {
    this.page = page;

    // Form fields using confirmed IDs from HTML source
    this.fullNameField = page.locator('#name');
    this.emailField = page.locator('#email');
    this.phoneField = page.locator('#phone');
    this.messageField = page.locator('#message');

    // Service is a custom button dropdown
    this.serviceDropdownButton = page.getByRole('button', { name: /select a service/i });

    // Submit button
    this.submitButton = page.getByRole('button', { name: /send message/i });
  }

  async navigate() {
    await this.page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await this.dismissOverlay();
  }

  // Waits for the loading overlay to disappear before interacting
  async dismissOverlay() {
    await this.page.waitForSelector(
      'div.fixed.inset-0[class*="z-[9999]"]',
      { state: 'hidden', timeout: 15000 }
    ).catch(() => {});
  }

  async fillForm(name, email, phone, message) {
    await this.fullNameField.fill(name);
    await this.emailField.fill(email);
    await this.phoneField.fill(phone);
    await this.messageField.fill(message);
  }

  async openServiceDropdown() {
    await this.serviceDropdownButton.click();
    await this.page.waitForTimeout(500);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async isFormVisible() {
    return await this.submitButton.isVisible();
  }
}

module.exports = { ContactPage };