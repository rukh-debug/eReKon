const router = require('express').Router();
const ScannedData = require("../models/scannedDataModel")
const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')
const ConfigModel = require('../models/configModel')
//const scanResponse = require('../sample.json')
const app = require('../src/controller/indexController')
const auth = require('../middleware/auth')

router.post('/fullscan', auth, async (req, res) => {
  try {
    let { token, url, socketRoom } = req.body;
    let decoded = jwt.verify(token, process.env.JWT_SECRETS)

    const findUser = await UserModel.findOne({_id: decoded.id})
    const findScanType = await ConfigModel.findOne({userRef: decoded.id})

    if (!findUser || !findScanType){
      console.log('cant find scan type or user')
      return res.status(400).json({message: "Cant find user or scantype"})
    }
    const findUserData = await ScannedData.findOne({ userRef: decoded.id })

    let uuid = findUser.uuid
    let scanType = findScanType.scanType
    // check if the user have ever saved his data or not...
    let folderNum;
    if (findUserData) {
      let num = findUserData.scanData.length
      folderNum = num.toString()
    }
    else {
      folderNum = "0"
    }
    let scanResponse;

    let isUrlValid = await app.urlOk(url)
    //let isUrlValid = true
    if (isUrlValid) {
      scanResponse = await app.fastDomains(url, socketRoom, folderNum, uuid, scanType)
    }
    else {
      console.log('cant connect to url')
      return res.status(400).json({ message: `Cant connect to ${url}` })
    }
    if (findUserData) {
      // update the database with new data
      await ScannedData.findOneAndUpdate(
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
        forUrl: url,
      })
      await userScanned.save()
    }
    res.status(200).json({ scanResponse, folderNum })

  }
  catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
})

router.post('/dash', auth, async (req, res) => {
  const { token } = req.body
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRETS)
    const findUserData = await ScannedData.findOne({ userRef: decoded.id })
    res.status(200).json({ data: findUserData?.scanData })
  }
  catch (e) {  
    res.status(500).json({ message: e.message })
  }
})


module.exports = router;
