const router = require("express").Router();
const { analyzeCrop, getCropModules } = require("../controllers/cropController");

router.get("/", getCropModules);
router.post("/analyze", analyzeCrop);

module.exports = router;
