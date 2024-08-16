import React, { useState } from "react";
import axios from "../../api/axios.js";
import '../../assets/css/ProductRegister.css';

function ProductRegister() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productIntro, setProductIntro] = useState('');
  const [productImg, setProductImg] = useState('');
  const [productCat, setProductCat] = useState('0');  // 기본값 '기타'

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // 로딩 시작

    try {
      // 1. 세션에서 memNum 가져오기
      const sessionResponse = await axios.get('/auth/sessionInfo', { withCredentials: true });
      const memNum = sessionResponse.memNum;

      // 백엔드에 POST 요청을 보냅니다.
      const response = await axios.post("/products", {
        prodName: productName,
        prodPrice: productPrice,
        prodIntro: productIntro,
        prodImg: productImg,
        prodCat: productCat,
        memNum: memNum
      });

      if (response.status === 200) {
        alert("상품이 성공적으로 등록되었습니다.");
        setProductName('');
        setProductPrice('');
        setProductIntro('');
        setProductImg('');
        setProductCat('0');  // 기본값 '기타'로 초기화
      }
    } catch (error) {
      console.error("Error registering product:", error);
      alert("상품 등록에 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="product-register">
      <h3 className="text-2xl font-bold mt-5 mb-4">상품 등록</h3>
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>필드</th>
              <th>입력 값</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>상품 이름</td>
              <td>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="form-control"
                  disabled={loading} 
                />
              </td>
            </tr>
            <tr>
              <td>상품 가격</td>
              <td>
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                  className="form-control"
                  disabled={loading}
                />
              </td>
            </tr>
            <tr>
              <td>상품 소개</td>
              <td>
                <textarea
                  value={productIntro}
                  onChange={(e) => setProductIntro(e.target.value)}
                  required
                  className="form-control"
                  disabled={loading}
                />
              </td>
            </tr>
            <tr>
              <td>상품 이미지 URL</td>
              <td>
                <input
                  type="text"
                  value={productImg}
                  onChange={(e) => setProductImg(e.target.value)}
                  required
                  className="form-control"
                  disabled={loading}
                />
              </td>
            </tr>
            <tr>
              <td>상품 카테고리</td>
              <td>
                <select
                  value={productCat}
                  onChange={(e) => setProductCat(e.target.value)}
                  required
                  className="form-control"
                  disabled={loading}
                >
                  <option value="0">기타</option>
                  <option value="1">비타민,미네랄</option>
                  <option value="2">영양제</option>
                  <option value="3">헬스,다이어트 식품</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? '등록 중...' : '등록'}
        </button>
      </form>
    </div>
  );
}

export default ProductRegister;
