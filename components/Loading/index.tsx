import React from "react";
import styles from "./styles.module.scss";

type Props = {};

const index = (props: Props) => {
  return (
    <div className={styles.screenContainer}>
      <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default index;
