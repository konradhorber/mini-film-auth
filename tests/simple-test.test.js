const request = require('supertest');
const app = require('../app');

test('returns hello', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual('hello!');
});