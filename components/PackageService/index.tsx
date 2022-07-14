import React, { useCallback, useMemo, useRef } from "react";
import styles from "./PackageService.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import useSameHeight from "hooks/useSameHeight";

interface Props {
  data: any[];
}

interface ItemProps {
  title: string;
  description: string;
  isZ: boolean;
  price: number;
  currency: string;
  src: string;
  detail: string[];
}

const Item = (props: ItemProps) => {
  const { isZ, title, price, currency, src, detail } = props;

  return (
    <div className={`col-lg-4 mb-5 rounded-lg`}>
      <div
        className="d-flex flex-column bg-white border p-4 h-100"
        style={{ borderRadius: 15 }}
      >
        <div className="border-bottom pb-4">
          <div className="d-flex flex-column align-items-start">
            <div className="h2 font-weight-bold fw-bold">{title}</div>
            <div className="h2 text-primary fw-bold">
              {price + " " + currency}
            </div>
            <img src={src} className="w-100 my-3" />
          </div>
          <a href="#" className="btn btn-outline-primary border-2 w-100 px-5">
            Đăng kí
          </a>
        </div>
        <div className="d-flex flex-column align-items-start border-top pt-4">
          <div className="fw-bold">Features:</div>
          <ul className="mt-3">
            {detail.map((item) => (
              <li className="d-flex align-item-start">
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{
                    fontSize: 17,
                    cursor: "pointer",
                    color: "#D71E2B",
                    marginRight: 5,
                  }}
                />
                <span
                  className="ml-5 text-align-left"
                  style={{ textAlign: "left" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const index = ({ data }: Props) => {
  const ref = useRef<any>();

  useSameHeight(ref);

  return (
    <section className="p-5 mt-5 mb-5">
      <div
        className={
          styles.title +
          ` d-flex justify-content-center align-items-center my-3 fw-bold`
        }
      >
        Gói dịch vụ
      </div>
      <div
        className="row row-eq-height text-center align-items-stretch justify-content-center"
        // ref={ref}
      >
        {data.length &&
          data.map((item) => {
            const isZ = item.name === "Prime Z" || item.name === "Prestige Z";
            return (
              <Item
                isZ={false}
                title={item.name}
                description={item.description}
                currency={item.currency}
                price={item.price || 0}
                src={item.cover.url}
                detail={item.detail}
              />
            );
          })}
      </div>
    </section>
  );
};

export default index;
