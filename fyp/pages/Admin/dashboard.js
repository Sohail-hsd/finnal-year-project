import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import createEmotionCache from "../../src/createEmotionCache";
import React from "react";
import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import Admin from "../Admin";

const clientSideEmotionCache = createEmotionCache();

const Dashboard = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Admin {...pageProps} />
      </CacheProvider>
      {/* <SideBar name={"Admin"} /> */}
    </>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  // Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  // pageProps: PropTypes.object.isRequired,
};
