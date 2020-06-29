const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

const Admrouter = express.Router();
const sequelize = new Sequelize("mysql://root@localhost:3307/delilahresto");
const signsecure = "Accestoken2020";
const jwk = require("jsonwebtoken");

Admrouter.use(bodyParser());

Admrouter.post("/admin/newDish", (req, res) => {
  const {
    Long_Dish_Name,
    Short_Dish_Name,
    Picture_Dish,
    Price_Dish,
  } = req.body;
  const { User_Id } = req.query;
  sequelize
    .query(
      "INSERT INTO  dishmenu (Dish_Id, Long_Dish_Name,Short_Dish_Name,Picture_Dish,Price_Dish) VALUES (?,?,?,?,?)",
      {
        replacements: [
          null,
          Long_Dish_Name,
          Short_Dish_Name,
          Picture_Dish,
          Price_Dish,
        ],
      }
    )
    .then((response) => {
      res.status(201).json({
        message: "correct verification",
        platos: {
          Long_Dish_Name: Long_Dish_Name,
          Short_Dish_Name: Short_Dish_Name,
          Picture_Dish: Picture_Dish,
          Price_Dish: Price_Dish,
        },
      });
    });
});

module.exports = { Admrouter, signsecure };
