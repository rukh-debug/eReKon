const cp = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

let domainBrute = async (url, uuid) => {
  return new Promise( async (resolve, reject) => {
    if (url.includes('http://') || url.includes('https://')) {
      let domain = new URL(url);
      url = domain.host
    }

    await fse.ensureFile(`${__dirname}/../../../static/user/${uuid}/wordlist.txt`)
      .then((res) => {
        wordListLocation = `${__dirname}/../../../static/user/${uuid}/wordlist.txt`
      })
      .catch((err) => {
        wordListLocation = `${__dirname}/../../../static/defaultSub.txt`
      })

    console.log(wordListLocation)
    await cp.execFile(`${__dirname}/gobuster`, ['dns', '-d', `${url}`, `-o`, `subdomains.txt`, `-w`, `${wordListLocation}`], (error, stdout, stderr) => {
      if(error){
        console.log(`stderr: ${stderr}`);
        console.log(error.message)
      }
      else {
        let fileName = `${__dirname}/subdomains.txt`
        fs.readFile(fileName, 'utf8', (err, data) => {
          if (err){
            reject(err)
          }
          console.log(data)
        })
      }
    })
  })
}

module.exports = {
  domainBrute
}