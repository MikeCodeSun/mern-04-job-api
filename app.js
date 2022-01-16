const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connectDB");
const notFound = require("./middleware/not-found");
const userRouter = require("./routes/userRoute");
const jobRouter = require("./routes/jobRoute");
const authMiddleWare = require("./middleware/authorization");

const port = process.env.PORT;
const uri = process.env.URI;

const app = express();

app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1/jobs", authMiddleWare, jobRouter);

app.get("/", (req, res) => res.send("Home page"));

app.use(notFound);

const start = async () => {
  try {
    await connectDB(uri);
    app.listen(port, console.log(`server is running on port : ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
