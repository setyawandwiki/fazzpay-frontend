import Layout from "layout";
import Image from "next/image";
import React from "react";
import styles from "./transfer.module.css";
import axiosServer from "../../util/axiosServer";
import Cookies from "next-cookies";
import ListUser from "components/listUser";
import { useRouter } from "next/router";

const Transfer = (props) => {
  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <Layout>
      <div className="row">
        <div
          className="col-12 mt-4 p-3 bg-white shadow"
          style={{ borderRadius: "20px" }}
        >
          <h5 className="py-3" style={{ color: "#3A3D42", fontWeight: 700 }}>
            Search Receiver
          </h5>
          <form>
            <div className="d-flex">
              <button type="submit" className={styles.button}>
                <i class="fa fa-search"></i>
              </button>
              <input
                type="text"
                placeholder="Search.."
                className={`w-100 ${styles.input}`}
                name="name"
              />
            </div>
          </form>

          <ListUser data={props.listUser} />
        </div>
      </div>
    </Layout>
  );
};

export default Transfer;

export async function getServerSideProps(context) {
  const dataCookies = Cookies(context);
  const resultData = await axiosServer.get(
    `/user?page=1&limit=50&search=${
      context.query.name ? context.query.name : ""
    }&sort=firstName ASC`,
    {
      headers: {
        Authorization: `Bearer ${dataCookies.token}`,
      },
    }
  );

  return {
    props: {
      listUser: resultData.data.status === 200 ? resultData.data.data : [],
      pagination:
        resultData.data.status === 200 ? resultData.data.pagination : {},
      searchReceiver:
        resultData.data.status === 200 ? resultData.data.data : [],
    },
  };
}
