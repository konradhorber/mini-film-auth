const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();


const baseUrl = "localhost:3000";

afterAll(async () => {
    await mongoose.disconnect();
});


describe ('app', () => {

    it('should be up and send hello', async () => {
        const res = await request(baseUrl).get('/');
        expect(res.status).toEqual(200);
        expect(res.text).toBe('hello');
    });
});