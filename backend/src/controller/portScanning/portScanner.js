const evilscan = require('evilscan');

let mainScan = async (url, mode) => {

  let options = await optionSelector(url, mode);

  return new Promise((resolve, reject) => {

    new evilscan(options, (err, scan) => {
      let portInfos = []
      if (err) {
        reject(err)
      }
      scan.on('result', (data) => {
        portInfos.push(data)
      })
      scan.on('error', function (err) {
        throw new Error(data.toString());
      });

      scan.on('done', function () {
        // finished !
        
        resolve(portInfos)
      });

      scan.run();
    });
  })
}

let optionSelector = (url, mode) => {
  return new Promise(async (resolve, reject) => {

    if (mode === 'fast') {
      resolve({
        target: `${url}`,
        port: '21, 22, 23, 25, 53, 80, 110, 111, 135, 139, 143, 443, 445, 993, 995, 1723, 3306, 3389, 5900, 8080',
        status: 'TROU',
        banner: true
      })
    }
    else if (mode === 'effective') {
      resolve({
        target: `${url}`,
        port: '1, 3, 7, 9, 13, 17, 19, 21, 22, 23, 25, 26, 37, 53, 79, 80, 81, 82, 88, 100, 106, 110, 111, 113, 119, 135, 139, 143, 144, 179, 199, 254, 255, 280, 311, 389, 427, 443, 445, 464, 465, 497, 513, 515, 543, 544, 548, 554, 587, 593, 625, 631, 636, 646, 787, 808, 873, 902, 990, 993, 995, 1000, 1022, 1024, 1033, 1035, 1041, 1044, 1048, 1050, 1053, 1054, 1056, 1058, 1059, 1064, 1066, 1069, 1071, 1074, 1080, 1110, 1234, 1433, 1494, 1521, 1720, 1723, 1755, 1761, 1801, 1900, 1935, 1998, 2000, 2003, 2005, 2049, 2103, 2105, 2107, 2121, 2161, 2301, 2383, 2401, 2601, 2717, 2869, 2967, 3000, 3001, 3128, 3268, 3306, 3389, 3689, 3690, 3703, 3986, 4000, 4001, 4045, 4899, 5000, 5001, 5003, 5009, 5050, 5051, 5060, 5101, 5120, 5190, 5357, 5432, 5555, 5631, 5666, 5800, 5900, 5901, 6000, 6002, 6004, 6112, 6646, 6666, 7000, 7070, 7937, 7938, 8000, 8002, 8008, 8010, 8031, 8080, 8081, 8443, 8888, 9000, 9001, 9090, 9100, 9102, 9999, 10001, 10010, 32768, 32771, 49152, 49157, 50000',
        status: 'TROU',
        banner: true
      })
    }
    else {
      reject('check if the mode is correct, since its a server side, it wont happen i presume.')
    }
  })
}

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

let mergeAll = async (arr, mode) => {

  // since we need to scan everything, we will get everything from promise all.
  return Promise.all(arr.map( async (url) => {
    // since the port scanner do not take http:// or https://
    // we will remove, if there is any.
    let host = await cleanUrl(url)
    return mainScan(host, mode)
  }))
}

exports.get = mainScan

