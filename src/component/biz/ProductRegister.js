import React, { useState } from "react";
import axios from "../../api/axios.js";
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../../util/FirebaseConfig.js'; // firebase-config import
import '../../assets/css/ProductRegister.css';

function ProductRegister() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productIntro, setProductIntro] = useState('');
  const [productImg, setProductImg] = useState(null); // 이미지 파일을 저장
  const [productCat, setProductCat] = useState('0');  // 기본값 '기타'
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setProductImg(e.target.files[0]); // 이미지 파일을 상태에 저장
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작

    try {
      let imageUrl = '';

      // 이미지 파일이 존재할 경우 Firebase Storage에 업로드
      if (productImg) {
        const imageRef = ref(storage, `images/${productImg.name}`);
        const uploadTask = uploadBytesResumable(imageRef, productImg);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // 진행 상황을 추적할 수 있습니다.
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (error) => {
              reject(error);
            },
            () => {
              // 업로드 완료 후 다운로드 URL 가져오기
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                imageUrl = downloadURL;
                resolve();
              });
            }
          );
        });
      }

      // 세션에서 memNum 가져오기
      const sessionResponse = await axios.get('/auth/sessionInfo', { withCredentials: true });
      console.log(sessionResponse)
      const memNum = sessionResponse.memNum;

      // 백엔드에 POST 요청을 보냅니다.
      const response = await axios.post("/products", {
        prodName: productName,
        prodPrice: productPrice,
        prodIntro: productIntro,
        prodImg: imageUrl, // 업로드된 이미지 URL
        prodCat: productCat,
        memNum: memNum
      });

      if (response.status === 200) {
        alert("상품이 성공적으로 등록되었습니다.");
        setProductName('');
        setProductPrice('');
        setProductIntro('');
        setProductImg(null); // 이미지 상태 초기화
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
        <table className="common-table table table-bordered">
          <thead className="common-thead">
            <tr className="common-tr bg-gray-100">
              <th className="common-th py-2 px-4 border-b">필드</th>
              <th className="common-th py-2 px-4 border-b">입력 값</th>
            </tr>
          </thead>
          <tbody className="common-tbody">
            <tr className="common-tr">
              <th className="common-th py-2 px-4 border-b">상품 이름</th>
              <td className="common-td py-2 px-4 border-b">
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
            <tr className="common-tr">
              <th className="common-th py-2 px-4 border-b">상품 가격</th>
              <td className="common-td py-2 px-4 border-b">
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
            <tr className="common-tr">
              <th className="common-th py-2 px-4 border-b">상품 소개</th>
              <td className="common-td py-2 px-4 border-b">
                <textarea
                  value={productIntro}
                  onChange={(e) => setProductIntro(e.target.value)}
                  required
                  className="form-control"
                  style={{resize:'none', minHeight: '200px'}}
                  disabled={loading}
                />
              </td>
            </tr>
            <tr className="common-tr">
              <th className="common-th py-2 px-4 border-b">상품 이미지</th>
              <td className="common-td py-2 px-4 border-b">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                  disabled={loading}
                />
              </td>
            </tr>
            <tr className="common-tr">
              <th className="common-th py-2 px-4 border-b">상품 카테고리</th>
              <td className="common-td py-2 px-4 border-b">
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
