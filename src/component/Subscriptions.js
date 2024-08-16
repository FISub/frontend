import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/subscriptions.css";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetchSubscriptions 함수 정의
  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get("/member/sublist/get", {
        withCredentials: true,
      });
      console.log(response);
      setSubscriptions(response.data);
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions(); // 컴포넌트 마운트 시 구독 리스트를 가져옴
  }, []);

  // handleDelete 함수에서 fetchSubscriptions 함수 사용
  const handleDelete = async (sub_num) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await axios.delete(`/member/sublist/delete?subNum=${sub_num}`, {
          withCredentials: true,
        });
        console.log(sub_num);
        fetchSubscriptions(); // 구독 삭제 후 리스트를 다시 불러옴
      } catch (err) {
        console.error("Error deleting subscription:", err);
        console.log(sub_num);
        setError(err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching subscriptions.</div>;

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <h3 className="text-2xl font-bold mt-5 mb-4">구독 리스트</h3>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">이미지</th>
            <th className="py-2 px-4 border-b">상품명</th>
            <th className="py-2 px-4 border-b">구독일</th>
            <th className="py-2 px-4 border-b">구독주기</th>
            <th className="py-2 px-4 border-b">배송출발예정일</th>
            <th className="py-2 px-4 border-b">구독횟수</th>
            <th className="py-2 px-4 border-b">상태</th>
            <th className="py-2 px-4 border-b">삭제</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.subNum}>
              <td className="py-2 px-4 border-b">
                <img
                  src={subscription.imgURL}
                  width="80"
                  height="80"
                  alt="상품 이미지"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <Link
                  className="color-green"
                  to={`/products/${subscription.prodNum}`}
                >
                  {subscription.prodName}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                {subscription.subStart.split("T")[0]}
              </td>
              <td className="py-2 px-4 border-b">
                {subscription.subPer + "일"}
              </td>
              <td className="py-2 px-4 border-b">
                {subscription.subDeli.split("T")[0]}
              </td>
              <td className="py-2 px-4 border-b">
                {subscription.subCnt + "회"}
              </td>
              <td className="py-2 px-4 border-b">
                {subscription.subStat === 1
                  ? "배송중"
                  : subscription.subStat === 2
                  ? "배송완료"
                  : subscription.subStat === 3
                  ? "대기중"
                  : "알 수 없음"}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(subscription.subNum)}
                  className="delete-button"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subscriptions;
