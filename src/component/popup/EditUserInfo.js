import axios from "axios";
import React, { useState } from "react";
import "../../assets/css/popup.css";
import "../../assets/css/userInfoPopup.css";
import close_window from "../../assets/img/close-window.png";

const EditUserInfo = ({ userInfo, onClose }) => {
  const [id, setId] = useState(userInfo.memId);
  const [pw, setPw] = useState(userInfo.memPw);
  const [confirmPw, setConfirmPw] = useState(userInfo.memPw); // 비밀번호 확인 추가
  const [name, setName] = useState(userInfo.memName);
  const [email, setEmail] = useState(userInfo.memEmail);
  const [phone, setPhone] = useState(userInfo.memPhone);
  const [sex, setSex] = useState(userInfo.memSex);
  const [birth, setBirth] = useState(userInfo.memBirth);
  const [addr, setAddr] = useState(userInfo.memAddr);
  const [error, setError] = useState("");

  const validateForm = () => {
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
  };

  const handleSave = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    axios
      .put(
        "/member/info/update",
        {
          memId: id,
          memPw: pw,
          memName: name,
          memEmail: email,
          memPhone: phone,
          memSex: sex,
          memBirth: birth,
          memAddr: addr,
        },
        { withCredentials: true }
      )
      .then(() => {
        alert("성공적으로 수정되었습니다.");
        onClose(); // Close the popup
      })
      .catch((error) => {
        console.error("업데이트 하는데 실패하였습니다.", error);
        setError("중복된 id입니다.");
      });
  };

  return (
    <div className="popup_container">
      <div className="popup_main">
        <div className="close_popup" onClick={onClose}>
          <img src={close_window} alt="닫기" className="close_img" />
        </div>
        <div className="popup_body">
          <h2>유저 정보 수정</h2>
          <hr />
          <div className="userinfo_popup_content">
            <label htmlFor="id">ID:</label>
            <input
              id="id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor="pw">Password:</label>
            <input
              id="pw"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <label htmlFor="confirmPw">Confirm Password:</label>
            <input
              id="confirmPw"
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="sex">Sex:</label>
            <input
              id="sex"
              type="text"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            />
            <label htmlFor="birth">Birth Date:</label>
            <input
              id="birth"
              type="date"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
            <label htmlFor="addr">Address:</label>
            <input
              id="addr"
              type="text"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button className="editUserBtn" onClick={handleSave}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;
