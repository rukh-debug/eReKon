// since we are going to use terminal to execute bin file
// we need child_process 
const cp = require('child_process');
// file reader to read the text file.
// its file system ig. xD
const fs = require('fs');

let domainFind = async (url) => {
  return new Promise((resolve, reject) => {
    // we are using execFile specifically to execute the file. 
    // use use the command required to get the domains.
    let hostname = new URL(url).hostname
    cp.execFile(__dirname + './bin/findomain', [`-u`, `${__dirname}/${hostname}.txt`, `-t`, `${url}`], (error, stdout, stderr) => {
      if (error) {
        console.log(`stderr: ${stderr}`);
        console.log(error.message)
      }
      else {
        let filename = `${__dirname}/${hostname}.txt`
        fs.readFile(filename, 'utf8', function (err, data) {
          if (err) {
            reject(err);
          };
          // split every the textfile into array
          let splitted = data.toString().split('\n');
          // resolve the splited array
          resolve(splitted);
        })
      }
    })
  })
};

exports.get = domainFind