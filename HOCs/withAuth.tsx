import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSagaCreators from "../hooks/useSagaCreators";
import { authActions } from "../redux/creators/modules/auth";
import GetUserSelector from "../redux/selector/authSelector";

import Loading from "components/Loading";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const userSelector = GetUserSelector();
    const { isCheckAuth, isLogged } = userSelector;
    const { dispatch } = useSagaCreators();

    useEffect(() => {
      dispatch(authActions.isCheckAuth);
    }, []);

    useEffect(() => {
      if (!isCheckAuth && !isLogged) {
        if (location.pathname !== "/") {
          router.push("/login");
        }
      }
    }, [isCheckAuth]);

    if (isCheckAuth) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    if (isLogged || location.pathname === "/") {
      return <WrappedComponent {...props} />;
    }

    return (
      <div>
        <Loading />
      </div>
    );
  };
};

export default withAuth;
