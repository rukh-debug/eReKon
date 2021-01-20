const router = require('express').Router();
const mainApp = require('../controller/app.js')

router.get('/status', async (req, res) => {
  console.log(`Checkng status`)
  await res.send("<h1>Ok</h1>")
})

router.get('/demo', async (req, res) => {
  console.log(`Data Sent`)
  let sample = [{ "id": 0, "url": "https://cricket.worldlink.com.np", "port": { "80": "", "443": "" }, "ip": "202.166.193.70", "tech": {}, "contentLength": "0 KB", "status": "403 or 401", "pageTitle": "Forbidden" }, { "id": 1, "url": "https://mail4.worldlink.com.np", "port": { "80": "", "135": "", "143": "* OK The Microsoft Exchange IMAP4 service is ready.\\r\\n", "443": "", "587": "220 MAIL4.worldlink.com.np Microsoft ESMTP MAIL Service ready at Thu, 7 Jan 2021 08:31:52 +0545\\r\\n", "593": "ncacn_http/1.0", "808": "", "993": "", "6004": "ncacn_http/1.0" }, "ip": "202.79.36.15", "tech": { "Windows Server": "null", "Microsoft ASP.NET": "null", "IIS": "7.5", "Google Analytics": "null" }, "contentLength": "0.689 KB", "status": "200", "pageTitle": "IIS7" }, { "id": 2, "url": "https://epayment.worldlink.com.np", "port": { "80": "", "443": "" }, "ip": "202.166.193.70", "tech": { "PHP": "5.6.10", "animate.css": "null", "CodeIgniter": "null", "Nginx": "null", "Google Font API": "null", "jQuery": "1.7.2", "Google Analytics": "null" }, "contentLength": "8.681 KB", "status": "200", "pageTitle": "Epayment | " }, { "id": 3, "url": "https://www.worldlink.com.np", "port": {}, "ip": "202.166.193.102", "tech": { "Concrete5": "8.0.3", "PHP": "null", "Leaflet": "1.6.0", "UIKit": "null", "Bootstrap": "3.3.7", "Nginx": "null", "Tawk.to": "null", "Slick": "null", "Google Font API": "null", "Font Awesome": "5.7.2", "jQuery": "1.10.2", "Select2": "null", "Livefyre": "1.6.0", "Google Tag Manager": "null", "Google Analytics": "null" }, "contentLength": "58.367 KB", "status": "200", "pageTitle": "WorldLink Communications Ltd." }, { "id": 4, "url": "https://mail3.worldlink.com.np", "port": {}, "ip": "202.79.36.15", "tech": { "Windows Server": "null", "Microsoft ASP.NET": "null", "IIS": "7.5", "Google Analytics": "null" }, "contentLength": "0.689 KB", "status": "200", "pageTitle": "IIS7" }, { "id": 5, "url": "https://forum.worldlink.com.np", "port": {}, "ip": "202.166.193.68", "tech": { "OpenSSL": "1.1.1h", "Apache": "2.4.46" }, "contentLength": "0.163 KB", "status": "200", "pageTitle": "" }, { "id": 6, "url": "https://mail8.worldlink.com.np", "port": {}, "ip": "202.79.32.5", "tech": { "Windows Server": "null", "Microsoft ASP.NET": "null", "IIS": "8.5", "Google Analytics": "null" }, "contentLength": "0.701 KB", "status": "200", "pageTitle": "IIS Windows Server" }, { "id": 7, "url": "https://worldcup.worldlink.com.np", "port": {}, "ip": "69.27.35.96", "tech": { "Apache": "null", "Google Analytics": "null" }, "contentLength": "0.623 KB", "status": "200", "pageTitle": "Index of /" }, { "id": 8, "url": "https://safenet.worldlink.com.np", "port": {}, "ip": "202.166.193.70", "tech": { "animate.css": "null", "Bootstrap": "null", "Nginx": "null", "Google Analytics": "null", "jQuery": "1.10.2" }, "contentLength": "7.398 KB", "status": "200", "pageTitle": "Access denied" }, { "id": 9, "url": "https://mail7.worldlink.com.np", "port": {}, "ip": "202.79.32.5", "tech": { "Windows Server": "null", "Microsoft ASP.NET": "null", "IIS": "8.5", "Google Analytics": "null" }, "contentLength": "0.701 KB", "status": "200", "pageTitle": "IIS Windows Server" }, { "id": 10, "url": "http://email.worldlink.com.np", "port": {}, "ip": "202.79.32.7", "tech": { "Windows Server": "null", "Microsoft ASP.NET": "null", "IIS": "8.5", "Google Analytics": "null" }, "contentLength": "0 KB", "status": "403 or 401", "pageTitle": "Forbidden" }, { "id": 11, "url": "https://career.worldlink.com.np", "port": {}, "ip": "202.166.193.70", "tech": { "Nginx": "null", "Google Analytics": "null" }, "contentLength": "0 KB", "status": "403 or 401", "pageTitle": "Forbidden" }, { "id": 12, "url": "https://api-ntasync.worldlink.com.np", "port": {}, "ip": "202.166.193.70", "tech": { "Nginx": "null", "Google Analytics": "null" }, "contentLength": "0 KB", "status": "403 or 401", "pageTitle": "Forbidden" }, { "id": 13, "url": "https://legacy.worldlink.com.np", "port": {}, "ip": "202.166.193.70", "tech": { "Nginx": "null", "Google Analytics": "null" }, "contentLength": "0.021 KB", "status": "200", "pageTitle": "" }, { "id": 14, "url": "https://ssl.worldlink.com.np", "port": {}, "ip": "202.166.193.70", "tech": { "Nginx": "null", "Google Analytics": "null" }, "contentLength": "0 KB", "status": "403 or 401", "pageTitle": "Forbidden" }, { "id": 15, "url": "https://eservice.worldlink.com.np", "port": { "80": "", "443": "" }, "ip": "202.166.193.70", "tech": { "Nginx": "null" }, "contentLength": "0 KB", "status": "200", "pageTitle": "" }, { "id": 16, "url": "https://offers.worldlink.com.np", "port": { "80": "", "443": "" }, "ip": "202.166.193.70", "tech": { "PHP": "null", "Bootstrap": "3.3.5", "Nginx": "null", "Google Font API": "null", "Google Analytics": "null", "Font Awesome": "4.7.0", "jQuery": "2.1.0" }, "contentLength": "17.258 KB", "status": "200", "pageTitle": "" }, { "id": 17, "url": "https://corporate.worldlink.com.np", "port": { "80": "", "443": "" }, "ip": "202.166.193.70", "tech": { "Nginx": "null" }, "contentLength": "0 KB", "status": "200", "pageTitle": "" }, { "id": 18, "url": "https://mail.worldlink.com.np", "port": {}, "ip": "202.79.36.15", "tech": { "Windows Server": "null", "Microsoft ASP.NET": "null", "IIS": "7.5", "Google Analytics": "null" }, "contentLength": "0.689 KB", "status": "200", "pageTitle": "IIS7" }, { "id": 19, "url": "https://worldlink.com.np", "port": {}, "ip": "202.166.193.102", "tech": { "Concrete5": "8.0.3", "PHP": "null", "Leaflet": "1.6.0", "UIKit": "null", "Bootstrap": "3.3.7", "Nginx": "null", "Tawk.to": "null", "Slick": "null", "Google Font API": "null", "Font Awesome": "5.7.2", "jQuery": "1.10.2", "Select2": "null", "Livefyre": "1.6.0", "Google Tag Manager": "null", "Google Analytics": "null" }, "contentLength": "58.367 KB", "status": "200", "pageTitle": "WorldLink Communications Ltd." }, { "id": 20, "url": "https://autodiscover.worldlink.com.np", "port": {}, "ip": "202.79.36.15", "tech": { "Windows Server": "null", "Microsoft ASP.NET": "null", "IIS": "7.5", "Google Analytics": "null" }, "contentLength": "0.689 KB", "status": "200", "pageTitle": "IIS7" }, { "id": 21, "url": "https://www.ssl.worldlink.com.np", "port": {}, "ip": "202.166.193.70", "tech": { "Nginx": "null", "Google Analytics": "null" }, "contentLength": "0 KB", "status": "403 or 401", "pageTitle": "Forbidden" }, { "id": 22, "url": "http://mail12.worldlink.com.np", "port": {}, "ip": "202.79.32.7", "tech": { "Windows Server": "null", "Microsoft ASP.NET": "null", "IIS": "8.5", "Google Analytics": "null" }, "contentLength": "0 KB", "status": "403 or 401", "pageTitle": "Forbidden" }]
  await res.send(sample)
})

