const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

///////////////////////
// setup express... //
//////////////////////

const app = express();

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
// mongo shell docs
//https://docs.mongodb.com/manual/mongo/
// starting mongo server
// https://docs.mongodb.com/manual/reference/program/mongod/
// mongod --noauth --port 4000 --dbpath ~/tuts/MERN_AuthSys/MERN_AUTH/DB   

