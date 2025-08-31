import http from '../http.ts'

export const create = (payload: {
  type: string;
  category_id: number;
  from_bank_account_id: number;
  to_bank_account_id: number;
  amount: number;
  notes: string;
  date: string;
}) => {
  return http.post('/transactions/create', payload)
}

export const getMine = (monthYear: string, bankId: number) => {
  return http.get('/transactions/mine-2', {
    params: {
      month: monthYear,
      sort: 'desc',
      bankId: bankId ?? 0
    }
  });
};
