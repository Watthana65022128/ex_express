
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: 0,
      max: 120,
      validate: {
        validator: Number.isInteger,
        message: 'Age must be an integer'
      }
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
