const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

afterAll(async () => {
    await mongoose.disconnect();
});


describe ('app', () => {

    it('should be up and send hello', async () => {
        const res = await request(app).get('/');
        expect(res.status).toEqual(200);
        expect(res.text).toBe('hello!');
    });
});