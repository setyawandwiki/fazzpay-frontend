import Layout from "layout";
import Image from "next/image";
import React from "react";
import styles from "./history.module.css";
import Cookies from "next-cookies";
import axiosClient from "../../util/axiosServer";
import { useRouter } from "next/router";
import ListHistory from "components/listHistory";

const Histroy = (props) => {
  const router = useRouter();
  return (
    <Layout>
      <div
        className={`row ${styles.containerHistory} mt-4 bg-white shadow p-3`}
      >
        <div className="col-12">
          <div className="d-flex justify-content-between p-4">
            <div className="title">
              <h5>Transactional History</h5>
            </div>
            <form
              action=""
              method="GET"
              className="w-100 text-end d-flex justify-content-end"
            >
              <select
                name="history"
                class="form-select form-select-sm w-25"
                aria-label=".form-select-sm example"
              >
                <option selected disabled className="text-center">
                  -- Select Filter --
                </option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
              <input type="submit" className="btn btn-primary" />
            </form>
          </div>
          <ListHistory data={props.history} />
        </div>
      </div>
    </Layout>
  );
};

export default Histroy;

export const getServerSideProps = async (context) => {
  console.log(context.query);
  const dataUser = Cookies(context);
  const history = await axiosClient.get(
    `/transaction/history?page=1&limit=50&filter=${
      context.query.filter ? context.query.history : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${dataUser.token}`,
      },
    }
  );
  return {
    props: {
      data: dataUser,
      history: history.data.data,
    },
  };
};
