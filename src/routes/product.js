"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const product = require("../controllers/brand");
const permissions = require("../middlewares/permissions");
const idValidation = require("../middlewares/idValidation");

// URL: /products

router
  .route("/")
  .get(permissions.isLogin, product.list)
  .post(permissions.isLogin, product.create);

router
  .route("/:id")
  .all(idValidation)
  .get(permissions.isStaff, product.read)
  .put(permissions.isAdmin, product.update)
  .patch(permissions.isAdmin, product.update)
  .delete(permissions.isAdmin, product.delete);

/* ------------------------------------------- */
module.exports = router;
