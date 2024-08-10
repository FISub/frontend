import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import Login from "../popup/Login.js";

function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false); // 로그인 팝업의 상태 관리

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false)
    }
  }

  function toggleLoginPopup(){
    setIsLoginOpen(!isLoginOpen);
  }

  return (
    <header> {/* 네비게이션 바 */}
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <FontAwesomeIcon
              icon={["fab", "bootstrap"]}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">Logo</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link" replace onClick={changeNav}>
                  상품
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link" replace onClick={changeNav}>
                  상품 등록
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link" replace onClick={changeNav}>
                  관리자 페이지
                </Link>
              </li>
            </ul>           
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <span to="/login" className="dropdown-item" onClick={toggleLoginPopup}>
                      Login
                    </span>
                  </li>
                  <li>
                    <Link to="/" className="dropdown-item" onClick={changeNav}>
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button>
            <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div> */}
        </div>
      </nav>

      <Login isOpen={isLoginOpen} onClose={toggleLoginPopup} />
    </header>
  );
}

export default Header;
