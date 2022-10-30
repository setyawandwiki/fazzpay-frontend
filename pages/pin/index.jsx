import React, { useState } from "react";
import axiosClient from "util/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import LayoutAuth from "layout/auth";
import styles from "./pin.module.css";
import Link from "next/link";
import AuthBanner from "components/authBanner";
import Image from "next/image";

export default function Login() {
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setPin({ ...pin, [e.target.id]: e.target.value });
  };

  const inputFocus = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 6) {
        e.target.form.elements[next].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }
    const id = Cookies.get("userId");
    try {
      setSuccess(true);
      await axiosClient.patch(`/user/pin/${id}`, { pin: allPin });
    } catch (error) {
      setSuccess(false);
    }
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
              <form onSubmit={handleSubmit}>
                {success ? (
                  <>
                    <div className="w-25">
                      <Image
                        src="/success.png"
                        layour="responsive"
                        width={100}
                        height={100}
                      />
                    </div>
                    <h5 className="">Your PIN Was Successfully Created</h5>
                    <p className="text-secondary py-3">
                      Your PIN was successfully created and you can now access
                      all the features in FazzPay.
                    </p>
                  </>
                ) : (
                  <>
                    <h5 className="">
                      Start Accessing Banking Needs With All Devices and All
                      Platforms With 30.000+ Users
                    </h5>
                    <p className="text-secondary py-3">
                      Transfering money is eassier than ever, you can access
                      FazzPay wherever you are. Desktop, laptop, mobile phone?
                      we cover all of that for you!
                    </p>
                  </>
                )}

                <div className="d-flex gap-4 justify-content-start">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item}>
                      <input
                        type="text"
                        maxLength="1"
                        autoComplete="off"
                        className="form-control text-center"
                        style={{ width: "58px", height: "55px" }}
                        tabIndex={item}
                        id={`pin${item}`}
                        value={pin[`pin${item}`]}
                        onChange={handleChange}
                        onKeyUp={inputFocus}
                      />
                    </div>
                  ))}
                </div>
                <div className="d-grid my-4">
                  <button
                    type="submit"
                    className={`mt-5 btn ${
                      !pin.pin1 ||
                      !pin.pin2 ||
                      !pin.pin3 ||
                      !pin.pin4 ||
                      !pin.pin5 ||
                      !pin.pin6
                        ? styles.buttonDisabled
                        : styles.buttonUnDisabled
                    }`}
                    disabled={
                      !pin.pin1 ||
                      !pin.pin2 ||
                      !pin.pin3 ||
                      !pin.pin4 ||
                      !pin.pin5 ||
                      !pin.pin6
                    }
                  >
                    {!success && <>Confirm</>}
                    {success && (
                      <Link href="/home">
                        <a
                          href=""
                          style={{
                            textDecoration: "none",
                            color: "white",
                            fontWeight: 700,
                          }}
                        >
                          Go to dashboard
                        </a>
                      </Link>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}
