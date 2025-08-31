import http from '../http.ts'

export const createBudgetHeader = (payload: { name: string; period: string; notes: string }) => {
  return http.post('/budget-headers/create', payload)
}

export const getMineBudgetHeader = () => {
  return http.get('/budget-headers/mine')
}

export const getBudgetHeader = (id: number) => {
  return http.get(`/budget-headers/${id}`);
};

export const updateBudgetHeader = (id: number, payload: { name: string; period: string; notes: string }) => {
  return http.put(`/budget-headers/update/${id}`, payload);
};

export const deleteBudgetHeader = (id: number) => {
  return http.delete(`/budget-headers/delete/${id}`);
};

