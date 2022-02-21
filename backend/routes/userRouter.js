const router = require('express').Router();
const User = require('../models/userModel')
const Config = require('../models/configModel')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const { v4: uuidv4 } = require('uuid');
const app = require('../src/controller/indexController')
const fse = require('fs-extra')
const fs = require('fs')

router.post('/register', async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    //validate

    if (!email || !password || !passwordCheck) {
      return res
        .status(401)
        .json({
          ok: false,
          msg: "Make sure all fields are entered"
        });
    }
    if (password.length < 5) {
      return res
        .status(401)
        .json({
          ok: false,
          msg: "Password needs to be atleast 5 char long"
        })
    }
    if (password !== passwordCheck) {
      return res
        .status(401)
        .json({
          ok: false,
          msg: "Password doesnot match"
        })
    }
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return res
        .status(401)
        .json({
          ok: false,
          msg: "Account with this email already exists"
        });
    }
    // split email into username 
    if (!displayName) displayName = email.split("@")[0];

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt);

    const uuid = uuidv4();
    app.folderCreator(uuid)
    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
      uuid,
    });
    const savedUser = await newUser.save();
    res.status(200).json({
      ok: true,
      msg: "User created successfully",
      ...savedUser,
    })
  }
  catch (e) {
    res.status(500).json({ error: e.message })
  }
})


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res
        .status(401)
        .json({
          ok: false,
          msg: "Not all fields are filled"
        });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({
          ok: false,
          msg: "No account with this user exist"
        });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res
        .status(401)
        .json({
          ok: false,
          msg: "Invalid credencials."
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETS);
    res.json({
      ok: true,
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        uuid: user.uuid
      }
    })
  }
  catch (e) {
    res.status(501)
      .json({
        ok: false,
        msg: e.message
      })
  }
})

router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRETS)
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true)
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    email: user.email,
    displayName: user.displayName,
    id: user._id,
    uuid: user.uuid
  });
})

router.post('/getConfig', auth, async (req, res) => {
  try {
    const { token } = req.body;
    let decoded = jwt.verify(token, process.env.JWT_SECRETS)
    const findUserData = await Config.findOne({ userRef: decoded.id })
    res.status(200).json({
      scantype: findUserData.scanType
    })
  }
  catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// let storage = multer.diskStorage({
//   destination: function(req, file, cb){
//     const UUID = req.header('uuid')
//     cb(null, `${__dirname}/../static/user/${UUID}`)
//   },
//   filename: function(req, file, cb){
//     cb(null, `wordlist.txt`)
//   }
// })

let saveFileToLocal = async (b64encode, userUUID) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/../static/user/${userUUID}/wordlist.txt`, b64encode, 'base64', function (err) {
      console.log(err)
      resolve()
    })
  })
}

router.post('/saveConfig', auth, async (req, res) => {

  try {
    const token = req.header('x-auth-token')
    const scanType = req.header('scan-type')
    const b64 = req.body.b64Enc

    // validate...
    if (!scanType === 'fast' || !scanType === 'effective') {
      res.status(401).json({ error: "Invalid scanmode option" })
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRETS)

    const findUserData = await Config.findOne({ userRef: decoded.id })

    const findUser = await User.findOne({ _id: decoded.id })
    let uuid = findUser.uuid

    if (b64) {
      await saveFileToLocal(b64, uuid)
    }

    if (!findUserData) {
      const configData = new Config({
        userRef: savedUser.id,
        scanType: scanType
      })
      await configData.save();
      res.status(200).json({ message: "Created and Saved!!!" })
    } else {
      findUserData.scanType = scanType;
      await findUserData.save()
      res.status(200).json({ message: "Updated" })
    }
  } catch (e) {
    return res.status(500).json({ error: "internal server error", e: e.message })
  }
})

module.exports = router;
