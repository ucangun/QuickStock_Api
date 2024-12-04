"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */
// Auth Controller:

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");
const { promisify } = require("util");
const CustomError = require("../errors/customError");
const tokenHash = require("../helpers/tokenHash");
const { createSendToken, signAccessToken } = require("../helpers/jwtFunctions");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get Token and JWT.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

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
    if (!tokenData)
      tokenData = await Token.create({
        userId: user._id,
        token: tokenHash(user._id + Date.now()),
      });

    // JWT:
    createSendToken(user, 200, tokenData, res);
  },

  refresh: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'JWT: Refresh'
            #swagger.description = 'Refresh access-token by refresh-token.'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    bearer: {
                        refresh: '___refreshToken___'
                    }
                }
            }
        */

    const refreshToken = req.body?.bearer?.refreshToken;

    if (!refreshToken) {
      throw new CustomError("Refresh token is required.", 401);
    }

    const decoded = await promisify(jwt.verify)(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    if (
      !decoded ||
      !decoded.iat ||
      !decoded.exp ||
      Date.now() / 1000 > decoded.exp
    ) {
      return next(
        new AppError("Refresh token has expired or is invalid.", 401)
      );
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError("User no longer exists.", 404));
    }

    const newAccessToken = signAccessToken(user._id);

    res.status(200).json({
      error: "false",
      bearer: {
        accessToken: newAccessToken,
      },
    });
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Token: Logout"
            #swagger.description = 'Delete token-key.'
        */

    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;

    let message = null,
      result = {};

    if (tokenKey) {
      if (tokenKey[0] == "Token") {
        // SimpleToken
        result = await Token.deleteOne({ token: tokenKey[1] });
        message = "Token deleted. Logout was OK.";
      } else {
        // JWT
        message = "No need any process for logout. You must delete JWT tokens.";
      }
    }

    res.send({
      error: false,
      message,
      result,
    });
  },
};
