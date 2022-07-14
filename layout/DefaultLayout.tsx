import React, { ReactElement } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Head from "next/head";

interface DefaultLayoutI {
  children: ReactElement;
  title: string;
}

const DefaultLayout: React.FC<DefaultLayoutI> = ({ children, title }) => {
  //! State

  //! Function

  //! Render
  return (
    <div
      id="root"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
