// Entry point

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./routes/auth");
const post = require("./routes/post");
const db = require("./utils/db");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", auth);
app.use("/posts", post);

app.get("/", (req, res) => {
  res.send("Hi, you are the base endpoint");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
