class HomePage {
  constructor(page) {
    this.page = page;
    this.pageTitle = 'LS Gumede Attorneys';
    this.logo = page.getByRole('img', { name: /logo/i }).first();
    this.navMenu = page.locator('nav').first();
    this.contactButton = page.getByRole('link', { name: /contact/i }).first();
  }

  async navigate() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.dismissOverlay();
  }

  // Waits for the loading overlay to disappear before interacting
  async dismissOverlay() {
    await this.page.waitForSelector(
      'div.fixed.inset-0[class*="z-[9999]"]',
      { state: 'hidden', timeout: 15000 }
    ).catch(() => {});
  }

  async getTitle() {
    return await this.page.title();
  }

  async isLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    return true;
  }
}

module.exports = { HomePage };