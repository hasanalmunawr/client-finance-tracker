import http from '../http.ts'

export const create = (payload: { name: string; number: string; balance: number; }) => {
  return http.post('/bank-accounts/create', payload)
}

export const getMine = () => {
  return http.get('/bank-accounts/mine-2')
}

export const update = (id: number, payload: { name: string; number: string; balance: number; }) => {
  return http.put(`/bank-accounts/update/${id}`, payload);
};

