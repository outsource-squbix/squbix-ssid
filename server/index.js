// Entry point

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./routes/auth");
const user = require("./routes/userDetail");
const post = require("./routes/post");
const db = require("./utils/db");
const app = express();

app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/auth", auth);
app.use("/posts", post);
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("Hi, you are the base endpoint");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
