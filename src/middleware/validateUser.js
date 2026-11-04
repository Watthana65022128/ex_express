
const validateUser = (req, res, next) => {
  const { name, age, password } = req.body;

  const errors = [];

  if (req.method === 'POST' || 'name' in req.body) {
    if (
      typeof name !== 'string' ||
      name.trim().length < 2 ||
      name.trim().length > 100
    ) {
      errors.push('Name must be 2-100 characters');
    }
  }

  if (req.method === 'POST' || 'age' in req.body) {
    if (
      age === undefined ||
      age === null ||
      age === '' ||
      !Number.isInteger(age) ||
      age < 0 ||
      age > 120
    ) {
      errors.push('Age must be an integer between 0 and 120');
    }
  }

  if (req.method === 'POST' || 'password' in req.body) {
    if (
      typeof password !== 'string' ||
      password.length < 8 ||
      password.length > 72
    ) {
      errors.push('Password must be 8-72 characters');
    }
  }

  const allowedFields = ['name', 'age', 'password'];
  const unknownFields = Object.keys(req.body).filter(
    key => !allowedFields.includes(key)
  );

  if (unknownFields.length > 0) {
    errors.push(`Unknown fields: ${unknownFields.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateUserId = (req, res, next) => {
  const mongoose = require('mongoose');

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid user ID'
    });
  }

  next();
};

module.exports = { validateUser, validateUserId };
