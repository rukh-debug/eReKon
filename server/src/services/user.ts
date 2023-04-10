import { User, UserDocument } from "../models/user";

export class UserService {
  static async createUser(username: string, email: string, password: string): Promise<UserDocument> {
    const user = new User({ username, email, password });
    return await user.save();
  }

  static async getUserById(id: string): Promise<UserDocument | null> {
    const user = await User.findById(id);
    return user;
  }

  static async getUserByCredentials(email: string, password: string): Promise<UserDocument> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }
    return user;
  }
}

