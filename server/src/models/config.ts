import mongoose from "mongoose";

export interface ConfigDocument extends mongoose.Document {
  key: string;
  value: string;
}