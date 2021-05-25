import axios from "axios";
const api = axios.create({
    baseURL: `http://dexterodes.com/hotel_api`,
})
export default api;