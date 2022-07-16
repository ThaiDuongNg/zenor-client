import { categoryList, categoryLogged } from "constants/common";
import useSagaCreators from "hooks/useSagaCreators";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { authActions } from "redux/creators/modules/auth";
import GetUserSelector from "redux/selector/authSelector";

interface ICateItem {
  id: number;
  name: string;
  href: string;
}

export default function Sidebar() {
  const userSelector = GetUserSelector();
  const router = useRouter();

  const { dispatch } = useSagaCreators();

  const { isLogged } = userSelector;

  const renderItemCate = ({ id, name, href }: ICateItem) => {
    return (
      <li key={id} className="nav-item m-0">
        <Link href={href} passHref>
          <a className={`nav-link text-dark`}>
            <span>
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
      <ul className="">
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
              <span className="">Logout</span>
            </a>
          </li>
        )}
      </ul>
    );

    return;
  };
  return (
    <div className="">
      {renderListCate(isLogged ? categoryLogged : categoryList)}
    </div>
  );
}
