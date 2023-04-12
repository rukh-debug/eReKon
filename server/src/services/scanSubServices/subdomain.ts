import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import { extraService } from './extra';

export class subdomainService {

  // set a variable with findomain path
  static findomain_path = path.join(__dirname, '..', '..', '..', 'bin', 'findomain');

  static async search(url: string, userId: string, scanId: string, scanMode: string, timeStamp: Date
  ) {
    return new Promise(async (resolve, reject) => {
      // set output file path to static folder
      const domain = await extraService.fetchDomain(url);
      // current timestamp in milliseconds
      const timestamp = Number(timeStamp);
      if (!domain) {
        return reject('Invalid domain');
      }
      const filename = `${domain}_${timestamp}.txt`
      // set args for findomain
      const args = [
        '-t',
        domain,
        '-q',
        '-u',
        filename,
        "--http-status"
      ];
      const findomain = spawn(this.findomain_path, args);
      let output = '';
      findomain.stdout.on('data', (data) => {
        output += data;
      }
      );
      findomain.stderr.on('data', (data) => {
        return reject(data);
      }
      );
      findomain.on('close', async (code) => {
        console.log(`FINDOMAIN: child process exited with code ${code}`);
        await this.readPushAndDelete(filename)
          .then((subdomains) => {
            return resolve(subdomains);
          })
          .catch((err) => {
            return reject(err);
          });
      }
      );
    })
  }

  static async readPushAndDelete(filename: string) {
    return new Promise(async (resolve, reject) => {
      // read the domain file
      const subdomainList = path.join(__dirname, "..", "..", "..", filename);
      fs.readFile(subdomainList, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        // push the data to array
        const subdomains = data.split('\n');
        // remove any empty string from array
        const subdomainsFiltered = subdomains.filter((subdomain) => subdomain !== '');
        // delete the file
        fs.unlink(subdomainList, (err) => {
          if (err) {
            return reject(err);
          }
        })
        return resolve(subdomainsFiltered);
      })
    })
  }


  // static async moveAndCleanUp(
  //   userId: string,
  //   scanId: string,
  //   timestamp: number,
  //   domain: string,
  // ) {
  //   return new Promise(async (resolve, reject) => {

  //     // read .txt file and 

  //     const input_file = path.join(__dirname, "..", "..", "..", `${domain}_${timestamp}.txt`);
  //     const output_file = path.join(
  //       __dirname,
  //       '..',
  //       '..',
  //       'static',
  //       userId,
  //       scanId,
  //       'subdomains.txt',
  //     );

  //     // move the file to output file path
  //     fs.rename(
  //       input_file,
  //       output_file,
  //       (err) => {
  //         if (err) {
  //           return reject(err);
  //         }
  //         return resolve('File moved');
  //       }
  //     )
  //   })
  // }
}