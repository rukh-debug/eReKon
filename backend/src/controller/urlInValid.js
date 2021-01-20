const axios = require('axios');

// check if the url is valid or not
let findIfValid = (url) => {
  // if there is https:// or http:// just go ahead
  if (url.includes('https://') || url.includes('http://')) {
    return axios.head(url)
      .then((res) => {
        // if response returns then its working
        return true
      })
      .catch((err) => {
        return false
      })
  }
  else{
    // if there is no http or https, go with http.
    return axios.head(`http://${url}`)
      .then((res) => {
        return true
      })
      .catch((err) => {
        return false
      })
  }
}


exports.status = findIfValid