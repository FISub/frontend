import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "../../../api/axios.js";
import ScrollToTopOnMount from "../../../util/ScrollToTopOnMount";
import RelatedProduct from "./RelatedProduct";
import {categoryName} from "../../../util/FunctionUtil.js";

function ProductDetail() {
  const { slug } = useParams(); // URL의 상품 num값
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/main/productDetail/${slug}`)
      .then((res) => {
        setProduct(res);
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
        <div className="col-lg-5">
          <div className="row g-3 mb-4">
            <div className="col">
              <button className="btn btn-outline-dark py-2 w-100">
                1주
              </button>
            </div>
            <div className="col">
              <button className="btn btn-outline-dark py-2 w-100">
                2주
              </button>
            </div>
            <div className="col">
              <button className="btn btn-outline-dark py-2 w-100">
                3주
              </button>
            </div>
            <div className="col">
              <button className="btn btn-outline-dark py-2 w-100">
                1달
              </button>
            </div>
            <div className="col">
              <button className="btn btn-outline-dark py-2 w-100">
                2달
              </button>
            </div>
            <div className="col">
              <button className="btn btn-outline-dark py-2 w-100">
                3달
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1">{product.prodName}</h2>
            <h4 className="text-muted mb-4">
              {product.prodPrice.toLocaleString()}원
            </h4>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Code</dt>
              <dd className="col-sm-8 mb-3">{product.prodNum}</dd>

              <dt className="col-sm-4">Category</dt>
              <dd className="col-sm-8 mb-3">{categoryName(product.prodCat)}</dd>
            </dl>

            <h4 className="mb-0">Description</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>
                Nature (TPU case) use environmental non-toxic TPU, silky smooth
                and ultrathin. Glittering and translucent, arbitrary rue
                reserved volume button cutouts, easy to operate. Side frosted
                texture anti-slipping, details show its concern; transparent
                frosted logo shows its taste. The release of self, the flavor of
                life. Nillkin launched Nature transparent soft cover, only to
                retain the original phone style. Subverting tradition,
                redefinition. Thinner design Environmental texture better hand
                feeling.
              </small>
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Related products</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {Array.from({ length: 4 }, (_, i) => {
              return (
                <RelatedProduct key={i} percentOff={i % 2 === 0 ? 15 : null} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
