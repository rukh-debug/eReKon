import express from 'express';
import { UserController } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.post('/signup', UserController.createUser);
userRouter.get('/:id', UserController.getUser);
userRouter.post('/login', UserController.loginUser);
