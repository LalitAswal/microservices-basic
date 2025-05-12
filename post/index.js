const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

let post = {};
app.use(bodyParser.json());
app.use(cors());

app.get("/post", (req, res) => {
  const allPost = post;

  res.send({
    message: "All post list",
    response: allPost,
  });
});

app.post("/post", async (req, res) => {
  try {
    const id = randomBytes(6).toString("hex");
    const { title } = req.body;
  
    post[id] = { id, title };
  
    await axios.post(`http://localhost:4005/events`, {
      type: "CreatePost",
      data: {
        id,
        title,
      },
    });
  
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
