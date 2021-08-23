const app = require('./server');
const {port} = require('./config.js')

app.listen(port, () => console.log('connected'));