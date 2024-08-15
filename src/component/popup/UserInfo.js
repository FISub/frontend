import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/userInfoPopup.css";
import EditUserInfo from "./EditUserInfo"; // 수정 팝업 컴포넌트 import

const UserInfo = ({ isOpen, onClose }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false); // 수정 팝업 열기 상태

  const fetchUserInfo = () => {
    axios
      .get("/member/info/get",{}, { withCredentials: true })
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
      fetchUserInfo(); // 수정 팝업이 닫힐 때 사용자 정보를 새로 가져옵니다.
    }
  }, [isEditOpen]);

  if (!isOpen) return null;

  if (loading) return <div className="userinfo_popup_container"><div className="popup_body">Loading...</div></div>;

  if (error) return <div className="userinfo_popup_container"><div className="popup_body">{error}</div></div>;

  const handleEditClick = () => {
    setIsEditOpen(true); // 수정 팝업 열기
  };

  return (
    <div>
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
            <button onClick={handleEditClick}>정보 수정</button> {/* 수정 버튼 */}
            <button onClick={onClose}>닫기</button>
          </div>
        </div>
      </div>
      {/* 수정 팝업 컴포넌트 */}
      {isEditOpen && <EditUserInfo userInfo={userInfo} onClose={() => setIsEditOpen(false)} />}
    </div>
  );
};

export default UserInfo;
