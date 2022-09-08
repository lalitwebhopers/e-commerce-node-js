const express = require('express')

const userController = require('../controllers/user-controller')
const storeUserRequest = require('../requests/users/store-user-request')
const updateUserRequest = require('../requests/users/update-user-request')

const router = express.Router();

router.get('', userController.index);
router.post('', storeUserRequest, userController.store);
router.put('/:id', updateUserRequest, userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;