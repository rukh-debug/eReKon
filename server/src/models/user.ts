import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// define the scrhme for the user model

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  username: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
});

// create auth token for user
if (!process.env.JWT_SECRET) throw new Error("No JWT secret provided");
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username },
    process.env.JWT_SECRET as string
  );
  return token;
};

// pre save hook to hash password
userSchema.pre("save", async function (next) {
  const user = this as UserDocument;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// create the model
const User = mongoose.model<UserDocument>("User", userSchema);

export default User;