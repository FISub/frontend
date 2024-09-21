import React, { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import '../../assets/css/tableStyles.css';
import { truncateCont, categoryName } from "../../util/FunctionUtil.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";

function ProductManage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleRowClick = (prodNum) => {
    history.push(`/products/${prodNum}`); 
  };

  useEffect(() => {
    axios
      .get(`/admin/productAll`, { withCredentials: true })
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
            <th className="common-th py-2  border-b common-num">번호</th>
            <th className="common-th py-2  border-b common-memnum">사업자 번호</th>
            <th className="common-th py-2  border-b common-category">카테고리</th>
            <th className="common-th py-2  border-b common-prodname">이름</th>
            <th className="common-th py-2  border-b common-prodprice">가격</th>
            <th className="common-th py-2  border-b common-prodimg">이미지</th>
            <th className="common-th py-2  border-b common-prodcont">소개</th>
            <th className="common-th py-2  border-b common-delete">삭제</th>
          </tr>
        </thead>
        <tbody className="common-tbody">
          {products.map((product) => (            
            <tr className="common-tr"  key={product.prodNum} onClick={() => handleRowClick(product.prodNum)}>
              <td className="common-td py-2  border-b common-num">{product.prodNum}</td>
              <td className="common-td py-2  border-b common-memnum">{product.memNum}</td>
              <td className="common-td py-2 border-b common-category">
                {categoryName(product.prodCat)}
              </td>
              <td className="common-td py-2  border-b common-prodname">{product.prodName}</td>
              <td className="common-td py-2  border-b common-prodprice">{product.prodPrice.toLocaleString()}원</td>
              <td className="common-td py-2  border-b common-prodimg">
                <img src={product.prodImg} alt="" width="80" height="80" />
              </td>
              <td className="common-td py-2  border-b common-prodcont">{truncateCont(product.prodIntro)}</td>
              <td className="common-td py-2  border-b common-delete">
                <button
                  className="common-button" style={{width: '60px'}}
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