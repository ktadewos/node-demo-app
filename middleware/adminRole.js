module.exports = function(request, response, next) {
    if (!(request.user.role === 'admin')) return response.status(403).send('An authorized');
    next();
}