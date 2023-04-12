import { Request, Response } from 'express';
import { SettingService } from '../services/setting';
import { UserDocument } from '../models/user';

// interface FakeRequest extends Request {
//   user: UserDocument;
// }

export class SettingController {
  static async getSetting(req: any, res: Response) {
    try {
      const setting = await SettingService.getSetting(req.user?._id);
      return res.status(200).json({
        status: 'success',
        message: 'Setting fetched successfully',
        data: {
          setting,
        },
      });
    } catch (error: any) {
      return res.status(401).json({
        status: 'error',
        message: error.message,
      })
    }
  }

  static async updateSetting(req: any, res: Response) {
    try {
      const setting = await SettingService.updateSetting(req, req.body);
      return res.status(200).json({
        status: 'success',
        message: 'Setting updated successfully',
        data: {
          setting,
        },
      });
    } catch (error: any) {
      return res.status(401).json({
        status: 'error',
        message: error.message,
      })
    }
  }
}

