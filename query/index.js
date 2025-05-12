const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const post = {};

app.post("/post", (req, res) => {
  res.send({post});
});
app.post("/event", (req, res) => {
  const { id, data } = req.body;
  if (type === "CreatePost") {
    post[id] = { id, title, Comment: [] };
  }
  if (type === "CreateComment") {
    const { id, content, postId } = data;

    const post = post[postId];
    post.Comment.push({ id, content });
  }

  res.send({});
});

app.listen(4002, () => {
  console.log("app is running at 4002");
});
