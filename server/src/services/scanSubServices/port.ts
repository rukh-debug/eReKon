// @ts-ignore
import evilscan from 'evilscan';
import { fastPorts, effectivePorts } from '../../config/payloads';
import { extraService } from "./extra";

export class portService {
  static async scanPorts(url: string, scanMode: string) {
    return new Promise((resolve, reject) => {
      const domain = extraService.fetchDomain(url);

      const options = {
        target: "rubenk.com.np",
        port: scanMode === 'fast' ? fastPorts : effectivePorts,
        status: 'O', // Timeout, Refused, Open, Unreachable
        banner: true,
      };

      const scanner = new evilscan(options);

      scanner.on('result', (data: any) => {
        // fired when item is matching options
        console.log(data)
        return resolve(data);
      });

      scanner.on('error', (err: any) => {
        console.log(err)
        return resolve(err);
      });

      scanner.on('done', () => {
        // finished !
        console.log("done")
        return resolve(null);
      });

      scanner.run();
    });
  }
}