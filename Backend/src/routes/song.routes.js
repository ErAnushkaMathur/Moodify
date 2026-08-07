const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const songController = require("../controllers/song.controller");

router.post("/", upload.single("song"))

const { getSongsByMood } = require("../controllers/song.controller");

router.get("/", songController.getSong);
router.post("/", songController.uploadSong);

module.exports = router;