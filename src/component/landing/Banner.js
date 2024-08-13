import banner1 from "../../assets/img/HealthyFood_banner1.jpg"; // 더리얼비타민D3
import banner2 from "../../assets/img/HealthyFood_banner2.jpg"; // 헬스앤뷰티 & 더 부드러운 닭가슴살
import banner3 from "../../assets/img/HealthyFood_banner3.jpg"; // 락토셀라 생유산균8
import banner4 from "../../assets/img/HealthyFood_banner4.jpg"; // 바이오가이아 프로텍티스 이지드롭 프로바이오틱스+비타민D 10ml

function BannerIncidator(props) { // 베너 하단 "_" 버튼
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
  return (
    <div
      className={"carousel-item " + (props.active ? "active" : "")}
      data-bs-interval="5000"
    >
      <div
        className="ratio"
        style={{ "--bs-aspect-ratio": "50%", maxHeight: "460px" }}
      >
        <img
          className="d-block w-100 h-100 bg-dark cover"
          alt=""
          src={props.image}
        />
      </div>
      <div className="carousel-caption d-none d-lg-block">
        <h5>banner</h5>
        <p>상품이미지 들어갈 예정</p>
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
      <div className="carousel-indicators">  {/* 이미지 개수 조절 */}
        <BannerIncidator index="0" active={true} />
        <BannerIncidator index="1" />
        <BannerIncidator index="2" />
        <BannerIncidator index="3" />
      </div>
      <div className="carousel-inner">  {/* 배너 이미지 */}
        <BannerImage image={banner1} active={true} />
        <BannerImage image={banner2} />
        <BannerImage image={banner3} />
        <BannerImage image={banner4} />
      </div>
    </div>
  );
}

export default Banner;
