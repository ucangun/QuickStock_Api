"use strict";

/* ------------------------------------------------- */
/*                  QUICKSTOCK API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

const firm = require("../controllers/firm");
const idValidation = require("../middlewares/idValidation");

// URL: /firms

router.route("/").get(firm.list).post(firm.create);

router
  .route("/:id")
  .all(idValidation)
  .get(firm.read)
  .put(firm.update)
  .patch(firm.update)
  .delete(firm.delete);

/* ------------------------------------------------------- */
module.exports = router;
