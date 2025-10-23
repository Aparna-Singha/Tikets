import { config as configEnv } from 'dotenv';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authMiddleware from '#middlewares/auth.js';
import cookiesMiddleware from '#middlewares/cookies.js';

import apiRouter from '#routes/index.js';

configEnv();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

const app = express();

app.use(cors({
  credentials: true,
  origin: (_, callback) => {
    callback(null, true);
  },
}));

app.use(express.json());
app.use(cookieParser());

app.use(cookiesMiddleware);
app.use(authMiddleware);

app.use(apiRouter);

mongoose.connect(MONGO_URI).then(() => {
  console.log("Mongo Connection Successful");
});

app.listen(PORT, () => console.log('Server started.'));

