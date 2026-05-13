import mongoose from "mongoose";

const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: String,

      priority: {
        type: String,
        default: "Medium",
      },

      status: {
        type: String,
        default: "Todo",
      },

      board: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true,
      },
    },

    {
      timestamps: true,
    }
  );

const Task =
  mongoose.model(
    "Task",
    taskSchema
  );

export default Task;