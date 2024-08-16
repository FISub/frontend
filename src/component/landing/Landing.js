import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../../util/ScrollToTopOnMount";
import { Link } from "react-router-dom";


function Landing() {
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">       
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary">
            상품보기
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">상품 Preview</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row g-4 px-md-5">
          {Array.from({length:1},(_, i) => {  // 백에서 받아온 list size만큼
            return <FeatureProduct key={i} />;
          })}
        </div>
      </div>
      
    </>
  );
}

export default Landing;
