const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../src/configs/config");

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader ||!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: missing or invalid authorization header" });
  }

  const token = authHeader.slice(7);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: token missing" });
  }

  try {
    const payload = jwt.verify(token, JWTSECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: invalid or expired token" });
  }
}

module.exports = requireAuth;
