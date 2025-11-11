import mongoose from "mongoose";

const Connection = async () => {
  try {
    const response = await mongoose.connect(
      "mongodb://localhost:27017/task_db"
    );
    if (response) {
      console.log("Database connected successfully");
    }
  } catch (error) {
    console.log("Error while connectinggg..");
  }
};

export default Connection;
