const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: 'admin' }, 'secret')
    return token;
}

const User = mongoose.model('Users', userSchema);

exports.User = User;