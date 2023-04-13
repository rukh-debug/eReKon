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
  subdomains: string[];
  progress: number;
  timestamp: Date;
  basic: {
    title: string;
    ip: string;
    status: number;
    url: string;
    openPorts: string[];
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
    ]
  }
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
  subdomains: [String],
  basic: {
    title: String,
    ip: String,
    status: Number,
    url: String,
    openPorts: [String],
    technologies: [{
      name: String,
      slug: String,
      description: String,
      confidence: String,
      version: String,
      website: String,
    }],
  },
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