const router = require("express").Router();
const gamesController = require("../../controllers/gameController");

// Matches with "/api/games"
router.route("/")
  .get(gamesController.findAll)
  .post(gamesController.create);

  router
  .route("/login/:email")
  .get(gamesController.findOne)

  router
  .route("/details")
  .get(gamesController.getGamesDetails)
  .post(gamesController.createDetails)
  .delete(gamesController.removeGamesDetails);
  
  router
  .route("/remove/details/:id/:username")
  .delete(gamesController.removeGamesDetails);

  router
  .route("/details:id")
  .get(gamesController.getGamesDetails)
  .post(gamesController.createDetails)
  .delete(gamesController.removeGamesDetails);
  

// Matches with "/api/games/:id"
  router  
  .route("/:id")
  .get(gamesController.findById)
  .put(gamesController.update)
  .delete(gamesController.remove);
