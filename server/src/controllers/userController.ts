import { Request, Response } from 'express';
import { UserService } from '../services/user';

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user = await UserService.createUser(username, email, password);
      const token = user.generateAuthToken();
      return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: {
          user,
          token,
        },
      });
    } catch (error: any) {
      return res.status(401).json({
        status: 'error',
        message: error.message,
      })
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);
      return res.status(200).json({
        status: 'success',
        message: 'User fetched successfully',
        data: {
          user,
        },
      });
    } catch (error: any) {
      return res.status(401).json({
        status: 'error',
        message: error.message,
      })
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserService.getUserByCredentials(email, password);
      const token = user.generateAuthToken();
      return res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: {
          user,
          token,
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