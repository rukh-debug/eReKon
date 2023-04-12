import Puppeteer from 'puppeteer';
import path from 'path';

export class puppeteerService {
  static async screenshot(url: string, userId: string, scanId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await Puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const screenshot = await page.screenshot({
          // set path to static folder in format userid/scanid/default.png
          // const dir = path.join(__dirname, '..', 'static', user._id.toString(), scan._id.toString());
          path: path.join(__dirname, '..', '..', '..', 'static', userId, scanId, 'default.png'),
          fullPage: false,
        });
        await browser.close();
        return resolve(screenshot);
      }
      catch (error: any) {
        return reject(error)
      }
    })
  }

  static async screenShotBulk(urls: string[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await Puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        let screenshots: any[] = []
        for (let url of urls) {
          await page.goto(url, { waitUntil: 'networkidle2' });
          const screenshot = await page.screenshot({ fullPage: true });
          screenshots.push(screenshot)
        }
        await browser.close();
        return resolve(screenshots);
      }
      catch (error: any) {
        return reject(error)
      }
    })
  }
}