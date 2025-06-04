const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/events", async (req, res) => {
  try {
    const event = req.body;
    console.log('req.path', req.path)
       await axios.post(`http://localhost:4000/events`, event)
      await axios.post(`http://localhost:4001/events`, event)
       await axios.post(`http://localhost:4002/events`, event)

    res.send({ status: "OK" });
  } catch (error) {
    console.log("err", error.message);
  }
});

app.listen(4005, () => {
  console.log("listen at 4005");
});
