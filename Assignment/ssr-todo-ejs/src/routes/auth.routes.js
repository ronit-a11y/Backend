const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const auth = require("../controllers/auth.controller");

const router = express.Router();

router.get("/register", auth.getRegister);
router.post("/register", asyncHandler(auth.postRegister));

router.get("/login", auth.getLogin);
router.post("/login", asyncHandler(auth.postLogin));

router.post("/logout", asyncHandler(auth.postLogout));

module.exports = router;