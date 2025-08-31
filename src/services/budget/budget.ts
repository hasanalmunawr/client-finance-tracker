import http from '../http.ts'

export const create = (payload: { budget_header_id: number; category_id: number; description: string; amount: number }) => {
  return http.post('/budgets/create', payload)
}

export const getMine = () => {
  return http.get('/budgets/mine')
}

export const getByHeaderId = (id: number) => {
  return http.get(`/budgets/header/${id}`);
}

export const update = (id: number, payload: { budget_header_id: number; category_id: number; description: string; amount: number}) => {
  return http.put(`/budgets/update/${id}`, payload);
};


export const deleteBudget = (id: number) => {
  return http.delete(`/budgets/delete/${id}`);
};


