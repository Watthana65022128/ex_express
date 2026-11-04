
const userService = require('../services/userService');

const handleError = (res, error) => {
  if (error.code === 11000) {
    return res.status(409).json({
      message: 'Duplicate data'
    });
  }

  if (error.name === 'ValidationError' ||
      error.name === 'CastError') {
    return res.status(400).json({
      message: error.message
    });
  }

  console.error(error);

  return res.status(500).json({
    message: 'Internal server error'
  });
};


const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json({
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    return handleError(res, error);
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json({ data: users });
  } catch (error) {
    return handleError(res, error);
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    return handleError(res, error);
  }
};


const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    return res.status(200).json({
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    return handleError(res, error);
  }
};


const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = {
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
