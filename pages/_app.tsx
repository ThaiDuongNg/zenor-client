import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { NextUIProvider } from "@nextui-org/react";
import "bootstrap/dist/css/bootstrap.css";
import Loading from "components/Loading";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { wrapper } from "redux/store";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "styles/nprogress.scss";
import "../styles/app.scss";
import "../styles/_global.scss";
import "../styles/globals.css";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const [loadingSplash, setLoadingSplash] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => {
      setLoadingSplash(true);
    };
    const handleComplete = () => {
      setLoadingSplash(false);
    };
    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {};
  }, [Router]);

  return (
    <NextUIProvider>
      {loadingSplash ? <Loading /> : <Component {...pageProps} />}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </NextUIProvider>
  );
}
export default wrapper.withRedux(appWithTranslation(MyApp));
