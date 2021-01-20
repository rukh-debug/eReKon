const router = require('express').Router();
const ScannedData = require("../models/scannedDataModel")
const jwt = require('jsonwebtoken')
//const scanResponse = require('../sample2.json')
const app = require('../src/controller/app')
const auth = require('../middleware/auth')

router.post('/fast', auth, async (req, res) => {
  try {
    let { token, url } = req.body;
    let decoded = jwt.verify(token, process.env.JWT_SECRETS)

    // scanner
    let scanResponse = await app.fastDomains(url)

    // check if the user have ever saved his data or not...
    const findUserData = await ScannedData.findOne({ userRef: decoded.id })
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
        scanData: scanResponse
      })
      const userScannedData = await userScanned.save()
    }
    res.status(200).json(scanResponse)

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
    res.status(200).json({data: findUserData})
  }
  catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router;