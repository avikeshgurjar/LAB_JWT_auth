const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { JWTSECRET } = require("../configs/config");
const { findUserByEmail, createUser } = require("../services/dbServices");


const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWTSECRET,
    {
      expiresIn: "1h",
      jwtid: crypto.randomUUID(),
    }
  );
};

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    

    

    const lowerEmail= email.trim().toLowerCase();

    

    if (password.length < 6) {
      return res.status(400).json({ message: "at least 6 characters long password" });
    }

    const existingUser = await findUserByEmail(lowerEmail);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const lowerName = typeof name === "string" && name.trim() ? name.trim() : null;

    const user = await createUser({
      email: lowerEmail
      ,
      password: hashedPassword,
      name: lowerName
    });

    const token = generateToken(user);

    return res.status(201).json({
      message: "Registration successful",
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body ;

    

    const lowerEmail= email.trim().toLowerCase();

    if (!lowerEmail
       || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(lowerEmail);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};
