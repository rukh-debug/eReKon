const Wappalyzer = require('wappalyzer');


let getTech = (url) => {

  return new Promise((resolve, reject) => {
    const options = {
      debug: false,
      delay: 500,
      headers: {},
      maxDepth: 1,
      maxUrls: 10,
      maxWait: 10000,
      recursive: true,
      probe: true,
      userAgent: 'Wappalyzer',
      htmlMaxCols: 2000,
      htmlMaxRows: 2000,
    };

    ; (async function () {
      const wappalyzer = await new Wappalyzer(options)

      try {
        await wappalyzer.init()

        // Optionally set additional request headers
        const headers = {}

        const site = await wappalyzer.open(url, headers)
        
        // Optionally capture and output errors
        site.on('error', console.error)

        const results = await site.analyze()

        let result = JSON.stringify(results, null, 2)
        resolve(result)
      } catch (error) {
        console.error(error)
        reject(error)
      }

      await wappalyzer.destroy()
    })()
  })
}
exports.get = getTech
