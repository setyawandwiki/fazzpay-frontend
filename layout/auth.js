import React from "react";
import Heaader from "components/header";
import Head from "next/head";
const LayoutAuth = (props) => {
  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta name="description" content="fazzpay authentication" key="auth" />
        <meta property="og:title" content="fazzpay authentication" />
        <meta property="og:description" content="fazzpay authentication" />
        <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        />
      </Head>
      <main>{props.children}</main>
    </>
  );
};

export default LayoutAuth;
