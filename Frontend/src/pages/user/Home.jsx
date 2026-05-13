import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#2563eb,#7c3aed)",
        color: "white",
      }}
    >

      {/* NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 60px",
        }}
      >

        <h2
          style={{
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          SyncBoard
        </h2>



        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >

          <button
            onClick={() =>
              navigate("/login")
            }

            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: "white",
              color: "#2563eb",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Login
          </button>



          <button
            onClick={() =>
              navigate("/signup")
            }

            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              border: "1px solid white",
              cursor: "pointer",
              background: "transparent",
              color: "white",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Signup
          </button>

        </div>

      </div>



      {/* HERO SECTION */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          marginTop: "100px",
          padding: "20px",
        }}
      >

        <h1
          style={{
            fontSize: "60px",
            maxWidth: "850px",
            lineHeight: "1.2",
            fontWeight: "bold",
          }}
        >
          Real-Time Collaborative
          Kanban Board
        </h1>



        <p
          style={{
            marginTop: "25px",
            maxWidth: "700px",
            fontSize: "20px",
            lineHeight: "1.8",
            color: "#e2e8f0",
          }}
        >
          Manage tasks, collaborate with
          your team, and track project
          progress in real time using
          Socket.io powered updates.
        </p>



        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
          }}
        >

          <button
            onClick={() =>
              navigate("/signup")
            }

            style={{
              padding: "15px 35px",
              borderRadius: "12px",
              border: "none",
              background: "white",
              color: "#2563eb",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            Get Started
          </button>



          <button
            onClick={() =>
              navigate("/login")
            }

            style={{
              padding: "15px 35px",
              borderRadius: "12px",
              border: "1px solid white",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            Login
          </button>

        </div>

      </div>



      {/* FEATURES */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "120px",
          flexWrap: "wrap",
          paddingBottom: "80px",
        }}
      >

        <div
          style={{
            width: "300px",
            background:
              "rgba(255,255,255,0.12)",
            padding: "30px",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3>⚡ Real-Time Updates</h3>

          <p
            style={{
              marginTop: "15px",
              lineHeight: "1.7",
            }}
          >
            Instant task synchronization
            using Socket.io.
          </p>
        </div>



        <div
          style={{
            width: "300px",
            background:
              "rgba(255,255,255,0.12)",
            padding: "30px",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3>📋 Smart Task Management</h3>

          <p
            style={{
              marginTop: "15px",
              lineHeight: "1.7",
            }}
          >
            Organize tasks with Todo,
            Review, Progress and Done
            columns.
          </p>
        </div>



        <div
          style={{
            width: "300px",
            background:
              "rgba(255,255,255,0.12)",
            padding: "30px",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3>👥 Team Collaboration</h3>

          <p
            style={{
              marginTop: "15px",
              lineHeight: "1.7",
            }}
          >
            Invite members and collaborate
            with live updates.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Home;