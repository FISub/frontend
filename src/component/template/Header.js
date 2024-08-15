import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import useAuthStore from "../../store/useAuthStore.js";
import Login from "../popup/Login.js";
import Signup from "../popup/Signup.js"
import axios from "../../api/axios.js";

function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { isLogin, memberInfo, logoutAuth } = useAuthStore((state) => ({
    isLogin: state.isLogin,
    memberInfo: state.memberInfo,
    logoutAuth: state.logoutAuth,
  }));

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  function toggleLoginPopup() {
    setIsLoginOpen(!isLoginOpen);
  }

  function toggleSignupPopup() {
    setIsSignupOpen(!isSignupOpen); // 회원가입 팝업 토글 함수
  }

  function logout() {
    axios
      .post("/auth/logout", {}, {withCredentials:true})
      .then((res) => {
        console.log(res);
        logoutAuth();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <header>
      {" "}
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <img src={Logo} alt="" height="70px" />
          </Link>

          <div
            className={
              "navbar-collapse offcanvas-collapse " +
              (openedDrawer ? "open" : "")
            }
          >
            <ul
              className="navbar-nav mb-lg-0 navbar-margin-right"
              style={{ fontSize: "20px", fontWeight: "bolder" }}
            >
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link"
                  replace
                  onClick={changeNav}
                >
                  상품
                </Link>
              </li>
            </ul>
            <ul
              className="navbar-nav mb-lg-0 navbar-margin-right"
              style={{ fontSize: "20px", fontWeight: "bolder" }}
            >
              {memberInfo && memberInfo.memType !== 2 && (
                <li className="nav-item">
                  <a
                     href="!#"
                     className="nav-link dropdown-toggle"
                     data-toggle="dropdown"
                     id="userDropdown"
                     role="button"
                     data-bs-toggle="dropdown"
                     aria-expanded="false"
                  >
                    사업자 페이지
                  </a>
                  <ul
                    className="dropdown-menu dropdown-bussiness"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <span className="dropdown-item">상품 등록</span>
                    </li>                    
                    <li>
                      <span className="dropdown-item">상품 관리</span>
                    </li>  
                  </ul>
                </li>
              )}
            </ul>
            <ul
              className="navbar-nav mb-lg-0 navbar-margin-right"
              style={{ fontSize: "20px", fontWeight: "bolder" }}
            >
              {memberInfo && memberInfo.memType === 9 && (
                <li className="nav-item">
                  <a
                    href="!#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    관리자 페이지
                  </a>
                  <ul
                    className="dropdown-menu dropdown-manage"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <span className="dropdown-item">회원 관리</span>
                    </li>
                    <li>
                      <span className="dropdown-item">상품 관리</span>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
          <div>
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
                  <FontAwesomeIcon
                    icon={["fas", "user-alt"]}
                    style={{ width: "30px", height: "20px" }}
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  {!isLogin ? (
                    <>
                      <li>
                        <span
                          to="/login"
                          className="dropdown-item"
                          onClick={toggleLoginPopup}
                        >
                          Login
                        </span>
                      </li>
                      <li>
                        <span
                          to="/"
                          className="dropdown-item"
                          onClick={toggleSignupPopup}
                        >
                          Sign Up
                        </span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <span // 클릭시 유저 정보보기/수정 뷰
                          className="dropdown-item"
                        >
                          {memberInfo?.memId} 정보
                        </span>
                      </li>
                      <li>
                        <span // 로그아웃 기능 연결
                          className="dropdown-item"
                          onClick={logout}
                        >
                          Logout
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Login isOpen={isLoginOpen} onClose={toggleLoginPopup} />
      <Signup isOpen={isSignupOpen} onClose={toggleSignupPopup} />
    </header>
  );
}

export default Header;
