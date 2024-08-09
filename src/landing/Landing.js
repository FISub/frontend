import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import git_been from "../assets/img/git_been.jpg";
import git_eun from "../assets/img/git_eun.jpg";
import git_hyeon from "../assets/img/git_hyeon.png";
import git_jun from "../assets/img/git_jun.jpg";

function Landing() {
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          배너 설명 할거면 쓰기
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary">
            상품 list로 이동
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">상품 미리보기(인기 상품)</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {Array.from({ length: 1 }, (_, i) => {  // 인기상품 개수 지정 (백에서 받아온 list size만큼)
            return <FeatureProduct key={i} />;
          })}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">
          GitHub
          <FontAwesomeIcon icon={["fab", "github"]} size="1x" />
        </h5>
        <div className="d-flex justify-content-center">
          <a href="https://github.com/Been980804" className="me-3">
            <div style={{ display: 'flex', flexDirection: 'column' , textAlign:'center'}}>
              <img src={git_been} style={{width: '35px', borderRadius: '50%'}} alt="이현빈 git"/>
              <span style={{fontSize:'10px'}}>이현빈</span>
            </div>
          </a>
          <a href="https://github.com/yyyeun">
          <div style={{ display: 'flex', flexDirection: 'column' , textAlign:'center'}}>
              <img src={git_eun} style={{width: '35px', borderRadius: '50%'}} alt="허예은 git"/>
              <span style={{fontSize:'10px'}}>허예은</span>
            </div>
          </a>
          <a href="https://github.com/cshharry" className="ms-3">
          <div style={{ display: 'flex', flexDirection: 'column' , textAlign:'center'}}>
              <img src={git_hyeon} style={{width: '35px', borderRadius: '50%'}} alt="조성현 git"/>
              <span style={{fontSize:'10px'}}>조성현</span>
            </div>
          </a>
          <a href="https://github.com/leesj000603" className="ms-3">
          <div style={{ display: 'flex', flexDirection: 'column' , textAlign:'center'}}>
              <img src={git_jun} style={{width: '35px', borderRadius: '50%'}} alt="이승준 git"/>
              <span style={{fontSize:'10px'}}>이승준</span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
