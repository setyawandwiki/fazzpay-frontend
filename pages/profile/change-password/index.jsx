import Layout from "layout";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./changePass.module.css";
import Cookies from "js-cookie";
import { updatePasswordUser } from "store/actions/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleChangeText = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(user.message);
    dispatch(updatePasswordUser(Cookies.get("userId"), form))
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
        <div className="col-12 bg-white shadow rounded mt-4 p-3">
          <h5>Change Password</h5>
          <p>
            You must enter your current password and then type your new password
            twice.
          </p>
          <div className="d-flex justify-content-center">
            <form className={`${styles.formStyle}`} onSubmit={handleSubmit}>
              <div className={`${styles.containerSize} d-flex my-5`}>
                <i className="bi bi-lock fa-1x d-flex align-items-center"></i>
                <input
                  type={showPassword1 ? "text" : "password"}
                  className="form-control"
                  name="oldPassword"
                  placeholder="Enter your current password"
                  onChange={handleChangeText}
                  value={form.oldPassword}
                />
                {showPassword1 ? (
                  <i
                    onClick={toggleShowPassword1}
                    class="bi bi-eye-slash d-flex align-items-center"
                  ></i>
                ) : (
                  <i
                    onClick={toggleShowPassword1}
                    class="bi bi-eye d-flex align-items-center"
                  ></i>
                )}
              </div>
              <div className={`${styles.containerSize} d-flex my-5`}>
                <i className="bi bi-lock fa-1x d-flex align-items-center"></i>
                <input
                  type={showPassword2 ? "text" : "password"}
                  className="form-control"
                  name="newPassword"
                  placeholder="New password"
                  onChange={handleChangeText}
                  value={form.newPassword}
                />
                {showPassword2 ? (
                  <i
                    onClick={toggleShowPassword2}
                    class="bi bi-eye-slash d-flex align-items-center"
                  ></i>
                ) : (
                  <i
                    onClick={toggleShowPassword2}
                    class="bi bi-eye d-flex align-items-center"
                  ></i>
                )}
              </div>
              <div className={`${styles.containerSize} d-flex`}>
                <i className="bi bi-lock fa-1x d-flex align-items-center"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Repeat new password"
                  onChange={handleChangeText}
                  value={form.confirmPassword}
                />
                {showPassword ? (
                  <i
                    onClick={toggleShowPassword}
                    class="bi bi-eye-slash d-flex align-items-center"
                  ></i>
                ) : (
                  <i
                    onClick={toggleShowPassword}
                    class="bi bi-eye d-flex align-items-center"
                  ></i>
                )}
              </div>
              <button
                disabled={
                  form.oldPassword.length === 0 ||
                  form.confirmPassword.length === 0 ||
                  form.newPassword.length === 0
                }
                type="button"
                className={`btn w-100 my-5 ${
                  form.oldPassword.length === 0 ||
                  form.confirmPassword.length === 0 ||
                  form.newPassword.length === 0
                    ? styles.buttonSubmit
                    : styles.buttonSubmitSuccess
                }`}
                onClick={handleSubmit}
              >
                {user.isLoading ? (
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                ) : (
                  <>Change Password</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
