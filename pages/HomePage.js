class HomePage {
  constructor(page) {
    this.page = page;
    this.pageTitle = 'LS Gumede Attorneys';
    this.url = 'https://www.lsgumedeattorneys.co.za';
    this.logo = page.locator('img[alt*="logo"], img[alt*="Logo"]');
    // Target desktop nav specifically
    this.navMenu = page.locator('nav').first();
    this.contactButton = page.locator('a[href*="contact"]');
  }

  async navigate() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
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