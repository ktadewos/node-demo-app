const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
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