// imports every javascript scripts to create a single app
const subdomains = require("./findomainHander.js");
const validUrl = require("../tools/httprobe/goProbe.js");
const screenCapture = require("./screenShotFiles/captureWeb.js");
const waybackurl = require("./waybackurl.js");
const serverVer = require("./serverVersion.js");
const urlInValid = require("./urlInValid.js");
const portNdetails = require("./portScanning/detailer.js");
//const extract = require('./screenShotFiles/grabLinks.js')
const wappalizer = require("./versionScan/detailer.js");
const headerData = require("./scraping/scrapTitles.js");
const fse = require("fs-extra");
const { isValidObjectId } = require("mongoose");

const { domainBrute } = require('../tools/gobust/gobusterHandler')
const socketService = require('../../index')

let compileToList = (data, headerInfo, scanType) => {
  return new Promise(async (res, rej) => {
    let list = [];
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let individualData = data[`${i}`];
      let individual = {
        id: i,
        scanType: scanType,
        url: individualData[`url`],
        port: individualData[`port`],
        ip: individualData[`ip`],
        tech: individualData[`tech`],
        status: individualData[`status`],
      };

      for (let j = 0; j < headerInfo.length; j++) {
        if (headerInfo[j] !== undefined) {
          let theObj = headerInfo[j];
          if (theObj[`url`] === individualData[`url`]) {
            individual[`contentLength`] = headerInfo[j][`contentLength`];
            individual[`pageTitle`] = headerInfo[j][`pageTitle`];
          }
        }
      }
      list.push(individual);
    }
    res(list);
  });
};

let domainsInfoFast = async (url, roomName, folderNum, uuid, scanType) => {
  await socketService.socketService('progress', { what: "Subdomains(1/7)", per: 20 }, roomName)

  //use finddomain bin file to scan all the doamins, returns nothing, creates a text file with subdomains.
  await subdomains.get(url);
  if (scanType === 'effective') {
    await domainBrute(url, uuid)
  }
  //filtering valid

  await socketService.socketService('progress', { what: "HTTProbe(2/7)", per: 20 }, roomName)
  let validUrls = await validUrl.prober();

  // scan every 200 status code url with top 20 ports
  await socketService.socketService('progress', { what: "Scanning Ports (3/7)", per: 45 }, roomName)
  let portMixed = await portNdetails.get(validUrls, scanType);

  //get all the tech info from wappalizer
  await socketService.socketService('progress', { what: "Scanning Versions (4/7)", per: 60 }, roomName)
  let mixWithVersion = await wappalizer.getAndMerge(validUrls, portMixed);

  // header informations
  await socketService.socketService('progress', { what: "Getting headers (5/7)", per: 80 }, roomName)
  let headerInfo = await headerData.get(validUrls);

  //capturing webpages
  await socketService.socketService('progress', { what: "Capturing webPages (6/7)", per: 90 }, roomName)
  await screenCapture.convert(validUrls, uuid, folderNum);

  // putting it to list
  await socketService.socketService('progress', { what: "Compiling Everything (7/7)", per: 98 }, roomName)
  let result = await compileToList(mixWithVersion, headerInfo, scanType);
  // after all the above tasks are complete returns the below object
  await socketService.socketService('progress', { what: "Scan Complete", per: 100 }, roomName)
  return result;

};

// unused
let serverInfo = async (url) => {
  // get server's version from header
  let info = await serverVer.get(url);
  return info;
};

// unused
let wayback = async (url) => {
  // hit wayback machine's api and get all the endpoints and archived urls
  let urls = await waybackurl.find(url);
  return {
    wayback: urls,
  };
};

// used in router
let okUrl = async (url) => {
  // check if the given url is valid or not
  let getStatus = await urlInValid.status(url);
  return getStatus;
};

// creating folder on id creation
let folderCreator = async (uuid) => {
  let path = `${__dirname}/../../static/img/${uuid}`;
  fse.ensureDirSync(path);
};

// exports every function to be used in routes.js for later use.
// its a riddle. Sorry i didnt knew about other way of exporting
// while I created this tool
exports.urlOk = okUrl;
exports.fastDomains = domainsInfoFast;
exports.wbfind = wayback;
exports.getVer = serverInfo;
exports.folderCreator = folderCreator;
