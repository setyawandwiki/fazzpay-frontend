import React, { useState } from "react";
import LayoutAuth from "layout/auth";
import styles from "./reset.module.css";
import Link from "next/link";
import AuthBanner from "components/authBanner";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    try {
      const result = await axiosClient.post("/auth/login", form);
      // menjalankan get user by id dan menyimpan datanya ke redux
      //   proses kondisi pengecekan pin jika ada akan diarahkan ke home jika tidak ada akan diarahkan ke create pin
      router.push("/home");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <LayoutAuth>
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
                <div className={`${styles.containerSize} d-flex my-5`}>
                  <i className="bi bi-envelope fa-1x d-flex align-items-center"></i>
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
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default ResetPassword;
