const fs = require('fs');
const path = require('path');

// as soon as there is a new request
// flush every files from screenshot folder.
const dir = `${__dirname}/screenShot/`
const dirInterface = `${__dirname}/../../../../eReKonInterface/public/images`
let flush = () => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(dir, file), err => {
        if (err) throw err;
      })
    }
  })
}
let flush2 = () => {
  fs.readdir(dirInterface, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(dirInterface, file), err => {
        if (err) throw err;
      })
    }
  })
}

exports.flush = flush
exports.flush2 = flush2