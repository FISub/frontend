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
    <div className="subscriptions-container">
      {subscriptions.length === 0 ? (
        <div>No subscriptions found.</div>
      ) : (
        <div className="subscriptions-list">
          {subscriptions.map(sub => (
            <div className="subscription-card" key={sub.subNum}>
              <img src={sub.imgURL} alt={sub.prodNum} className="subscription-image" />
              <div className="subscription-info">
                <h3>구독번호: {sub.subNum}</h3>
                <p>구독 시작일: {new Date(sub.subStart).toLocaleDateString()}</p>
                <p>구독 배송일: {new Date(sub.subDeli).toLocaleDateString()}</p>
                <p>구독 기간: {sub.subPer}개월</p>
                <p>상품 번호: {sub.prodNum}</p>
                <p>결제 수단: {sub.payNum}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
