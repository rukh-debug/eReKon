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
    cp.execFile(__dirname + '/../tools/findomain', [`-u`, `${__dirname}/../tools/subdomains.txt`, `-t`, `${url}`], (error, stdout, stderr) => {
      if (error) {
        console.log(`stderr: ${stderr}`);
        console.log(error.message)
      }
      else {
        let filename = `${__dirname}/../tools/subdomains.txt`
        //after the command succesfully runs
        //console.log(`stdout: ${stdout}`)

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