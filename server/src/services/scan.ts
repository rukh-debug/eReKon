import fs from "fs";
import path from 'path';

import Scan from "../models/scan";
import { SettingService } from "./setting";

import { waybackService } from "./scanSubServices/wayback";
import { wappalyzerService } from "./scanSubServices/wappalizer";
import { puppeteerService } from "./scanSubServices/screenshot";

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

    // TODO: initialize directory in static folder for this scan
    const dir = path.join(__dirname, '..', '..', 'static', user._id.toString(), scan._id.toString());
    console.log(dir);
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
    scan.status = "running";
    // -------------------------------------------------------------------------------- //
    // Screenshot homepage of the url //
    await puppeteerService.screenshot(scan.url, scan.user.toString(), scan._id.toString())
      .then(async (screenshot: any) => {
        // Saved screenshot to static folder
        scan.progress = 1;
        await scan.save();
      }).catch((error: any) => {
        console.log(error);
      });
    // -------------------------------------------------------------------------------- //
    // wallalizer scan - version scan //
    await wappalyzerService.fetchDetails(scan.url)
      .then(async (wappalyzerScan: any) => {
        scan.technologies = wappalyzerScan;
        scan.progress = 5;
        await scan.save();
      }).catch((error: any) => {
        console.log(error);
      });

    // -------------------------------------------------------------------------------- //
    // wayback scan - wayback url's scan // possible open redirect filters //
    await waybackService.getLinks(scan.url)
      .then(async (waybackScan: any) => {
        scan.wayback = waybackScan;
        scan.progress = 10;
        await scan.save();
      }).catch((error: any) => {
        console.log(error);
      });

    // -------------------------------------------------------------------------------- //
    // port scan - nmap scan //


    return scan;
  }
}