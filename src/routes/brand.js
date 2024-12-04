"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const brand = require("../controllers/brand");
const idValidation = require("../middlewares/idValidation");

// URL: /brands

router.route("/").get(brand.read).post(brand.create);

router
  .route("/:id")
  .all(idValidation)
  .get(brand.read)
  .put(brand.update)
  .patch(brand.update)
  .delete(brand.delete);

/* ------------------------------------------- */
module.exports = router;
