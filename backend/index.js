import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerUser, loginUser } from "./controllers/user.controller.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  express.json({
    limit: "100mb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/api/users");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
