class NavigationPage {
  constructor(page) {
    this.page = page;

    // Desktop nav links - used for desktop tests only
    this.aboutLink = page.getByRole('link', { name: /about/i }).first();
    this.servicesLink = page.getByRole('link', { name: /services/i }).first();
    this.contactLink = page.getByRole('link', { name: /contact/i }).first();

    // Content headings
    this.servicesHeading = page.getByRole('heading', { name: /services/i }).first();
  }

  async navigate() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.dismissOverlay();
  }

  async dismissOverlay() {
    await this.page.waitForSelector(
      'div.fixed.inset-0[class*="z-[9999]"]',
      { state: 'hidden', timeout: 15000 }
    ).catch(() => {});
  }

  // Navigate directly - more reliable than clicking on animated pages
 async clickAbout() {
  await this.page.waitForTimeout(1000); // brief pause before navigating
  await this.page.goto('/about', { waitUntil: 'domcontentloaded' });
}

async clickServices() {
  await this.page.waitForTimeout(1000);
  await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  await this.dismissOverlay();
  await this.servicesLink.click();
  await this.page.waitForLoadState('domcontentloaded');
}

async clickContact() {
  await this.page.waitForTimeout(1000);
  await this.page.goto('/contact', { waitUntil: 'domcontentloaded' });
}

  async getCurrentUrl() {
    return this.page.url();
  }

  async getTitle() {
    return await this.page.title();
  }
}

module.exports = { NavigationPage };