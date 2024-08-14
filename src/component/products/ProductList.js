import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import ProductH from "./ProductH";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios.js";
import ScrollToTopOnMount from "../../util/ScrollToTopOnMount";

const categories = [
  { name: "전체", value: -99999},
  { name: "기타", value: 0 },
  { name: "비타민/미네랄", value: 1 },
  { name: "영양제", value: 2 },
  { name: "헬스/다이어트 식품", value: 3 },
];

function ProductList() {
  const [products, setProducts] = useState([]);
  const [viewType, setViewType] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const categoryParam = selectedCategory !== null && selectedCategory !== -99999 ? `category=${selectedCategory}` : '';
    axios
      .get(`/main/productAll?${categoryParam}`)
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory]);

  function changeViewType() {
    setViewType(!viewType);
  }

  function handleCategoryClick(categoryValue) {
    setSelectedCategory(categoryValue);
  }

  if (!products) {
    return <div>Loading...</div>; // 데이터 로딩 중일 때 로딩 화면을 표시
  }

  return (
    <div className="container py-4 px-xl-5" style={{marginTop: '100px'}}>
      <ScrollToTopOnMount />
      <ul className="list-group list-group-flush rounded">
        <li className="list-group-item d-none d-lg-block">
          <h5 className="mt-1 mb-2">카테고리</h5>
          <div className="d-flex flex-wrap my-2">
            {categories.map((category) => (
              <Link
                key={category.value}
                to="/products"
                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                onClick={()=>handleCategoryClick(category.value)}
                replace
              >
                {category.name}
              </Link>
            ))}
          </div>
        </li>
      </ul>

      <div className="row mb-4 mt-lg-3">
        <div className="col-lg-9" style={{ width: "100%" }}>
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div
                className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row"
                style={{
                  display: "flex",
                  justifyContent: "right",
                  width: "65.5%",
                }}
              >
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                  style={{ position: "relative", justifyItem: "right" }}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType ? "row-cols-xl-4" : "row-cols-xl-2")
              }  
            >
              {products.length > 0 ? (
                products.map((product) => {
                  if (viewType) {
                    return <Product key={product.prodNum} product={product} />;
                  }
                  return (
                    <ProductH
                      key={product.prodNum}
                      product={product}
                      percentOff={product.prodNum % 4 === 0 ? 15 : null}
                    />
                  );
                })
              ) : (
                <div className="nonProduct">등록된 상품이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
