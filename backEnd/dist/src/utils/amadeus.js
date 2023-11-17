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
const axios_1 = __importDefault(require("axios"));
const { getClient } = require("./redis");
const token = () => __awaiter(void 0, void 0, void 0, function* () {
    // const redis = await getClient()
    // const token = await redis.get("AMADEUS_TOKEN");
    // if (token) return JSON.parse(token)
    // @ts-ignore
    const api = yield axios_1.default.post(process.env.AMADEUS_AUTH_TEST_API_URL, `grant_type=client_credentials&client_id=${process.env.AMADEUS_API_KEY}&client_secret=${process.env.AMADEUS_API_SECRET}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    // redis.set( "AMADEUS_TOKEN", JSON.stringify(api.data), {
    //     EX: api.data.expires_in
    // } );
    return api.data;
});
const airports = (token, name, page = 1) => __awaiter(void 0, void 0, void 0, function* () {
    // const _token = await token()
    const response = yield axios_1.default.get(`${process.env.AMADEUS_API_TEST_URL}/v1/reference-data/locations`, {
        params: {
            keyword: name,
            subType: "CITY,AIRPORT",
            //"page": page * 10
        },
        headers: {
            Authorization: token
        }
    });
    return response.data;
});
const deals = (token, criteria, cabinClass = ["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"]) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${process.env.AMADEUS_API_TEST_URL}v2/shopping/flight-offers`, {
        params: Object.assign({}, criteria),
        headers: {
            'Authorization': token
        }
    });
    return response.data;
});
const confirmOffer = (token, offer) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${process.env.AMADEUS_API_TEST_URL}v1/shopping/flight-offers/pricing`, {
        data: {
            type: "flight-offers-pricing",
            flightOffers: [offer.offer]
        }
    }, {
        headers: {
            'Authorization': token,
            'X-HTTP-Method-Override': 'POST'
        }
    });
    return response.data;
});
const bookFlight = (token, offer) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${process.env.AMADEUS_API_TEST_URL}v1/booking/flight-orders`, {
        data: Object.assign({ type: "flight-order" }, offer.flightOffer)
    }, {
        headers: {
            'Authorization': token,
            'X-HTTP-Method-Override': 'POST'
        }
    });
    return response;
});
module.exports = {
    token,
    airports,
    deals,
    confirmOffer,
    bookFlight
};
