const mongoose = require('mongoose');
const {db_username, db_password, db_name} = require('../config.js')
const config = require('config');
module.exports = async () => {
    await mongoose.connect(`mongodb+srv://${config.get('db_username')}:${config.get('db_password')}@cluster0.nigpm.mongodb.net/${config.get('db_name')}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });    
}


    