const fse = require('fs-extra')
const fs = require('fs')

let progressStart = async (uuid, folderNum) => {

  let init = {
    //progress lable and progress %
    progressL: "Connecting...",
    progressP: "100"
  }
  let initData = JSON.stringify(init);
  let directory = `${__dirname}/../../static/img/${uuid}/${folderNum}/progress.json`

  await fse.ensureFileSync(directory, err => {
    fs.writeFile(directory, initData, (err) => {
      console.log(`error up: ${err}`)
    })
  })
}

let progressUpdate = async (uuid, pL, pP, folderNum) => {
  let data = {
    progressL: pL,
    progressP: pP
  }
  let directory = `${__dirname}/../../static/img/${uuid}/${folderNum}/progress.json`
  let updateData = JSON.stringify(data);
  await fs.writeFileSync(directory, updateData, (err) => {
    console.log(err)
  })
}

exports.start = progressStart
exports.update = progressUpdate