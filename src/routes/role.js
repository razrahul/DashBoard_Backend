const express = require('express');
const roleController = require('../controller/role');
const validateSchema = require('../middlewares/validateSchema');
const { roleCraeteSchema, roleUpdateSchema , roleDeleteSchema } = require('../middlewares/validationSchema/roleSchema');

const router = express.Router();

// Define routes for role management
// POST /roles - Create a new role
router.post('/',validateSchema(roleCraeteSchema), roleController.createRole);
router.get('/', roleController.getAllRoles);
router.get('/:uuId', roleController.getRoleById);
router.put('/:uuId', validateSchema(roleUpdateSchema), roleController.updateRole);
router.delete('/:uuId', validateSchema(roleDeleteSchema), roleController.deleteRole);

module.exports = router;