router.get('/socket', (req, res) => {
  res.send({ response: "I am alive" }).status(200);
})

router.get('/zipper', async (req, res) => {
  //var dirPath = `${__dirname}/../controller/screenShotFiles/screenShot/`;
  const options = { root: `${__dirname}/../controller/` }
  await res.sendFile('myData.zip', options)

})
// get fast-mode subdomain information
router.get('/sub', async (req, res) => {
  console.log(`Getting SubDomain for: ${req.query.url}`)
  if (req.query.url) {
    let valid = await mainApp.urlOk(req.query.url)
    if (valid !== true) {
      await res.send({ failed: true, url: 'bad' })
    }
    else {
      let workingUrl = await mainApp.domains(req.query.url)
      await res.send(workingUrl)
    }
  }
  else {
    await res.send('<pre>forgot the "?url=" queiry?</pre>')
  }
})

// get possible redirect through wayback url dump
router.get('/wb', async (req, res) => {
  console.log(`Scrapping wayback urls for: ${req.query.url}`)
  if (req.query.url) {
    let valid = await mainApp.urlOk(req.query.url)
    if (valid !== true) {
      await res.send({ failed: true, url: 'bad' })
    }
    else {
      let wayback = await mainApp.wbfind(req.query.url)
      await res.send(wayback)
    }
  }
  else {
    await res.send('<pre>forgot the "?url=" queiry?</pre>')
  }
})

// get version info fo the server through header
router.get('/ver', async (req, res) => {
  console.log(`Parsing version for: ${req.query.url}`)
  if (req.query.url) {
    let valid = await mainApp.urlOk(req.query.url)
    if (valid !== true) {
      await res.send({ failed: true, url: 'bad' })
    }
    else {
      let versions = await mainApp.getVer(req.query.url)
      await res.send(versions)
    }
  }
  else {
    await res.send('<pre>forgot the "?url=" queiry?</pre>')
  }
})


module.exports = router;
