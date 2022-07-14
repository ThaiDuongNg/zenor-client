import React from "react";
import Slider from "react-slick";
import styles from "./Platform.module.scss";

interface Props {}

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 7000,
  autoplaySpeed: 7000,
  slidesToShow: 4,
  slidesToScroll: 4,
  // className: "slider variable-width",
  // variableWidth: true,
};

const FAQItem = () => {
  return (
    <div className="p-3">
      <div className={styles.item + ` d-flex flex-column align-items-center`}>
        {/* <img src="/images/img.jpeg" className={styles.img} /> */}
        <a
          className={styles.img + ""}
          href="#"
          target={"_blank"}
          style={{
            backgroundImage: `url(
              "https://img.timviec.com.vn/2020/03/doi-tac-la-gi.jpg"
            )`,
          }}
        />
        <div className="my-3 font-weight-bold">substitle</div>
      </div>
    </div>
  );
};

const index = (props: Props) => {
  return (
    <section className="mt-5 mb-5">
      <div
        className={
          styles.title +
          ` container d-flex justify-content-center position-relative fw-bold`
        }
      >
        <span>Các Nền tảng</span>
      </div>
      <Slider {...settings}>
        {[5, 3, 2, 1, 2, 4, 2].map((item) => FAQItem())}
      </Slider>
    </section>
  );
};

export default index;
