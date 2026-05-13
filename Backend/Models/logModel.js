import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    executionTime: Number,

    status: String,

    errorMessage: String,
  },

  { timestamps: true }
);

const WorkerLog =
  mongoose.model("WorkerLog", logSchema);

export default WorkerLog;