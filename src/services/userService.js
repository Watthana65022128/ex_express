
const User = require('../models/User');
const bcrypt = require('bcrypt');

const toPublicUser = (user) => {
  const data = user.toObject
    ? user.toObject()
    : { ...user };

  delete data.password;
  return data;
};

const createUser = async ({ name, age, password }) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    age,
    password: hashedPassword
  });

  return toPublicUser(user);
};

const getUsers = async () => {
  const users = await User.find().sort({ createdAt: -1 });
  return users.map(toPublicUser);
};


const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) return null;

  return toPublicUser(user);
};


const updateUser = async (id, data) => {
  const updates = { ...data };

  if (updates.password !== undefined) {
    updates.password = await bcrypt.hash(
      updates.password,
      12
    );
  }

  const user = await User.findByIdAndUpdate(
    id,
    { $set: updates },
    {
      new: true,
      runValidators: true
    }
  );

  if (!user) return null;

  return toPublicUser(user);
};

// DELETE: Delete user
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) return null;

  return { message: 'User deleted successfully' };
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
