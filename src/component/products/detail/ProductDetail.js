import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios.js";
import "../../../assets/css/productDetail.css";
import { categoryName } from "../../../util/FunctionUtil.js";
import ScrollToTopOnMount from "../../../util/ScrollToTopOnMount";
import Period from "./Period.js";
import Review from "./Review";
import SelectPayment from "../../popup/SelectPayment.js";

function ProductDetail() {
  const { slug } = useParams(); 
  const [product, setProduct] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period, product.prodNum); 
    setPopupOpen(true); 
  };

  useEffect(() => {
    axios
      .get(`/main/productDetail/${slug}`, { withCredentials: true })
      .then((res) => {
        setProduct(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>; 
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
            <Period onPeriodSelect={handlePeriodSelect}/>
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
          <Review prodNum={product.prodNum} />
        </div>
      </div>

      {isPopupOpen && (
        <SelectPayment
          prodNum={product.prodNum}
          period={selectedPeriod}
          onClose={() => setPopupOpen(false)}
        />
      )}
    </div>
  );
}

export default ProductDetail;
