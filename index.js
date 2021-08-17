const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRole = require('./middleware/adminRole');
const auth = require('./middleware/auth');
const ErrorResponse = require('./models/errorResponse');

const personRoutes = require('./routes/person.route');
const userRoutes = require('./routes/user.route');
const app = express();

const config = require('config'); 

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', [auth, adminRole], personRoutes);

app.get('/', (req, res, next) => {
    res.send('Hello from Node Application');
});

app.use((err, req, res, next) => {
    return res.status(500).send(new ErrorResponse(500, err));
});

mongoose.connect(`mongodb+srv://${config.get('db_username')}:${config.get('db_password')}@cluster0.nigpm.mongodb.net/demo_db?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(3000, () => {
            console.log("server is running on 3000 ...");
        })
    }).catch((err) => console.log(err));
