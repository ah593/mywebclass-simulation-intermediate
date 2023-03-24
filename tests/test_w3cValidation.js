const { chromium } = require('playwright');

describe('W3C Validation Test', () => {
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

  test('Page should pass W3C validation', async () => {
    await page.goto('http://localhost:3000');

    const w3cValidationResults = await page.evaluate(() => {
      return fetch('https://validator.w3.org/nu/?out=json', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html'
        },
        body: document.documentElement.outerHTML
      })
        .then(response => response.json())
        .then(data => {
          return data.messages.filter(message => message.type === 'error');
        });
    });

    expect(w3cValidationResults).toHaveLength(0);
  });
});
