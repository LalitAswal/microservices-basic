const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(bodyParser.json());
app.use(cors());

let commentByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;

  const comment = commentByPostId[postId] ?? [];
  return res.send({
    message: "comment list",
    response: comment,
  });
});
app.post("/posts/:id/comments", async(req, res) => {
  const commentId = randomBytes(6).toString("hex");
  const { content } = req.body;

  const comments = commentByPostId[req.params.id] || [];
  comments.push({ id: commentId, content:content });
  commentByPostId[req.params.id] = comments;

  await axios.post(`http://localhost:4005/events`, {
      type: "CreateComment",
      data: {
        id:commentId,
        content,
        postId: req.params?.id
      },
    });

  return res.status(201).send({
    message: "comment list",
    response: comments,
  });
});

app.post("/events", (req, res) => {
  console.log("Receive event", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log(`listen to port 4001`);
});
