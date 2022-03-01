const router = require("express").Router();
const gameRoutes = require("./game");

// Game routes below
router.use("/game", gameRoutes);
module.exports = router;