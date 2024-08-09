import React, { useEffect } from 'react';
import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import axios from "./api/axios.js";

function App() {
  useEffect(() => {

    // API 호출 예제
    axios.get(`/test/test`) // 요청할 엔드포인트를 입력합니다
      .then(response => {
        console.log(response); // 응답 데이터 출력
      })
      .catch(error => {
        console.error('Error:', error); // 오류 출력
      });
  }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 처음 렌더링될 때만 호출되도록 합니다

  return (
    <Template>
      <Switch>
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path="/products/:slug">
          <ProductDetail />
        </Route>
        <Route path="/" exact>
          <Landing />
        </Route>
      </Switch>
    </Template>
  );
}

export default App;
