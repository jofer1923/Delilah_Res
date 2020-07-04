const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

const Admrouter = express.Router();
const sequelize = new Sequelize("mysql://root@localhost:3307/delilahresto");
const signsecure = "Accestoken2020";
const jwk = require("jsonwebtoken");
const { response } = require("express");

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

Admrouter.get("/admin/dish", (req, res) => {
  const { Dish_Id } = req.query;
  sequelize
    .query("SELECT * FROM dishmenu WHERE Dish_Id = ?", {
      replacements: [Dish_Id],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      res.json({ message: "authentication successful", response });
    });
});

Admrouter.get("/admin/orders", (req, res) => {
  const { Dish_Id_Def } = req.query;
  sequelize
    .query("SELECT * FROM uservsorder", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      res.json({ message: "authentication successful", response });
    });
});

Admrouter.get("/admin/order", (req, res) => {
  const { User_Id_Def } = req.query;
  sequelize
    .query("SELECT * FROM uservsorder WHERE User_Id_Def = ?", {
      replacements: [User_Id_Def],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      res.json({ message: "authentication successful", response });
    });
});

Admrouter.put("/admin/order", (req, res) => {
  const { User_Id, Dish_Id, Paypss_Id, Id_Order_Status } = req.body;
  const { User_Id_Def } = req.query;
  sequelize
    .query(
      "UPDATE uservsorder SET User_Id = ?,Dish_Id = ?,Paypss_Id = ?,Id_Order_Status = ?, UpdateDate = CURRENT_TIMESTAMP WHERE   User_Id_Def= ? ",
      {
        replacements: [
          User_Id,
          Dish_Id,
          Paypss_Id,
          Id_Order_Status,
          User_Id_Def,
        ],
      }
    )
    .then((response) => {
      res.json({
        message:
          "Admin has been authenticated and the order status was updated successfully",
        response,
      });
    });
});

Admrouter.put("/admin/dish", (req, res) => {
  const {
    Long_Dish_Name,
    Short_Dish_Name,
    Picture_Dish,
    Price_Dish,
  } = req.body;
  const { Dish_Id } = req.query;
  sequelize
    .query(
      "UPDATE dishmenu SET Long_Dish_Name = ?,Short_Dish_Name = ?,Picture_Dish = ?,Price_Dish = ? WHERE   Dish_Id= ? ",
      {
        replacements: [
          Long_Dish_Name,
          Short_Dish_Name,
          Picture_Dish,
          Price_Dish,
          Dish_Id,
        ],
      }
    )
    .then((response) => {
      res.json({
        message:
          "Admin has been authenticated and the dish was updated successfully",
        response,
      });
    });
});

Admrouter.delete("/admin/dish", (req, res) => {
  const { Dish_Id } = req.query;
  sequelize
    .query("DELETE FROM dishmenu WHERE Dish_Id = ?", {
      replacements: [Dish_Id],
    })
    .then((response) => {
      res.json({ message: "Dish deleted successfuly", response });
    });
});

Admrouter.delete("/admin/order", (req, res) => {
  const { User_Id_Def } = req.query;
  sequelize
    .query("DELETE FROM uservsorder WHERE User_Id_Def = ?", {
      replacements: [User_Id_Def],
    })
    .then((response) => {
      res.json({ message: "Order deleted successfuly", response });
    });
});

module.exports = { Admrouter, signsecure };
