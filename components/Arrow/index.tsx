import React, { MouseEvent } from "react";
import styles from "./ArrowDown.module.scss";

interface Props {
  onClick: (event: MouseEvent) => void;
  isUpDirection?: boolean;
}

const index = (props: Props) => {
  return (
    <div onClick={props.onClick} className={styles.arrowContainer}>
      <div
        className={props.isUpDirection ? styles.arrowUp : styles.arrowDown}
      ></div>
    </div>
  );
};

export default index;
