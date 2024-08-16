import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import git_been from "../../assets/img/git_been.jpg";
import git_eun from "../../assets/img/git_eun.jpg";
import git_hyeon from "../../assets/img/git_hyeon.png";
import git_jun from "../../assets/img/git_jun.jpg";
import logo from "../../assets/img/Logo_footer.png";
import { useHistory, useLocation } from 'react-router-dom';
function Footer() {
  const history = useHistory();
  const location= useLocation();

  function handleLogoClick() {
    if(location.pathname !== '/'){
      history.push('/');
    }
    window.scrollTo(0, 0);
  }

  return (
    <footer className="mt-auto bg-dark">
      <div
        className="container d-flex"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span className="text-muted" style={{ alignContent: "center" }}>
          Copyright &copy; Website 2024
        </span>
          <img src={logo} alt="" style={{ width:'12%', height:'12%', marginTop: '20px', cursor: 'pointer'}} onClick={handleLogoClick}/>
        <div className="d-flex flex-column bg-black py-4">
          <h5 className="text-center mb-3" style={{ color: "white" }}>
            GitHub
            <FontAwesomeIcon
              icon={["fab", "github"]}
              size="1x"
              style={{ marginLeft: "5px" }}
            />
          </h5>
          <div
            className="d-flex justify-content-center"
            style={{ color: "white" }}
          >
            <a href="https://github.com/Been980804" className="me-3">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <img
                  src={git_been}
                  style={{ width: "50px", borderRadius: "50%" }}
                  alt="이현빈 git"
                />
                <span style={{ fontSize: "15px", color: "white" }}>이현빈</span>
              </div>
            </a>
            <a href="https://github.com/yyyeun">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <img
                  src={git_eun}
                  style={{ width: "50px", borderRadius: "50%" }}
                  alt="허예은 git"
                />
                <span style={{ fontSize: "15px", color: "white" }}>허예은</span>
              </div>
            </a>
            <a href="https://github.com/cshharry" className="ms-3">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <img
                  src={git_hyeon}
                  style={{ width: "50px", borderRadius: "50%" }}
                  alt="조성현 git"
                />
                <span style={{ fontSize: "15px", color: "white" }}>조성현</span>
              </div>
            </a>
            <a href="https://github.com/leesj000603" className="ms-3">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <img
                  src={git_jun}
                  style={{ width: "50px", borderRadius: "50%" }}
                  alt="이승준 git"
                />
                <span style={{ fontSize: "15px", color: "white" }}>이승준</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
