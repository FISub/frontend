import React, { useState, useEffect } from "react";
import axios from "../../../api/axios.js";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import useAuthStore from "../../../store/useAuthStore.js";
import deleteReview from "../../../assets/img/delete.png";

function Review({ prodNum }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState({
    star: 0,
    content: "",
  });
  const { isLogin, memberInfo } = useAuthStore((state) => ({
    isLogin: state.isLogin,
    memberInfo: state.memberInfo,
  }));

  useEffect(() => {
    axios
      .get(`/main/reviewAllByProduct/${prodNum}`)
      .then((res) => {
        setReviews(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [prodNum]);

  const handleStarClick = (value) => {
    setRating(value);
    setNewReview((prev) => ({ ...prev, star: value }));
  };

  const handleInputChange = (e) => {
    setNewReview((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleSubmit = () => {
    if(isLogin){
    axios
      .post(`/main/reviewInsert`, {
        prodNum: prodNum,
        revStar: newReview.star,
        revCont: newReview.content,
      }, { withCredentials: true })
      .then((res) => {
        setReviews((prev) => [res, ...prev]);
        setNewReview({ star: 0, content: "" }); // 입력 초기화
      })
      .catch((err) => {
        console.log(err);
      });
    } else{
      alert('로그인 후 이용해 주세요.');
    }
  };

  function deleteRev(revNum){
    axios.post(`/main/reviewDelete`, {
      revNum : revNum,
      prodNum : prodNum
    }, { withCredentials: true })
      .then((res) => {
        setReviews((prev) => prev.filter(review => review.revNum !== revNum));
        alert('삭제되었습니다.');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <div className="review-card mb-3 p-3 border rounded d-flex">
        <div className="d-flex align-items-center mb-2" style={{ width: '20%' }}>
          <div id="myform" style={{ display: 'flex' }}>
            <div>
              {[...Array(5)].map((_, i) => (
                <React.Fragment key={i}>
                  <div
                    onClick={() => handleStarClick(i + 1)}
                    style={{
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                  >
                    {i < rating ? (
                      <PiStarFill className="star-lg star-design" />
                    ) : (
                      <PiStarLight className="star-lg star-design" />
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
            <span className="rating">{rating}점</span>
          </div>
        </div>
        <div
          style={{
            alignContent: "center",
            display: "flex",
            marginLeft: "20px",
            width: "80%",
            height: "50px"
          }}
        >
          <input
            type="text"
            className="form-control input-large"
            placeholder="리뷰를 적어주세요."
            value={newReview.content}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.revNum}
            className="review-card mb-3 p-3 border rounded"
            style={{ backgroundColor: "#f9f9f9", color: "#333" }}
          >
            <div className="d-flex align-items-center mb-2">
              <div>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < review.revStar ? "#FFD700" : "#e4e5e9" }}>
                    <PiStarFill />
                  </span>
                ))}
              </div>
              <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{review.memName}</span>
            </div>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
            <p>{review.revCont}</p>
            {(memberInfo && (memberInfo.memType === 9 || review.memNum === memberInfo.memNum) && (
            <img src={deleteReview} alt="" style={{width:'30px', height:'30px', opacity: '0.3', cursor:'pointer'}} onClick={() => deleteRev(review.revNum)}/>
            ))}
            </div>
          </div>
        ))
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
    </div>
  );
}

export default Review;
