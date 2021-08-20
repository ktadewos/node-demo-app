const personController = require('../../controller/person.controller');
const { Person } = require('../../models/person');
const ApiResponse = require('../../models/apiResponse');
const ErrorResponse = require('../../models/errorResponse');
let mockResponse;



describe('Person Controller Test Cases', () => {
    
    beforeAll(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    })
    
    it('should send valid error response and status code if person not found', async () => {

        const person = null;
        const apiResponse = new ErrorResponse('204', 'no content found!');
        
        const req = {};
        const next = jest.fn();
    
        Person.find = jest.fn().mockResolvedValue(person);
        
        await personController.findAll(req, mockResponse, next);
    
        expect(mockResponse.status).toBeCalledWith(204);
        expect(mockResponse.send).toBeCalledWith(apiResponse);
        expect(Person.find).toHaveBeenCalled();
        //expect.assertions(3) //can be used to check x times assertion made for asynchrnous functions test
     });

     it('should send correct person response with 200 status code', async () => {

        const person = {"a": 1};
        const apiResponse = new ApiResponse(200, 'success', person)
        
        const req = {};
        const next = jest.fn();
    
        Person.find = jest.fn().mockResolvedValue(person);
        
        await personController.findAll(req, mockResponse, next);
    
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.send).toBeCalledWith(apiResponse);
        expect(Person.find).toHaveBeenCalled();
     });
})