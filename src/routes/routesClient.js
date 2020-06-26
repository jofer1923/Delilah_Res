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
  const {
    admin,
    Nick_Name,
    User_Name,
    Mail,
    Contact,
    Location,
    Pwd,
  } = req.body;
  sequelize.query(
    "INSERT INTO userservice (User_Id,admin, Nick_Name,User_Name,Mail,Contact,Location, Pwd) VALUES (?,?,?,?,?,?,?,?)",
    {
      replacements: [
        null,
        admin,
        Nick_Name,
        User_Name,
        Mail,
        Contact,
        Location,
        Pwd,
      ],
    }
  );
  res.status(201).json("user was created");
});

router.post("/login", (req, res) => {
  const { Nick_Name } = req.body;
  const tokn = jwk.sign({ Nick_Name }, signsecure);
  res.json({ tokn });
});

router.get("/dishes", (req, res) => {
  sequelize
    .query("SELECT * FROM dishmenu", { type: sequelize.QueryTypes.SELECT })
    .then((response) => res.json(response));
});

router.get("/user/information", (req, res) => {
  const { User_Id } = req.query;
  sequelize
    .query("SELECT * FROM userservice WHERE User_Id= ?", {
      replacements: [User_Id],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      res.json(response);
    });
});

module.exports = { router, signsecure };
