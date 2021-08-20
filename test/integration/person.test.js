const request = require('supertest'); 
const mongoose = require('mongoose');
const { Person } = require('../../models/person');
const { User } = require('../../models/user');
let server;
let accessToken;

describe('/' , () => {

    beforeAll(async () => {
        
        server = require('../../server');
        // await User.remove({});
        // await User.collection.insertOne(
        //         {
        //             email: 'email',
        //             password: '$2a$12$fSAz.XqeSbPd1C./q8nsO.xO/35LO6UkiDandD9xJgBjbh0Kd6nCe', //encrypted version of password.
        //             role: 'admin'
        //         }
        // );

        const loggedInUser = await User.findOne({email: 'email'});
        accessToken = loggedInUser.generateAuthToken();
    })
    
    beforeEach(async () => {
        // server = require('../../server');
        // await User.collection.insertOne({
        //     email: 'email',
        //     password: '$2a$12$fSAz.XqeSbPd1C./q8nsO.xO/35LO6UkiDandD9xJgBjbh0Kd6nCe', //encrypted version of password.
        //     role: 'admin'
        // });
    })

    afterEach(async () => {
        await Person.remove({});
        // await server.close();
        // await mongoose.connection.close();
        // done();
        // mongoose.connection.db.dropDatabase(() => {
        //     mongoose.connection.close(() => done())
        // });
        

          //consider clean up the database here instead of droping it. i.e await Person.remove({});
    })

    afterAll(async () => {
        // await server.close();
        await mongoose.connection.close();
    })

    describe('GET /api/persons', () => {
        it('should return all persons', async () => {
            await Person.collection.insertMany([
                {firstName: 'Kaleab', lastName: 'Ero', phoneNumber: '857564'},
                {firstName: 'Brukti', lastName: 'Ero', phoneNumber: '857564'}
            ])


            // const res = await request(server).get('');
            //forward slash before api here is important other wise it does not work.
            const res = await request(server)
                .get('/api/persons')
                .set('x-auth-token', accessToken);

            expect(res.status).toBe(200);
            expect(res.body.result.length).toBe(2);
            expect(res.body.result.some(fn => fn.firstName === 'Kaleab'));

        })
    })

    describe('GET /api/me', () => {
        it('should return user user with specified id', async () => {

            //forward slash before api here is important other wise it does not work.
            const res = await request(server)
                .get('/api/me')
                .set('x-auth-token', accessToken);

            expect(res.status).toBe(200);
            expect(res.body.result.email === 'email');

        })
    })
})



// test("GET /api/posts", async () => {
//     const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });
  
//     await supertest(app).get("/api/posts")
//       .expect(200)
//       .then((response) => {
//         // Check type and length
//         expect(Array.isArray(response.body)).toBeTruthy();
//         expect(response.body.length).toEqual(1);
  
//         // Check data
//         expect(response.body[0]._id).toBe(post.id);
//         expect(response.body[0].title).toBe(post.title);
//         expect(response.body[0].content).toBe(post.content);
//       });
//   });
