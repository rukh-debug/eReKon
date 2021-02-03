const router = require('express').Router();
const ScannedData = require("../models/scannedDataModel")
const jwt = require('jsonwebtoken')
//const scanResponse = require('../sample.json')
const app = require('../src/controller/app')
const auth = require('../middleware/auth')
const fs = require('fs');

router.post('/fast', auth, async (req, res) => {
  try {
    let { token, url, uuid } = req.body;
    console.log(token)
    let decoded = jwt.verify(token, process.env.JWT_SECRETS)

    // check if the user have ever saved his data or not...
    const findUserData = await ScannedData.findOne({ userRef: decoded.id })
    let folderNum;
    if (findUserData) {
      let num = findUserData.scanData.length
      folderNum = num.toString()
    }
    else {
      folderNum = "0"
    }
    let scanResponse;
    // scanner
    //const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
    //await sleep(5000);
    let isUrlValid = await app.urlOk(url)
    //let isUrlValid = true
    if (isUrlValid) {
      scanResponse = await app.fastDomains(url, uuid, folderNum)
    }
    else {
      return res.status(400).json({ msg: `Cant connect to ${url}` })
    }


    console.log('we came out')
    if (findUserData) {
      // update the database with new data
      const userScannedData = await ScannedData.findOneAndUpdate(
        {
          userRef: decoded.id
        },
        {
          $push: {
            scanData: scanResponse
          }
        },
        {
          useFindAndModify: false
        }
      )
    }
    else {
      // create new refrence for user if not created
      const userScanned = new ScannedData({
        userRef: decoded.id,
        scanData: scanResponse,
        forUrl: url
      })
      const userScannedData = await userScanned.save()
    }
    res.status(200).json({ scanResponse, folderNum })

  }
  catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/dash', auth, async (req, res) => {
  const { token } = req.body
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRETS)
    const findUserData = await ScannedData.findOne({ userRef: decoded.id })
    res.status(200).json({ data: findUserData.scanData })
  }
  catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/progress', async (req, res) => {
  try {
    console.log('hello')
    let { token, uuid } = req.body;
    let decoded = jwt.verify(token, process.env.JWT_SECRETS)
    // check if the user have ever saved his data or not...
    const findUserData = await ScannedData.findOne({ userRef: decoded.id })
    let folderNum;
    if (findUserData) {
      let num = findUserData.scanData.length
      folderNum = num.toString()
    }
    else {
      folderNum = "0"
    }


    let raw = fs.readFileSync(`${__dirname}/../static/user/${uuid}/img/${folderNum}/progress.json`)
    let jsonData = JSON.parse(raw)
    console.log(jsonData)
    res.status(200).json(jsonData)


  }
  catch (e) {
    res.status(500).json({ msg: e.message })
  }
})

module.exports = router;
