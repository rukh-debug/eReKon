// imports every javascript scripts to create a single app
const subdomains = require('./findomainHander.js');
const validUrl = require('../tools/httprobe/goProbe.js')
const screenCapture = require('./screenShotFiles/captureWeb.js')
const waybackurl = require('./waybackurl.js')
const serverVer = require('./serverVersion.js')
const urlInValid = require('./urlInValid.js')
const portNdetails = require('./portScanning/detailer.js')
//const extract = require('./screenShotFiles/grabLinks.js')
const wappalizer = require('./versionScan/detailer.js')
const headerData = require('./scraping/scrapTitles.js')
const fse = require('fs-extra')
const progress = require('./progress')
const { isValidObjectId } = require('mongoose');

let compileToList = (data, headerInfo) => {

  return new Promise(async (res, rej) => {
    let list = []
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      let individualData = data[`${i}`]
      let individual = {
        id: i,
        scanType: "fast",
        url: individualData[`url`],
        port: individualData[`port`],
        ip: individualData[`ip`],
        tech: individualData[`tech`],
        status: individualData[`status`]
      }

      for (let j = 0; j < headerInfo.length; j++) {
        if (headerInfo[j] !== undefined) {
          let theObj = headerInfo[j]
          if (theObj[`url`] === individualData[`url`]) {
            individual[`contentLength`] = headerInfo[j][`contentLength`]
            individual[`pageTitle`] = headerInfo[j][`pageTitle`]
          }
        }
      }
      list.push(individual)
    }
    res(list)
  })
}



let domainsInfoFast = async (url, uuid, folderNum) => {


  await progress.start(uuid, folderNum)
  await progress.update(uuid, `Scanning Subdomains(1/7)`, 20, folderNum)

  //use finddomain bin file to scan all the doamins, returns nothing, creates a text file with subdomains.
  console.log(`[Subdomains]: Gathering subdomains`)

  await subdomains.get(url);
  //filtering valid

  progress.update(uuid, `HTTProbe (2/7)`, 30, folderNum)
  console.log(`[HTTProbe]: Httprober probing`)
  let validUrls = await validUrl.prober()

  // scan every 200 status code url with top 20 ports

  progress.update(uuid, `Scanning Ports (3/7)`, 45, folderNum)
  console.log(`[Port]: Gathering Port`)
  let portMixed = await portNdetails.get(validUrls, 'fast')
  //get all the tech info from wappalizer

  progress.update(uuid, `Scanning Versions (4/7)`, 60, folderNum)
  console.log(`[Wappalizer]: Gathering Versions`)
  let mixWithVersion = await wappalizer.getAndMerge(validUrls, portMixed)

  // header informations
  progress.update(uuid, `Getting headers (5/7)`, 80, folderNum)
  let headerInfo = await headerData.get(validUrls)

  //capturing webpages
  progress.update(uuid, `Capturing webPages (6/7)`, 90, folderNum)
  console.log(`[Capture]: Capturing Pages`)
  await screenCapture.convert(validUrls, uuid, folderNum);


  // putting it to list
  progress.update(uuid, `Compiling Everything (7/7)`, 99, folderNum)
  let result = await compileToList(mixWithVersion, headerInfo)
  // after all the above tasks are complete returns the below object
  progress.update(uuid, `Scan Complete`, `100`, folderNum)
  return result
}

// unused
let serverInfo = async (url) => {
  // get server's version from header
  let info = await serverVer.get(url)
  return info
}

// unused
let wayback = async (url) => {
  // hit wayback machine's api and get all the endpoints and archived urls
  let urls = await waybackurl.find(url)
  return {
    wayback: urls
  }
}
 
// used in router
let okUrl = async (url) => {
  // check if the given url is valid or not
  let getStatus = await urlInValid.status(url)
  return getStatus
}

// creating folder on id creation
let folderCreator = async (uuid) => {
  let path = `${__dirname}/../../static/img/${uuid}`
  fse.ensureDirSync(path)
}

// exports every function to be used in routes.js for later use. 
// its a riddle. Sorry i didnt knew about other way of exporting
// while I created this tool
exports.urlOk = okUrl
exports.fastDomains = domainsInfoFast
exports.wbfind = wayback
exports.getVer = serverInfo
exports.folderCreator = folderCreator