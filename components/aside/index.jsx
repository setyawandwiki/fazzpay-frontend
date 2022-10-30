import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topUpSaldo } from "store/actions/topUp";
import styles from "./aside.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../util/axios";
import Cookies from "js-cookie";

const Aside = () => {
  const router = useRouter();
  const [active, setActive] = useState("home");
  const handleChange = (e, param) => {
    e.preventDefault();
    setActive(param);
  };
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const topUp = useSelector((state) => state.topUp);

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/auth/logout");
      localStorage.clear();
      Cookies.remove("userId");
      Cookies.remove("token");
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const submitTopUp = (e) => {
    e.preventDefault();
    dispatch(topUpSaldo({ amount }))
      .then((res) => {
        toast.success(res.value.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setAmount("");
        window.open(topUp.data.redirectUrl, "_ blank");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const handleChangeTopup = (e) => {
    setAmount(e.target.value);
  };

  console.log(amount);

  return (
    <>
      <div className="row mb-5" style={{ height: "90vh" }}>
        <div className={`col-12 h-100 my-4 ${styles.containerSideBar} px-0`}>
          <ul className="d-flex flex-column justify-content-between pt-4 px-0">
            <div className={styles.sideBar}>
              <li
                onClick={(e) => handleChange(e, "home")}
                className={`px-4 ${styles.borderLeft}`}
              >
                <Link href="/home">
                  <a
                    className={`py-3 d-flex gap-4 ${
                      router.asPath.includes("home") ? styles.active : ""
                    }`}
                  >
                    <i className="bi bi-list-task"></i>
                    <p>Dashboard</p>
                  </a>
                </Link>
              </li>
              <li
                onClick={(e) => handleChange(e, "transfer")}
                className={`px-4 ${styles.borderLeft}`}
              >
                <Link href="/transfer">
                  <a
                    href=""
                    className={`py-3 d-flex gap-4 ${
                      router.asPath.includes("transfer") ? styles.active : ""
                    }`}
                  >
                    <i className="bi bi-arrow-up"></i> <p>transfer</p>
                  </a>
                </Link>
              </li>
              <li
                onClick={(e) => handleChange(e, "top-up")}
                className={`px-4 ${styles.borderLeft}`}
              >
                <a
                  href=""
                  data-toggle="modal"
                  data-target="#topupModal"
                  className={`py-3 d-flex gap-4  ${
                    router.asPath.includes("top-up") ? styles.active : ""
                  }`}
                >
                  <i className="bi bi-plus" style={{ fontSize: "1.2rem" }}></i>
                  <p>Top Up</p>
                </a>
              </li>
              <li
                onClick={(e) => handleChange(e, "profile")}
                className={`px-4 ${styles.borderLeft}`}
              >
                <Link href="/profile">
                  <a
                    href=""
                    className={`py-3 d-flex gap-4 ${
                      router.asPath.includes("profile") ? styles.active : ""
                    }`}
                  >
                    <i className="bi bi-person"></i>
                    <p>profile</p>
                  </a>
                </Link>
              </li>
            </div>
            <div>
              <li className={`px-4 ${styles.borderLeft}`}>
                <a href="" className="py-3 d-flex gap-4" onClick={logout}>
                  <i className="bi bi-box-arrow-right"></i>
                  <p>Log out</p>
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div
        className="modal fade"
        id="topupModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <h5 className="modal-title" id="topupModal">
                Top up
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label for="exampleInputEmail1 text-secondary">
                  Enter the amount of money, and click submit
                </label>
                <input
                  type="email"
                  className="form-control my-5"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=""
                  value={amount}
                  onChange={handleChangeTopup}
                />
              </div>
            </div>
            <div className="modal-footer" style={{ borderTop: "none" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitTopUp}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Aside;
