import React, { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import '../../assets/css/tableStyles.css';


function ProductManage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/productAllBiz`, { withCredentials: true })
      .then((res) => {
        setProducts(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("상품 정보를 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const deleteProd = async (prodNum) => {
    const confirmed = window.confirm("정말로 이 상품을 삭제하시겠습니까?");
    
    if (confirmed) {
      try {
        axios.post(`/admin/deleteProd`, null, {
          params: {
            prodNum: prodNum,
          },
        });
        setProducts((prevProducts) => prevProducts.filter((product) => product.prodNum !== prodNum));
        alert("상품 삭제가 완료되었습니다.");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("상품 삭제에 실패했습니다.");
      }
    }
  };


  return (
    <div className="container mt-5 py-4 px-xl-5">
      <h3 className="text-2xl font-bold mt-5 mb-4">상품 관리</h3>
      <table className="common-table min-w-full bg-white border border-gray-300">
        <thead className="common-thead">
          <tr className="common-tr bg-gray-100">
            <th className="common-th py-2 px-4 border-b">번호</th>
            <th className="common-th py-2 px-4 border-b">사업자 번호</th>
            <th className="common-th py-2 px-4 border-b">카테고리</th>
            <th className="common-th py-2 px-4 border-b">이름</th>
            <th className="common-th py-2 px-4 border-b">가격</th>
            <th className="common-th py-2 px-4 border-b">이미지</th>
            <th className="common-th py-2 px-4 border-b">소개</th>
            <th className="common-th py-2 px-4 border-b">삭제</th>
          </tr>
        </thead>
        <tbody className="common-tbody">
          {products.map((product) => (
            <tr className="common-tr" key={product.id}>
              <td className="common-td py-2 px-4 border-b">{product.prodNum}</td>
              <td className="common-td py-2 px-4 border-b">{product.memNum}</td>
              <td className="common-td py-2 px-4 border-b">
                {product.prodCat === 0 ? "기타" 
                : product.prodCat === 1 ? "비타민,미네랄" 
                : product.prodCat === 2 ? "영양제" 
                : product.prodCat === 3 ? "헬스,다이어트 식품" 
                : "알 수 없음"}
              </td>
              <td className="common-td py-2 px-4 border-b">{product.prodName}</td>
              <td className="common-td py-2 px-4 border-b">{product.prodPrice}</td>
              <td className="common-td py-2 px-4 border-b">
                <img src={product.prodImg} width="80" height="80" />
              </td>
              <td className="common-td py-2 px-4 border-b">{product.prodIntro}</td>
              <td className="common-td py-2 px-4 border-b">
                <button
                  className="common-button"
                  onClick={() => deleteProd(product.prodNum)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManage;