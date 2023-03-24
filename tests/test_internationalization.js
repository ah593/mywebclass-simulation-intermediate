// internationalization.test.js
const { chromium } = require('playwright');

describe('Internationalization', () => {
  let browser, context, page;

  beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    // Navigate to the website being tested
    await page.goto('http://localhost:3000');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Language attribute is set to "en"', async () => {
    const language = await page.evaluate(() => {
      return document.documentElement.getAttribute('lang');
    });
    expect(language).toBe('en');
  });
});
