import React, { useState } from "react";
import axiosClient from "util/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import LayoutAuth from "layout/auth";
import styles from "./createPassword.module.css";
import Link from "next/link";
import AuthBanner from "components/authBanner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePassword = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    confirmPassword: "",
    newPassword: "",
    keysChangePassword: "",
  });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      setSuccess(true);
      const result = await axiosClient.patch("/auth/reset-password", form);
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
      setForm({
        confirmPassword: "",
        newPassword: "",
        keysChangePassword: "",
      });
      router.push("/login");
      //   proses kondisi pengecekan pin jika ada akan diarahkan ke home jika tidak ada akan diarahkan ke create pin
      //   router.push("/home");
      console.log(result);
    } catch (error) {
      setSuccess(false);
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
      setIsLoading(false);
      console.log(error);
    }
  };

  console.log(form);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleChangeText = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      keysChangePassword: router.query.token,
    });
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
                    className={`bi bi-lock fa-1x d-flex align-items-center ${
                      success ? "" : styles.failed
                    }`}
                  ></i>
                  <input
                    type={showPassword1 ? "text" : "password"}
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Create new password"
                    onChange={handleChangeText}
                    value={form.confirmPassword}
                  />
                  {showPassword1 ? (
                    <i
                      onClick={toggleShowPassword1}
                      class={`bi bi-eye-slash d-flex align-items-center ${
                        success ? "" : styles.failed
                      }`}
                    ></i>
                  ) : (
                    <i
                      onClick={toggleShowPassword1}
                      class={`bi bi-eye d-flex align-items-center ${
                        success ? "" : styles.failed
                      }`}
                    ></i>
                  )}
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
                    name="newPassword"
                    placeholder="Create new password"
                    onChange={handleChangeText}
                    value={form.newPassword}
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
                <button
                  disabled={
                    form.confirmPassword.length === 0 ||
                    form.newPassword.length === 0
                  }
                  type="button"
                  className={`btn w-100 mt-5 ${
                    form.confirmPassword.length === 0 ||
                    form.newPassword.length === 0
                      ? styles.buttonSubmit
                      : styles.buttonSubmitSuccess
                  }`}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <div class="spinner-border" role="status">
                      <span class="sr-only"></span>
                    </div>
                  ) : (
                    <>Reset Password</>
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

export default CreatePassword;
