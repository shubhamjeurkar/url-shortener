require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./src/db/connect');

const urlRouter = require('./src/routers/URL');

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/", urlRouter);
app.get("/api/health-check", (req, res) => {
 res.status(200).send("Get Short Urls ");
});

const start = async () => {
 try {

  await connectDB(process.env.MONGO_URI);
  
  app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
  })
 } catch (error) {
  console.log(error);
 }
}

start();




