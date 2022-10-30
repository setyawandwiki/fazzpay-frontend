import React from "react";

import Header from "components/header";
import Aside from "components/aside";
import Footer from "components/footer";

import Head from "next/head";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>FazzPay App || {props.title}</title>
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div
        className="container-fluid px-0 mx-0 my-2"
        style={{ height: "100vh" }}
      >
        <div className="container ">
          <div className="row">
            <div className="col-md-3">
              <Aside />
            </div>
            <div className="col-md-9 gx-5">
              <main>{props.children}</main>
            </div>
          </div>
        </div>
        <div className="row px-0 mx-0">
          <div className="col-12 px-0 mx-0">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
