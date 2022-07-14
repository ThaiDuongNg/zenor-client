import React from "react";
import styles from "./Target.module.scss";

interface Props {}

const index = (props: Props) => {
  return (
    <section className="container mt-5 mb-5" id="target">
      <div
        className={
          styles.title +
          ` d-flex justify-content-center fw-bold align-items-center my-3 `
        }
      >
        Ý tưởng & Mục tiêu
      </div>

      <img
        // className="rounded"
        style={{
          width: "100%",
          maxHeight: 700,
          borderRadius: 8,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        src="https://www.techstry.net/wp-content/uploads/2022/04/What-Can-Make-Your-Photos-Look-Unique-and-Outstanding.jpg"
      />
    </section>
  );
};

export default index;
