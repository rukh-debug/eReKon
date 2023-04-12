import { Router } from 'express';
import { userRouter } from "./userRoutes";
import { settingRouter } from "./settingRoutes";
import { scanRouter } from './scanRoutes';

export const routes = Router();

routes.use('/user', userRouter);
routes.use('/setting', settingRouter);
routes.use('/scan', scanRouter);

