import Puppeteer from 'puppeteer';
import path from 'path';
import { extraService } from './extra';

export class screenshotService {
  static async screenshot(url: string, userId: string, scanId: string, viewPort: string, home: boolean = true) {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await Puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage();
        await page.goto(url, {
          waitUntil: 'networkidle0',
          timeout: 60000,
        });
        const viewport = viewPort.split('x');
        await page.setViewport({
          width: parseInt(viewport[0]),
          height: parseInt(viewport[1]),
        });
        let domain_name = await extraService.fetchDomain(url);
        const screenshot = await page.screenshot({
          path: path.join(__dirname, '..', '..', 'static', userId, scanId, home ? 'home.png' : `${domain_name}.png`),
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

  // static async screenshotBulk(urls: string[], userId: string, scanId: string, viewPort: string) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       for (const url of urls) {
  //         await this.screenshot(url, userId, scanId, viewPort, false)
  //           .then((screenshot) => screenshot)
  //           .catch((err) => {
  //             // TODO: if error, set a default image
  //             console.log(err)
  //           });
  //       }
  //       return resolve('success');
  //     }
  //     catch (error: any) {
  //       return reject(error)
  //     }
  //   })
  // }
}