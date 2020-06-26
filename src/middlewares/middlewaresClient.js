const Sequelize = require("sequelize");
const { SequelizeScopeError } = require("sequelize");
const sequelize = new Sequelize("mysql://root@localhost:3307/delilahresto");
const { signsecure } = require("../routes/routesClient");
const jwt = require("jsonwebtoken");

function badrequest(req, res, next) {
  const { Nick_Name, User_Name, Mail, Contact, Location, Pwd } = req.body;
  if (
    typeof Nick_Name === "string" &&
    typeof User_Name === "string" &&
    typeof Mail === "string" &&
    typeof Contact === "string" &&
    typeof Location === "string" &&
    typeof Pwd === "string"
  ) {
    if (
      Nick_Name.length > 5 &&
      Nick_Name.length <= 12 &&
      User_Name.length > 5 &&
      User_Name.length <= 40 &&
      Mail.length > 8 &&
      Mail.length <= 70 &&
      Contact.length > 6 &&
      Contact.length <= 12 &&
      Location.length > 10 &&
      Location.length <= 50 &&
      Pwd.length > 10 &&
      Pwd.length <= 75
    ) {
      return next();
    } else {
      return res.status(400).json("bad request");
    }
  } else {
    return res.status(400).json("bad requestttt");
  }
}

function userexist(req, res, next) {
  const { Nick_Name, Mail } = req.body;
  sequelize
    .query("SELECT Nick_Name FROM userservice WHERE Nick_Name = ? ", {
      replacements: [Nick_Name],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      if (response.length) {
        return res.status(409).json("user already exist");
      } else {
        sequelize
          .query("SELECT Mail FROM userservice WHERE Mail = ? ", {
            replacements: [Mail],
            type: sequelize.QueryTypes.SELECT,
          })
          .then((response) => {
            if (response.length) {
              return res.status(409).json("mail already exist");
            } else {
              return next();
            }
          });
      }
    });
}

function loginverification(req, res, next) {
  const { Nick_Name, Pwd } = req.body;
  sequelize
    .query("SELECT Nick_Name FROM userservice WHERE Nick_Name = ? ", {
      replacements: [Nick_Name],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      if (response.length) {
        sequelize
          .query("SELECT Pwd FROM userservice WHERE Pwd = ? ", {
            replacements: [Pwd],
            type: sequelize.QueryTypes.SELECT,
          })
          .then((response) => {
            if (response.length) {
              return next();
            } else {
              return res
                .status(400)
                .json({ err: "Incorrect credentials, please try again" });
            }
          });
      } else {
        return res
          .status(400)
          .json({ err: "Incorrect credentials, please try again" });
      }
    });
}

function dishver(req, res, next) {
  sequelize
    .query("SELECT * FROM dishmenu", { type: sequelize.QueryTypes.SELECT })
    .then((response) => {
      if (response.length) {
        return next();
      } else {
        return res.status(204).json({ err: "There are not disches" });
      }
    });
}

function toknverification(req, res, next) {
  try {
    const tokn = req.headers.authorization.split(" ")[1];
    const toknver = jwt.verify(tokn, signsecure);
    if (toknver) {
      req.Nick_Name = toknver;
      return next();
    }
  } catch (err) {
    return res
      .status(400)
      .json({ err: "Incorrect credentials, please try again!" });
  }
}

function userInfo(req, res, next) {
  try {
    const tokn = req.headers.authorization.split(" ")[1];
    const { User_Id } = req.query;
    const toknver = jwt.verify(tokn, signsecure);
    sequelize
      .query(
        "SELECT Nick_Name, User_Id FROM userservice WHERE Nick_Name = ? ",
        {
          replacements: [toknver.Nick_Name],
          type: sequelize.QueryTypes.SELECT,
        }
      )
      .then((response) => {
        console.log(response[0].Nick_Name);
        console.log(toknver.Nick_Name);
        console.log(response[0].User_Id);
        console.log(User_Id);
        if (
          response[0].Nick_Name === toknver.Nick_Name &&
          response[0].User_Id === parseInt(User_Id)
        ) {
          console.log("entro al if");
          return next();
        } else {
          console.log("entro en el else");
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

module.exports = {
  signsecure,
  badrequest,
  userexist,
  loginverification,
  dishver,
  toknverification,
  userInfo,
};
