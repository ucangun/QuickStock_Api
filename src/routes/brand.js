"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const brand = require("../controllers/brand");
const permissions = require("../middlewares/permissions");
const idValidation = require("../middlewares/idValidation");

// URL: /brands

router
  .route("/")
  .get(permissions.isLogin, brand.list)
  .post(permissions.isAdmin, brand.create);

router
  .route("/:id")
  .all(idValidation)
  .get(permissions.isStaff, brand.read)
  .put(permissions.isAdmin, brand.update)
  .patch(permissions.isAdmin, brand.update)
  .delete(permissions.isAdmin, brand.delete);

/* ------------------------------------------- */
module.exports = router;
