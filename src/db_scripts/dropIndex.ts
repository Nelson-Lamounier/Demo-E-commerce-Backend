import mongoose from "mongoose";

export const dropIndex = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  const result = await mongoose.connection.collection("users").dropIndex("username");
  console.log("Dropped index:", result);
  mongoose.connection.close();
};

dropIndex();