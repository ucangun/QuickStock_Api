"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */
// Auth Controller:

const User = require("../models/user");
const Token = require("../models/token");
const { promisify } = require("util");
const CustomError = require("../errors/customError");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const { createSendToken } = require("../helpers/jwtFunctions");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    // 1) Check if username and password exist
    if (!username || !password) {
      throw new CustomError("Please provide email and password!", 400);
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new CustomError("Incorrect email or password", 401);
    }

    // 3) Check if user isActive
    if (!user.isActive) {
      throw new CustomError("This account is not active.", 401);
    }

    // 4) If everything ok, send token to client

    // TOKEN:
    let tokenData = await Token.findOne({ userId: user._id });
    console.log("Token FindOne Result:", tokenData);
    if (!tokenData)
      tokenData = await Token.create({
        userId: user._id,
        token: passwordEncrypt(user._id + Date.now()),
      });
    console.log("Token Create Result:", tokenData);

    // JWT:
    createSendToken(user, 200, tokenData, res);
  },
};
