const express = require('express');
const router = express.Router();
const personController = require('../controller/person.controller');
const authenticationController = require('../controller/authentication.controller');

/* GET a user. */
router.get('/persons', personController.findAll);
router.post('/persons', personController.insert);
router.put('/persons/:id', personController.updateById);
router.delete('/persons/:id', personController.removeById);
router.get('/me', authenticationController.getUserById);


module.exports = router;