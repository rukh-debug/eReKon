import { Router } from 'express';
import { userRouter } from "./userRoutes";
import { settingRouter } from "./settingRoutes";

export const routes = Router();

routes.use('/user', userRouter);
routes.use('/setting', settingRouter);

