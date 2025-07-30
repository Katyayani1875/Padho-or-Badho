import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (userData, token) => set({ user: userData, token: token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage', // name of the item in storage (local storage by default)
    }
  )
);