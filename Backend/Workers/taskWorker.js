import taskQueue from "../Queue/taskQueue.js";

import Task from "../Models/taskModel.js";

import WorkerLog from "../Models/logModel.js";



taskQueue.process(async (job) => {

  const start = Date.now();

  try {

    const task = await Task.findById(
      job.data.taskId
    );

    if (!task) return;

    task.status = "running";

    await task.save();




    // SIMULATE TASK
    console.log(
      `Processing ${task.type}`
    );



    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );



    task.status = "completed";

    task.completedAt = new Date();

    await task.save();




    await WorkerLog.create({
      taskId: task._id,
      executionTime:
        Date.now() - start,
      status: "completed",
    });




    return {
      success: true,
    };

  } catch (error) {

    console.log(error);

    throw error;
  }
});