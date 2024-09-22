import React, { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import "../../assets/css/payCard.css";
import "../../assets/css/popup.css";
import close_window from "../../assets/img/close-window.png";
import card from "../../assets/img/default_card.png";
import plus from "../../assets/img/plus_white.png";
import InsertPayment from "./InsertPayment";

function SelectPayment({ period, prodNum, onClose }) {
  const [payment, setPayment] = useState([]);
  const [showInsertPayment, setShowInsertPayment] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  function handlePaymentAdded() {
    fetchPayments();
  }

  const fetchPayments = () => {
    axios
      .get(`/subscription/paymentAllByMember`, { withCredentials: true })
      .then((res) => {
        setPayment(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function subscription(period, payNum) {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + period);

    const formattedToday = today.toISOString(); // ISO 8601 형식
    const formattedDeliveryDate = deliveryDate.toISOString(); // ISO 8601 형식

    if (window.confirm("구독 하시겠습니까?")) {
      axios
        .post(
          `/subscription/subscriptionInsert`,
          {
            subPer: period,
            subStart: formattedToday,
            subDeli: formattedDeliveryDate,
            subStat: 1,
            subUpd: formattedToday,
            subCnt: 1,
            prodNum: prodNum,
            payNum: payNum,
          },
          { withCredentials: true }
        )
        .then((res) => {
          alert("구독되었습니다.");
          console.log(res);
          onClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function addPayCard() {
    setShowInsertPayment(true);
  }

  if (showInsertPayment) {
    return (
      <InsertPayment
        onClose={() => setShowInsertPayment(false)}
        onPaymentAdded={handlePaymentAdded}
      />
    );
  }

  return (
    <div className="popup_container" onClick={onClose}>
      <div className="popup_main_fit" onClick={(e) => e.stopPropagation()}>
        <div className="close_popup" onClick={onClose}>
          <img src={close_window} alt="" className="close_img" />
        </div>
        <div className="popup_body_fit">
          <div className="popup_body_header">결제 정보</div>
          <hr />
          <div className="payCard-box">
            {payment.length > 0 ? (
              payment.map((payCard) => (
                <React.Fragment key={payCard.payNum}>
                  <div
                    className="payCard-container"
                    onClick={() => subscription(period, payCard.payNum)}
                  >
                    <img src={card} alt="" className="payCard-image" />
                    <div className="payCard-num">
                      {payCard.payCard}
                    </div>
                    <div className="payCard-brand">
                      {payCard.payBrand}
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))
            ) : (
              <></>
            )}
            <div
              className="payCard-container payCard-blurred"
              onClick={addPayCard}
            >
              <img src={card} alt="" className="payCard-image" />
              <div className="payCard-plus">
                <img src={plus} alt="" />
                카드 추가
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectPayment;
