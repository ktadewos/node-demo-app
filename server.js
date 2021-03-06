const mongoose = require('mongoose');
const config = require('config'); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const adminRole = require('./middleware/adminRole');
const auth = require('./middleware/auth');
const ErrorResponse = require('./models/errorResponse');

const personRoutes = require('./routes/person.route');
const petRoutes = require('./routes/pet.route');
const userRoutes = require('./routes/user.route');
const app = express();
require('./startup/db')();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', [auth, adminRole], personRoutes);
app.use('/api', [auth, adminRole], petRoutes);

app.get('/', (req, res, next) => {
    res.send('Hello from Node Application dev change');
});

app.use((err, req, res, next) => {
    return res.status(500).send(new ErrorResponse(500, err));
});


module.exports = app;