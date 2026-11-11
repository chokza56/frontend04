import axios from 'axios'

export const useApi = () => {

    const api = axios.create({
        baseURL: 'http://192.168.88.210:5000/api/',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return api
}
