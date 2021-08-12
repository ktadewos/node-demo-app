const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String
    }
});

const Person = mongoose.model('Persons', personSchema);

exports.Person = Person;