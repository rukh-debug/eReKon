import { UserDocument } from '../../models/user';

declare namespace Express {
  export interface Request {
    user?: UserDocument;
  }
}