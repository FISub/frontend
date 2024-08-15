import React, { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import "../../assets/css/popup.css";
import close_window from "../../assets/img/close-window.png";
import formatCardNumber from "../../util/FunctionUtil.js";

function SelectPayment({ period, onClose }) {
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    axios.get(`/main/paymentAllByMember`,{}, { withCredentials: true })
    .then((res) => {
      setPayment(res);
    }) 
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div className="login_popup_container"  onClick={onClose}>
      <div className="login_popup_main_long" onClick={(e) => e.stopPropagation()}>
      <div className="close_popup" onClick={onClose}>
        <img src={close_window} alt="" className="close_img" />
      </div>
        <div className="popup_body_long">
        {payment.length > 0 ? (
            payment.map((payCard, index) => (
              <div key={index}>{formatCardNumber(payCard.payCard)}</div> // payCard 객체의 payCard 속성 사용
            ))
          ) : (
            <div>등록된 카드 없음</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectPayment;
