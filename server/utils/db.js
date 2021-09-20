// Utility function for connecting to the database

const mongoose = require("mongoose");

const db = mongoose
  .connect(
    `mongodb+srv://${process.env.DB_HOST}:${process.env.DB_KEY}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to Database");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

module.exports = db;
