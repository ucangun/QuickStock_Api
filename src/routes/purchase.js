"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const purchase = require("../controllers/brand");
const idValidation = require("../middlewares/idValidation");

// URL: /purchases

router.route("/").get(purchase.list).post(purchase.create);

router
  .route("/:id")
  .all(idValidation)
  .get(purchase.read)
  .put(purchase.update)
  .patch(purchase.update)
  .delete(purchase.delete);

/* ------------------------------------------- */
module.exports = router;
