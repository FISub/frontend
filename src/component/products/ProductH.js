import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductH({ product }) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-4">
            <Link to={`/products/${product.prodNum}`} href="!#" replace>              
              <img
                className="rounded-start bg-dark cover w-100 h-100"
                alt={product.prodName}
                src={product.prodImg}
              />
            </Link>
          </div>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h5 className="card-title text-dark text-truncate mb-1">
                  {product.prodName}
                </h5>
                <span className="card-text text-muted mb-2 flex-shrink-0">
                  {product.prodPrice.toLocaleString()}원
                </span>
                <div className="mt-auto d-flex">
                  <Link to={`/products/${product.prodNum}`} className="btn btn-outline-dark ms-auto">
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Detail
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductH;
