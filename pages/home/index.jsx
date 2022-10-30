import React from "react";

import Layout from "layout/index";
import axiosClient from "util/axios";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./home.module.css";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "store/actions/user";
import Cookies from "js-cookie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    //   legend: {
    //     position: 'top' as const,
    //   },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "august",
  "september",
  "october",
  "november",
  "desember",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Income",
      data: [20, 35, 10, 5, 0, 10, 20, 5, 2, 10, 3, 5],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Expense",
      data: [20, 35, 10, 5, 0, 10, 20, 5, 2, 10, 3, 5],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Home = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     const result = await axiosClient.get(
  //       "/user?page=1&limit=50&search=&sort=firstName ASC"
  //     );
  //     setData(result.data.data);
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [history, setHistory] = useState([]);
  const [history2, setHistory2] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const getData = async () => {
    try {
      const data = await axiosClient.get(
        `/transaction/history?page=1&limit=50&filter=WEEK`
      );
      setHistory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalIncome = () => {
    let total = 0;
    const res = history?.data?.filter((elem) => elem.type !== "send");
    res?.forEach((elem) => {
      total += elem.amount;
    });
    return total;
  };

  const getHistory = async () => {
    try {
      const result = await axiosClient.get(
        `/transaction/history?page=1&limit=4&filter=MONTH`
      );
      setHistory2(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalExpense = () => {
    let total = 0;
    const res = history?.data?.filter((elem) => elem.type === "send");
    res?.forEach((elem) => {
      total += elem.amount;
    });
    return total;
  };

  useEffect(() => {
    dispatch(getUserById(Cookies.get("userId")));
    getData();
    getHistory();
  }, []);

  console.log(history2);
  return (
    <>
      <Layout>
        <div className="row">
          <div
            className={`col-12 justify-content-between mt-4 p-4 d-flex ${styles.containerBalance}`}
            style={{ background: "#6379F4" }}
          >
            <div className={styles.text}>
              <p>Balance</p>
              <h5>Rp. {user.data.balance}</h5>
              <p>{user.data.noTelp}</p>
            </div>
            <div className=" d-flex flex-column justify-content-around">
              <a
                href=""
                className="btn btn-primary"
                style={{ background: "#8894f4", border: "1px solid white" }}
              >
                <i
                  className="bi bi-arrow-up"
                  style={{ marginRight: "1rem", color: "#B5B0ED" }}
                ></i>
                transfer
              </a>
              <a
                href=""
                className="btn btn-primary"
                style={{ background: "#8894f4", border: "1px solid white" }}
              >
                <i
                  className="bi bi-plus"
                  style={{ marginRight: "1rem", color: "#B5B0ED" }}
                ></i>
                <span>transfer</span>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 px-0">
            <div className={`d-flex gap-2 ${styles.mainContainer}`}>
              <div className={`shadow mt-3 ${styles.container1}`}>
                <div
                  className="container1 px-5 pt-2 d-flex justify-content-between"
                  style={{ flexWrap: "wrap" }}
                >
                  <div className="containerIncomeExpanse">
                    <div className={`${styles.containerUp} mb-3`}>
                      <Image
                        alt="arrow"
                        src="/arrowdown.png"
                        layout="responsive"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className={styles.contentExpanse}>
                      <p>income</p>
                      <p>Rp {totalIncome()}</p>
                    </div>
                  </div>
                  <div className="containerIncomeExpanse">
                    <div className={`${styles.containerUp} mb-3`}>
                      <Image
                        alt="arrow"
                        src="/arrownup.png"
                        layout="responsive"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className={styles.contentExpanse}>
                      <p>Expense</p>
                      <p>Rp {totalExpense()}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 px-4 pt-4">
                    <Bar options={options} data={data} />
                  </div>
                </div>
              </div>
              <div className={`${styles.container2} mt-3 shadow`}>
                <div className="containerSection d-flex justify-content-around w-100 pt-3">
                  <h5>Transaction History</h5>
                  <Link href="/history">
                    <a href="" style={{ textDecoration: "none" }}>
                      See All
                    </a>
                  </Link>
                </div>
                <ul className=" px-0 mx-0">
                  {history2.map((elem) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <li className="py-3 d-flex justify-content-around">
                        <div className="d-flex gap-3 w-50">
                          <div className={`${styles.containerImage}`}>
                            <Image
                              alt="profile"
                              src={
                                elem.image
                                  ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${elem.image}`
                                  : "/no-profile.png"
                              }
                              layout="responsive"
                              width={100}
                              height={100}
                            />
                          </div>
                          <div style={{ lineHeight: "15px" }}>
                            <p>
                              {elem.firstName} {elem.lastName}
                            </p>
                            <p>{elem.type}</p>
                          </div>
                        </div>
                        <div>
                          <p
                            className={`${
                              elem.type === "send"
                                ? "text-danger"
                                : "text-success"
                            }`}
                          >
                            {elem.type === "send" ? "-" : "+"}
                            {elem.amount}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
