
const Redis = require("ioredis");
console.log("HOST:", process.env.REDIS_HOST);
console.log("PORT:", process.env.REDIS_PORT);
console.log("PASSWORD:", process.env.REDIS_PASSWORD ? "exists" : "MISSING");

console.log("HOST:", process.env.REDIS_HOST);
console.log("PORT:", process.env.REDIS_PORT);
console.log(
  "PASSWORD:",
  process.env.REDIS_PASSWORD ? "exists" : "MISSING"
);

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Connected to Redis");
})

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = redis;