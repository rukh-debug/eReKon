import dotenv from "dotenv";
dotenv.config(
  {
    path: ".env"
  }
);

import express from "express";

import { connect } from "./config/db";
import cors from "cors";

import { routes } from "./routes";

try {
  (async () => {
    try {
      await connect();
    } catch (error) {
      console.log(error);
    }
  })();
} catch (error) {
  console.log(error);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
// set static dir
app.use(
  express.static("static", {
    index: false,
    maxAge: 86400000
  })
)

const port = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.send("OK");
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});