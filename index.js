"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const express = require("express");
const app = express();
const connectDB = require("./src/configs/dbConnection");

/* ------------------------------------------------- */

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

/* ------------------------------------------------- */

// DB Connection
connectDB();

/* ------------------------------------------------- */

// RUN SERVER:
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
