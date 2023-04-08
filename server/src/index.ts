import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/db";
import cors from "cors";

dotenv.config();

connect();

const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.send("OK");
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});