const request = require('supertest'); 
const mongoose = require('mongoose');
const { Pet } = require('../../models/pet');
const { User } = require('../../models/user');
let server;
let accessToken;

describe('/' , () => {

    beforeAll(async () => {
        
        server = require('../../server');
        const loggedInUser = await User.findOne({email: 'email'});
        accessToken = loggedInUser.generateAuthToken();
    })

    afterEach(async () => {
        await Pet.remove({});
    })

    afterAll(async () => {
        await mongoose.connection.close();
    })

    describe('GET /api/pets', () => {
        it('should return all persons', async () => {
            await Pet.collection.insertMany([
                {name: 'chris', kind: 'dog', behaviour: 'sweet'},
                {name: 'chang', kind: 'dog', behaviour: 'aggressive'}
            ]);

            const res = await request(server)
                .get('/api/pets')
                .set('x-auth-token', accessToken);

            expect(res.status).toBe(200);
            expect(res.body.result.length).toBe(2);
            expect(res.body.result.some(fn => fn.name === 'chris'));

        })
    })

})
