"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const token = require("../controllers/brand");
const idValidation = require("../middlewares/idValidation");

// URL: /brands

router.route("/").get(token.read).post(token.create);

router
  .route("/:id")
  // .all(idValidation)
  .get(token.read)
  .put(token.update)
  .patch(token.update)
  .delete(token.delete);

/* ------------------------------------------- */
module.exports = router;
