import React, { useEffect, useState } from "react";
import "../../assets/css/loginPopup.css";
import axios from "../../api/axios.js";
import useAuthStore from "../../store/useAuthStore";
import close_window from "../../assets/img/close-window.png"; // X 버튼 이미지

export default function Login({ isOpen, onClose }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState(""); 
  const { loginAuth } = useAuthStore();

  useEffect(() => {
    if (!isOpen) {
      setId("");
      setPw("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null; 

  function login() {
    axios
      .post("/auth/login", { id, pw }, { withCredentials: true })
      .then((res) => {
        const { memNum, memId, memType } = res;
        loginAuth({ memNum, memId, memType });
        onClose();
      })
      .catch((err) => {
        setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.");
      });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      login();
    }
  }

  return (
    <div className="popup_container" onClick={onClose}>
      <div className="popup_main" onClick={(e) => e.stopPropagation()}>
        {/* X 버튼 추가 */}
        <div className="close_popup" onClick={onClose}>
          <img src={close_window} alt="닫기" className="close_img" />
        </div>
        <div className="popup_body">
          <h2>로그인</h2>
          <div className="login-form">
            <label htmlFor="id">ID:</label>
            <input
              id="id"
              type="text"
              placeholder="아이디 입력"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="pw">PW:</label>
            <input
              id="pw"
              type="password"
              placeholder="비밀번호 입력"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={login}>로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
}
