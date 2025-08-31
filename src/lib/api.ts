// // src/lib/api.ts
// import axios from 'axios'
//
// const api = axios.create({
//   baseURL: 'http://localhost:8088/api', // ganti dengan base URL Spring kamu
// })
//
// // Interceptor untuk otomatis menyisipkan token JWT
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })
//
// export default api
