const cp = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');
const { resolve } = require('wappalyzer/wappalyzer');

let executeFile = (url, wrdList) => {
  return new Promise(async (resolve, reject) => {
    await cp.execFile(`${__dirname}/gobuster`, ['dns', '-d', `${url}`, `-o`, `${__dirname}/subdomains.txt`, `-w`, `${wrdList}`], (error, stdout, stderr) => {
      if (error) {
        console.log(`stderr: ${stderr}`);
        console.log(error.message)
      }
      else {
        let fileName = `${__dirname}/subdomains.txt`
        fs.readFile(fileName, 'utf8', async (err, data) => {
          if (err) {
            reject({ message: err.message })
          }
          data = data.replace(/Found: /g, "");
          
          let theArr = data.split('\n')
          let findomainArr = await grabFindomain()
          let finalArr = await merge2array(theArr, findomainArr)

          let writingBackToFile = finalArr.join('\n')
          fs.writeFileSync(`${__dirname}/../subdomains.txt`, writingBackToFile, 'utf8');

          resolve('done')
        })
      }
    })
  })
}

// also grab findomain's subdomains
let grabFindomain = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/../subdomains.txt`, 'utf8', (err, data) => {
      if (err) {
        reject({ error: err.message })
      }
      data = data.split('\n')
      resolve(data)
    })
  })
}

let merge2array = async (arr1, arr2) => {
  return new Promise((resolve, reject) => {
    let newArr = arr1.concat(arr2)
    newArr = [...new Set(newArr)]
    newArr = newArr.filter(Boolean)
    resolve(newArr)
  })
}

let domainBrute = async (url, uuid) => {
  return new Promise(async (resolve, reject) => {
    if (url.includes('http://') || url.includes('https://')) {
      let domain = new URL(url);
      url = domain.host
    }

    let wordListLocation;
    fs.access(`${__dirname}/../../../static/user/${uuid}/wordlist.txt`, fs.F_OK, async (err) => {
      if (err) {
        wordListLocation = `${__dirname}/../../../static/defaultSub.txt`
        executeFile(url, wordListLocation)
          .then((response) => {
            resolve(response)
          }).catch((err) => {
            reject(err)
          })
      } else {
        wordListLocation = `${__dirname}/../../../static/user/${uuid}/wordlist.txt`
        executeFile(url, wordListLocation)
          .then((response) => {
            resolve(response)
          }).catch((err) => {
            reject(err)
          })
      }
    })
  })
}

module.exports = {
  domainBrute
}