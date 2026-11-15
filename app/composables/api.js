import axios from 'axios'

export const useApi = () => {
    const api = axios.create({
        baseURL: 'http://192.168.88.178:5000/api/',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    api.interceptors.request.use((req) => {
        if (import.meta.client) {
            const token = localStorage.getItem('token')
            if (token) {
                req.headers.Authorization = `Bearer ${token}`
            }
        }
        return req
    })

    api.interceptors.response.use(
        (res) => res,
        (err) => {
            if (err.response?.status === 401 && import.meta.client) {
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                navigateTo('/')
            }
            return Promise.reject(err)
        }
    )

    return api
}