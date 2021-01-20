const admZip = require('adm-zip');

const fs = require('fs');


let zipItAlready = async (data) => {
  data = JSON.stringify(data)
  // creating archives
  let zip = new admZip();

  //zip.addLocalFolder('./screenShotFiles/screenShot')
  zip.addFile('allSubDomainInfo.json', Buffer.alloc(data.length, data))
  zip.addLocalFolder((`${__dirname}/./screenShotFiles/screenShot/`))
  zip.writeZip(`${__dirname}/./myData.zip`);
}


let zipper = async (data) => {
  data = JSON.stringify(data)
  fs.writeFile(`${__dirname}/screenShotFiles/screenShot/data.json`,data, (err) => {
    if(err){
      console.log(`we have error ${err}`)
    }
    zipItAlready(data)
  })
}

exports.zip = zipper