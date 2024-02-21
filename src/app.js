const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;
app.use(express.json())
app.use(express.urlencoded())



//TODO: Create a GET /musicians route to return all musicians 

app.get("/musicians", async (req, res) =>{
    let foundMusic = await Musician.findAll();
    res.json(foundMusic)
})

app.get("/musicians/:id", async (req, res) => {
    let id = req.params.id;
    let music = await Musician.findByPk(id)
    res.json(music)
})

app.post("/musicians", async (req, res) => {
    let newMusic = await Musician.create(req.body);
    res.json(newMusic)
})

app.put('/musicians/:id', async (req, res) => {
    let id = req.params.id;
    let newMusic = await Musician.update(id);
    res.json(newMusic)
})

app.delete('/musicians/:id', async (req, res) => {
    let id = req.params.id;
    let deleted = await Musician.destroy({where: {
        id: id
    },
    });
    res.json(deleted)
})






module.exports = app;