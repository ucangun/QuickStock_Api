"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
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
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// Accept JSON:
app.use(express.json());

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/", limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// Run Logger:
// app.use(require("./src/middlewares/logger"));

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
