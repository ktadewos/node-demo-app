const authenticationController = require('../../controller/authentication.controller');
const ApiResponse = require('../../models/apiResponse');
const ErrorResponse = require('../../models/errorResponse');
const { User } = require('../../models/user');
const bcrypt = require('bcrypt');
let resMock;
let user;
let generatedToken;

describe('Authentication Controller Test Cases', () => {
    
    beforeAll(() => {
        
        generatedToken = 'token'
        
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            header: jest.fn().mockReturnThis()
        };

        user = {
            email: 'x',
            password: '$2a$12$o/WVefB23cyX.fdsa4XEG.d5yhHk1phWxd/fLB//zsBZNfsQYK4Mq', //bcrypt encrypt for 123.
            generateAuthToken: jest.fn().mockImplementation(() => {
                return generatedToken;
            })
        };
    });
    
    it('should respond valid error response with 403 status code when user not found', async () => {

        const apiResponse = new ErrorResponse('403', 'user or password is not correct');
        
        const req = {
            body: {
                email: 'invalid email'
            }
        };
        
        const next = jest.fn();
    
        User.findOne = jest.fn().mockResolvedValue(null);
        
        await authenticationController.login(req, mockResponse, next);
    
        expect(mockResponse.status).toBeCalledWith(403);
        expect(mockResponse.send).toBeCalledWith(apiResponse);
        expect(User.findOne).toHaveBeenCalled();
     });

     it('should respond valid error response with 403 status code when user password is not correct', async () => {

        const apiResponse = new ErrorResponse('403', 'user or password is not correct');
        
        const req = {
            body: {
                email: 'x',
                password: '$2a$12$Kd6G1lInS07.krwiHtrWgODfpd/p/bmDve8BdAMk1Wb1hje4kvl5i' //bcrypt encrypt for 1234.
            }
        };
        
        const next = jest.fn();

        bcrypt.compare = jest.fn().mockImplementation((x,y) => {
            if (x == y) return Promise.resolve(true);
            return Promise.resolve(false);
        });
    
        User.findOne = jest.fn().mockResolvedValue(user);
        
        await authenticationController.login(req, mockResponse, next);
    
        expect(mockResponse.status).toBeCalledWith(403);
        expect(mockResponse.send).toBeCalledWith(apiResponse);
        expect(User.findOne).toHaveBeenCalled();
     });

     it('should respond valid response with 200 status code when user email and password are valid', async () => {

       const apiResponse = new ApiResponse(200, 'success', generatedToken);
        
        const req = {
            body: {
                email: 'x',
                password: '$2a$12$o/WVefB23cyX.fdsa4XEG.d5yhHk1phWxd/fLB//zsBZNfsQYK4Mq' //bcrypt encrypt for 123.
            }
        };

        const next = jest.fn();

        bcrypt.compare = jest.fn().mockImplementation((x,y) => {
            if (x == y) return Promise.resolve(true);
            return Promise.resolve(false);
        });
    
        User.findOne = jest.fn().mockResolvedValue(user);
        
        await authenticationController.login(req, mockResponse, next);
    
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.status).toBeCalledTimes(3);
        expect(mockResponse.send).toBeCalledWith(apiResponse);
        expect(user.generateAuthToken).toBeCalled();
        expect(mockResponse.header).toBeCalledWith('x-auth-token', generatedToken);
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
     });
})