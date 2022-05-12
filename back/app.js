const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const { dirname } = require("path");
const userRoutes = require("./routes/user");
//connecting to database
mongoose
  .connect(
    "mongodb+srv://maryonBarbo:Clust3r123@cluster0.2texb.mongodb.net/Piiquante?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connection successful"))
  .catch(() => console.log("connection failed"));
//getting the body of the request
app.use(express.json());
//declaring headers so API communication works
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);

module.exports = app;
