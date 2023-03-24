// google-analytics.test.js
const { chromium } = require('playwright');

describe('Google Analytics Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Google Analytics installed', async () => {
    const googleAnalyticsExists = await page.evaluate(() => {
      return !!window.ga;
    });

    expect(googleAnalyticsExists).toBe(true);
  });
});
