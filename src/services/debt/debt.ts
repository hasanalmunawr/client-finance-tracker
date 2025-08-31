import http from '../http.ts'

export const create = (payload: {
  category_id: number;
  contact_name: string;
  amount: number;
  notes: string;
  due_date: string;
  type: string;
  is_paid: boolean;
}) => {
  return http.post('/debts/create', payload)
}

export const getMine = () => {
  return http.get('/debts/mine')
}

export const update = (id: number, payload: {
  category_id: number;
  contact_name: string;
  amount: number;
  notes: string;
  due_date: string;
  type: string;
  is_paid: boolean;
}) => {
  return http.put(`/debts/update/${id}`, payload);
};
