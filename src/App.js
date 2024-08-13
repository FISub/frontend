import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Landing from "./component/landing/Landing";
import ProductDetail from "./component/products/detail/ProductDetail";
import ProductList from "./component/products/ProductList";
import Template from "./component/template/Template";

function App() {
  

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
