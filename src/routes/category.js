"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const category = require("../controllers/category");
const idValidation = require("../middlewares/idValidation");

// URL: /categories

router.route("/").get(category.read).post(category.create);

router
  .route("/:id")
  .all(idValidation)
  .get(category.read)
  .put(category.update)
  .patch(category.update)
  .delete(category.delete);

/* ------------------------------------------- */
module.exports = router;
