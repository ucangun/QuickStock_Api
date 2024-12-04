"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const product = require("../controllers/brand");
const idValidation = require("../middlewares/idValidation");

// URL: /products

router.route("/").get(product.list).post(product.create);

router
  .route("/:id")
  .all(idValidation)
  .get(product.read)
  .put(product.update)
  .patch(product.update)
  .delete(product.delete);

/* ------------------------------------------- */
module.exports = router;
