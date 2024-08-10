import BannerZero from "../../assets/img/banner-0.jpg";
import hagis from "../../assets/img/hagis.png";
import suncare from "../../assets/img/suncare.jpg";
import water from "../../assets/img/waterbanner.jpg";

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
        <BannerImage image={BannerZero} active={true} />
        <BannerImage image={water} />
        <BannerImage image={hagis} />
        <BannerImage image={suncare} />
      </div>
    </div>
  );
}

export default Banner;
