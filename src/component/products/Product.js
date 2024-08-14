import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { truncateName } from '../../util/FunctionUtil.js';
function Product({ product }) {
  return (
    <div className="feature-product-item">
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="260"
          alt={product.prodName}
          src={product.prodImg} 
        />
        <div className="card-body">
          <h5 className="card-title text-center text-overflow">
            {truncateName(product.prodName)}
          </h5>
          <p className="card-text text-center text-muted">
            {product.prodPrice.toLocaleString()}원
          </p>
          <div className="d-grid gap-2">
            <Link to={`/products/${product.prodNum}`} className="btn btn-outline-dark" replace>
              <FontAwesomeIcon icon={["fas", "cart-plus"]} style={{marginRight: '5px'}}/>
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
