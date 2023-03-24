const { chromium } = require('playwright');

describe('GDPR Compliance Test', () => {
  let browser;
  let context;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Page should have GDPR cookie', async () => {
    await page.goto('http://localhost:3000');

    const gdprCookieExists = await page.evaluate(() => {
      return document.cookie.includes('gdpr=true');
    });

    expect(gdprCookieExists).toBe(true);
  });
});
