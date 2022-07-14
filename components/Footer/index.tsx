import React from "react";
import styles from "./Footer.module.scss";
import Arrow from "components/Arrow";

const Footer: React.FC = (props) => {
  //! State

  //! Function

  //! Render
  return (
    <footer className={styles.footerContainer + " border-top"}>
      <span
        style={{
          position: "absolute",
          left: "50%",
          right: "50%",
          top: 50,
        }}
      >
        <Arrow
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          isUpDirection
        />
      </span>
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
          <p className="col-md-4 mb-0">&copy;logo bo cong thuong</p>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a href="#" className="nav-link px-2">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2">
                About
              </a>
            </li>
          </ul>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <span>© ZENOR GROUP. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
