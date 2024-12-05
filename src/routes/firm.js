"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const firm = require("../controllers/firm");
const permissions = require("../middlewares/permissions");
const idValidation = require("../middlewares/idValidation");

// URL: /firms

router
  .route("/")
  .get(permissions.isLogin, firm.list)
  .post(permissions.isAdmin, firm.create);

router
  .route("/:id")
  .all(idValidation)
  .get(permissions.isStaff, firm.read)
  .put(permissions.isAdmin, firm.update)
  .patch(permissions.isAdmin, firm.update)
  .delete(permissions.isAdmin, firm.delete);

/* ------------------------------------------------------- */
module.exports = router;
