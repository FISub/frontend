import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Template from "./component/template/Template";
import ProductDetail from "./component/products/detail/ProductDetail";
import Landing from "./component/landing/Landing";
import ProductList from "./component/products/ProductList";
// import axios from "./api/axios";

function App() {
  // useEffect(() => {
  //   // API 호출 예제
  //   axios.get(`/test/test`) // 요청할 엔드포인트를 입력합니다
  //     .then(response => {
  //       console.log(response); // 응답 데이터 출력
  //     })
  //     .catch(error => {
  //       console.error('Error:', error); // 오류 출력
  //     });
  // }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 처음 렌더링될 때만 호출되도록 합니다

  return (
    <Router>
      <Template>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/products" exact component={ProductList} />
          <Route path="/products/:slug" component={ProductDetail} />
          {/* 추가적인 라우트 설정 */}
        </Switch>
      </Template>
    </Router>
  );
}

export default App;
