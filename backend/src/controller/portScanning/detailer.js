// this files uses the real port scanner
// then the data given by port scanner is kept in better format for api
const portScan = require("./portScanner.js");

let linksArrAndEverything = (array, mode) => {
  return new Promise(async (resolve, reject) => {
    let fullInfo = {}
    for (let i = 0; i < array.length - 1; i++) {
      let info = {}
      let url = array[i]
      info['url'] = url // adds the url inside the info tab
      let host = await cleanUrl(url)
      let portInfo = await portScan.get(host, mode)
      info['ip'] = portInfo[0]['ip'] //added ip address in fullinfo
      let open = {}
      for (let j = 0; j < portInfo.length; j++) {
        if (portInfo[j]['status'] === 'open') {
          let banner = portInfo[j]['banner']
          let port = portInfo[j][`port`]
          open[`${port}`] = banner
        }
        info['port'] = open
      }
      fullInfo[i] = info
    }
    resolve(fullInfo);
  });
};
let cleanUrl = (url) => {
  return new Promise((resolve) => {

    if (url.includes('http://')) {
      url = url.replace('http://', '')
      resolve(url)
    }
    else if (url.includes('https://')) {
      url = url.replace('https://', '')
      resolve(url)
    }
    else {
      resolve(url)
    }

  })
}
exports.get = linksArrAndEverything

