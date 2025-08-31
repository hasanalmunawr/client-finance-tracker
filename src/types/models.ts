export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  is_enabled: boolean;
}
export interface Bank {
  id: number;
  name: string;
  number: string;
  balance: number;
  user: User;
  created_at: string;
}
export interface BankForm {
  id: number;
  name: string;
  number: string;
  balance: number;
}


export interface Budget {
  id: number;
  category_id: number;
  description: string;
  amount: number;
  category: Category;
  user: User;
  created_at: string;
}

export interface BudgetHeader {
  id: number;
  name: string;
  slug: string;
  period: string;
  notes: string;
  created_at: string;
}

export interface BudgetForm {
  id: number;
  budget_header_id: number;
  category_id: number;
  description: string;
  amount: number;
}

export interface BudgetHeaderForm {
  id: number;
  name: string;
  period: string;
  notes: string;
}


export interface Category {
  id: number;
  name: string;
  type: string;
  user: User;
  created_at: string;
}

export interface CategoryForm {
  id: number;
  name: string;
  type: string;
}

export interface Debt {
  id: number;
  category_id: number;
  contact_name: string;
  amount: number;
  notes: string;
  due_date: string;
  type: string;
  is_paid: boolean;
}

export interface DebtForm {
  id: number;
  category_id: number;
  contact_name: string;
  amount: number;
  notes: string;
  due_date: string | null;
  type: string;
  is_paid: boolean;
}

export interface Transaction {
  id: number;
  category_id: number;
  contact_name: string;
  from_bank_account_name: string;
  category: string;
  amount: number;
  notes: string;
  date: Date;
  type: string;
  is_paid: boolean;
}

export interface TransactionForm {
  id: number;
  type: string;
  category_id: number;
  from_bank_account_id: number;
  to_bank_account_id: number;
  amount: number;
  notes: string;
  date: string;
}

export interface Payment {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}


interface MonthlyTransactionItem {
  month: number,
  year: number,
  type: 'Income' | 'Expense'
  total_amount: number | string
  total_transactions: number
}


