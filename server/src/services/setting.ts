import Setting from "../models/setting";
import { settingDocument } from "../models/setting";
import { Request } from "express";

export class SettingService {
  static async getSetting(userId: Request): Promise<settingDocument> {
    const setting = await Setting.findOne({
      user: userId,
    });

    if (!setting) {
      const newSetting = new Setting({
        user: userId,
      });

      await newSetting.save();
      return newSetting;
    }
    return setting;
  }

  static async updateSetting(userId: string, data: any): Promise<settingDocument> {
    const setting = await Setting.findOne({
      user: userId,
    });

    if (!setting) {
      const newSetting = new Setting({
        user: userId,
      });

      await newSetting.save();
      return newSetting;
    }

    setting.defaultScan = data.defaultScan;
    setting.wordlist = data.wordlist;
    await setting.save();
    return setting;
  }
}