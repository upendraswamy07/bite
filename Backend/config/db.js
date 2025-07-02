import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
      throw new Error("MongoDB URI (DB_URI) is missing from environment variables.");
    }

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
