const express = require('express');
const router = express.Router();
const petController = require('../controller/pet.controller');

/* GET a user. */
router.get('/pets', petController.findAll);


module.exports = router;