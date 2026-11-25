const express = require("express");
const requireAuth = require("../../middleware/requireAuth");
const { getMe, getDashboard } = require("../controllers/userController");

const router = express.Router();

router.get("/me", requireAuth, getMe);
router.get("/dashboard", requireAuth, getDashboard);

module.exports = router;
