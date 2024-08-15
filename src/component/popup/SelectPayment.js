import "../../assets/css/popup.css";
import close_window from "../../assets/img/close-window.png";

function selectPayment({ period, onClose }) {
  return (
    <div className="popup_container"  onClick={onClose}>
      <div className="popup_main_long" onClick={(e) => e.stopPropagation()}>
      <div className="close_popup" onClick={onClose}>
        <img src={close_window} alt="" className="close_img" />
      </div>
        <div className="popup_body_long">
            select Period : {period} 일
        </div>
      </div>
    </div>
  );
}

export default selectPayment;
