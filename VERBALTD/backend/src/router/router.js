const express = require('express');
const cheek = require('../controller/cheek');
const createProfile = require('../controller/createProfile');
const addUser = require('../controller/addUser');
const createNewAccount = require('../controller/createNewAccount');
const login = require('../controller/login');
const verifyUser = require('../middleware/verifyUser');
const paymentIntent = require('../controller/paymentIntent');
const paymentSuccess = require('../controller/payemtSuccess');
const updateProfile = require('../controller/updateProfile');
const { createTestQuestion, getTestQuestions } = require('../controller/test');
const router = express.Router();

router.get('/api/cheek', verifyUser, cheek);
router.post('/api/login', login);
router.post('/api/add-user', addUser);
router.post('/api/create-profile', createProfile);
router.post('/api/create-new-account', createNewAccount);
router.post('/api/checkout-payment', paymentIntent);
router.post('/api/payments', paymentSuccess);
router.patch('/api/update-profile/:id', updateProfile);

// for test 
router.post('/api/test', createTestQuestion);
router.get('/api/test', getTestQuestions);

module.exports = router;