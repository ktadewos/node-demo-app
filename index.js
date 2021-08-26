const app = require('./server');
const {port} = require('./config.js')
const config = require('config');

app.listen(port, () => console.log(`Server connected to port ${config.get('port')}`));