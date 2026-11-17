import axios from 'axios'

export const useApi = () => {
    const api = axios.create({
        baseURL: 'http://192.168.88.178:5000/api/'
    })

    api.interceptors.request.use((req) => {
        const token = localStorage.getItem('token')
        if (token) {
            req.headers.Authorization = `Bearer ${token}`
        }
        return req
    })

    return api
}   