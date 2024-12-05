"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Token = require("../models/token");

module.exports = async (req, res, next) => {
  req.user = null;

  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      // SimpleToken

      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      );
      req.user = tokenData ? tokenData.userId : null;
    } else if (tokenKey[0] == "Bearer") {
      // JWT

      const decoded = await promisify(jwt.verify)(
        tokenKey[1],
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return res.status(401).json({
          status: "fail",
          message: "The user belonging to this token no longer exists.",
        });
      }

      req.user = currentUser;
    }
  }
  next();
};
