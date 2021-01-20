const axios = require('axios');

// this extracts the server header to find out if there is server info or not.
let headerInfo = (url) => {
  if (url.includes('https://') || url.includes('http://')) {
    return axios.head(url)
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(`${err}`)
        return null
      })
  }
  else {
    return axios.head(`http://${url}`)
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(`${err}`)
        return null
      })
  }
}

// the server info is extracted and done some bake and shake
let shakeUp = async (url) => {
  let info = await headerInfo(url)
  let arr = []
  if (info != null) {
    let splited = []
    if (info.headers.server) {
      // if there is server info in header, it pushes to the array
      arr.push(info.headers.server)
    }
    if (info.headers['x-powered-by']) {
      // same goes to x-powered-by info from header info.
      arr.push(info.headers['x-powered-by'])
    }
    for (let i = 0; i < arr.length; i++) {
      // check the array length and loops through it, and splits the string according to a whitespace.
      let crack = arr[i].split(' ')
      splited.push(crack)
    }
    let final = []
    for (let j = 0; j < splited.length; j++) {
      if (splited.length === 1) {
        final.push(splited[j][0])
      }
      else {
        for (let k = 0; k < splited[j].length; k++) {
          final.push(splited[j][k])
        }
      }
    }
    return final
  }
  else {
    return null
  }
}

// loops everything... 
// and split according to '/' to split name and version
let finalBake = async (url) => {
  let arr = await shakeUp(url)
  let info = {}
  if (arr != null) {
    for (let i=0; i < arr.length; i++){
      if(arr[i].includes('/')){
        let split = arr[i].split('/')
        info[split[0]] = split[1]
      }
      else if(arr[i].includes('(') && arr[i].includes(')')){
        // replace brackets () like these, for example from '(Ubuntu)
        arr[i] = arr[i].replace('(','').replace(')','')
        // since the (Ubuntu) version is never given, its null ofc.
        info[arr[i]] = null
      }
      else{
        info[arr[i]] = null
      }
    }
    return info
  }
  else{
    return {
      version: null
    }
  }
}

exports.get = finalBake