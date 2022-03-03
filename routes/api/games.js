const router = require("express").Router();
const gamesController = require("../../controllers/gameController");

router
    .route("/")
    .get(gamesController.findAll)
    .post(gamesController.create);

router
    .route("/login/:email")
    .get(gamesController.findOne)

router
    .route("/:id")
    .get(gamesController.findbyId)
    .put(gamesController.update)
    .delete(gamesController.remove);

router
    .route("details")
    .get(gamesController.getGamesDetails)



module.exports = router;