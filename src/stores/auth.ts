import { defineStore } from "pinia";
import router from '@/router';
import http from '../services/http.ts'

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  errors: Record<string, never>;
}


export const useAuthStore = defineStore("authStore", {
  state: (): AuthState => ({
    user: null,
    errors: {},
  }),

  actions: {

    async getUser() {
      try {
        const response = await http.get("/user/profile");
        this.user = response.data.result;
      } catch (error: any) {
        alert(error);
      }
    },

    async authenticate(formData: any) {
      try {
        const response = await http.post('/authentication/login', formData);
        const data = response.data;

        if (data?.status) {
          localStorage.setItem("token", data.result.token);
          this.user = data.result.user;
          this.errors = {};
          await router.push({ name: 'dashboard' });
        } else {
          // Jika response tidak success
          this.errors = data.message || 'Login gagal';
          alert(this.errors)
        }
      } catch (err: any) {
        const msg = err.response?.data?.message || 'Login gagal';
        const details = err.response?.data?.errors;
        this.errors = msg || details
        alert(msg) // ⬅️ Trigger alert di catch error juga
      }
    },

    /******************* Logout user *******************/
    async logout() {
      localStorage.removeItem('token');
      this.user = null;
      console.log("Logout successful. Token removed, user cleared.");
    },

    /******************* Logout user *******************/
    async forgotPassword(formData: any) {
      try {
        const response = await http.post('/authentication/forgot-password', formData);
        const data = response.data;

        if (data?.status) {
          // Simpan token
          // localStorage.setItem("token", data.result.token);
          //
          // // Simpan user ke state
          // this.user = data.result.user;

          // Kosongkan error
          // this.errors = null;

          // Redirect ke dashboard
          // await router.push({ name: 'dashboard' });
        } else {
          // Jika response tidak success
          this.errors = data.message || 'Login gagal';
        }
      } catch (err: any) {
        console.error("Login error:", err);
        // Tangani jika backend mengembalikan error response
        const msg = err.response?.data?.message;
        const details = err.response?.data?.errors;

        this.errors = msg || details || 'Login gagal';
      }

    }
  },
});
