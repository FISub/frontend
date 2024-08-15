import React, { useState } from "react";
import "../../assets/css/payCard.css";
import "../../assets/css/popup.css";
import axios from "../../api/axios.js";
import close_window from "../../assets/img/close-window.png";

function InsertPayment({ onClose, onPaymentAdded }) {
  const [cardNumber1, setCardNumber1] = useState("");
  const [cardNumber2, setCardNumber2] = useState("");
  const [cardNumber3, setCardNumber3] = useState("");
  const [cardNumber4, setCardNumber4] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const regixForCardNum = /^\d{4}$/;
  const regixForCvc = /^\d{3}$/;
  const regixForMonthYearPw = /^\d{2}$/;

  function validatePayment() {    
    const month = parseInt(expiryMonth, 10);
    const year = parseInt(expiryYear, 10);
    if (
      !regixForCardNum.test(cardNumber1) ||
      !regixForCardNum.test(cardNumber2) ||
      !regixForCardNum.test(cardNumber3) ||
      !regixForCardNum.test(cardNumber4)
    ) {
      setError("16자리 카드번호를 입력해주세요.");
      return false;
    }
    if (
      !regixForMonthYearPw.test(expiryMonth) ||
      !regixForMonthYearPw.test(expiryYear)
    ) {
      setError("유효기간은 MM/YY 형식으로 입력해야 합니다.");
      return false;
    }

    if (month < 1 || month > 12) {
      setError("월은 01에서 12 사이여야 합니다.");
      return false;
    }

    if (year < 0 || year > 99) {
      setError("연도는 00에서 99 사이여야 합니다.");
      return false;
    }

    if (!regixForCvc.test(cvc)) {
      setError("CVC는 3자리 숫자여야 합니다.");
      return false;
    }

    if (!regixForMonthYearPw.test(password)) {
      setError("비밀번호는 2자리 숫자여야 합니다.");
      return false;
    }
    setError(""); // 오류 메시지 초기화
    return true;
  }

  const handleSubmit = () => {
    if (validatePayment()) {
      axios
        .post(
          `/main/paymentInsert`,
          {
            payCard: cardNumber1 + cardNumber2 + cardNumber3 + cardNumber4,
            payExp: `${expiryMonth}/${expiryYear}`,
            payCvc: cvc,
            payPw: password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("결제 정보 등록 성공:", res);
          alert('결제 정보를 등록하였습니다.')
          onPaymentAdded();
          onClose();
        })
        .catch((err) => {
          console.log("결제 정보 등록 실패:", err);
        });
    }
  };

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
            <tbody>
              <tr className="payCard-insert-tr">
                <th className="payCard-insert-th">카드 번호</th>
                <td className="payCard-insert-td">
                  <input
                    maxLength="4"
                    value={cardNumber1}
                    onChange={(e) => setCardNumber1(e.target.value)}
                  ></input>{" "}
                  -{" "}
                  <input
                    maxLength="4"
                    value={cardNumber2}
                    onChange={(e) => setCardNumber2(e.target.value)}
                  ></input>{" "}
                  -{" "}
                  <input
                    maxLength="4"
                    value={cardNumber3}
                    onChange={(e) => setCardNumber3(e.target.value)}
                  ></input>{" "}
                  -{" "}
                  <input
                    maxLength="4"
                    value={cardNumber4}
                    onChange={(e) => setCardNumber4(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr className="payCard-insert-tr">
                <th className="payCard-insert-th">유효기간</th>
                <td className="payCard-insert-td">
                  <input
                    maxLength="2"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                  ></input>{" "}
                  /{" "}
                  <input
                    maxLength="2"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr className="payCard-insert-tr">
                <th className="payCard-insert-th">CVC</th>
                <td className="payCard-insert-td">
                  <input
                    maxLength="3"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr className="payCard-insert-tr">
                <th className="payCard-insert-th">비밀번호</th>
                <td className="payCard-insert-td">
                  <input
                    maxLength="2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <span style={{ alignContent: "center", fontSize: "20px" }}>
                    **
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          {error && <p className="error-message">{error}</p>}
          <button className="submitPayment" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default InsertPayment;
