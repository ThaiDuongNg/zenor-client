import React from "react";
import { Collapse, Text } from "@nextui-org/react";
import styles from "./FAQ.module.scss";

interface Props {}

const dummy = [
  {
    title: "question 1",
    content:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim",
  },
  {
    title: "question 2",
    content:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim",
  },
  {
    title: "question 3",
    content:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim",
  },
];

const index = (props: Props) => {
  return (
    <div className="container mt-5 mb-5">
      <div
        className={
          styles.title +
          ` d-flex justify-content-center align-items-center my-3 fw-bold`
        }
      >
        <span>Trợ giúp, Tips & FAQ</span>
      </div>
      <Collapse.Group accordion={false}>
        {dummy.map((item) => (
          <Collapse title={item.title}>
            <Text>{item.content}</Text>
          </Collapse>
        ))}
      </Collapse.Group>
    </div>
  );
};

export default index;
