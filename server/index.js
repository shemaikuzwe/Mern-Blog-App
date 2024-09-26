const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./db/conn");
const authRouter = require("./routes/authRouter");
const blogRouter = require("./routes/blogRoute");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use("/api/blogs/", blogRouter);
app.use("/auth", authRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
