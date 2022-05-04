const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();

app.use(express.json());

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("APi is running!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log("Server Started "));
