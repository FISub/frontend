import React, { useState, useEffect } from "react";
import axios from "../../api/axios.js";
import { Modal, Button, Form } from "react-bootstrap";
import ScrollToTopOnMount from "../../util/ScrollToTopOnMount.js";
import Product from "./Product.js";

function Biz() {
  const [products, setProducts] = useState([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    prodName: "",
    prodPrice: "",
    prodIntro: "",
    prodCat: "",
    prodImg: null,
  });

  useEffect(() => {
    axios
      .get(`/api/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRegisterModalClose = () => setShowRegisterModal(false);
  const handleRegisterModalShow = () => setShowRegisterModal(true);

  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = () => setShowEditModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, prodImg: e.target.files[0] });
  };

  const handleRegister = () => {
    // 상품 등록 처리 로직
    const formData = new FormData();
    for (const key in newProduct) {
      formData.append(key, newProduct[key]);
    }

    axios.post("/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("상품 등록 성공:", res.data);
      setProducts([...products, res.data]);
      setShowRegisterModal(false);
    })
    .catch((err) => {
      console.error("상품 등록 실패:", err);
    });
  };

  return (
    <div className="container py-4 px-xl-5" style={{ marginTop: "100px" }}>
      <ScrollToTopOnMount />

      <div className="row mb-4 mt-lg-3">
        <div className="col-lg-9" style={{ width: "100%" }}>
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div className="col d-flex justify-content-end">
                <Button variant="primary" className="me-2" onClick={handleRegisterModalShow}>
                  상품 등록
                </Button>
                <Button variant="secondary" onClick={handleEditModalShow}>
                  상품 수정
                </Button>
              </div>
            </div>
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                "row-cols-xl-4"
              }
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <Product key={product.prodNum} product={product} />
                ))
              ) : (
                <div className="nonProduct">등록된 상품이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 상품 등록 모달 */}
      <Modal show={showRegisterModal} onHide={handleRegisterModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>상품 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>상품명</Form.Label>
              <Form.Control
                type="text"
                name="prodName"
                placeholder="상품명을 입력하세요"
                value={newProduct.prodName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProductPrice" className="mt-3">
              <Form.Label>가격</Form.Label>
              <Form.Control
                type="number"
                name="prodPrice"
                placeholder="가격을 입력하세요"
                value={newProduct.prodPrice}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProductIntro" className="mt-3">
              <Form.Label>상품 소개</Form.Label>
              <Form.Control
                as="textarea"
                name="prodIntro"
                placeholder="상품 소개를 입력하세요"
                rows={3}
                value={newProduct.prodIntro}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProductCat" className="mt-3">
              <Form.Label>카테고리</Form.Label>
              <Form.Control
                type="text"
                name="prodCat"
                placeholder="카테고리를 입력하세요"
                value={newProduct.prodCat}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProductImg" className="mt-3">
              <Form.Label>이미지 업로드</Form.Label>
              <Form.Control
                type="file"
                name="prodImg"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRegisterModalClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            등록
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 상품 수정 모달 */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>상품 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductSelect">
              <Form.Label>수정할 상품 선택</Form.Label>
              <Form.Control as="select">
                {products.map((product) => (
                  <option key={product.prodNum} value={product.prodNum}>
                    {product.prodName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
        
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleEditModalClose}>
            수정
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Biz;
