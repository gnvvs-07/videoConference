import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

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

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
