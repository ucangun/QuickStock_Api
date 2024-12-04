"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const jwt = require("jsonwebtoken");

const signAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, tokenData, res) => {
  const access = signAccessToken(user._id);
  const refresh = signRefreshToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    error: "false",
    token: tokenData.token,
    bearer: {
      access,
      refresh,
    },
    user,
  });
};

module.exports = { signAccessToken, signRefreshToken, createSendToken };
