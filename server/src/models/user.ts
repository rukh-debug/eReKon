import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// define the scrhme for the user model

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

export const userSchema = new mongoose.Schema<UserDocument>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// create auth token for user
if (!process.env.JWT_SECRET) throw new Error("No JWT secret provided");
if (!process.env.JWT_EXPIRES_IN) throw new Error("No JWT expiration provided");

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
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

// remove password on response
userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// create the model
export const User = mongoose.model<UserDocument>("User", userSchema);