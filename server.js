require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
//router
app.use("/", require("./router/router"));
//Listen port
const PORT = 5000;
try {
  app.listen(PORT, () => {
    console.log("App is running on port", PORT);
  });
} catch (error) {
  console.log("ERROR");
}

//connect to mongoose
const URI = process.env.MONGODB;
try {
  mongoose.connect(URI, {
    autoIndex: true,
  });
  console.log("connected to mongoDB");
} catch (error) {
  console.log("connected ERROR!");
}
