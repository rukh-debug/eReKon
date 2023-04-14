// @ts-ignore
import evilscan from 'evilscan';
import { fastPorts, effectivePorts } from '../../config/payloads';
import { extraService } from "./extra";

export class portService {

  static async scanPorts(url: string, scanMode: string) {

    interface portReturned {
      ip: string,
      port: number,
      banner: string,
      status: string,
    }

    interface portItem {
      ports: {
        port: number,
        status: string,
        banner: string,
      }[],
      ip: string,
    }


    return new Promise(async (resolve, reject) => {
      const domain = extraService.fetchDomain(url);

      const options = {
        target: "rubenk.com.np",
        port: scanMode === 'fast' ? fastPorts : effectivePorts,
        status: 'O', // Timeout, Refused, Open, Unreachable
        banner: true,
      };

      new evilscan(options, (err: any, scanner: any) => {
        let item: portItem = {
          ports: [],
          ip: "",
        }

        if(err){
          resolve(item)
        }

        scanner.on('result', (data: portReturned) => {
          // fired when item is matching options
          // item.openPorts.push(data.port);
          item.ports.push({
            port: data.port,
            status: data.status,
            banner: data.banner,
          });
          item.ip = data.ip;
        });

        scanner.on('error', (err: any) => {
          console.log(err)
          return resolve(item);
        });

        scanner.on('done', () => {
          return resolve(item);
        });

        scanner.run();
      });
    })
  }
}

portService.scanPorts("https://rubenk.com.np", "fast")