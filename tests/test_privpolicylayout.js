test('Privacy policy content and layout', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000');
  
    // Verify that the privacy policy link exists
    const privacyPolicyLink = await page.$('a[href="/privacy-policy"]');
    expect(privacyPolicyLink).not.toBeNull();
  
    // Click the privacy policy link and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      privacyPolicyLink.click(),
    ]);
  
    // Verify that the privacy policy content exists
    const privacyPolicyContent = await page.$('.privacy-policy-content');
    expect(privacyPolicyContent).not.toBeNull();
  
    // Verify that the privacy policy content is in the correct location
    const contentLayout = await page.$('.content-layout');
    expect(contentLayout).not.toBeNull();
    expect(await contentLayout.$$('div')).toEqual([privacyPolicyContent]);
  
    await browser.close();
  });
  