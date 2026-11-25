const express = require("express");
const { PORT } = require("./src/configs/config");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/", authRoutes);
app.use("/", userRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
