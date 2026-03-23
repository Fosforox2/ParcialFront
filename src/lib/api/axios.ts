import axios from "axios";


export const api = axios.create({
    baseURL: "https://itunes.apple.com/search?term=coldplay&entity=album&limit=20",
    timeout: 5000
})