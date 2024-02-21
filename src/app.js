const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.get("/musicians", async (req, res) =>{
    let foundMusic = await Musician.findAll();
    res.json(foundMusic)
})





module.exports = app;