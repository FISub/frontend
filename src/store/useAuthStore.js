import { create } from "zustand";

const EXPIRATION_TIME = 2 * 60 * 60 * 1000; // 2시간을 밀리초로 변환

const useAuthStore = create((set, get) => ({
  isLogin: false,
  memberInfo: null,
  expirationTimer: null,
  initialize: () => {
    const savedState = localStorage.getItem("authState");
    if (savedState) {
      const { isLogin, memberInfo, expirationTimestamp } =
        JSON.parse(savedState);
      if (expirationTimestamp && expirationTimestamp > Date.now()) {
        set({ isLogin, memberInfo });
        // 타이머 재설정
        const timer = setTimeout(() => {
          get().logoutAuth();
        }, expirationTimestamp - Date.now());
        set({ expirationTimer: timer });
      } else {
        // 만료된 상태면 자동 로그아웃
        localStorage.removeItem("authState");
      }
    }
  },
  loginAuth: (info) => {
    const expirationTimestamp = Date.now() + EXPIRATION_TIME;
    const state = { isLogin: true, memberInfo: info, expirationTimestamp };
    localStorage.setItem("authState", JSON.stringify(state));

    // 기존 타이머가 있으면 클리어
    const existingTimer = get().expirationTimer;
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // 새로운 타이머 설정
    const timer = setTimeout(() => {
      get().logoutAuth();
    }, EXPIRATION_TIME);

    set({ ...state, expirationTimer: timer });
  },
  logoutAuth: () => {
    localStorage.removeItem("authState");

    // 타이머 클리어
    const timer = get().expirationTimer;
    if (timer) {
      clearTimeout(timer);
    }

    set({ isLogin: false, memberInfo: null, expirationTimer: null });
  },
}));

// Store 초기화
useAuthStore.getState().initialize();

export default useAuthStore;
