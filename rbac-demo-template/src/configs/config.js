require("dotenv").config();

const JWTSECRET = process.env.JWTSECRET;

module.exports = { JWTSECRET, PORT };
