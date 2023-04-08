import mongoose from "mongoose";

export const connect = async () => {
  try {
    let db = process.env.MONGODB_CONNECT;
    if (!db) {
      throw new Error("No database connection string provided");
    }
    await mongoose.connect(db, {});
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}

