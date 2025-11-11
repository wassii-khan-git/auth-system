import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

// Login controller
export async function SignupController(req, res) {
  // extract the username and password
  const { email, password } = req.body;
  console.log("req body--", req.body);

  // perform validation
  if (!email && !password) {
    return res
      .status(400)
      .send({ message: "Username and Password are required" });
  }

  // check if already exists
  const user = await UserModel.findOne({ email });

  if (user) {
    return res.status(409).send({ message: "User email already exists" });
  }

  // create new record
  const newUser = await UserModel.create({ email, password });

  // check in the database
  return res
    .status(200)
    .send({ success: true, message: "Signup successful", user: newUser });
}

// Login controller
export async function LoginController(req, res) {
  // extract the username and password
  const { email, password } = req.body;
  console.log("req body--", req.body);

  // perform validation
  if (!email && !password) {
    return res
      .status(400)
      .send({ message: "Username and Password are required" });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).send({ message: "Account not found.." });
  }

  // check for the password
  const userPassword = await bcrypt.compare(password, user.password);

  if (!userPassword) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  // generate jwt token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    "fksdajhf2342sdafs213413", // jwt key
    { expiresIn: "1d" }
  );

  return res.status(200).send({ message: "Login successful", token, user });
}
