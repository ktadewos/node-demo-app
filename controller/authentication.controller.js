const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

exports.login = async function(req, res) {
    console.log('hello')
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('user or password is not correct');
    const isvalid = await bcrypt.compare(req.body.password, user.password);
    if (!isvalid) return res.status(400).send('not authorized');
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(new ApiResponse(200, 'success', token));
}

exports.getUserById = async function(request, response) {
    console.log('me');
    const user = await User.findById(request.user._id).select('-password');
    response.send(new ApiResponse(201, 'success', user));
}