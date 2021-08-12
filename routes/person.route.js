const express = require('express');
const router = express.Router();
const personController = require('../controller/person.controller');

/* GET a user. */
router.get('/persons', personController.findAll);


module.exports = router;