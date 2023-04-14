import mongoose from "mongoose";

export interface settingDocument extends mongoose.Document {
  scanMode: string;
  // enums for defaultScan
  // "effective" | "fast",
  wordlist: string;
  // enums for wordlist
  // "small" | "medium" | "large" | "custom",
  viewPort: string;
  batchSize: number;
}

const settingSchema = new mongoose.Schema({
  scanMode: {
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
  viewPort: {
    type: String,
    default: "1920x1080",
  },
  batchSize: {
    type: Number,
    default: 3,
  },
});

export default mongoose.model<settingDocument>("Setting", settingSchema);