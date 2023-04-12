import { Request, Response } from 'express';
import { ScanService } from '../services/scan';

export class ScanController {
  static async startScan(req: Request, res: Response) {
    try {
      const scan = await ScanService.initScan(req.user, req.body.url);
      return res.status(200).json({
        status: 'success',
        message: 'Scan started successfully',
        data: {
          scan,
        },
      });
    } catch (error: any) {
      return res.status(401).json({
        status: 'error',
        message: error.message,
      })
    }
  }

  static async getScan(req: Request, res: Response) {
    try {
      const scan = await ScanService.getScan(req.params.scanId);
      return res.status(200).json({
        status: 'success',
        message: 'Scan fetched successfully',
        data: {
          scan,
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