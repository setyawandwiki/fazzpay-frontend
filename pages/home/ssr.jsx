import Layout from "layout/index";
import React from "react";
import axiosServer from "util/axiosServer";
import Cookies from "next-cookies";

const ssr = (props) => {
  console.log(props.listUser);
  return (
    <Layout>
      <div className="text-center container">
        <div>home page ssr</div>
      </div>
    </Layout>
  );
};

export default ssr;

export async function getServerSideProps(context) {
  const dataCookies = Cookies(context);
  const result = await axiosServer.get(
    "/user?page=1&limit=50&search=&sort=firstName ASC",
    { headers: { Authorization: `Bearer ${dataCookies.token}` } }
  );
  console.log(dataCookies);
  console.log(result);
  return {
    props: {
      listUser: result.data.status === 200 ? result.data.data : [],
      pagination: result.data.status === 200 ? result.data.data : [],
    },
  };
}
