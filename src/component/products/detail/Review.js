import React, { useState, useEffect } from "react";
import axios from "../../../api/axios.js";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import useAuthStore from "../../../store/useAuthStore.js";

function Review({ prodNum }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState({
    star: 0,
    content: "",
  });
  const { isLogin } = useAuthStore((state) => ({
    isLogin: state.isLogin,
  }));

  useEffect(() => {
    axios
      .get(`/main/review/${prodNum}`)
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
          >
            {review.memName}, {review.revStar}, {review.revCont}
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default Review;
