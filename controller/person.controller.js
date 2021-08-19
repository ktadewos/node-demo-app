const express = require('express');
const mongoose = require('mongoose');
const { Person } = require('../models/person');

const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

exports.findAll = async (req, res, next) => {
    
    const person = await Person.find();
    if (!person) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', person));
}
