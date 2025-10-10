// config/redis.js
import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://127.0.0.1:6379", // change if running remotely
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect();

export { redisClient };
