const router = require("express").Router();
// Add route here for gamecontroller
const gameController = require("");

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