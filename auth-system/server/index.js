import express from "express";
import cors from "cors";
import Connection from "./database/connection.js";
import authRoute from "./routes/auth.route.js";

// app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// databse connection
await Connection();

// router login
app.use("/api", authRoute);

// app setup
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
