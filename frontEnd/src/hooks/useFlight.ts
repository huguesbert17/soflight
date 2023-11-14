import axios from "axios";
import {IFlightDetails} from "../views/home/Hero";


const useFlight = () => {

    /**
     * Retrieving airports by city or name
     * @param name
     */
    const getAirports = async (name: string) => {
      const res = await  axios.get("http://localhost:3001/api/airport", {
          params: {
              name: name
          }
      })

        return res
    }

    const getDeals = async (details: IFlightDetails|undefined) => {
        // details?.when
        const res = await  axios.get("http://localhost:3001/api/flight-offers", {
            params: details
        })

        return res
    }

    const confirmFlight = async (offer: any) => {
        const res = await  axios.post("http://localhost:3001/api/flight-offers", offer)
        return res
    }


    const bookFlight = async (flightOffer: any) => {
        const res = await  axios.post("http://localhost:3001/api/flight-booking", flightOffer)
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
