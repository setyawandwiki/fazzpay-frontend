import React, { useState } from "react";
import axiosClient from "util/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import LayoutAuth from "layout/auth";
import styles from "./register.module.css";
import Link from "next/link";
import AuthBanner from "components/authBanner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  console.log(process.env.URL_BACKEND);
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      setSuccess(true);
      const result = await axiosClient.post("/auth/register", form);
      setIsLoading(false);
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
      setForm({
        email: "",
        password: "",
        lastName: "",
        firstName: "",
      });
      console.log(result);
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
                  Start Accessing Banking Needs With All Devices and All
                  Platforms With 30.000+ Users
                </h5>
                <p className="text-secondary py-3">
                  Transfering money is eassier than ever, you can access FazzPay
                  wherever you are. Desktop, laptop, mobile phone? we cover all
                  of that for you!
                </p>
                <div
                  className={`${
                    success ? styles.containerSize : styles.containerFailed
                  } d-flex my-5`}
                >
                  <i
                    className={`bi bi-person-fill fa-1x d-flex align-items-center ${
                      success ? "" : styles.failed
                    }`}
                  ></i>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder="Enter your firstname"
                    onChange={handleChangeText}
                    value={form.firstName}
                  />
                </div>
                <div
                  className={`${
                    success ? styles.containerSize : styles.containerFailed
                  } d-flex my-5`}
                >
                  <i
                    className={`bi bi-person-fill fa-1x d-flex align-items-center ${
                      success ? "" : styles.failed
                    }`}
                  ></i>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Enter your lastname"
                    onChange={handleChangeText}
                    value={form.lastName}
                  />
                </div>
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
                <div
                  className={`${
                    success ? styles.containerSize : styles.containerFailed
                  } d-flex`}
                >
                  <i
                    className={`bi bi-lock fa-1x d-flex align-items-center ${
                      success ? "" : styles.failed
                    }`}
                  ></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    placeholder="Create your password"
                    onChange={handleChangeText}
                    value={form.password}
                  />
                  {showPassword ? (
                    <i
                      onClick={toggleShowPassword}
                      class={`bi bi-eye-slash d-flex align-items-center ${
                        success ? "" : styles.failed
                      }`}
                    ></i>
                  ) : (
                    <i
                      onClick={toggleShowPassword}
                      class={`bi bi-eye d-flex align-items-center ${
                        success ? "" : styles.failed
                      }`}
                    ></i>
                  )}
                </div>
                <div className="mt-3 text-end mb-5">
                  <Link href="/forgot-password">
                    <a
                      href=""
                      style={{
                        textDecoration: "none",
                        color: "rgba(58, 61, 66, 0.8)",
                        fontSize: "14px",
                      }}
                    >
                      Forgot Password?
                    </a>
                  </Link>
                </div>
                <button
                  disabled={
                    form.email.length === 0 || form.password.length === 0
                  }
                  type="button"
                  className={`btn w-100 mt-3 ${
                    form.email.length === 0 || form.password.length === 0
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
                    <>Register</>
                  )}
                </button>
                <p className="mt-4 text-center">
                  Don’t have an account? Let’s <Link href="/home">Sign up</Link>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}
