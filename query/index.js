const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const post = {};

app.get("/post", (req, res) => {
  console.log('tsting1 qery', post)
  res.send({post});
});
app.post("/events", (req, res) => {
  let { data, type } = req.body;
  console.log('rea, body', req.body)
  let id = data?.id;
  let title = data?.title;
  let content = data?.content;
  let postId = data?.postId;

  console.log('rea, type', type)
  if (type == "CreatePost") {
    console.log('tsting1 post CreatePost', post)
    
    post[id] = { id, title, Comment: [] };
  }
  if (type === "CreateComment") {
    console.log("post 30", post)
    const postItem = post[postId];
    if(postItem){
    post.Comment.push({ id, content });
    console.log("post 33", post)
    }
   

  }

  res.send({});
});

app.listen(4002, () => {
  console.log("app is running at 4002");
});
