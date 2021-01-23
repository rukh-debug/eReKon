const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');


require('dotenv').config({ path: path.resolve(__dirname, './.env') });

///////////////////////
// setup express... //
//////////////////////

const app = express();
app.use(express.static('static'))
// enable middleware
app.use(express.json());
app.use(cors());

// if we have env variable, if not port to 5000
const PORT = process.env.PORT || 5000

// starting server
app.listen(PORT, () => console.log(`Started server at ${PORT}`));

/////////////////////
// setup mongoose //
////////////////////

///////////////////////////////////////////////////////////////////////////////////////
// HELP //
// mongo shell docs
// https://docs.mongodb.com/manual/mongo/
// starting mongo server
// https://docs.mongodb.com/manual/reference/program/mongod/
// mongod --noauth --port 4000 --dbpath ~/tuts/MERN_AuthSys/MERN_AUTH/DB   
///////////////////////////////////////////////////////////////////////////////////////

mongoose.connect(process.env.MONGODB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }, (err) => {
    if (err) throw err;
    console.log('MongoDB Connected')
  });

  // router middleware
app.use('/users', require('./routes/userRouter'))
app.use('/recon', require('./routes/reconRouter'))
