import axios from "axios";
import {encrypt, decrypt} from "../utils/Encryption";
import useLocalStorage from "./useLocalStorage";
import {Exception} from "sass";


const useAuth = () => {
    const {get, set} = useLocalStorage()

    const getToken = async () => {
        const storage: string|null|undefined = get("apiToken")

        if (storage) return JSON.parse(decrypt(storage))

        try {
            const token = await axios.get("http://localhost:3001/api/token")

            set("apiToken", encrypt(JSON.stringify(token.data.data)), token.data.data.expires_in)

            return token.data.data
        }catch (e) {
            throw new Error("Something went wrong try again later.")
        }
    }

    return { getToken }
}
export default useAuth
