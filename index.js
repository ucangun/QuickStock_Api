"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const cors = require("cors");
const express = require("express");
const app = express();

/* ------------------------------------------------- */

// envVariables to process.env:
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------- */
// Configrations:

// DB Connection
const connectDB = require("./src/configs/dbConnection");
connectDB();

/* ------------------------------------------------- */
// Middlewares:

// Cors
const corsOptions = {
  origin: [process.env.CLIENT_URL],
  methods: ["GET", "POST", "PUT", "PATCH", "HEAD", "DELETE"],
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// Accept JSON:
app.use(express.json());

// res.getModelList():
app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------- */

// Routes:

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to QUICKSTOCK API",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
  });
});

// Routes:
app.use(require("./src/routes"));

/* ------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------------------- */

// RUN SERVER:
app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
