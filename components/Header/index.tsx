import { categoryList, categoryLogged } from "constants/common";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GetUserSelector from "../../redux/selector/authSelector";
import styles from "./Header.module.scss";
import useSagaCreators from "hooks/useSagaCreators";
import authServices from "../../services/authServices";
import { authActions } from "../../redux/creators/modules/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "components/Sidebar";

interface ICateItem {
  id: number;
  name: string;
  href: string;
}
const Header: React.FC = (props) => {
  //! State
  const [isColored, setIsColored] = useState<boolean>(false);
  const userSelector = GetUserSelector();
  const { isLogged } = userSelector;
  const router = useRouter();
  const { dispatch } = useSagaCreators();
  const isHome = router.asPath === "/";

  const [isOpenSidebar, setOpenSidebar] = useState<boolean>(true);

  //! UseEffect
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY && setIsColored(window.scrollY >= 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //! Function
  const renderItemCate = ({ id, name, href }: ICateItem) => {
    return (
      <li key={id} className="nav-item m-0">
        <Link href={href} passHref>
          <a className={`nav-link text-dark`}>
            <span className={styles.nav_category_item}>
              {router.pathname === href ? (
                <strong className="text-primary">{name}</strong>
              ) : (
                name
              )}
            </span>
          </a>
        </Link>
      </li>
    );
  };

  const renderListCate = (list: ICateItem[]) => {
    return (
      <ul className="nav nav-pills">
        {list.map((item) => renderItemCate(item))}
        {isLogged && (
          <li className="nav-item m-0">
            <a
              className={`nav-link`}
              onClick={(e) => {
                e.preventDefault();
                dispatch(authActions.logout);
              }}
            >
              <span className={styles.nav_category_item}>Logout</span>
            </a>
          </li>
        )}
      </ul>
    );

    return;
  };

  const switchSidebarStattus = () => {
    setOpenSidebar(!isOpenSidebar);
  };

  //! Render
  return (
    <header>
      <div
        className={`${isHome && styles["header"]} border-bottom ${
          isColored && styles["isScrolled"]
        }`}
      >
        <div className="container">
          <div className={styles.container_header + " py-2"}>
            <Link href="/" passHref>
              <a
                className={
                  styles.img +
                  ` d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none`
                }
              >
                <img
                  src="/images/logo_1.png"
                  style={{ width: "100%", height: "100%" }}
                />
              </a>
            </Link>

            <div className={styles.menu}>
              <div onClick={switchSidebarStattus}>
                <FontAwesomeIcon
                  icon={faBars}
                  style={{ fontSize: 20, cursor: "pointer" }}
                />
              </div>

              {isOpenSidebar ? <Sidebar /> : null}
            </div>

            <div className={styles.menuDesktop}>
              {renderListCate(isLogged ? categoryLogged : categoryList)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
