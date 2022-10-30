import React, { useState, useRef } from "react";
import axiosClient from "util/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import LayoutAuth from "layout/auth";
import styles from "./forgot.module.css";
import Link from "next/link";
import AuthBanner from "components/authBanner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
    linkDirect: "http://localhost:3000/create-password",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  const container = useRef(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      setSuccess(true);
      const result = await axiosClient.post("/auth/forgot-password", form);
      // menjalankan get user by id dan menyimpan datanya ke redux
      toast.success(result.data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsLoading(false);
    } catch (error) {
      setSuccess(false);
      setIsLoading(false);
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error);
    }
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(isLoading);
  return (
    <LayoutAuth>
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
      <div className="container-fluid px-0">
        <div className="test" ref={container}></div>
        <div className="row mx-0">
          <div
            className={`col-md-7 col-lg-7 px-0 ${styles.backgroundLogin}`}
            style={{ position: "relative" }}
          >
            <AuthBanner />
          </div>
          <div className="col-md-5 col-lg-5">
            <div
              className="w-75 h-100 d-flex justify-content-center flex-column"
              style={{ marginLeft: "2rem" }}
            >
              <form className={`${styles.formStyle} `}>
                <h5 className="">
                  Did You Forgot Your Password? Don’t Worry, You Can Reset Your
                  Password In a Minutes.
                </h5>
                <p className="text-secondary py-3">
                  To reset your password, you must type your e-mail and we will
                  send a link to your email and you will be directed to the
                  reset password screens.
                </p>
                <div
                  className={`${
                    success ? styles.containerSize : styles.containerFailed
                  } d-flex my-5`}
                >
                  <i
                    className={`bi bi-envelope fa-1x d-flex align-items-center ${
                      success ? "" : styles.failed
                    }`}
                  ></i>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your e-mail"
                    onChange={handleChangeText}
                    value={form.email}
                  />
                </div>
                <button
                  disabled={form.email.length === 0}
                  type="button"
                  className={`btn w-100 mt-3 ${
                    form.email.length === 0
                      ? styles.buttonSubmit
                      : styles.buttonSubmitSuccess
                  }`}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <>Confirm</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default ForgotPassword;
