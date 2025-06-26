const express = require('express');
const roleController = require('../controller/role');

const router = express.Router();

// Define routes for role management
// POST /roles - Create a new role
router.post('/', roleController.createRole);
router.get('/', roleController.getAllRoles);
router.get('/:uuId', roleController.getRoleById);
router.put('/:uuId', roleController.updateRole);
router.delete('/:uuId', roleController.deleteRole);

module.exports = router;
