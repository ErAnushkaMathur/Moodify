const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");  
const path = require("path");

const app = express();

app.use(cors({                  
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/songs", express.static(path.join(__dirname, "../public/songs")));


const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const songRoutes = require("./routes/song.routes");
app.use("/api/songs", songRoutes);

module.exports = app;