const express = require("express");
const mongoose = require("mongoose");

const app = express();

function connectToDB() {
  mongoose
    .connect("mongodb+srv://akshvt:Akshat123@cluster0.n2qghld.mongodb.net/day-6")
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.error("Database connection failed:", err);
    });
}

connectToDB();

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});