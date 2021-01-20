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

let prober = async () => {
  return new Promise((resolve, reject) => {

    let child = cp.execFileSync(`${__dirname}/runner.bash`)
    promiseFromChildProcess(child)
      .then((result) => {

        let filename = `${__dirname}/output.txt`
        // after the command succesfully runs
        // console.log(`stdout: ${stdout}`)
        fs.readFile(filename, 'utf8', function (err, data) {
          if (err) {
            reject(err);
          };
          // split the textfile into array
          let splitted = data.split('\n');
          console.log(splitted)
          // resolve the splited array
          resolve(splitted);
        })

      })
  })

};


exports.prober = prober
