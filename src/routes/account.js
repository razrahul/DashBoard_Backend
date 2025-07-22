// Correct order of routes in accountRoutes.js

const express = require('express');
const accountController = require('../controller/account');
const { authenticateToken, authorize, isAuthorizeAdmin } = require('../middlewares');

const router = express.Router();

router.post('/', authenticateToken, accountController.createAccount);

// Static route must be before dynamic ones
router.get('/member', authenticateToken, accountController.getAccountByUserMemberId);
router.get('/all', authenticateToken, authorize(["superadmin", "admin"]), accountController.getAllAccounts);
router.get('/:memberId', authenticateToken, authorize(["superadmin", "admin"]), accountController.getAccountById);

router.put('/', authenticateToken, accountController.updateAccountById);
router.delete('/member', authenticateToken, accountController.deleteAccountByMemberId);
router.delete('/:memberId', authenticateToken,authorize(["superadmin", "admin"]), accountController.deleteAccountById);

module.exports = router;
