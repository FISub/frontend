import React, { useState, useRef, useEffect } from "react";
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
  const [error, setError] = useState("");

  const cardNumber2Ref = useRef(null);
  const cardNumber3Ref = useRef(null);
  const cardNumber4Ref = useRef(null);
  const expiryMonthRef = useRef(null);
  const expiryYearRef = useRef(null);

  const regixForCardNum = /^\d{4}$/;
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

    setError(""); // 오류 메시지 초기화
    return true;
  }

  useEffect(() => {
    if (cardNumber1.length === 4) cardNumber2Ref.current.focus();
    if (cardNumber2.length === 4) cardNumber3Ref.current.focus();
    if (cardNumber3.length === 4) cardNumber4Ref.current.focus();
    if (cardNumber4.length === 4) expiryMonthRef.current.focus();
    if (expiryMonth.length === 2) expiryYearRef.current.focus();
  }, [cardNumber1, cardNumber2, cardNumber3, cardNumber4, expiryMonth, expiryYear]);

  const handleSubmit = () => {
    if (validatePayment()) {
      axios
        .post(
          `/subscription/paymentInsert`,
          {
            payCard: cardNumber1 + cardNumber2 + cardNumber3 + cardNumber4,
            payExp: `${expiryMonth}/${expiryYear}`,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if(res === 1){
            console.log("결제 정보 등록 성공:", res);
            alert('결제 정보를 등록하였습니다.');
            onPaymentAdded();
            onClose();
          } else{
            alert('결제 정보 등록에 실패하였습니다. 다시 시도해 주세요.');
          }
        })
        .catch((err) => {
          console.log("결제 정보 등록 실패:", err);
        });
    }
  };

  return (
    <div className="popup_container" onClick={onClose}>
      <div className="popup_main_fit" onClick={(e) => e.stopPropagation()}>
        <div className="close_popup" onClick={onClose}>
          <img src={close_window} alt="" className="close_img" />
        </div>
        <div className="popup_body_fit">
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
                    ref={cardNumber2Ref}
                    ></input>{" "}
                  -{" "}
                  <input
                    maxLength="4"
                    type="password"
                    value={cardNumber3}
                    onChange={(e) => setCardNumber3(e.target.value)}
                    ref={cardNumber3Ref}
                    ></input>{" "}
                  -{" "}
                  <input
                    maxLength="4"
                    type="password"
                    value={cardNumber4}
                    onChange={(e) => setCardNumber4(e.target.value)}
                    ref={cardNumber4Ref}
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
                    ref={expiryMonthRef}
                    ></input>{" "}
                  /{" "}
                  <input
                    maxLength="2"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    ref={expiryYearRef}
                    ></input>
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
