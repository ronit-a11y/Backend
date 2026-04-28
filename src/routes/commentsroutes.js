const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    res.send("sarre comments");
});

router.post("/", (req,res) => {
    res.send("ho gyaa!");
});

module.exports = router;