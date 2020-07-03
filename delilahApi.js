const express = require("express");
const server = express();

const { router } = require("./src/routes/routesClient");
const { Admrouter } = require("./src/routes/routesAdmin");
const bodyParser = require("body-parser");
const {
  badrequest,
  userexist,
  loginverification,
  dishver,
  toknverification,
  userInfo,
} = require("./src/middlewares/middlewaresClient");

const {
  admInfo,
  checkDish,
  dishExt,
} = require("./src/middlewares/middlewaresAdmin");

server.use(bodyParser());

server.listen(3000, () => {
  console.log("port is running on port 3000");
});

////////////Endpoints User && Admin////////////////
server.post("/login", loginverification, router);

server.get("/dishes", toknverification, dishver, router);

///////////////EndPoints User/////////////////////
server.post("/register", badrequest, userexist, router);

server.get("/user/information", toknverification, userInfo, router);

server.post("/order", toknverification, userInfo, dishver, router);

server.put("/user/information", toknverification, userInfo, router);

server.delete("/user/information", router);

/////////////////EndPoints Admin///////////////////
server.post("/admin/newDish", admInfo, checkDish, Admrouter);

server.get("/admin/order", admInfo, dishExt, Admrouter);
