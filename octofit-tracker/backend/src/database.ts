import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/octofit_db";

export async function connectDatabase(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  await mongoose.connect(mongoUri);
  return mongoose;
}
