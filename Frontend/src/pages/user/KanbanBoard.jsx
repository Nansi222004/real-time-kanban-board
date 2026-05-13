import "./KanbanBoard.css";
import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getBoardTasks,
  addTaskRealtime,
  moveTaskRealtime,
} from "../../features/task/taskSlice";

import socket from "../../socket/socket";

import CreateTaskModal from "../../components/CreateTaskModal";

function KanbanBoard() {

  const dispatch = useDispatch();

  const [showModal, setShowModal] =
    useState(false);

  const { tasks } = useSelector(
    (state) => state.tasks
  );

  const { userToken } =
    useSelector(
      (state) => state.user
    );

  // YOUR REAL BOARD ID
  const boardId =
    "6a043c15e4276ab103afbbe6";

  useEffect(() => {

    dispatch(
      getBoardTasks(boardId)
    );

    socket.emit(
      "joinBoard",
      boardId
    );

    socket.on(
      "taskCreated",
      (task) => {

        dispatch(
          addTaskRealtime(task)
        );
      }
    );

    socket.on(
      "taskMoved",
      (task) => {

        dispatch(
          moveTaskRealtime(task)
        );
      }
    );

    return () => {

      socket.off("taskCreated");

      socket.off("taskMoved");
    };

  }, [dispatch, boardId]);

  const columns = [
    "Todo",
    "In Progress",
    "Review",
    "Done",
  ];

  return (

    <div className="board-page">

      {/* NAVBAR */}
      <div className="board-navbar">

        <h2 className="logo">
          SyncBoard
        </h2>

        <div className="nav-right">

          <button
            className="add-btn"
            onClick={() =>
              setShowModal(true)
            }
          >
            + Add Task
          </button>

          <span className="welcome-text">
            Welcome 👋
          </span>

          <button
            className="logout-btn"
            onClick={() => {

              localStorage.removeItem(
                "userInfo"
              );

              window.location.href = "/";
            }}
          >
            Logout
          </button>

        </div>

      </div>

      {/* HEADING */}
      <div className="board-header">

        <h1>
          Team Kanban Board
        </h1>

        <p>
          Manage tasks and collaborate
          with your team in real time.
        </p>

      </div>

      {/* BOARD */}
      <div className="board-columns">

        {
          columns.map((column) => (

            <div
              key={column}
              className="column"
            >

              {/* COLUMN HEADER */}
              <div className="column-header">

                <h3>
                  {column}
                </h3>

                <span className="task-count">

                  {
                    tasks.filter(
                      (task) =>
                        task.status &&
                        task.status.toLowerCase() ===
                        column.toLowerCase()
                    ).length
                  }

                </span>

              </div>

              {/* TASKS */}
              {
                tasks

                  .filter(
                    (task) =>
                      task.status &&
                      task.status.toLowerCase() ===
                      column.toLowerCase()
                  )

                  .map((task) => (

                    <div
                      key={task._id}
                      className="task-card"
                    >

                      <h4>
                        {task.title}
                      </h4>

                      <p>
                        {
                          task.description
                        }
                      </p>

                      <div className="task-footer">

                        <span className="priority">

                          {
                            task.priority
                          }

                        </span>

                        <span className="assigned">

                          {
                            task.assignedTo
                              ? task.assignedTo
                              : "Unassigned"
                          }

                        </span>

                      </div>

                    </div>
                  ))
              }

            </div>
          ))
        }

      </div>

      {/* MODAL */}
      {
        showModal && (

          <CreateTaskModal

            closeModal={() =>
              setShowModal(false)
            }

            boardId={boardId}

            token={userToken}

          />
        )
      }

    </div>
  );
}

export default KanbanBoard;