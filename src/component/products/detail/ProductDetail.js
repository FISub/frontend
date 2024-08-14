import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "../../../api/axios.js";
import ScrollToTopOnMount from "../../../util/ScrollToTopOnMount";
import { categoryName } from "../../../util/FunctionUtil.js";
import "../../../assets/css/productDetail.css";
import { PiStarFill, PiStarLight } from "react-icons/pi";

function ProductDetail() {
  const { slug } = useParams(); // URL의 상품 num값
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState({
    star: 0,
    content: "",
  });

  const handleStarClick = (value) => {
    setRating(value);
    setNewReview((prev) => ({ ...prev, star: value }));
  
  };

  const handleInputChange = (e) => {
    setNewReview((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleSubmit = () => {
    console.log(product.prodNum);
    console.log(newReview.star);
    console.log(newReview.content);
    axios
      .post(`/main/reviewInsert`, {
        memNum: "mem0000003", // 추후 세션, localStorage에 저장된 memNum으로 변경 예정
        prodNum: product.prodNum,
        revStar: newReview.star,
        revCont: newReview.content,
      })
      .then((res) => {
        // 새 리뷰 추가 후 상태 업데이트
        setReviews((prev) => [res, ...prev]);
        setNewReview({ star: 0, content: "" }); // 입력 초기화
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`/main/productDetail/${slug}`)
      .then((res) => {
        setProduct(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/main/review/${slug}`)
      .then((res) => {
        setReviews(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>; // 데이터 로딩 중일 때 로딩 화면을 표시
  }

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <div className="row mb-4" style={{ marginTop: "70px" }}>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt={product.prodName}
                src={product.prodImg}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-5 dir-flex" style={{ width: "50%" }}>
          <div className="dir-flex h-100">
            <h2 className="mb-1 fw-600">{product.prodName}</h2>
            <h4 className="text-muted mb-4">
              {product.prodPrice.toLocaleString()}원
            </h4>

            <h4 className="mb-0">Details</h4>
            <hr className="hr_margin" />
            <dl className="row">
              <dt className="col-sm-4">Code</dt>
              <dd className="col-sm-8 mb-2">{product.prodNum}</dd>

              <dt className="col-sm-4">Category</dt>
              <dd className="col-sm-8">{categoryName(product.prodCat)}</dd>
            </dl>
          </div>

          <div className="period-box">
            <div className="period-text fw-600">배송 주기</div>
            <hr />
            <div style={{ width: "100%" }}>
              <div className="row g-3 mb-4 grid-box">
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    1주
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    2주
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    3주
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    1달
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    2달
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100 h-50">
                    3달
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description-box">
          <h4 className="mb-0">Description</h4>
          <hr />
          <p className="lead flex-shrink-0">
            <small>{product.prodIntro}</small>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Review</h4>

          <div className="review-card mb-3 p-3 border rounded d-flex">
            <div className="d-flex align-items-center mb-2"  style={{width:'20%'}}>
              <div id="myform" style={{display:'flex'}}>
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
                width:"80%",
                height:"50px"
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
      </div>
    </div>
  );
}

export default ProductDetail;
