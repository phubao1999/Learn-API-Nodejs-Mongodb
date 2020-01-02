const express = require("express");
const app = express();
const mongo = require("mongoose");
require("dotenv/config");
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');
const cors = require('cors');

// Connect To MongoDB.
mongo.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongo.connection;
if (!db) {
  console.log("Error Connecting Db");
} else {
  console.log("Db Is Connecting");
}
// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRouter);
// Routes
app.get("/", (req, res) => {
  res.send("We Are On Home");
});

app.listen(3000);
