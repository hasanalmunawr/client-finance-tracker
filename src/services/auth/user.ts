import http from '../http.ts'

export const updateProfile = (payload: { username: string; email: string }) => {
  console.log(payload)
  return http.post('/user/update-profile', payload)
}

export const updatePassword = (payload: { oldPassword: string; newPassword: string; confirmPassword: string}) => {
  return http.post('/user/update-password', payload)
}

