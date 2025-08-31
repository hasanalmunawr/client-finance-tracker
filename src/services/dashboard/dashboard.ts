import http from '../http.ts'


export const getDashboardSummaryTransaction = () => {
  return http.get('/dashboards/summary-transaction');
};


export const getDashboardSummaryCategory = (year: string, month: string) => {
  return http.get('/dashboards/summary-category', {
    params: {
      year: year,
      month: month,
    }
  });
};

export const getAvgSpending = (year: string, month: string) => {
  return http.get('/dashboards/avg-spending', {
    params: {
      year: year,
      month: month,
    }
  });
};

export const getTotalIncome = (year: string, month: string) => {
  return http.get('/dashboards/total-income', {
    params: {
      year: year,
      month: month,
    }
  });
};


export const getTotalExpense = (year: string, month: string) => {
  return http.get('/dashboards/total-expense', {
    params: {
      year: year,
      month: month,
    }
  });
};

export const getCashFlow = (year: string, month: string) => {
  return http.get('/dashboards/cash-flow', {
    params: {
      year: year,
      month: month,
    }
  });
};

