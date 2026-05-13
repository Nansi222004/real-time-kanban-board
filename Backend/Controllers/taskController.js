import Task from "../Models/taskModel.js";



// CREATE TASK
export const createTask =
  async (req, res) => {

    try {

      console.log(req.body);

      const {
        title,
        description,
        priority,
        status,
        board,
      } = req.body;

      if (!title || !board) {

        return res.status(400).json({
          message:
            "Title and Board required",
        });
      }

      const task =
        await Task.create({
          title,
          description,
          priority,
          status,
          board,
        });

      res.status(201).json(task);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };



// GET TASKS
export const getBoardTasks =
  async (req, res) => {

    try {

      const tasks =
        await Task.find({
          board:
            req.params.boardId,
        });

      res.json(tasks);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };