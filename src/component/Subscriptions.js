import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../assets/css/subscriptions.css";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('/member/sublist/get', { withCredentials: true });
        console.log(response);
        setSubscriptions(response.data);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscriptions) => (
            <tr key={subscriptions.sub_num}>
              <td className="py-2 px-4 border-b"><img src={subscriptions.imgURL} width="80" height="80" /></td>
              <td className="py-2 px-4 border-b">{subscriptions.prodName}</td>
              <td className="py-2 px-4 border-b">{subscriptions.subStart.split('T')[0]}</td>
              <td className="py-2 px-4 border-b">{subscriptions.subPer + "일"}</td>
              <td className="py-2 px-4 border-b">{subscriptions.subDeli.split('T')[0]}</td>
              <td className="py-2 px-4 border-b">{subscriptions.subCnt + "회"}</td>
              <td className="py-2 px-4 border-b">{subscriptions.subStat === 1 ? "배송중" 
                : subscriptions.subStat === 2 ? "배송완료" 
                : subscriptions.subStat === 3 ? "대기중" 
                : "알 수 없음"}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Subscriptions;
