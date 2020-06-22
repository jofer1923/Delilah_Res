const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root@localhost:3307/delilahresto");

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

module.exports = { badrequest, userexist };
