import { faAngleLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { optionAccountSeting } from "constants/common";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { classNames } from "react-select/dist/declarations/src/utils";

import DefaultLayout from "./DefaultLayout";

interface DefaultLayoutI {
  children: ReactElement;
  title: string;
}

const AccountLayout: React.FC<DefaultLayoutI> = ({ children, title }) => {
  const router = useRouter();

  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);

  const switchMenuStattus = () => {
    setOpenMenu(!isOpenMenu);
  };

  //! Render
  return (
    <DefaultLayout title={title}>
      <div>
        {/* tab here */}
        <div className="tw-max-w-2xl tw-mx-auto tw-hidden md:tw-block">
          <div className=" tw-border-b tw-border-gray-200 tw-mb-4 tw-flex tw-gap-4">
            {optionAccountSeting.map((_) => {
              return (
                <div className="tw-flex tw-flex-wrap">
                  <p>{_.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="tw-bg-blue-200 md:tw-hidden">
          {isOpenMenu ? (
            <div
              className="tw-bg-white tw-h-full tw-lg:block tw-shadow-lg  
            tw-absolute tw-w-80 px-3 py-3 -tw-mt-12 tw-left-2"
            >
              <div className=" tw-border-b tw-border-gray-200">
                <div
                  onClick={switchMenuStattus}
                  className="tw-flex tw-justify-end"
                >
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    style={{ fontSize: 20, cursor: "pointer" }}
                  />
                </div>
                <ul className="list-unstyled components">
                  {optionAccountSeting.map((_) => {
                    return (
                      <li className="nav-item m-0">
                        <Link href={`/account/${_.link}`} passHref>
                          <a className={`nav-link text-dark`}>
                            {router.pathname === `/account/${_.link}` ? (
                              <strong className="text-primary">{_.name}</strong>
                            ) : (
                              _.name
                            )}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            <div
              onClick={switchMenuStattus}
              className="tw-absolute -tw-mt-10 tw-left-2"
            >
              <FontAwesomeIcon
                icon={faBars}
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            </div>
          )}
        </div>

        <div>{children}</div>
      </div>
    </DefaultLayout>
  );
};

export default AccountLayout;
