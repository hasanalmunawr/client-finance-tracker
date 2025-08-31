import http from '../http.ts'

export const login = (payload: { email: string; password: string }) => {
  return http.post('/auth/login', payload)
}

export const register = (payload: { username: string; email: string; password: string, phone: string, role: string, }) => {
  return http.post('/auth/register', payload)
}

// export const getCurrentUser = () => {
//   return http.get('/auth/me')
// }
