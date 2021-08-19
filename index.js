const mongoose = require('mongoose');
const config = require('config'); 

const app = require('./server');

mongoose.connect(`mongodb+srv://${config.get('db_username')}:${config.get('db_password')}@cluster0.nigpm.mongodb.net/demo_db?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(3000, () => {
            console.log("server is running on 3000 ...");
        })
    }).catch((err) => console.log(err));
