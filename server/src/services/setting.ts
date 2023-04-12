import Setting from "../models/setting";
import { settingDocument } from "../models/setting";

export class SettingService {
  static async getSetting(userId: String): Promise<settingDocument> {
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

  static async updateSetting(userId: string, data: settingDocument): Promise<settingDocument> {
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

    setting.scanMode = data.scanMode;
    setting.wordlist = data.wordlist;
    await setting.save();
    return setting;
  }
}