import Board from "../Models/boardModel.js";



// CREATE BOARD
export const createBoard = async (
  req,
  res
) => {

  try {

    const { title } = req.body;

    const board = await Board.create({
      title,

      createdBy: req.user._id,

      members: [req.user._id],
    });

    res.status(201).json(board);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};




// GET ALL BOARDS
export const getBoards = async (
  req,
  res
) => {

  try {

    const boards = await Board.find({
      members: req.user._id,
    });

    res.json(boards);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};




// GET SINGLE BOARD
export const getBoardById = async (
  req,
  res
) => {

  try {

    const board = await Board.findById(
      req.params.id
    )
      .populate("members", "name email");



    if (!board) {

      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.json(board);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};