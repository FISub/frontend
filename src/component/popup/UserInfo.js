import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../assets/css/userInfoPopup.css";
import close_window from "../../assets/img/close-window.png";
import EditUserInfo from "./EditUserInfo";

const UserInfo = ({ isOpen, onClose }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchUserInfo = () => {
    axios
      .get("/member/info/get", {}, { withCredentials: true })
      .then((response) => {
        setUserInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user info:", error);
        setError("Failed to load user information.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      fetchUserInfo();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isEditOpen) {
      fetchUserInfo();
    }
  }, [isEditOpen]);

  if (!isOpen) return null;

  if (loading)
    return (
      <div className="userinfo_popup_container">
        <div className="popup_body">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="userinfo_popup_container">
        <div className="popup_body">{error}</div>
      </div>
    );

  const handleEditClick = () => {
    setIsEditOpen(true); 
  };

  if (isEditOpen) {
    return <EditUserInfo onClose={() => setIsEditOpen(false)} userInfo={userInfo}/>;
  }

  return (
    <div>
      <div className="popup_container">
        <div className="popup_main">
          <div className="close_popup" onClick={onClose}>
            <img src={close_window} alt="닫기" className="close_img" />
          </div>
          <div className="popup_body">
            <h2>회원 정보</h2>
            <hr />
            <div className="userinfo_popup_content">
              <p>
                <strong>ID:</strong> {userInfo.memId}
              </p>
              <p>
                <strong>Password:</strong> {userInfo.memPw}
              </p>
              <p>
                <strong>Name:</strong> {userInfo.memName}
              </p>
              <p>
                <strong>Email:</strong> {userInfo.memEmail}
              </p>
              <p>
                <strong>Phone:</strong> {userInfo.memPhone}
              </p>
              <p>
                <strong>Sex:</strong>{" "}
                {userInfo.memSex === "M" ? "Male" : "Female"}
              </p>
              <p>
                <strong>Birth:</strong>{" "}
                {new Date(userInfo.memBirth).toLocaleDateString()}
              </p>
              <p>
                <strong>Address:</strong> {userInfo.memAddr}
              </p>
              <p>
                <strong>Type:</strong> {userInfo.memType}
              </p>
            </div>
            <button className="userInfoBtn" onClick={handleEditClick}>
              정보 수정
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
