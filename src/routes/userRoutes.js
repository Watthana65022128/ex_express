
const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const {
  validateUser,
  validateUserId
} = require('../middleware/validateUser');

router.post('/', validateUser, userController.register);
router.get('/', userController.getUsers);
router.get('/:id', validateUserId, userController.getUserById);
router.patch('/:id', validateUserId, validateUser, userController.updateUser);
router.delete('/:id', validateUserId, userController.deleteUser);

module.exports = router;
