import mongoose from "mongoose";

export interface settingDocument extends mongoose.Document {
  defaultScan: string;
  // enums for defaultScan
  // "effective" | "fast",
  wordlist: string;
  // enums for wordlist
  // "small" | "medium" | "large" | "custom",
}

const settingSchema = new mongoose.Schema({
  defaultScan: {
    type: String,
    enum: ["effective", "fast"],
    default: "fast",
  },
  wordlist: {
    type: String,
    enum: ["small", "medium", "large", "custom"],
    default: "small",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model<settingDocument>("Setting", settingSchema);