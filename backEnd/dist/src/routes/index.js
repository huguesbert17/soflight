"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const { token, airports, deals, confirmOffer, bookFlight } = require("../utils/amadeus");
const _deals = require("./test.json");
const booked = require("./booked.json");
const flightBooked = require("./flightBooked.json");
// const express = require('express');
const router = express_1.default.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Welcome to Express & TypeScript Server');
});
router.get('/api/token', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _token = yield token();
    res.json({
        status: "success",
        data: _token
    }).status(200);
}));
router.get('/api/airport', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.name)
        res.json({
            status: "error",
            "message": "Airport or city name is required."
        }).status(403);
    try {
        const airport = yield airports(req.headers['authorization'], req.query.name);
        res.json({
            status: "success",
            data: airport.data
        }).status(200);
    }
    catch (e) {
        res.json({});
    }
}));
router.get('/api/flight-offers', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = {}, query = req.query;
    if (!query.when || !(0, moment_1.default)(query.when).isValid())
        errors = Object.assign(Object.assign({}, errors), { when: "Departure date is missing or invalid." });
    if ((query === null || query === void 0 ? void 0 : query.returnDate) && !(0, moment_1.default)(query === null || query === void 0 ? void 0 : query.returnDate).isValid())
        errors = Object.assign(Object.assign({}, errors), { returnDate: "Return date is missing or invalid." });
    if (!(0, moment_1.default)(query.when).utc().isSameOrAfter((0, moment_1.default)(query.when).utc()))
        errors = Object.assign(Object.assign({}, errors), { when: `Travel date should not be in the past ${query.when}.` });
    if ((query === null || query === void 0 ? void 0 : query.returnDate) && !(0, moment_1.default)(query.returnDate).utc().isSameOrAfter(query.when))
        errors = Object.assign(Object.assign({}, errors), { returnDate: "Return date should not be in the past or before departure's date." });
    if (!(query === null || query === void 0 ? void 0 : query.from))
        errors = Object.assign(Object.assign({}, errors), { from: "Origin airport is missing." });
    if (!(query === null || query === void 0 ? void 0 : query.to))
        errors = Object.assign(Object.assign({}, errors), { to: "Destination airport is missing." });
    if (!(query === null || query === void 0 ? void 0 : query.adults) && !(query === null || query === void 0 ? void 0 : query.children))
        errors = Object.assign(Object.assign({}, errors), { passengers: "At least one passenger either an adult or children is required." });
    if (Object.keys(errors).length)
        return res.send({
            status: "error",
            errors: errors
        }).status(400);
    let details = {
        originLocationCode: query.from,
        destinationLocationCode: query.to,
        adults: parseInt(query.adults),
        children: parseInt(query.children),
        infants: parseInt(query.infants),
        departureDate: (0, moment_1.default)(query.when).format("YYYY-MM-DD"),
        currencyCode: (query === null || query === void 0 ? void 0 : query.currency) ? query.currency : "USD",
        //travelClass: "ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST",
        max: 10
    };
    if (query.returnDate)
        details = Object.assign(Object.assign({}, details), { returnDate: (0, moment_1.default)(query.returnDate).format("YYYY-MM-DD") });
    for (const d in details) {
        if (!details[d])
            delete details[d];
    }
    // axios.defaults.headers.common['Authorization'] = req.headers['authorization']
    try {
        const _deals = yield deals(req.headers['authorization'], details);
        // return res.json(_deals)
        return res.json({
            status: "success",
            deals: _deals
        });
    }
    catch (e) {
        return res.send({
            status: "error",
            message: e.response.data
        }).status(400);
    }
}));
router.post('/api/flight-offers', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // axios.defaults.headers.common['Authorization'] = req.headers['authorization']
        // return res.json(booked)
        const confirm = yield confirmOffer(req.headers['authorization'], Object.assign({}, req.body));
        res.json(confirm);
    }
    catch (e) {
        return res.send({
            status: "error",
            message: e.response.data
        }).status(400);
    }
}));
router.post('/api/flight-booking', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // axios.defaults.headers.common['Authorization'] = req.headers['authorization']
        const confirm = yield bookFlight(req.headers['authorization'], req.body);
        // const confirm = flightBooked
        return res.json({
            status: "success",
            data: confirm.data
        });
    }
    catch (e) {
        return res.send({
            status: "error",
            message: e.response.data
        }).status(400);
    }
}));
module.exports = router;
