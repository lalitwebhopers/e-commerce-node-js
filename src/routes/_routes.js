const express = require('express')

const roleRoutes = require('./role-routes')
const userRoutes = require('./user-routes')
const permissionRoutes = require('./permission-routes')

const router = express.Router();

router.use('/roles', roleRoutes);
router.use('/users', userRoutes);
router.use('/permissions', permissionRoutes);

router.use('*', (req, res) => {
    res.status(404).send('Not Found!');
});

module.exports = router;