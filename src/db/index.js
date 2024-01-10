import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `mongodb connected,DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB ERROR", error);
    process.exit(1);
  }
};
export default connectDB;
