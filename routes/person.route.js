const express = require('express');
const router = express.Router();
const personController = require('../controller/person.controller');
const authenticationController = require('../controller/authentication.controller');

/* GET a user. */
router.get('/persons', personController.findAll);
router.get('/me', authenticationController.getUserById);


module.exports = router;