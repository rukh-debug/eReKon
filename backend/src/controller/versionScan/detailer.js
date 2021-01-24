const wappalizer = require('./wappalizer.js')

let filter = (arr) => {
  return new Promise(async (resolve, reject) => {
    let techInfo = {}
    let statusCode = []
    for (let i = 0; i < arr.length - 1; i++) {

      try {
        let data = await wappalizer.get(arr[i])
        data = JSON.parse(data)
        let vInfo = {}


        let urlKeysForStatus = Object.keys(data[`urls`])
        for (let k=0; k<1; k++){
          let index0 = urlKeysForStatus[0]
          statusCode.push(data[`urls`][index0].status)
        }        

        for (let j = 0; j <= data['technologies'].length; j++) {

          let individual = data['technologies'][j]
          if (individual !== undefined) {
            let techName = individual[`name`]
            techName = techName.replace(/\./g, '(dot)')
            techName = techName.replace(/\$/g, '(dol)')
            vInfo[`${techName}`] = `${individual['version']}`
          }
        }
        techInfo[`${i}`] = vInfo
      }
      catch (e) {
        let vInfo = {}

        vInfo[`null`] = `${individual['null']}`
        techInfo[`${i}`] = vInfo
      }
    }
    resolve({techInfo, statusCode})
  })
}

let mixer = (arr, fullInfo) => {
  return new Promise(async (resolve, rej) => {
    let { techInfo, statusCode } = await filter(arr)
    let length = Object.keys(fullInfo).length
    for (let i = 0; i < length; i++) {
      fullInfo[`${i}`]['tech'] = techInfo[`${i}`]
      fullInfo[`${i}`][`status`] = statusCode[i].toString()
    }
    resolve(fullInfo)
  })
}

exports.getAndMerge = mixer
