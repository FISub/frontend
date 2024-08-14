import banner1 from "../../assets/img/HealthyFood_banner1.jpg"; // 더리얼비타민D3
import banner2 from "../../assets/img/HealthyFood_banner2.jpg"; // 헬스앤뷰티 & 더 부드러운 닭가슴살
import banner3 from "../../assets/img/HealthyFood_banner3.jpg"; // 락토셀라 생유산균8
import banner4 from "../../assets/img/HealthyFood_banner4.jpg"; // 바이오가이아 프로텍티스 이지드롭 프로바이오틱스+비타민D 10ml
import { useHistory } from "react-router-dom";

function BannerIncidator(props) {
  // 베너 하단 "_" 버튼
  return (
    <button
      type="button"
      data-bs-target="#bannerIndicators"
      data-bs-slide-to={props.index}
      className={props.active ? "active" : ""}
      aria-current={props.active}
    />
  );
}

function BannerImage(props) {
  const history = useHistory(); // useNavigate 훅 사용

  const handleClick = () => {
    // 클릭 시 이동할 URL을 설정합니다. (예: '/products/123')
    history.push(`/products/${props.prodNum}`); // 이 부분은 실제 상품 번호로 교체해야 합니다.
  };

  return (
    <div
      className={"carousel-item " + (props.active ? "active" : "")}
      data-bs-interval="5000"
      onClick={handleClick}
    >
      <div
        className="ratio"
        style={{
          "--bs-aspect-ratio": "50%",
          maxHeight: "460px",
          cursor: "pointer",
        }}
      >
        <img
          className="d-block w-100 h-100 bg-dark cover"
          alt=""
          src={props.image}
        />
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div
      id="bannerIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ marginTop: "56px" }}
    >
      <div className="carousel-indicators">
        {" "}
        {/* 이미지 개수 조절 */}
        <BannerIncidator index="0" active={true} />
        <BannerIncidator index="1" />
        <BannerIncidator index="2" />
        <BannerIncidator index="3" />
      </div>
      <div className="carousel-inner">
        {" "}
        {/* 배너 이미지 */}
        <BannerImage image={banner1} active={true} prodNum="prod000001" />
        <BannerImage image={banner2} prodNum="prod000002" />
        <BannerImage image={banner3} prodNum="prod000003" />
        <BannerImage image={banner4} prodNum="prod000004" />
      </div>
    </div>
  );
}

export default Banner;
