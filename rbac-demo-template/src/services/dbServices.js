const prisma = require("../configs/databaseServices");

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const findUserById = async (id, select) => {
  return prisma.user.findUnique({
    where: { id },
    select,
  });
};

const createUser = async ({ email, password, name }) => {
  return prisma.user.create({
    data: {
      email,
      password,
      name,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};
