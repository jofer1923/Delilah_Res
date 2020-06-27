const express = require("express");
const server = express();

const { router } = require("./src/routes/routesClient");
const bodyParser = require("body-parser");
const {
  badrequest,
  userexist,
  loginverification,
  dishver,
  toknverification,
  userInfo,
} = require("./src/middlewares/middlewaresClient");

server.use(bodyParser());

server.listen(3000, () => {
  console.log("port is running on port 3000");
});

// server.get("/prueba", userservice);

server.post("/register", badrequest, userexist, router);

server.post("/login", loginverification, router);

server.get("/dishes", toknverification, dishver, router);

server.get("/user/information", toknverification, userInfo, router);

server.post("/order", toknverification, userInfo, dishver, router);
