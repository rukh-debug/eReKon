const fse = require('fs-extra')
const fs = require('fs')

let progressStart = async (uuid, folderNum) => {

  let init = {
    //progress lable and progress %
    progressL : "Starting...",
    progressP : "3"
  }

  let directory = `${__dirname}/../../static/img/${uuid}/${folderNum}/progress.json`

  await fse.ensureFile(directory, err => {
    console.log(`error on progressFile : ${err}`)
  })
  
  let initData = JSON.stringify(init);
  fs.writeFileSync(directory, initData)
}

let progressUpdate = async (uuid, pL, pP, folderNum) => {
  let data = {
    progressL: pL,
    progressP: pP
  }
  let directory = `${__dirname}/../../static/img/${uuid}/${folderNum}/progress.json`
  let updateData = JSON.stringify(data);
  fs.writeFileSync(directory, updateData)
}

exports.start =  progressStart
exports.update = progressUpdate