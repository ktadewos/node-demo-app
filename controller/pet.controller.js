const { Pet } = require('../models/pet');

const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

exports.findAll = async (req, res, next) => {
    
    const pet = await Pet.find();
    if (!pet) return res.status(204).send(new ErrorResponse('204', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', pet));
}
