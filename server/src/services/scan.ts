import fs from "fs";
import path from 'path';

import Scan from "../models/scan";

import { SettingService } from "./setting";

import { subdomainService } from "./scanSubServices/subdomain";
import { fullScanService } from "./scanSubServices/fullScan";
import { screenshotService } from "./scanSubServices/screenshot";

export class ScanService {
  static async initScan(user: any, url: string) {
    let setting = await SettingService.getSetting(user._id);
    // TODO: Validate URL
    // TODO: Check if scan already exists and its pending or running
    // TODO: Move old scans to archive

    // temporarily delete all scans before creating a new one
    await Scan.deleteMany({ user: user._id });
    const scan = new Scan({
      user: user._id,
      url: url,
      scanMode: setting.scanMode,
    })
    await scan.save();

    // initialize static folder for the scan data like images and subdmains and json files
    const dir = path.join(__dirname, '..', 'static', user._id.toString(), scan._id.toString());
    // const dir = `@/static/${user._id}/${scan._id}`
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.startScan(scan._id);
    return scan;
  }

  static async getScan(scanId: string) {
    const scan = await Scan.findOne({
      _id: scanId,
    })
    if (!scan) {
      throw new Error("Scan not found");
    }
    return scan;
  }

  static async startScan(scanId: string) {
    const scan = await this.getScan(scanId);
    // set timestamp
    scan.status = "running";
    await scan.save();
    // grab settings from user
    const setting = await SettingService.getSetting(scan.user.toString());
    // const user: any = await User.findOne({ _id: scan.user.toString() });

    // -------------------------------------------------------------------------------- //

    // Screenshot homepage of the url //
    await screenshotService.screenshot(scan.url, scan.user.toString(), scan._id.toString(), setting.viewPort)
      .then(async () => {
        // Saved screenshot to static folder
        scan.progress = 1;
        console.log("Screenshot saved to static folder")
        await scan.save();
      }).catch((error: any) => {
        console.log(error);
      });

    // -------------------------------------------------------------------------------- //
    // Subdomain scan - findomain //
    await subdomainService.search(scan.url, scan.user.toString(), scan._id.toString(), scan.scanMode, scan.timestamp)
      .then(async (subdomainScan: any) => {
        scan.subdomains = subdomainScan;
        scan.progress = 15;
        console.log("Subdomain scan completed")
        await scan.save();
      }).catch((error: any) => {
        console.log(error);
      });

    // scan.subdomains = [
    //   "https://nepal.gov.np/",
    //   "https://rubenk.com.np",
    //   "https://www.rubenk.com.np",
    //   "https://www.rubenk.com.np/",
    //   "https://rubenk.com.np/",
    //   "https://www.rubenk.com.np",
    //   "https://rubenk.com.np",
    //   "https://www.rubenk.com.np/",
    // ]
    // scan.save()
    // -------------------------------------------------------------------------------- //
    // set batch for scan
    const PROCESS_BATCH_SIZE = process.env.PROCESS_BATCH_SIZE ? parseInt(process.env.PROCESS_BATCH_SIZE) : 100;
    const BATCH_SIZE = setting.batchSize > PROCESS_BATCH_SIZE ? PROCESS_BATCH_SIZE : setting.batchSize;
    console.log(PROCESS_BATCH_SIZE, BATCH_SIZE)
    // -------------------------------------------------------------------------------- //
    // Full scan on subdomains //
    await fullScanService.bulkOnSubdomains(setting, scan, BATCH_SIZE)
      .then(async () => {
        scan.progress = 100;
        scan.status = "completed";
        console.log("Full scan completed")
        await scan.save();
      }).catch((error: any) => {
        console.log(error);
      });

    return scan;
  }
}