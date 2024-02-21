// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");
const Test = require('supertest/lib/test');
const { hasUncaughtExceptionCaptureCallback } = require('process');


describe('./musicians endpoint', () => {
    test("testing musician endpoint", async () => {
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
    })
    
    




    
})