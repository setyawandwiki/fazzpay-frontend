import Layout from "layout";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkPin } from "store/actions/user";
import styles from "./changePin.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePin = () => {
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  const router = useRouter();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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

  const handleSubmitPin = (e) => {
    e.preventDefault();
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }
    dispatch(checkPin(allPin))
      .then(() => {
        router.push(
          {
            pathname: `/profile/change-pin/confirm`,
            query: { pin: allPin },
          },
          "/profile/change-pin/confirm"
        );
      })
      .catch((err) => {
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
  return (
    <Layout>
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
      <div className="row">
        <div className="col-12 mt-4 bg-white rounded bg-white">
          <h5>Change Pin</h5>
          <p>
            Enter your current 6 digits Fazzpay PIN below to continue to the
            next steps.
          </p>
          <div className="w-50 mt-5" style={{ margin: "auto" }}>
            <form onSubmit={handleSubmitPin}>
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
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePin;
