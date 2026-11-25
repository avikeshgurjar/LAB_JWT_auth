require("dotenv").config();

const JWTSECRET = process.env.JWTSECRET;
const PORT = process.env.PORT || 3000;

module.exports = { JWTSECRET, PORT };
