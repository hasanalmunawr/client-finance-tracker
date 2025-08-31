import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://fintrack-api.hasanalmunawar.my.id/api',
  withCredentials: true // jika backend pakai session/cookie
})

// http.ts
http.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

http.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response && error.response.status === 401) {
    // misal redirect ke login jika token invalid
    window.location.href = '/login'
  }
  return Promise.reject(error)
})


export default http
