const wappalizer = require('./wappalizer.js')

let filter = (arr) => {
  return new Promise(async (resolve, reject) => {
    let fullInfo = {}
    for (let i = 0; i < arr.length - 1; i++) {

      console.log(`trying out for ${arr[i]}`)
      try {
        let data = await wappalizer.get(arr[i])
        data = JSON.parse(data)
        let vInfo = {}
        for (let j = 0; j <= data['technologies'].length; j++) {
          let individual = data['technologies'][j]
          if (individual !== undefined) {
            let techName = individual[`name`]
            techName = techName.replace(/\./g, '(dot)')
            techName = techName.replace(/\$/g, '(dol)')
            vInfo[`${techName}`] = `${individual['version']}`
          }
        }
        fullInfo[`${i}`] = vInfo
      }
      catch (e) {
        console.log(`error at wappalizer${e}`)
        let vInfo = {}

        vInfo[`null`] = `${individual['null']}`
        fullInfo[`${i}`] = vInfo
      }
    }
    resolve(fullInfo)
  })
}

let mixer = (arr, fullInfo) => {
  return new Promise(async (resolve, rej) => {
    let techInfo = await filter(arr)
    let length = Object.keys(fullInfo).length
    for (let i = 0; i < length; i++) {
      fullInfo[`${i}`]['tech'] = techInfo[`${i}`]
    }
    resolve(fullInfo)
  })
}

exports.getAndMerge = mixer
