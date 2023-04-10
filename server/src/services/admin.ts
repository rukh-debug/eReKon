import { User, UserDocument } from "../models/user";
import { UserService } from "./user";

export class AdminUserService extends UserService {
  static async createUser(username: string, email: string, password: string): Promise<UserDocument> {
    const user = new User({ username, email, password, role: "admin" });
    return await user.save();
  }
}
