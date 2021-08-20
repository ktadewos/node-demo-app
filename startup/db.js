const config = require('config');
const mongoose = require('mongoose');
module.exports = async () => {

    // if(process.env.NODE_ENV !== "test") {
    //     const username = config.get('db_username');
    //     const password = config.get('db_password');
    //     const db_name = config.get('db_name');
    //     await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.nigpm.mongodb.net/${db_name}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true })
    //     .catch((error) => console.log(error));
    // }
    const username = config.get('db_username');
        const password = config.get('db_password');
        const db_name = config.get('db_name');
    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.nigpm.mongodb.net/${db_name}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });
        
}


    