import http from '../http.ts'

export const create = (payload: { name: string; type: string }) => {
  return http.post('/categories/create', payload)
}

export const getMine = () => {
  return http.get('/categories/mine-2')
}

export const update = (id: number, payload: { name: string; type: string }) => {
  return http.put(`/categories/update/${id}`, payload);
};

