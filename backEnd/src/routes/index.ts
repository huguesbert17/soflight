import express, { Express, Request, Response } from 'express';
const {token, airports}  = require("../utils/amadeus");


// const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Welcome to Express & TypeScript Server');
});
router.get('/api/token', async (req, res, next) => {
    const _token = await token()
    res.json({
        status: "success",
        data: _token
    }).status(200);
});
router.get('/api/airport', async (req, res, next) => {

    if (!req.query.name) res.json({
        status: "error",
        "message": "Airport or city name is required."
    }).status(403)
    try {
        const airport = await airports(req.query.name as string)
        res.json({
            status: "success",
            data: airport.data
        }).status(200);
    }catch (e) {
        res.json({})
        console.log(e);
    }


});

module.exports = router;
