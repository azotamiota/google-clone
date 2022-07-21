const supertest = require('supertest');
const server = require('../server')

describe("API test", () => {

    let api;

    beforeAll(() => {
        api = server.listen(5050, () => {
            console.log('Testing is in process. Server is listening on port 5050')
        })
    })

    afterAll((done) => {
        api.close(done)
    })

    it('1. Retrieve status 200 at "/"', (done) => {
        supertest(api).get('/')
            .expect(200, done)
    })

    it('2. Retrieve all results at "/results"', async () => {
        const allResults = await supertest(api).get('/results')
        expect(allResults.body['4']['title']).toEqual('Kiwi')
    })

    it('3. Retrieve status 200 at "/results/random"', (done) => {
        supertest(api).get('/results/random')
            .expect(200, done)
    })

    it('4. Retreieve a sinlge result at "/results/:id"', async () => {
        const singleResult = await supertest(api).get('/results/6')
            expect(singleResult.text).toMatch(/freecodecamp/)
    })

    it('5. Upon requesting non-existing result retrieve status 404 message at "/results/:id"', (done) => {
        supertest(api).get('/results/989898989889')
            .expect(404, done)
    })

})
