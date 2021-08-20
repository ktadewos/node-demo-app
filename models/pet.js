const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String
    },
    kind: {
        type: String
    },
    behaviour: {
        type: String,
    }
});

const Pet = mongoose.model('Pets', petSchema);

exports.Pet = Pet;