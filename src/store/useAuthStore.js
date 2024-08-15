import create from 'zustand';

const useAuthStore = create((set) => ({
  isLogin: false,
  memberInfo: null,
  loginAuth: (info) => set({ isLogin: true, memberInfo: info }),
  logoutAuth: () => set({ isLogin: false, memberInfo: null }),
}));

export default useAuthStore;
