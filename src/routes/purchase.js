"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const purchase = require("../controllers/purchase");
const permissions = require("../middlewares/permissions");
const idValidation = require("../middlewares/idValidation");

// URL: /purchases

router
  .route("/")
  .get(permissions.isLogin, purchase.list)
  .post(permissions.isLogin, purchase.create);

router
  .route("/:id")
  .all(idValidation)
  .get(permissions.isLogin, purchase.read)
  .put(permissions.isLogin, purchase.update)
  .patch(permissions.isLogin, purchase.update)
  .delete(permissions.isAdmin, purchase.delete);

/* ------------------------------------------- */
module.exports = router;
