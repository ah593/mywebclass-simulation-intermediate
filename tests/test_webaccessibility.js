// accessibility.test.js
const { chromium } = require('playwright');

describe('Web accessibility', () => {
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

  test('No accessibility issues are found', async () => {
    await page.waitForLoadState('networkidle');
    const accessibilityResults = await page.accessibility.check();
    expect(accessibilityResults).toHaveLength(0);
  });
});
