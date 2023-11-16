import axios from "axios";
import {IFlightDetails} from "../views/home/Hero";
import {API_URL} from "../utils/constants";
import {useEffect} from "react";
import useAuth from "./useAuth";


const useFlight = () => {
    const {getToken} = useAuth()

    const authToken = async () => {
        const token = await getToken()
        axios.defaults.headers.common['authorization'] = `Bearer ${token.access_token}`;
    }

    /**
     * Retrieving airports by city or name
     * @param name
     */
    const getAirports = async (name: string) => {
        await authToken()
      const res = await  axios.get(`${API_URL}/api/airport`, {
          params: {
              name: name,
          },
      })

        return res
    }

    const getDeals = async (details: IFlightDetails|undefined) => {
        await authToken()
        const res = await  axios.get(`${API_URL}/api/flight-offers`, {
            params: {
                ...details,
            }
        })

        return res
    }

    const confirmFlight = async (offer: any) => {
        await authToken()
        const res = await  axios.post(`${API_URL}/api/flight-offers`, {offer})
        return res
    }


    const bookFlight = async (flightOffer: any) => {
        await authToken()
        const res = await  axios.post(`${API_URL}/api/flight-booking`, {flightOffer})
        return res
    }

    return {
        getAirports,
        getDeals,
        confirmFlight,
        bookFlight
    }
}
export default useFlight
