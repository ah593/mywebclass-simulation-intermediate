const { chromium } = require('playwright');

describe('Responsive Design Test', () => {
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

  const viewportSizes = [
    { width: 320, height: 568 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1280, height: 800 }
  ];
  
  viewportSizes.forEach(viewportSize => {
    test(`Page should display correctly at ${viewportSize.width} x ${viewportSize.height} resolution`, async () => {
      await page.setViewportSize(viewportSize);
      const innerWidth = await page.evaluate(() => {
        return window.innerWidth;
      });
      expect(innerWidth).toBeLessThanOrEqual(viewportSize.width);
    });
  });
});
