import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import { Server } from "socket.io";

import connectDB from "./Config/db.js";

import userRoutes from "./Routes/userRoutes.js";
import boardRoutes from "./Routes/boardRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);



// SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});



// SOCKET CONNECTION
io.on("connection", (socket) => {

  console.log("User Connected");



  // JOIN BOARD ROOM
  socket.on("joinBoard", (boardId) => {

    socket.join(boardId);

    console.log(
      `Joined board ${boardId}`
    );
  });




  // TYPING
  socket.on("typing", (data) => {

    socket.to(data.boardId).emit(
      "typing",
      data
    );
  });




  // DISCONNECT
  socket.on("disconnect", () => {

    console.log("User Disconnected");
  });
});



// MIDDLEWARE
app.use(cors());

app.use(express.json());



// PASS IO TO CONTROLLERS
app.use((req, res, next) => {

  req.io = io;

  next();
});



// ROUTES
app.use("/api/users", userRoutes);

app.use("/api/boards", boardRoutes);

app.use("/api/tasks", taskRoutes);



// TEST ROUTE
app.get("/", (req, res) => {

  res.send("Server Running");
});



// SERVER
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );
});