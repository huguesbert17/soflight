import axios from "axios";


const useAuth = () => {

    const getToken = async () => {
        //This will be replaced to use on-server request
        const url: string = process.env.REACT_APP_AMADEUS_AUTH_API_URL ? process.env.REACT_APP_AMADEUS_AUTH_API_URL : ""
        const token = await axios.post(url, {
            "grant_type": "client_credentials",
            "client_id": process.env.REACT_APP_AMADEUS_API_KEY,
            "client_secret": process.env.REACT_APP_AMADEUS_API_SECRET
        })
        console.log(token);
    }

    return {getToken}
}
export default useAuth
