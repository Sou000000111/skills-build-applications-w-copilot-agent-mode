import mongoose from "mongoose";

const mongoUri = "mongodb://localhost:27017/octofit_db";

export async function connectDatabase(): Promise<typeof mongoose> {
  return mongoose.connect(mongoUri);
}