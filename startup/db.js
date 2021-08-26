const mongoose = require('mongoose');
const {db_username, db_password, db_name, test_db_name} = require('../config.js')
module.exports = async () => {
    if(process.env.NODE_ENV == 'test'){
        await mongoose.connect(`mongodb+srv://${db_username}:${db_password}@cluster0.nigpm.mongodb.net/${test_db_name}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });
    }
    else {
        await mongoose.connect(`mongodb+srv://${db_username}:${db_password}@cluster0.nigpm.mongodb.net/${db_name}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });
    }
}


    