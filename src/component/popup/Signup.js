import React, { useEffect, useState } from "react";
import "../../assets/css/signupPopup.css";
import axios from "../../api/axios.js";
import close_window from "../../assets/img/close-window.png";

export default function Signup({ isOpen, onClose }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [birth, setBirth] = useState("");
  const [addr, setAddr] = useState("");
  const [error, setError] = useState(""); 

  useEffect(() => {
    if (!isOpen) {
      setId("");
      setPw("");
      setConfirmPw("");
      setName("");
      setEmail("");
      setPhone("");
      setSex("");
      setBirth("");
      setAddr("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function validateForm() {
    if (!id.trim() || id.length < 4) {
      return "아이디는 4자 이상이어야 합니다.";
    }
    if (!pw.trim() || pw.length < 4) {
      return "비밀번호는 4자 이상이어야 합니다.";
    }
    if (pw !== confirmPw) {
      return "비밀번호가 일치하지 않습니다.";
    }
    if (!name.trim()) {
      return "이름을 입력해 주세요.";
    }
    if (!email.trim()) {
      return "이메일을 입력해 주세요.";
    }
    if (!phone.trim() || !/^\d{10,11}$/.test(phone)) {
      return "전화번호는 10자리 또는 11자리 숫자여야 합니다.";
    }
    if (!sex.trim() || !["M", "F"].includes(sex.toUpperCase())) {
      return "성별은 M 또는 F만 입력할 수 있습니다.";
    }
    if (!birth.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(birth)) {
      return "생년월일은 YYYY-MM-DD 형식이어야 합니다.";
    }
    if (!addr.trim()) {
      return "주소를 입력해 주세요.";
    }
    return "";
  }

  function signup() {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    axios
      .post("/auth/join", {
        memId: id,
        memPw: pw,
        memName: name,
        memEmail: email,
        memPhone: phone,
        memSex: sex,
        memBirth: birth,
        memAddr: addr,
        memType: 0
      }, { withCredentials: true })
      .then(() => {
        alert("회원가입 완료 , 해당 계정으로 로그인 해 주세요.");
        onClose();
      })
      .catch((error) => {
        setError("회원가입에 실패했습니다. 정보를 확인하세요."+ error);
      });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      signup();
    }
  }

  return (
    <div className="signup_popup_container" onClick={onClose}>
      <div className="signup_popup_main" onClick={(e) => e.stopPropagation()}>
        <div className="close_popup" onClick={onClose}>
          <img src={close_window} alt="닫기" className="close_img" />
        </div>
        <div className="popup_body">
          <h2>회원가입</h2>
          <div className="login-form">
            <label htmlFor="id">ID:</label>
            <input
              id="id"
              type="text"
              placeholder="아이디 입력 (4자 이상)"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              type="text"
              placeholder="01012345678 (숫자만 입력)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="sex">Sex:</label>
            <input
              id="sex"
              type="text"
              placeholder="성별 입력 M/F"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="birth">Birth Date:</label>
            <input
              id="birth"
              type="date"
              placeholder="생년월일 입력"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="addr">Address:</label>
            <input
              id="addr"
              type="text"
              placeholder="주소 입력"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="pw">PW:</label>
            <input
              id="pw"
              type="password"
              placeholder="비밀번호 입력 (4자 이상)"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="confirmPw">Confirm PW:</label>
            <input
              id="confirmPw"
              type="password"
              placeholder="비밀번호 확인 (4자 이상)"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={signup}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}
