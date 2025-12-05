import puppeteer from 'puppeteer';
import { JSDOM } from "jsdom";

export async function generateImageFromHTML(domNode, width, height) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.log(width, height);

  const page = await browser.newPage();
  await page.setViewport({ 
    width, 
    height 
  });
  const html = domNode.serialize();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: './output/output.png' });

  await browser.close();
}
