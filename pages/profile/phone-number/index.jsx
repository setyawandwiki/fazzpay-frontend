import Layout from "layout";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./phoneNumber.module.css";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserById, updatePhoneUser } from "store/actions/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PhoneNumber = () => {
  const [form, setForm] = useState({ noTelp: "" });
  const [domain, setDomain] = useState("+62");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = () => {
    console.log(domain);
    const fixPhone = { noTelp: domain.concat(form.noTelp) };
    dispatch(updatePhoneUser(Cookies.get("userId"), fixPhone))
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const domainChange = (e) => {
    setDomain(e.target.value);
  };

  console.log(user);
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
        <div className="col-12 mt-4 bg-white rounded shadow">
          <h5>Edit Phone Number</h5>
          <p>
            Add at least one phone number for the transfer ID so you can start
            transfering your money to another user.
          </p>
          <div>
            <form className={`${styles.formStyle} `}>
              <h5 className="">
                Start Accessing Banking Needs With All Devices and All Platforms
                With 30.000+ Users
              </h5>
              <p className="text-secondary py-3">
                Transfering money is eassier than ever, you can access FazzPay
                wherever you are. Desktop, laptop, mobile phone? we cover all of
                that for you!
              </p>
              <div className={`${styles.containerSize} d-flex my-5`}>
                <i className="bi bi-envelope fa-1x d-flex align-items-center"></i>
                <select
                  onChange={domainChange}
                  class="w3-select"
                  name="option"
                  style={{ border: "none" }}
                >
                  <option value="+62" selected>
                    +62
                  </option>
                  <option value="+63">+63</option>
                  <option value="+64">+64</option>
                </select>
                <input
                  type="text"
                  className="form-control"
                  name="noTelp"
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  value={form.noTelp}
                />
              </div>

              <button
                disabled={form.noTelp.length === 0}
                type="button"
                className={`btn w-100 mt-3 ${
                  form.noTelp.length === 0
                    ? styles.buttonSubmit
                    : styles.buttonSubmitSuccess
                }`}
                onClick={handleSubmit}
              >
                {user.isLoading ? (
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>Edit Phone Number</>
                )}
              </button>

              <p className="mt-4 text-center">
                Don’t have an account? Let’s <Link href="/home">Sign up</Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PhoneNumber;
