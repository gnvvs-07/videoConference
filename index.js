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

app.get("/", (req, res) => {
  res.send("Server running");
});

// io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    socket.broadcast.emit("connection cancelled");
  });

  // User calling method
  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    console.log("Calling user:", userToCall);
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  // User accepting method
  socket.on("answercall", ({ to, signal }) => {
    console.log("Answering call for:", to);
    io.to(to).emit("answercall", signal);
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
