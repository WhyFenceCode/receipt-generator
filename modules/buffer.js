import puppeteer from 'puppeteer';

export async function generateImageFromHTML(domNode, width, height) {
  const html = domNode.outerHTML;
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.log(width, height);

  const page = await browser.newPage();
  await page.setViewport({ 
    width: Math.floor(width), 
    height: Math.floor(height) 
  });
  await page.setContent(html);
  await page.screenshot({ path: 'test.png' });

  await browser.close();
}
