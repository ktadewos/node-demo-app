const personController = require('../../controller/person.controller');
const { Person } = require('../../models/person');
const ApiResponse = require('../../models/apiResponse');
const ErrorResponse = require('../../models/errorResponse');



describe('Person Controller Test Cases', () => {
    it('should send valid error response and status code if person not found', async () => {

        const person = null;
        const apiResponse = new ErrorResponse('204', 'no content found!');
        
        const req = {};
        const resMock = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();
    
        Person.find = jest.fn().mockResolvedValue(person);
        
        await personController.findAll(req, resMock, next);
    
        expect(resMock.status).toBeCalledWith(204);
        expect(resMock.send).toBeCalledWith(apiResponse);
        expect(Person.find).toHaveBeenCalled();
        //expect.assertions(3) //can be used to check x times assertion made for asynchrnous functions test
     });

     it('should send correct person response with 200 status code', async () => {

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