import Layout from "layout";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import axiosClient from "../../util/axios";
import Cookies from "js-cookie";
import {
  changePhoto,
  changeProfile,
  deletePhoto,
  getUserById,
} from "store/actions/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [updateImage, setUpdateImage] = useState({ image: "" });
  const [form, setForm] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    dispatch(getUserById(Cookies.get("userId")));
  }, []);

  const handleImage = (e) => {
    setUpdateImage({ image: e.target.files[0] });
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdateImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", updateImage.image);
    dispatch(changePhoto(Cookies.get("userId"), formData))
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((e) => console.log(e));
  };

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const deleteImage = (e) => {
    e.preventDefault();
    dispatch(deletePhoto(Cookies.get("userId"))).then((res) => {
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
    });
  };

  const handleProfile = (e) => {
    e.preventDefault();
    dispatch(changeProfile(Cookies.get("userId"), form)).then((res) => {
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
        <div
          className={`${styles.containerProfile} col-12 shadow rounded  mt-4 d-flex flex-column justify-content-center align-items-center`}
        >
          <div className={`${styles.containerImage}`}>
            <Image
              alt="image"
              src={
                user.data.image
                  ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${user.data.image}`
                  : "/no-profile.png"
              }
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
          <p data-toggle="modal" data-target=".bd-example-modal-lg">
            edit
          </p>
          <div
            class="modal fade bd-example-modal-lg"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Modal title</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body ">
                  <form
                    onSubmit={handleUpdateImage}
                    action=""
                    className="d-flex flex-column"
                    // onSubmit={updateImage.image ? handleUpdateImage : ""}
                  >
                    <input type="file" onChange={handleImage} />
                    {user.data.image ? (
                      <div
                        style={{
                          width: "150px",
                          height: "150px",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${user.data.image}
                          `}
                          layout="responsive"
                          width={100}
                          height={100}
                          alt="view image"
                        />
                        <span
                          onClick={deleteImage}
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "20px",
                            borderRadius: "50%",
                          }}
                          className="bg-danger text-center"
                        >
                          x
                        </span>
                      </div>
                    ) : (
                      <div style={{ width: "50px", height: "50px" }}>
                        <Image
                          alt="no-profile"
                          src="/no-profile.png"
                          layout="responsive"
                          width={100}
                          height={100}
                        />
                      </div>
                    )}

                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </form>
                  <form onSubmit={handleProfile}>
                    <div class="form-group">
                      <label for="exampleInputEmail1">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        value={form.firstName}
                        name="firstName"
                        aria-describedby="emailHelp"
                        onChange={handleChangeForm}
                        placeholder="Enter firstName"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChangeForm}
                        id="exampleInputPassword1"
                        placeholder="enter Last Name"
                      />
                    </div>

                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <h5>
            {user.data.firstName ? user.data.firstName : "No firstname"}{" "}
            {user.data.lastName ? user.data.lastName : "no lastname"}
          </h5>
          <p>{user.data.noTelp ? user.data.noTelp : "Empty phone number"}</p>
          <Link href="/profile/personal-information">
            <div className="mb-4">
              <a
                href=""
                className={`d-flex justify-content-between p-3 ${styles.buttonProfile}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  borderRadius: "10px",
                }}
              >
                <p className="m-0">Personal Information</p>
                <i class="d-flex align-items-center bi bi-arrow-right"></i>
              </a>
            </div>
          </Link>
          <Link href="/profile/change-password">
            <div className="mb-4">
              <a
                href=""
                className={`d-flex justify-content-between p-3 ${styles.buttonProfile}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  borderRadius: "10px",
                }}
              >
                <p className="m-0">Change Password</p>
                <i class="d-flex align-items-center bi bi-arrow-right"></i>
              </a>
            </div>
          </Link>
          <Link href="/profile/change-pin">
            <div className="mb-4">
              <a
                href=""
                className={`d-flex justify-content-between p-3 ${styles.buttonProfile}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  borderRadius: "10px",
                }}
              >
                <p className="m-0">Change Pin</p>
                <i class="d-flex align-items-center bi bi-arrow-right"></i>
              </a>
            </div>
          </Link>
          <Link href="/home">
            <div className="mb-4">
              <a
                href=""
                className={`d-flex justify-content-between p-3 ${styles.buttonProfile}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  borderRadius: "10px",
                }}
              >
                <p className="m-0">Log out</p>
                <i class="d-flex align-items-center bi bi-arrow-right"></i>
              </a>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
