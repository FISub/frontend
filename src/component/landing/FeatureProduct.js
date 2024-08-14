import React, { useEffect, useState } from 'react';
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import "../../assets/css/featureProduct.css"
import { truncateName } from '../../util/FunctionUtil';
function FeatureProduct() {
  const [products, setProducts] = useState([]); // 상태를 빈 배열로 초기화

  useEffect(() => {
    // API 호출하여 데이터 가져오기
    axios.get('/main/productPreview')
      .then(res => {
        // API 응답의 데이터 구조 확인
        setProducts(res); // 데이터를 상태로 저장
      })
      .catch(error => {
        console.error('Error:', error); // 오류 출력
      });
  }, []);

  // 상태가 배열인지 확인하고 .map을 호출합니다.
  return (
    <div className="feature-product-grid">
      {products && products.length > 0 ? ( // 제품이 있을 때만 렌더링
        products.map(product => (
          <div key={product.prodNum} className="feature-product-item">
            <div className="card shadow-sm">
              <img
                className="card-img-top bg-dark cover"
                height="240"
                alt={product.prodName}
                src={product.prodImg} 
              />
              <div className="card-body">
                <h5 className="card-title text-center text-overflow" style={{fontSize:'18px'}}>{truncateName(product.prodName)}</h5>
                <p className="card-text text-center text-muted">
                  {product.prodPrice.toLocaleString()}원
                </p>
                <div className="d-grid gap-2">
                  <Link to={`/products/${product.prodNum}`} className="btn btn-outline-dark" replace>
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='nonProduct'>등록된 상품이 없습니다.</div> // 데이터가 없을 때 메시지 표시
      )}
    </div>
  );
}

export default FeatureProduct;
