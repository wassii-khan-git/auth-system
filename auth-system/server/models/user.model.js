import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: { required: true, type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// store hash password before saving
userSchema.pre("save", async function (next) {
  // hash the password here
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const UserModel =
  mongoose.models.users || mongoose.model("users", userSchema);
