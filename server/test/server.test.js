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

    it('1. Retrieve status 200 on "/"', (done) => {
        supertest(api).get('/')
            .expect(200, done)
    })

})