import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import VerifyEmailView from '@/views/auth/VerifyEmailView.vue'

import DashboardView from '@/views/DashboardView.vue'
import TransactionView from '@/views/transaction/TransactionIndex.vue'
import BankAccountView from '@/views/bankAccount/BankAccountIndex.vue'
import AssetView from '@/views/asset/AssetIndex.vue'
import CategoryView from '@/views/category/CategoryIndex.vue'
import BudgetView from '@/views/budget/BudgetIndex.vue'
import DebtView from '@/views/debt/DebtIndex.vue'

import AppearanceView from '@/views/setting/AppearanceView.vue'
import PasswordView from '@/views/setting/PasswordView.vue'
import ProfileView from '@/views/setting/ProfileView.vue'

import { useAuthStore } from '@/stores/auth.ts'
import BudgetIndex from '@/views/budget/BudgetIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      redirect: '/dashboard',
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionView,
      meta: { requiresAuth: true }
    },
    {
      path: '/bank-account',
      name: 'bank-account',
      component: BankAccountView,
      meta: { requiresAuth: true }
    },
    {
      path: '/asset',
      name: 'asset',
      component: AssetView,
      meta: { requiresAuth: true }
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView,
      meta: { requiresAuth: true }
    },
    {
      path: '/budget',
      name: 'budget',
      component: BudgetIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/budget/show',
      name: 'budget-show',
      component: BudgetView,
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/budget-show/:slug',
    //   name: 'budget-show',
    //   component: BudgetView,
    //   meta: { requiresAuth: true }
    // },
    //
    {
      path: '/debt',
      name: 'debt',
      component: DebtView,
      meta: { requiresAuth: true }
    },

    {
      path: '/settings/appearance',
      name: 'settings-appearance',
      component: AppearanceView,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings/password',
      name: 'settings-password',
      component: PasswordView,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings/profile',
      name: 'settings-profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
      meta: { guest: true }
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: VerifyEmailView,
      meta: { guest: true }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: { guest: true }
    },


  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem('token');
  console.log("Navigating to", to.name, to.params);

  if (to.name === 'login' && !token) {
    authStore.user = null;
    return true;
  }

  if (token && !authStore.user && to.name !== 'login') {
    try {
      await authStore.getUser();
      return true;
    } catch (err) {
      console.error(err.message);
      localStorage.removeItem('token');
      authStore.user = null;
      if (to.name !== 'login') {
        return { name: "login" };
      }
    }
  }


  if (authStore.user && to.meta.guest) {
    return { name: "dashboard" };
  }

  if (!authStore.user && to.meta.requiresAuth) {
    if (to.name === "login") {
      return true;
    } else {
      return { name: "login" };
    }
  }
  return true;
});

export default router;
