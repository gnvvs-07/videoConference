import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create the HTTP server
const server = http.createServer(app);

// Create the io instance
const io = new Server(server, {
  cors: {
    origin: "*", // You can specify your frontend URL here for better security
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res, next) => {
  res.send("server running");
});

// io connection
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.broadcast.emit("connection cancelled");
  });

  // user calling method
  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    console.log("user calling method");
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  // user accepting method
  socket.on("answercall", (data) => {
    console.log("user accepting method");
    io.to(data.to).emit("answercall", data.signal);
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
