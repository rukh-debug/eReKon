// since we are going to use terminal to execute bin file
// we need child_process 
const cp = require('child_process');
// file reader to read the text file.
// its file system ig. xD
const fs = require('fs');

function promiseFromChildProcess(child) {
  return new Promise(function (resolve, reject) {
    resolve(`complete`)
  });
}

let prober = async (domainName) => {
  return new Promise((resolve, reject) => {
    let child = cp.execFileSync(`${__dirname}/runner.bash`, [domainName]);
    promiseFromChildProcess(child)
      .then((result) => {
        let filename = `${__dirname}/${domainName}.txt`
        fs.readFile(filename, 'utf8', function (err, data) {
          console.log(data)
          if (err) {
            reject(err);
          };
          let splitted = data.split('\n');
          resolve(splitted);
        })
      })
  })
};

prober('register.com')
  .then((res) => { console.log(res) })
  .catch((err) => { console.log(err) })


exports.prober = prober
