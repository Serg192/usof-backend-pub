require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const db = require("./models");

const PORT = 4545;

const authRoute = require("./routes/authentication");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categories = require("./routes/categories");
const comments = require("./routes/comments");

const verifyJWTMid = require("./middleware/verify-jwt");

const staticFilesDirectory = path.join(__dirname, "upload");
app.use(express.static(staticFilesDirectory));

var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    callback(null, true);
  },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth/", authRoute);
app.use("/api/users/", usersRoute);
app.use("/api/posts/", postsRoute);
app.use("/api/categories", categories);
app.use("/api/comments", comments);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
