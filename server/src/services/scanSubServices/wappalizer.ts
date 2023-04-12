// @ts-nocheck
import Wappalyzer from 'wappalyzer';

const options = {
  debug: false,
  delay: 500,
  Headers: {},
  maxDepth: 3,
  maxUrls: 10,
  maxWait: 5000,
  recursive: true,
  probe: false,
  userAgent: 'Wappalyzer',
  htmlMaxCols: 2000,
  htmlMaxRows: 2000,
}

export class wappalyzerService {
  static async fetchDetails(url: string) {
    return new Promise((resolve, reject) => {
      try {
        const wappalyzer = new Wappalyzer(options);
        wappalyzer.init().then(() => {
          wappalyzer.open(url).then((driver: any) => {
            driver.analyze().then(async (result: any) => {
              await wappalyzer.destroy();
              let finalResult = []
              if (result.technologies.length !== 0) {
                for (const item of result.technologies) {
                  finalResult.push({
                    name: item.name,
                    description: item.description,
                    slug: item.slug,
                    confidence: item.confidence,
                    version: item.version,
                    website: item.website,
                    // categories: item.categories,
                  })
                }
              }
              return resolve(finalResult);
            });
          });
        });
      } catch (error: any) {
        return reject(error)
      }
    })
  }
}
