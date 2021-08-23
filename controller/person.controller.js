const { Person } = require('../models/person');

const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

exports.findAll = async (req, res, next) => {
    
    const person = await Person.find();
    if (!person) return res.status(204).send(new ErrorResponse('204', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', person));
}

//insert operation
exports.insert = async(req, res, next) => {
    
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;

    if(!firstName || !lastName || !phoneNumber){
        return res.status(400).send(new ErrorResponse('400', 'please enter a valid input'));
    }
    
    let newPerson = new Person({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    });

    const person = await Person.create(newPerson);
    res.status(201).send(new ApiResponse(201, 'success', person));
};

//Update Operation
exports.updateById = async(req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;

    if(!firstName || !lastName || !phoneNumber){
        return res.status(400).send(new ErrorResponse('400', 'please enter a valid input'));
    }

    const person = await Person.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    }, { new: true, useFindAndModify: true });

    person.save();
    res.status(200).send(new ApiResponse(200, 'success', person));
};

//Delete Operation
exports.removeById = async(req, res, next) => {
    const person = await Person.findByIdAndRemove(req.params.id);
    if (!person) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', person));
};
