import dotenv from "dotenv";

import mongoose from "mongoose";
import redis from "redis";
import jwt from "jsonwebtoken";

import User from "./user.js";

dotenv.config();

const mongoUri = process.env.MONGO_URI;
const redisUrl = process.env.REDIS_URL;
const jwtSecret = process.env.JWT_SECRET;

const redisClient = redis.createClient({
  url: redisUrl,
});

async function runService() {
  const emails = await redisClient.keys("*");
  let processed = 0;

  for (const email of emails) {
    const user = await User.findOne({ email });
    if (!user) continue;

    const code = await redisClient.get(email);
    for (const token of user.unverified) {
      const payload = jwt.verify(token, jwtSecret);
      if (payload.code !== code) continue;
      
      user.verified.push(token);
      user.unverified = user.unverified.filter(t => t !== token);
    }

    await user.save();
    await redisClient.del(email);
    processed++;
  }

  if (processed) {
    console.log(`Processed ${processed} verification codes.`);
  }
}

async function cronJob() {
  await mongoose.connect(mongoUri);
  await redisClient.connect();
  
  console.log("Connected to MongoDB and Redis");

  await runService();

  mongoose.disconnect();
  redisClient.close();
  
  console.log("Disconnected from MongoDB and Redis");
}

cronJob();

