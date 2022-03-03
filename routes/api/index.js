const router = require("express").Router();
const gameRoutes = require("./game");
const gameDetailsRoutes = require("./games");


// Book routes
router.use("/games", gameDetailsRoutes);
router.use("/game", gameRoutes);



module.exports = router;