const express = require("express");

const connectDB = require("./db/connect");
const formRoutes = require("./routes/form");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use("/", express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use("/form", formRoutes);

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
