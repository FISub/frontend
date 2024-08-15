import React, { useState } from "react";
import "../../assets/css/popup.css";
import axios from "../../api/axios.js";
import useAuthStore from "../../store/useAuthStore";

export default function Login({ isOpen, onClose }) {
  // 입력 필드 상태 관리
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const { loginAuth } = useAuthStore();

  if (!isOpen) return null; // 팝업이 열리지 않으면 아무것도 렌더링하지 않음

  function login() {
    console.log(id); // 추후 삭제
    console.log(pw); // 추후 삭제
    axios
      .post("/auth/login", {id, pw} , { withCredentials: true })
      .then((res) => {
        console.log("로그인 결과:", res);
        const { memNum, memId, memType } = res;
        loginAuth({memNum, memId, memType});
        onClose();
      })
      .catch((err) => {
        console.error("로그인 실패:", err);
      });
  }

  function getSession() {
    axios
      .get("/auth/sessionInfo", {withCredentials: true})
      .then((res) => {
        console.log("세션 정보 : ", res);
        console.log(document.cookie);
      })
      .catch((err) => {
        console.error("세션 정보 가져오는 중 에러 발생", err);
        console.log(document.cookie);
      });
  }

  function getMemberInfo() {
    axios
      .get("/member/info/get", {withCredentials: true})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error("회원정보 가져오는 중 에러 발생", err);
      });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 Enter 동작 방지
      login(); // 로그인 함수 호출
    }
  }

  return (
    <div className="popup_container" onClick={onClose}>
      <div className="popup_main" onClick={(e) => e.stopPropagation()}>
        <div className="popup_body">
          ID :{" "}
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={handleKeyDown}
          />{" "}
          <br />
          PW :{" "}
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <br />
          <button onClick={login}>로그인</button>
          <button onClick={getSession}>세션 정보 가져오기</button>
          <br/>
          <button onClick={getMemberInfo}>유저 정보 불러오기</button>
        </div>
      </div>
    </div>
  );
}
