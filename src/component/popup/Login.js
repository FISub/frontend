import React, { useState } from "react";
import "../assets/css/popup.css";
import axios from "../../api/axios.js";

export default function Login({ isOpen, onClose }) {
  // 입력 필드 상태 관리
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  if (!isOpen) return null; // 팝업이 열리지 않으면 아무것도 렌더링하지 않음

  function login() {
    console.log(id); // 추후 삭제
    console.log(pw); // 추후 삭제
    axios
      .post("/user/login", { id, pw })
      .then((res) => {
        console.log("로그인 성공:", res);
      })
      .catch((err) => {
        console.error("로그인 실패:", err);
      });
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
          />{" "}
          <br />
          PW :{" "}
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <br />
          <button onClick={login}>로그인</button>
        </div>
      </div>
    </div>
  );
}
