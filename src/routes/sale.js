"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const sale = require("../controllers/brand");
const idValidation = require("../middlewares/idValidation");

// URL: /sales

router.route("/").get(sale.read).post(sale.create);

router
  .route("/:id")
  .all(idValidation)
  .get(sale.read)
  .put(sale.update)
  .patch(sale.update)
  .delete(sale.delete);

/* ------------------------------------------- */
module.exports = router;
