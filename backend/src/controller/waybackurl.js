const axios = require('axios');

let getLinks = async (url) => {
  // api for wayback machine to get all the archived urls
  let res = await axios.get(`http://web.archive.org/cdx/search/cdx?url=${url}/*&output=json&fl=original&collapse=urlkey`)
  let links = []
  let ulinks = []
  let info = res.data
  for (let i = 0; i < info.length; i++) {
    if (i !== 0){
      // filter it according to possible redirect url
      if (info[i][0].includes('?url=') || info[i][0].includes('?redirect=') || info[i][0].includes('?u=') || info[i][0].includes('?forward=') || info[i][0].includes('?next=')){
      links.push(`${info[i][0]}`)
      }
      ulinks.push(`${info[i][0]}`)
    }
  }
  return {
    filtered: links,
    unfiltered: ulinks
  }
}

exports.find = getLinks