import React, { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import ScrollToTopOnMount from "../../util/ScrollToTopOnMount";
import '../../assets/css/tableStyles.css';

function MemberManage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/admin/memberAll` , { withCredentials: true })
      .then((res) => {
        console.log(res)
        setMembers(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
        setError("회원 정보를 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const deleteMem = async (memNum) => {
    const confirmed = window.confirm("정말로 이 회원을 삭제하시겠습니까?");
    
    if (confirmed) {
      try {
        await axios.post(`/admin/deleteMem`, null, {
          params: {
            memNum: memNum,
          },
        });
        setMembers((prevMembers) => prevMembers.filter((member) => member.memNum !== memNum));
        alert("회원 삭제가 완료되었습니다.");
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("회원 삭제에 실패했습니다.");
      }
    }
  };


  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <h3 className="text-2xl font-bold mt-5 mb-4">회원 관리</h3>
      <table className="common-table min-w-full bg-white border border-gray-300">
        <thead className="common-thead">
          <tr className="common-tr bg-gray-100">
            <th className="common-th py-2 px-4 border-b">번호</th>
            <th className="common-th py-2 px-4 border-b">권한</th>
            <th className="common-th py-2 px-4 border-b">ID</th>
            <th className="common-th py-2 px-4 border-b">이름</th>
            <th className="common-th py-2 px-4 border-b">이메일</th>
            <th className="common-th py-2 px-4 border-b">전화번호</th>
            <th className="common-th py-2 px-4 border-b">성별</th>
            <th className="common-th py-2 px-4 border-b">생일</th>
            <th className="common-th py-2 px-4 border-b">주소</th>
            <th className="common-th py-2 px-4 border-b">삭제</th>
          </tr>
        </thead>
        <tbody className="common-tbody">
          {members.length > 0 ? ( members.map((member) => (
            <tr className="common-tr" key={member.id}>
              <td className="common-td py-2 px-4 border-b">{member.memNum}</td>
              <td className="common-td py-2 px-4 border-b">
                {member.memType === 9 ? "관리자" 
                : member.memType === 1 ? "사업자" 
                : member.memType === 2 ? "유저" 
                : "알 수 없음"}
              </td>
              <td className="common-td py-2 px-4 border-b">{member.memId}</td>
              <td className="common-td py-2 px-4 border-b">{member.memName}</td>
              <td className="common-td py-2 px-4 border-b">{member.memEmail}</td>
              <td className="common-td py-2 px-4 border-b">{member.memPhone}</td>
              <td className="common-td py-2 px-4 border-b">{member.memSex}</td>
              <td className="common-td py-2 px-4 border-b">{new Date(member.memBirth).toLocaleDateString()}</td>
              <td className="common-td py-2 px-4 border-b">{member.memAddr}</td>
              <td className="common-td py-2 px-4 border-b">
                <button
                  className="common-button"
                  onClick={() => deleteMem(member.memNum)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))) :(
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MemberManage;