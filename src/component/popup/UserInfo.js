import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/userInfoPopup.css";

const UserInfoPopup = ({ isOpen, onClose }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      axios
        .get("/member/info/get")
        .then((response) => {
          setUserInfo(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch user info:", error);
          setError("Failed to load user information.");
          setLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  if (loading) return <div className="userinfo_popup_container"><div className="popup_body">Loading...</div></div>;

  if (error) return <div className="userinfo_popup_container"><div className="popup_body">{error}</div></div>;

  return (
    <div className="userinfo_popup_container">
      <div className="userinfo_popup_main">
        <div className="popup_body">
          <h2>회원 정보</h2>
          <div className="userinfo_popup_content">
            <p><strong>ID:</strong> {userInfo.memId}</p>
            <p><strong>Password:</strong> {userInfo.memPw}</p>
            <p><strong>Name:</strong> {userInfo.memName}</p>
            <p><strong>Email:</strong> {userInfo.memEmail}</p>
            <p><strong>Phone:</strong> {userInfo.memPhone}</p>
            <p><strong>Sex:</strong> {userInfo.memSex === "M" ? "Male" : "Female"}</p>
            <p><strong>Birth:</strong> {new Date(userInfo.memBirth).toLocaleDateString()}</p>
            <p><strong>Address:</strong> {userInfo.memAddr}</p>
            <p><strong>Type:</strong> {userInfo.memType}</p>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPopup;
