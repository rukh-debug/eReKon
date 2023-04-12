import express from 'express';
import { SettingController } from '../controllers/settingController';
import { userAuth } from '../middleware/auth';

export const settingRouter = express.Router();

settingRouter.get('/', userAuth, SettingController.getSetting);
settingRouter.patch('/', userAuth, SettingController.updateSetting);