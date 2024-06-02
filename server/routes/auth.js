const express = require('express');
const router = express.Router();
const {register, verifyEmail, login, verifyToken} = require('../controllers/auth');

router.post('/register', register);
router.post('/verify-email', verifyEmail);  
router.post('/login', login);  
router.post('/verify-token', verifyToken);  

module.exports = router;