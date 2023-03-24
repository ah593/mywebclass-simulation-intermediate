// lighthouse.test.js
const { chromium } = require('playwright');

describe('Lighthouse score optimization', () => {
  let browser, context, page;

  beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    // Navigate to the website being tested
    await page.goto('http://localhost:3000');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Lighthouse performance score is greater than or equal to 0.8', async () => {
    const lighthouseResults = await page.evaluate(() => {
      return window.__lighthouse;
    });
    expect(lighthouseResults.categories.performance.score).toBeGreaterThanOrEqual(0.8);
  });
});
