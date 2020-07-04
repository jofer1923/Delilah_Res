const Sequelize = require("sequelize");
const { SequelizeScopeError } = require("sequelize");
const sequelize = new Sequelize("mysql://root@localhost:3307/delilahresto");
const { signsecure } = require("../routes/routesClient");
const jwt = require("jsonwebtoken");
const { response } = require("express");

function admInfo(req, res, next) {
  try {
    const tokn = req.headers.authorization.split(" ")[1];
    const { User_Id } = req.query;
    const toknver = jwt.verify(tokn, signsecure);
    sequelize
      .query(
        "SELECT Nick_Name, User_Id, admin FROM userservice WHERE Nick_Name = ? ",
        {
          replacements: [toknver.Nick_Name],
          type: sequelize.QueryTypes.SELECT,
        }
      )
      .then((response) => {
        if (
          response[0].Nick_Name === toknver.Nick_Name &&
          response[0].User_Id === parseInt(User_Id) &&
          response[0].admin === 1
        ) {
          return next();
        } else {
          return res.status(401).json({
            err: "The information entered does not exist, please sign up!",
          });
        }
      });
  } catch (err) {
    return res
      .status(400)
      .json({ err: "Incorrect credentials, please try again!" });
  }
}

function checkDish(req, res, next) {
  const { Long_Dish_Name, Short_Dish_Name } = req.body;
  sequelize
    .query("SELECT * FROM dishmenu WHERE Long_Dish_Name = ? ", {
      replacements: [Long_Dish_Name],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      if (response.length) {
        return res.status(409).json({
          message: "the dish you're trying to enter is already registered",
        });
      } else {
        sequelize
          .query("SELECT * FROM dishmenu WHERE Short_Dish_Name = ? ", {
            replacements: [Short_Dish_Name],
            type: sequelize.QueryTypes.SELECT,
          })
          .then((response) => {
            if (response.length) {
              return res.status(409).json({
                message:
                  "the dish you're trying to enter is already registered",
              });
            } else {
              return next();
            }
          });
      }
    });
}

function dishExt(req, res, next) {
  const { Dish_Id } = req.query;
  sequelize
    .query("SELECT * FROM  dishmenu WHERE Dish_Id = ?", {
      replacements: [Dish_Id],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      if (response.length) {
        return next();
      } else {
        return res.status(204).json({ message: "There are not disches" });
      }
    });
}

function orderEmpty(req, res, next) {
  const { Dish_Id_Def } = req.query;
  sequelize
    .query("SELECT * FROM  dishmenu WHERE Dish_Id_Def = ?", {
      replacements: [Dish_Id_Def],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      if (response.length) {
        return next();
      } else {
        return res.status(204).json({ message: "There are not orders" });
      }
    });
}

function orderExt(req, res, next) {
  const { User_Id_Def } = req.query;
  sequelize
    .query("SELECT * FROM  uservsorder WHERE User_Id_Def = ?", {
      replacements: [User_Id_Def],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      if (response.length) {
        return next();
      } else {
        return res.status(204).json({ message: "There are not orders" });
      }
    });
}

module.exports = { admInfo, checkDish, dishExt, orderEmpty, orderExt };
