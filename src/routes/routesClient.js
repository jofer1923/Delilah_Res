const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

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

router.post("/order", (req, res) => {
  const { Dish_Id, Paypss_Id } = req.body;
  const { User_Id } = req.query;
  sequelize.query("SET GLOBAL FOREIGN_KEY_CHECKS=0");
  sequelize
    .query(
      "INSERT INTO uservsorder (User_Id_Def,User_Id,Dish_Id,Paypss_Id,Id_Order_Status, UpdateDate) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
      {
        replacements: [null, User_Id, Dish_Id, Paypss_Id, 1],
      }
    )
    .then((response) => {
      res.status(201).json({ message: "authentication successful", response });
    });
});

router.put("/user/information", (req, res) => {
  const { Nick_Name, User_Name, Mail, Contact, Location, Pwd } = req.body;
  const { User_Id } = req.query;
  sequelize
    .query(
      "UPDATE userservice SET Nick_Name = ?, User_Name = ?, Mail = ?, Contact = ?, Location = ?, Pwd = ? WHERE User_Id = ? ",
      {
        replacements: [
          Nick_Name,
          User_Name,
          Mail,
          Contact,
          Location,
          Pwd,
          User_Id,
        ],
      }
    )
    .then((response) => {
      res.status(201).json({ message: "Information updated successfully" });
    });
});

router.delete("/user/information", (req, res) => {
  res.status(400).json({ message: "Incorrect credentials, please try again!" });
});

module.exports = { router, signsecure };
