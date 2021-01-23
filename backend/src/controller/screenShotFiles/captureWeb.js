// import website screenshot library
const captureWebsite = require('capture-website');
const { promises } = require('fs-extra');
//const dirFlush = require('./screenShotFlush.js')
const fse = require('fs-extra')
//const shell = require('child_process').execSync

// number of processes the app can use to capture webpage
// if your pc is a beast, increase it, if its not probably decrease it.
// ram consumption increases.
process.setMaxListeners(0);
let captureScreen = async (arr, uuid, folderNum) => {

  let folderPath = `${__dirname}/../../../static/img/${uuid}/${folderNum}`
  fse.ensureDirSync(folderPath)

  let arrDevide = []
  // loop through all the links to be capture
  for (let i = 0; i < arr.length - 1; i++) {
    try {
      await captureWebsite.file(arr[i], `${folderPath}/${i}.png`)
    }
    catch {
      try {
        await captureWebsite.file(arr[0], `${folderPath}/${i}.png`)
      }
      catch {
        await captureWebsite.file(`https://google.com`, `${folderPath}/${i}.png`)
      }
    }
  }
}

let copyToInterface = async () => {
  return new Promise((res, rej) => {
    let destination = `${__dirname}/../../../../eReKonInterface/public/images`
    let source = `${__dirname}/screenShot`
    console.log(destination)
    console.log(source)
    fse.copy(source, destination, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        res('success')
        console.log('copied folder')
      }
    })
    //shell(`mkdir -p ${destination}`);
    //shell(`cp -r ${source}/* ${destination}`)
  })
}
exports.convert = captureScreen
//exports.copyFiles = copyToInterface