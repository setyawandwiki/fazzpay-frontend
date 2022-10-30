import Layout from "layout";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./confirmation.module.css";
import moment from "moment";
import axiosClient from "../../../../util/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Confirmation = () => {
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  const router = useRouter();
  console.log(router.query);

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

  const handlePin = (e) => {
    e.preventDefault();
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }
    axiosClient
      .get(`/user/pin/${allPin}`)
      .then(() => {
        axiosClient
          .post("/transaction/transfer", {
            receiverId: router.query.receiverId,
            amount: router.query.amount,
            notes: router.query.notes,
          })
          .then((res) => {
            console.log(res.value);
            toast.success("success transfer", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            router.reload();
            router.push("/history");
          })
          .catch((err) => {
            console.log(err);
          });
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

  // useEffect(() => {
  //   if (!router.query.amount) {
  //     router.push("/history");
  //   }
  // }, []);

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
      <div className="row bg-white shadow mt-4 rounded p-2">
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div
                className="modal-header d-flex align-items-start"
                style={{ borderBottom: "none" }}
              >
                <div className="d-flex flex-column">
                  <p className="" id="exampleModalLongTitle">
                    Enter PIN to transfer
                  </p>
                  <p>
                    Enter your 6 digits PIN for confirmation to continue
                    transferring money.{" "}
                  </p>
                </div>
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
                {" "}
                <div className="d-flex gap-4 justify-content-start">
                  <form onSubmit={handlePin}>
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
                          : "btn-primary"
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
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <h5>Transfer To</h5>
          <div className="shadow p-3 rounded my-2">
            <div className="d-flex gap-3">
              <div className={styles.containerUser}>
                <Image
                  src={
                    router.query.image
                      ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${router.query.image}`
                      : `/no-profile.png`
                  }
                  layout="responsive"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <p>
                  {router.query.firstName} {router.query.lastName}
                </p>
                <p>{router.query.noTelp}</p>
              </div>
            </div>
          </div>
          <h5>Details</h5>
          <div className="shadow p-3 rounded">
            <p>Amount</p>
            <p>Rp. {router.query.amount}</p>
          </div>
          <div className="shadow p-3 rounded">
            <p>Balance Left</p>
            <p>
              Rp. {Number(router.query.balance) - Number(router.query.amount)}
            </p>
          </div>
          <div className="shadow p-3 rounded my-2">
            <p>Date & Time</p>
            <p>{moment().format("MMMM Do YYYY, h:mm:ss a")}</p>
          </div>
          <div className="shadow p-3 rounded my-2">
            <p>Notes</p>
            <p>{router.query.notes}</p>
          </div>
          <div className="text-end my-4">
            <button
              data-toggle="modal"
              data-target="#exampleModalCenter"
              className="btn btn-primary"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;
