const axios = require('axios')
const cheerio = require('cheerio')


// let arr = ['https://reddit.com', 'https://github.com']
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
let getData = (array) => {

  return Promise.all(array.map((url) => {
    if (url !== '') {
      
      // const agent = new https.Agent({  
      //   rejectUnauthorized: false
      // });

      return axios.get(url)
        .then((res) => {
          let info = {}

          let htmlData = res.data
          let $ = cheerio.load(htmlData)
          let title = $('title')

          info[`url`] = url
          info[`pageTitle`] = title.text()
          info[`contentLength`] = `${res.data.length / 1000} KB`
          info[`status`] = `${res.status}`
          return info
        })
        .catch((err) => {
          console.log(`Handeling error, passing error infos ${err}`)
          let info = {
            url: url,
            pageTitle: 'Forbidden',
            contentLength: '0 KB',
            status: `403 or 401`
          }
          return info

        })



    }
  }))
}


exports.get = getData


