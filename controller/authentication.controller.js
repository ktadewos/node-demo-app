const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

exports.login = async function(req, res) {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(403).send(new ErrorResponse('403', 'user or password is not correct'));
    const isvalid = await bcrypt.compare(req.body.password, user.password);
    if (!isvalid) return res.status(403).send(new ErrorResponse('403', 'user or password is not correct'));
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).status(200).send(new ApiResponse(200, 'success', token));
}

exports.getUserById = async function(request, response) {
    const user = await User.findById(request.user._id).select('-password');
    if (!user) return res.status(204).send(new ErrorResponse('204', 'user not found'));
    response.send(new ApiResponse(200, 'success', user));
}



