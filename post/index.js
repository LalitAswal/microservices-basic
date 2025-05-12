const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
let post = {};
app.use(bodyParser.json());

app.get("/post", (req, res) => {
  const allPost = post;
  console.log('checking post', post)
  res.send({
    message: "All post list",
    response: allPost,
  });
});

app.post("/post", async (req, res) => {
  try {
  console.log('checking post saving')

    const id = randomBytes(6).toString("hex");
    const { title } = req.body;
    console.log('checking post', title, id)
  
    post[id] = { id, title };
    const result = await axios.post(`http://localhost:4005/events`, {
      type: "CreatePost",
      data: {
        id,
        title,
      },
    });
    console.log(`result`, result)
    res.status(201).send({
      message: " post save successfully",
      response: {},
    });
    
  } catch (error) {
    console.log('err', error)
  }

});


app.post("/events", (req, res)=>{
  console.log('Receive event', req.body.type)
  res.send({})
})

app.listen(4000, () => {
  console.log(`listening at 4000`);
});
