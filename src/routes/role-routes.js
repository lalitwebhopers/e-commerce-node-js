const express = require('express')

const roleController = require('../controllers/role-controller')
const storeRoleRequest = require('../requests/roles/store-role-request')
const updateRoleRequest = require('../requests/roles/update-role-request')

const router = express.Router();

router.get('', roleController.index);
router.post('', storeRoleRequest, roleController.store);
router.put('/:id', updateRoleRequest, roleController.update);
router.delete('/:id', roleController.destroy);

module.exports = router;