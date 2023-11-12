import express, { Express, Request, Response } from 'express';
import moment from "moment";
import fs from "fs";
const {token, airports, deals}  = require("../utils/amadeus");
const _deals = require("./test.json")


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
router.get('/api/deals', async (req, res, next) => {

    let errors = {},
        query: any = {...req.query}

    if (!query.when) errors = {...errors, when: "Travel date is missing."}
    if (!query.isOneWay && !query.returnDate) errors = {...errors, returnDate: "Return date is missing."}

    //if (!moment().isSameOrAfter(query.when)) errors = {...errors, when: `Travel date should not be in the past.`}

    if (query.returnDate && !moment(query.returnDate).isSameOrAfter(query.when)) errors = {...errors, returnDate: "Return date should not be in the past or before departure's date."}

    if (!query?.from) errors = {...errors, from: "Origin airport is missing."}
    if (!query?.to) errors = {...errors, to: "Destination airport is missing."}

    if (!query?.adults && !query?.children) errors = {...errors, passengers: "At least one passenger either an adult or children is required."}

    if (Object.keys(errors).length) return res.send({
        status: "error",
        errors: errors
    }).status(400)

    let details: any = {
        originLocationCode: query.from,
        destinationLocationCode: query.to,
        adults: parseInt(query.adults),
        children: parseInt(query.children),
        infants: parseInt(query.infants),
        departureDate: moment(query.when).format("YYYY-MM-DD"),
        returnDate: "2023-12-21",//!!query.isOneWay ? moment(query.returnDate).format("YYYY-MM-DD") : null,
        currencyCode: query?.currency ? query.currency : "USD",
        //travelClass: "ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST",
        max: 10
    }

    for (const d in details){
        if (!details[d]) delete details[d]
    }

    try {
        const _deals = await deals(details)
        //return res.json(_deals)
        return res.json({
            status: "success",
            deals: _deals
        })
    }catch (e: any) {
        return res.send({
            status: "error",
            message: e.response.data
        }).status(e.response.status)
    }
});

module.exports = router;
