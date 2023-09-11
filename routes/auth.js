const express = require("express");
const {
  signup,
  login,
  refreshToken,
} = require("../controllers/AuthController");
const { authenticate } = require("../middleware/Authentication");

const router = express.Router();

router.post("/sign-up", signup);

router.post("/login", login);

router.post("/refresh-token", authenticate, refreshToken);

module.exports = router;
