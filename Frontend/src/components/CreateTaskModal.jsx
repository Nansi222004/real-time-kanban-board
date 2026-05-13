import { useState } from "react";
import axios from "axios";

function CreateTaskModal({
  closeModal,
  boardId,
  token,
}) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "Todo",
  });

  const [loading, setLoading] =
    useState(false);



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };



  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.post(

        "http://localhost:5000/api/tasks",

        {
          ...form,
          board: boardId,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );



      closeModal();

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };



  return (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >

      <div
        style={{
          width: "420px",
          background: "white",
          borderRadius: "16px",
          padding: "25px",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            color: "#1e293b",
          }}
        >
          Create New Task
        </h2>



        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}

            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border:
                "1px solid #cbd5e1",
            }}
          />



          <textarea
            name="description"
            placeholder="Task Description"
            value={
              form.description
            }
            onChange={handleChange}

            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border:
                "1px solid #cbd5e1",
              height: "100px",
            }}
          />



          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}

            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border:
                "1px solid #cbd5e1",
            }}
          >

            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>

          </select>



          <select
            name="status"
            value={form.status}
            onChange={handleChange}

            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "10px",
              border:
                "1px solid #cbd5e1",
            }}
          >

            <option value="Todo">
              Todo
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Review">
              Review
            </option>

            <option value="Done">
              Done
            </option>

          </select>



          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
            }}
          >

            <button
              type="button"

              onClick={
                closeModal
              }

              style={{
                padding:
                  "12px 22px",
                border: "none",
                borderRadius:
                  "10px",
                background:
                  "#e2e8f0",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>



            <button
              type="submit"

              disabled={loading}

              style={{
                padding:
                  "12px 22px",
                border: "none",
                borderRadius:
                  "10px",
                background:
                  "#2563eb",
                color: "white",
                cursor: "pointer",
              }}
            >
              {
                loading
                  ? "Creating..."
                  : "Create Task"
              }
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateTaskModal;