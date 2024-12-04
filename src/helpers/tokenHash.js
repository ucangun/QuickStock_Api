"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const { pbkdf2Sync } = require("crypto"),
  keyCode = process.env.SECRET_KEY,
  loopCount = process.env.LOOP_COUNT,
  charCount = process.env.CHAR_COUNT,
  encType = process.env.CHAR_COUNT;

module.exports = function (password) {
  return pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString(
    "hex"
  );
};
