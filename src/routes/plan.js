const express = require('express');
const planController = require('../controller/plan');


const router = express.Router();

router.post('/', planController.createPlan);
router.get('/', planController.getAllPlans);
router.get('/:uuId', planController.getPlanById);
router.put('/:uuId', planController.updatePlanById);
router.delete('/:uuId', planController.deletePlanById);

module.exports = router;