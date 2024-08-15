import React from "react";
import "../../assets/css/payCard.css";
import "../../assets/css/popup.css";

import close_window from "../../assets/img/close-window.png";

function InsertPayment({ onClose }) {
  return (
    <div className="popup_container" onClick={onClose}>
      <div className="popup_main_medium" onClick={(e) => e.stopPropagation()}>
        <div className="close_popup" onClick={onClose}>
          <img src={close_window} alt="" className="close_img" />
        </div>
        <div className="popup_body_medium">
          <div className="popup_body_header">결제정보 등록</div>
          <hr />
          <table className="payCard-insert">
            <tr className="payCard-insert-tr">
              <th className="payCard-insert-th">카드 번호</th>
              <td className="payCard-insert-td">
                <input className="test" maxLength="4"></input> -{" "}
                <input className="test" maxLength="4"></input> -{" "}
                <input className="test" maxLength="4"></input> -{" "}
                <input className="test" maxLength="4"></input>
              </td>
            </tr>
            <tr className="payCard-insert-tr">
              <th className="payCard-insert-th">유효기간</th>
              <td className="payCard-insert-td">
                <input className="test" maxLength="2"></input> /{" "}
                <input className="test" maxLength="2"></input>
              </td>
            </tr>
            <tr className="payCard-insert-tr">
              <th className="payCard-insert-th">CVC</th>
              <td className="payCard-insert-td">
                <input className="test" maxLength="3"></input>
              </td>
            </tr>
            <tr className="payCard-insert-tr">
              <th className="payCard-insert-th">비밀번호</th>
              <td className="payCard-insert-td">
                <input className="test" maxLength="2"></input>
                <span style={{ alignContent: "center", fontSize:'20px'}}>**</span>
              </td>
            </tr>
          </table>
          <button className="submitPayment">등록</button>
        </div>
      </div>
    </div>
  );
}

export default InsertPayment;
