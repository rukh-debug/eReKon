import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { UserDocument, User } from '../models/user';

interface AuthRequest extends Request {
  user?: UserDocument;
}

export const userAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('Please authenticate');
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);

    // Find the user associated with the token
    const user: UserDocument | null = await User.findById(decodedToken._id);
    if (!user) throw new Error('User not found');

    req.user = user;

    next();
  } catch (error: any) {
    res.status(401).json({
      status: 'error',
      message: error.message,
    })
  }
}

