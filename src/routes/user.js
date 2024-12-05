"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const user = require("../controllers/user");
const permissions = require("../middlewares/permissions");
const idValidation = require("../middlewares/idValidation");

// URL: /users

router.route("/").get(user.list).post(user.create);

router
  .route("/:id")
  .all(idValidation)
  .get(permissions.isLogin, user.read)
  .put(permissions.isLogin, user.update)
  .patch(permissions.isLogin, user.update)
  .delete(permissions.isAdmin, user.delete);

/* ------------------------------------------ */
module.exports = router;
