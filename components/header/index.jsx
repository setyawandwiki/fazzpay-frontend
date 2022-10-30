import styles from "./header.module.css";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import axiosClient from "../../util/axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Header = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const togglePopNotif = () => {
    setShow(!show);
  };

  const getData = async () => {
    try {
      const result = await axiosClient.get(
        `/transaction/history?page=1&limit=5&filter=MONTH`
      );
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAccount = async () => {
    try {
      const result = await axiosClient.get(
        `/user/profile/${Cookies.get("userId")}`
      );
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getAccount();
  }, []);

  console.log(user);
  return (
    <nav
      className={`navbar navbar-expand container-fluid-lg navbar-light py-3 bg-white ${styles.headerNav}`}
    >
      <div className="container">
        <a className={`navbar-brand ${styles.title}`} href="#">
          FazzPay
        </a>
        <button
          className={`navbar-toggler `}
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav w-100">
            <a
              className={`nav-item nav-link gap-2 align-items-center ${styles.containerUser}`}
              href="#"
              style={{ marginLeft: "auto" }}
            >
              <div className={styles.containerImage}>
                <Image
                  src={
                    user.data.image
                      ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${user.data.image}`
                      : "/no-profile.png"
                  }
                  layout="responsive"
                  width={20}
                  height={20}
                  objectFit="cover"
                  objectPosition={""}
                />
              </div>
              <div className={styles.nameUser}>
                <p className="p-0">
                  {user.data.firstName} {user.data.lastName}
                </p>
                <p className="p-0">{user.data.noTelp}</p>
              </div>
            </a>
            <a className="nav-item nav-link" href="#">
              <div
                onClick={togglePopNotif}
                className={`container--image h-100 d-flex align-items-center ${styles.containerBell}`}
              >
                <i style={{ color: "#4D4B57" }} className="bi bi-bell"></i>
                <div
                  className={`${styles.containerNotif} shadow ${
                    show ? "d-block" : "d-none"
                  }`}
                >
                  <ul className="px-0">
                    {data.map((elem) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <li className="d-flex gap-4 shadow m-4">
                          <div className="d-flex align-items-center">
                            {elem.type === "send" ? (
                              <i className="bi bi-arrow-down text-danger"></i>
                            ) : (
                              <i className="bi bi-arrow-up text-success"></i>
                            )}
                          </div>
                          <div className="">
                            <p>
                              {elem.type} from {elem.firstName} {elem.lastName}
                            </p>
                            <p>Rp {elem.amount}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
