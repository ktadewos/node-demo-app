const jwt = require('jsonwebtoken');

module.exports = function(request, response, next) {
    const token = request.header('x-auth-token');
    if (!token) return response.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, 'secret');
        request.user = decoded;
        next();
    } catch (ex) {
        response.status(400).send('Invalid token.');
    }
}