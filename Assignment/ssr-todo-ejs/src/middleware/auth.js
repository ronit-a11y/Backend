const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies[process.env.COOKIE_NAME];
    if (!token) return res.redirect("/auth/login");

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.sub).select("_id name email");
    if (!user) return res.redirect("/auth/login");

    req.user = user; // attach user to request
    next();
  } catch (e) {
    return res.redirect("/auth/login");
  }
}

module.exports = { requireAuth };