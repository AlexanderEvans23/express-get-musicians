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


describe('./musicians endpoint', () => {
    test("testing musician endpoint", async () => {
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
    })
    
    test("get/rest returns proper array", async () => {
        const response = await request(app).get("/musicians");
        expect(Array.isArray(response.body)).toBe(true)
    })

    test("get/rest returns proper number of array elements", async () => {
        const response = await request(app).get("/musicians");
        expect(response.body.length).toBe(restQuantity)
    })

    test("get/ rest returns correct data", async () => {
        const response = await request(app).get("/musicians");
        expect(response.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: 'AppleBees',
                instrument: 'Texas'
            })
        )
    })

    test("route returns proper spot in array", async () => {
        const response = await request(app).get("/musicians/1");
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: 'AppleBees',
                instrument: 'Texas'
            })
        )
    })


    test("route places new post at end of array ", async () => {
        await request(app)
        .post("/musicians")
        .send({name: "asd", instrument: "qwe"});
        const musician = await Musician.findByPk(7);
        expect(musician.name).toEqual("asd")
    })

    test("route updates proper spot in array", async () => {
        const response = await request(app)
        .put("/musicians/1")
        .send({name: "asd", instrument: "qwe"});
        const musician = await Musician.findByPk(1);
        expect(musician.name).toEqual('asd')
        
    })


    test("route properly deletes spot in array", async () => {
        const response = await request(app)
        .delete("/musicians/1")
        let musician = await Musician.findAll()
        expect(musician.length).toEqual(restQuantity)
    })




    
})