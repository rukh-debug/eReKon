// child process to exec a bin file
const cp = require('child_process');
// to read the json file...
const fs = require('fs');

let findDomain = async (url) => {

  return new Promise((res, rej) => {

    cp.execFile(__dirname + '/../tools/ffuff/ffuf', ["here goes the command"], (error, stdout, stderr) => {

      if (error) {
        console.log(`stderr ${error}`);
      }
      else {
        let outputFile = `${__dirname}/../tools/ffuff/output.json`
        
      }

    })

    console.log('..')
  })
}
