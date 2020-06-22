const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const { response } = require("express");
const router = express.Router();
const sequelize = new Sequelize("mysql://root@localhost:3307/delilahresto");
const signsecure = "Accestoken2020";
const jwk = require("jsonwebtoken");

router.use(bodyParser());

// router.get("/prueba", (req, res) => {
//     .query("SELECT * FROM userservice", {
//       type: sequelize.QueryTypes.SELECT,
//     })
//     .then((response) => res.json(console.log(response)));
// });

router.post("/register", (req, res) => {
  const { Nick_Name, User_Name, Mail, Contact, Location, Pwd } = req.body;
  sequelize.query(
    "INSERT INTO userservice (User_Id,Nick_Name,User_Name,Mail,Contact,Location, Pwd) VALUES (?,?,?,?,?,?,?)",
    { replacements: [null, Nick_Name, User_Name, Mail, Contact, Location, Pwd] }
  );
  res.status(201).json("user was created");
});

router.post("/login", (req, res) => {
  const { Nick_Name } = req.body;
  const tokn = jwk.sign({ Nick_Name }, signsecure);
  res.json({ tokn });
});

module.exports = router;
