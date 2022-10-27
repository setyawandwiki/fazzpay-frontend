import React from "react";
import Heaader from "components/header";
import Head from "next/head";
const Layout = (props) => {
  return (
    <>
      <Head>
        <meta name="description" content="check i phone" />
      </Head>
      <Heaader />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
