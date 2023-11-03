import axios from "axios";
const {getClient} = require("./redis")


const token = async () => {
    const redis = await getClient()
    const token = await redis.get("AMADEUS_TOKEN");

    if (token) return JSON.parse(token)

    // @ts-ignore
    const api = await axios.post(process.env.AMADEUS_AUTH_TEST_API_URL,
        `grant_type=client_credentials&client_id=${process.env.AMADEUS_API_KEY}&client_secret=${process.env.AMADEUS_API_SECRET}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    redis.set( "AMADEUS_TOKEN", JSON.stringify(api.data), {
        EX: api.data.expires_in
    } );

    return api.data
}

const airports = async (name: string, page: number = 1) => {
    const _token = await token()
    const response = await axios.get(`${process.env.AMADEUS_API_TEST_URL}/reference-data/locations`, {
        params: {
            keyword: name,
            subType: "CITY,AIRPORT",
            //"page": page * 10
        },
        headers: {
            Authorization: 'Bearer ' + _token.access_token
        }
    });

    return response.data
}

module.exports = {
    token,
    airports
}
