const express = require("express");
const server = express();
const routeruser = require("./src/routes/routesClient");
const bodyParser = require("body-parser");
const {
  badrequest,
  userexist,
} = require("./src/middlewares/middlewaresClient");

server.use(bodyParser());

server.listen(3000, () => {
  console.log("port is running on port 3000");
});

// server.get("/prueba", userservice);

server.post("/register", badrequest, userexist, routeruser);
