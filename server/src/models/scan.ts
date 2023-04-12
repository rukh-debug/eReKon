import mongoose from "mongoose";

export interface scanDocument extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  url: string;
  status: string;
  // enums for status
  // "pending" | "running" | "completed" | "failed",
  scanMode: string;
  // enums for scanType
  // "fast" | "effective",
  wayback: {
    links: string[];
    uLinks: string[];
  },
  technologies: [
    {
      name: string;
      slug: string;
      description: string;
      confidence: string;
      version: string;
      website: string;
      categories: string[];
    }
  ],
  subdomains: string[];
  progress: number;
  timestamp: Date;
}

const scanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "running", "completed", "failed"],
    default: "pending",
  },
  scanMode: {
    type: String,
    enum: ["fast", "effective"],
    default: "fast",
  },
  wayback: {
    links: [String],
    uLinks: [String],
  },
  technologies: [
    {
      name: String,
      slug: String,
      description: String,
      confidence: String,
      version: String,
      website: String,
      categories: [String],
    },
  ],
  subdomains: [String],
  progress: {
    type: Number,
    default: 1,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<scanDocument>("Scan", scanSchema);