import create from 'zustand';

const useAuthStore = create((set) => ({
  isLogin: false,
  memberInfo: null,
  initialize: () => {
    const savedState = localStorage.getItem('authState');
    if (savedState) {
      set(JSON.parse(savedState));
    }
  },
  loginAuth: (info) => {
    const state = { isLogin: true, memberInfo: info };
    localStorage.setItem('authState', JSON.stringify(state));
    set(state);
  },
  logoutAuth: () => {
    localStorage.removeItem('authState');
    set({ isLogin: false, memberInfo: null });
  },
}));

// Store 초기화
useAuthStore.getState().initialize();

export default useAuthStore;
