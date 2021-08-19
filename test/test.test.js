const personController = require('../controller/person.controller');
const { Person } = require('../models/person');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');



describe('Person Controller', () => {
    it('should send correct person response with 200 status code', async () => {

        const person = null;
        const apiResponse = new ErrorResponse('400', 'no content found!');
        
        const req = {};
        const resMock = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();
    
        Person.find = jest.fn().mockResolvedValue(person);
        
        await personController.findAll(req, resMock, next);
    
        expect(resMock.status).toBeCalledWith(404);
        expect(resMock.send).toBeCalledWith(apiResponse);
        expect(Person.find).toHaveBeenCalled();
     });

     it('should send valid error response and status code if person not found', async () => {

        const person = {"a": 1};
        const apiResponse = new ApiResponse(200, 'success', person)
        
        const req = {};
        const resMock = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();
    
        Person.find = jest.fn().mockResolvedValue(person);
        
        await personController.findAll(req, resMock, next);
    
        expect(resMock.status).toBeCalledWith(200);
        expect(resMock.send).toBeCalledWith(apiResponse);
        expect(Person.find).toHaveBeenCalled();
     });
})


// test('person controller test', async () => {

//     const person = {"a": 1};
//     const apiResponse = new ApiResponse(200, 'success', person)
    
//     const req = {};
//     const resMock = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn()
//     };
//     const next = jest.fn();

//     Person.find = jest.fn().mockResolvedValue(person);
    
//     await personController.findAll(req, resMock, next);

//     expect(resMock.status).toBeCalledWith(200);
//     expect(resMock.send).toBeCalledWith(apiResponse);
//     expect(Person.find).toHaveBeenCalled();
//  });