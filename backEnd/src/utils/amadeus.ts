import axios from "axios";
const {getClient} = require("./redis")

const AMADEUS_API_TEST_URL = "https://test.api.amadeus.com/",
      AMADEUS_API_SECRET = "79LhWIa4qGjJLO47",
      AMADEUS_API_KEY = "AalMteGQjffOkBU9fjJm1h2eply80I7J",
      AMADEUS_AUTH_TEST_API_URL = "https://test.api.amadeus.com/v1/security/oauth2/token"


const token = async () => {
    // const redis = await getClient()
    // const token = await redis.get("AMADEUS_TOKEN");

    // if (token) return JSON.parse(token)

    // @ts-ignore
    const api = await axios.post(AMADEUS_AUTH_TEST_API_URL,
        `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    // redis.set( "AMADEUS_TOKEN", JSON.stringify(api.data), {
    //     EX: api.data.expires_in
    // } );

    return api.data
}

const airports = async (token: string, name: string, page: number = 1) => {
    // const _token = await token()
    const response = await axios.get(`${AMADEUS_API_TEST_URL}/v1/reference-data/locations`, {
        params: {
            keyword: name,
            subType: "CITY,AIRPORT",
            //"page": page * 10
        },
        headers: {
            Authorization: token
        }
    });

    return response.data
}
type ICriteria = {
    originLocationCode: string,
    destinationLocationCode: string,
    departureDate: string
    returnDate?: string
    adults: number
    children?: number
    infants?: number
    travelClass?: "ECONOMY"|"PREMIUM_ECONOMY"|"BUSINESS"|"FIRST"
    includedAirlineCodes?: string
    excludedAirlineCodes?: string
    nonStop?: boolean
    currencyCode?: string
    maxPrice?: number
    max?: number
}
const deals = async (token: string, criteria: ICriteria, cabinClass = ["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"]) => {

    const response = await axios.get(`${AMADEUS_API_TEST_URL}v2/shopping/flight-offers`, {
        params: {...criteria},
        headers: {
            'Authorization': token
        }
    });

    return response.data
}
const confirmOffer = async (token: string, offer: any) => {

    const response = await axios.post(`${AMADEUS_API_TEST_URL}v1/shopping/flight-offers/pricing`, {
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

    return response.data
}
const bookFlight = async (token: string, offer: any) => {

    const response = await axios.post(`${AMADEUS_API_TEST_URL}v1/booking/flight-orders`, {
        data: {
            type: "flight-order",
            ...offer.flightOffer
        }
    }, {
        headers: {
            'Authorization': token,
            'X-HTTP-Method-Override': 'POST'
        }
    });

    return response
}

module.exports = {
    token,
    airports,
    deals,
    confirmOffer,
    bookFlight
}
