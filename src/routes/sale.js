"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const sale = require("../controllers/brand");
const permissions = require("../middlewares/permissions");
const idValidation = require("../middlewares/idValidation");

// URL: /sales

router
  .route("/")
  .get(permissions.isLogin, sale.read)
  .post(permissions.isLogin, sale.create);

router
  .route("/:id")
  .all(idValidation)
  .get(permissions.isLogin, sale.read)
  .put(permissions.isLogin, sale.update)
  .patch(permissions.isLogin, sale.update)
  .delete(permissions.isAdmin, sale.delete);

/* ------------------------------------------- */
module.exports = router;
