// 
import { UserDocument } from '../../models/user';
import { scanDocument } from '../../models/scan';
import { settingDocument } from '../../models/setting';

import { waybackService } from './wayback';
import { basicService } from './basic';
import { portService } from './port';
import { screenshotService } from './screenshot';
import { wappalyzerService } from './wappalizer';

import { detailDoc } from "../../models/scan";

export class fullScanService {
  static async start(setting: settingDocument, scan: scanDocument, url: string) {
    return new Promise(async (resolve, reject) => {
      let item: detailDoc = {
        title: "",
        ip: "",
        status: 0,
        url: url,
        contentLength: "",
        ports: [{
          port: 0,
          status: "",
          banner: "",
        }],
        technologies: [{
          name: "",
          slug: "",
          description: "",
          confidence: '',
          version: '',
          website: '',
        }],
        wayback: [],
      };

      await basicService.gatherBasic(url)
        .then((basic: any) => {
          item.title = basic.title;
          item.status = basic.status;
          item.contentLength = basic.contentLength;
        }).catch(err => err)

      await portService.scanPorts(url, scan.scanMode)
        .then((result: any) => {
          console.log(result);
          item.ports = result.ports
          item.ip = result.ip
        }).catch(err => err)

      await screenshotService.screenshot(url, scan.user.toString(), scan._id.toString(), setting.viewPort, false)
        .then((res) => res)
        .catch(err => err)

      await waybackService.getLinks(url)
        .then(async (waybackScan: any) => {
          item.wayback = waybackScan
        }).catch(err => err);

      await wappalyzerService.fetchDetails(url)
        .then((tech: any) => {
          item.technologies = tech
        }).catch(err => err)

      return resolve(item)
    })
  }

  static async bulkOnSubdomains(setting: settingDocument, scan: scanDocument, BATCH_SIZE: number) {
    // do promiseall with this.start each subdomain from sacn.subdomains and return the array of results
    const subdomains = scan.subdomains.slice(); // create a copy of the subdomains array
    let results: any = [];
    while (subdomains.length) {
      const batch = subdomains.splice(0, BATCH_SIZE); // get the next batch of subdomains
      scan.currentScan = batch
      await scan.save()
      console.log("currently scanning for", batch)
      const funcs = batch.map((subdomain: string) => {
        return () => this.start(setting, scan, subdomain);
      });

      let batchResult: any = await Promise.all(funcs.map(f => f())); // process assigned batch at a time
      // push batchResult array to results array
      results.push(...batchResult);
      // update scan progress
      scan.progress = Math.round((results.length / scan.subdomains.length) * 100);
      // update scan details
      scan.detail = results;
      await scan.save();
    }
    return results;
  }
}