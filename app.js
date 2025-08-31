require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./src/db/connect');
const authenticationMiddleware = require('./src/middleware/authenticate');

const urlRouter = require('./src/routers/urls');
const authRouter = require('./src/routers/auth');
const { redirectToLongURL } = require("./src/controllers/url");
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');


const PORT = 3000;

app.set('trust proxy', 1);
app.use(rateLimiter({
 windowMs: 15 * 60 * 1000,
 max: 100 
}));

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", authenticationMiddleware, urlRouter);
app.get("/:id", redirectToLongURL);
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




