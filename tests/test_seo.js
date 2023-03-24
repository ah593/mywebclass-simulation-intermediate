// seo.test.js
const { chromium } = require('playwright');

describe('SEO Test', () => {
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

  test('has title and meta description', async () => {
    const seoResults = await page.evaluate(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      const title = document.querySelector('title');
      return {
        hasMetaDescription: !!metaDescription,
        hasTitle: !!title && !!title.textContent.trim(),
        titleLength: title?.textContent?.length,
        metaDescriptionLength: metaDescription?.getAttribute('content')?.length,
        hasCanonicalLink: !!document.querySelector('link[rel="canonical"]')
      };
    });

    expect(seoResults.hasMetaDescription).toBe(true);
    expect(seoResults.hasTitle).toBe(true);
    expect(seoResults.titleLength).toBeLessThanOrEqual(70);
    expect(seoResults.metaDescriptionLength).toBeLessThanOrEqual(155);
    expect(seoResults.hasCanonicalLink).toBe(true);
  });
});
