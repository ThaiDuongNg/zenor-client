import withAuth from "HOCs/withAuth";
import Router from "next/router";
import { useEffect } from "react";

const index = (props: any) => {
  useEffect(() => {
    Router.push("/account/profile");
  }, []);
};

export default withAuth(index);
