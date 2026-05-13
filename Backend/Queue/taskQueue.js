import Queue from "bull";

const taskQueue = new Queue(
  "taskQueue",
  process.env.REDIS_URL
);

export default taskQueue;