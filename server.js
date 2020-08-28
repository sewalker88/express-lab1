"use strict";

const express = require("express");
const bodyParser = require("body-parser"); // don't need
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(cors());

app.use(bodyParser.json()); // don't need

app.use("/", routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}.`);
});
