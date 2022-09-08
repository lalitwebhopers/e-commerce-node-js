const express = require('express')

const permissionController = require('../controllers/permission-controller')
const storePermissionRequest = require('../requests/permissions/store-permission-request')
const updatePermissionRequest = require('../requests/permissions/update-permission-request')

const router = express.Router();

router.get('', permissionController.index);
router.post('', storePermissionRequest, permissionController.store);
router.put('/:id', updatePermissionRequest, permissionController.update);
router.delete('/:id', permissionController.destroy);

module.exports = router;