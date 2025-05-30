const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Protected routes
router.get('/profile', auth, authController.getProfile);

module.exports = router;