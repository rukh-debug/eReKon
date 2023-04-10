import { Router } from 'express';
import { userRouter } from "./userRoutes";

export const routes = Router();

routes.use('/user', userRouter);

