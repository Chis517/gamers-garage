const router = require("express").Router();
const gameController = require(".../controllers.js");

// Matches with "/api/game"
router.route("/")
  .get(gameController.findAll)
  .post(gameController.create);

// Matches with "/api/game/:id"
router
  .route("/:id")
  .get(gameController.findById)
  .put(gameController.update)
  .delete(gameController.remove);

module.exports = router;