const express = require("express");
const controller = require("../controller/main");
const router = express.Router();

router.get("", controller.getSchedulepage);
router.post("/add-cricketer", controller.postAddIndex);
router.get("/search", controller.searchCricketerByName);

module.exports = router;
