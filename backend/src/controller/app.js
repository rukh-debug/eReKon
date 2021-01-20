// imports every javascript scripts to create a single app
const subdomains = require('./findomainHander.js');
const validUrl = require('../tools/httprobe/goProbe.js')
const screenCapture = require('./screenShotFiles/captureWeb.js')
const dirFlush = require('./screenShotFiles/screenShotFlush.js')
const waybackurl = require('./waybackurl.js')
const serverVer = require('./serverVersion.js')
const urlInValid = require('./urlInValid.js')
const portNdetails = require('./portScanning/detailer.js')
const extract = require('./screenShotFiles/grabLinks.js')
const wappalizer = require('./versionScan/detailer.js')
const headerData = require('./scraping/scrapTitles.js')
const zipper = require('./zipper.js');

let compileToList = (data, headerInfo) => {

  return new Promise( async (res, rej) => {
    let list = []
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      let individualData = data[`${i}`]
      let individual = {
        id: i,
        url: individualData[`url`],
        port: individualData[`port`],
        ip: individualData[`ip`],
        tech: individualData[`tech`],
      }

      for (let j = 0; j < headerInfo.length; j++) {
        if (headerInfo[j] !== undefined) {
          let theObj = headerInfo[j]
          if (theObj[`url`] === individualData[`url`]) {
            individual[`contentLength`] = headerInfo[j][`contentLength`]
            individual[`status`] = headerInfo[j][`status`]
            individual[`pageTitle`] = headerInfo[j][`pageTitle`]
          }
        }
      }
      list.push(individual)
    }
    res(list)
    await zipper.zip(list)
  })
}

let progressL = 'IDLE'
let progressP = 5

let domainsInfoFast = async (url) => {

  //flush everything on screenshot folder before starting anything.
  dirFlush.flush()
  //dirFlush.flush2()
  progressP = 10
  progressL = '(1/8) Folder Flushed'

  //use finddomain bin file to scan all the doamins, returns nothing, creates a text file with subdomains.
  console.log(`[Subdomains]: Gathering subdomains`)

  progressP = 25
  progressL = '(2/8) Scanning Subdomains'
  await subdomains.get(url);

  //filtering valid
  progressP = 40
  progressL = '(3/8) Checking Validity'
  console.log(`[HTTProbe]: Httprober probing`)
  let validUrls = await validUrl.prober()

  // scan every 200 status code url with top 20 ports
  progressP = 50
  progressL = '(4/8) Scanning Ports'
  console.log(`[Port]: Gathering Port`)
  let portMixed = await portNdetails.get(validUrls, 'fast')
  //get all the tech info from wappalizer

  progressP = 70
  progressL = '(5/8) Scanning Technelogies'
  console.log(`[Wappalizer]: Gathering Versions`)
  let mixWithVersion = await wappalizer.getAndMerge(validUrls, portMixed)

  // header informations
  progressP = 80
  progressL = '(6/8) Scanning Header Information'
  let headerInfo = await headerData.get(validUrls)
  
  //capturing webpages
  progressP = 90
  progressL = '(7/8) Capturing Webpages'
  console.log(`[Capture]: Capturing Pages`)
  await screenCapture.convert(validUrls);

  progressP = 98
  progressL = '(8/8) Compiling Everything'
  //await screenCapture.copyFiles()
  // putting it to list
  let result = await compileToList(mixWithVersion, headerInfo)
  // after all the above tasks are complete returns the below object
  return result
}

let progressBar = () =>{
  return {
    progressP,
    progressL
  }
}


let serverInfo = async (url) => {
  // get server's version from header
  let info = await serverVer.get(url)
  return info
}

let wayback = async (url) => {
  // hit wayback machine's api and get all the endpoints and archived urls
  let urls = await waybackurl.find(url)
  return {
    wayback: urls
  }
}

let okUrl = async (url) => {
  // check if the given url is valid or not
  let getStatus = await urlInValid.status(url)
  return getStatus
}

// exports every function to be used in routes.js for later use. 
exports.urlOk = okUrl
exports.fastDomains = domainsInfoFast
exports.wbfind = wayback
exports.getVer = serverInfo
exports.progress = progressBar