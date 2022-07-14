import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import styles from "./SlideSection.module.scss";
import ArrowDown from "components/Arrow";

interface Props {}

const settings = {
  dots: false,
  infinite: true,
  fade: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const index = (props: Props) => {
  return (
    <section className={styles.intro}>
      <Slider {...settings}>
        <div className={styles.intro_item}>
          <img
            src="https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className={styles.intro_item_img}
          />
        </div>
        <div className={styles.intro_item}>
          <img src="/images/bg.jpg" className={styles.intro_item_img} />
        </div>
      </Slider>
      <span className={styles.intro_arrow}>
        <ArrowDown
          onClick={() => {
            const element = document.getElementById("target");
            element && element.scrollIntoView();
          }}
        />
      </span>
    </section>
  );
};

export default index;
