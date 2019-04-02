const helper = require("./data/helpers/userModel");

function protected(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ message: "you shall not pass!!" });
}

module.exports = { protected };
