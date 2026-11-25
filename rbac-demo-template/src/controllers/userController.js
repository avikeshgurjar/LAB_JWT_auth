const { findUserById } = require("../services/dbServices");

const getMe = async (req, res) => {
  try {
    const user = await findUserById(req.user.id, {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getDashboard = async (req, res) => {
  try {
    const user = await findUserById(req.user.id, {
      email: true,
      name: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const displayName = user.name || user.email;

    return res.status(200).json({
      message: `Welcome, ${displayName}!`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getMe,
  getDashboard,
};
