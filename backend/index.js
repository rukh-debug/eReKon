const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');
const io = require('socket.io')
const fs = require('fs')

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

// setup express Server
const server = require('http').createServer(app)
const socketServer = io(server, { cors: { origin: "*" } })
const socketPort = 5001
server.listen(socketPort, () => console.log(`Socket on ${socketPort}`))

let processSocket = (uuid, folderNum, socket) => {
  try {
    let raw = fs.readFileSync(`${__dirname}/static/img/${uuid}/${folderNum}/progress.json`)
    let jsonData = JSON.parse(raw)
    console.log(jsonData)
    socket.emit("FromAPI", jsonData)
  }
  catch(e){
    socket.emit("FromAPI", {progressL:"IDLE", progressP:100})
  }  
}

socketServer.on("connection", (socket) => {
  // processSocket(uuid, folderNum, socket), 1000);
  // socketServer.on("Disconnect", () => {
  //   console.log("client disconnected");
  //   clearInterval(interval);
  // });
  socket.on('UUIDnDirNum', (data) => {
    processSocket(data.uuid, data.folderNum, socket)
  })
});

